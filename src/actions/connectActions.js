import TrezorConnect, {
    DEVICE_EVENT, DEVICE, TRANSPORT_EVENT, UI_EVENT, UI, TRANSPORT,
} from 'trezor-connect';

import connectConfig from 'config/connect';
import * as CONNECT from 'actions/constants/connect';
import * as ONBOARDING from 'actions/constants/onboarding';
import * as CALLS from 'actions/constants/calls';
import arrayBufferToBuffer from 'utils/arrayBufferToBuffer';

import { goToNextStep } from './onboardingActions';
import { getFirmware } from './fetchActions';

const init = () => async (dispatch) => {
    TrezorConnect.on(DEVICE_EVENT, (event) => {
        if (event.type === DEVICE.CONNECT || event.type === DEVICE.CHANGED || event.type === DEVICE.DISCONNECT) {
            dispatch({
                type: event.type,
                device: event.payload,
            });
        }
    });

    TrezorConnect.on(UI_EVENT, (event) => {
        if (event.type === UI.REQUEST_BUTTON) {
            dispatch({
                type: CONNECT.DEVICE_INTERACTION_EVENT,
                name: event.payload.code,
            });
        } else if (event.type === UI.REQUEST_PIN) {
            dispatch({
                type: CONNECT.UI_INTERACTION_EVENT,
                name: UI.REQUEST_PIN,
            });
        } else if (event.type === UI.REQUEST_WORD) {
            dispatch({
                type: CONNECT.UI_INTERACTION_EVENT,
                name: UI.REQUEST_WORD,
            });
        }
    });

    TrezorConnect.on(TRANSPORT_EVENT, (event) => {
        const { type } = event;
        // this transport-error case is not error from application view.
        // It just means that we dont have bridge started
        if (type === TRANSPORT.ERROR) {
            // but we still need to dispatch bridge installers provided by Connect;
            dispatch({
                type: CONNECT.TRANSPORT_ERROR,
                transport: event.payload,
            });
        } else if (type === TRANSPORT.START) {
            dispatch({
                type: CONNECT.TRANSPORT_START,
                transport: event.payload,
            });
        }
    });

    if (connectConfig.endpoint) {
        window.__TREZOR_CONNECT_SRC = connectConfig.endpoint; // eslint-disable-line no-underscore-dangle
    }

    try {
        await TrezorConnect.init(connectConfig.init);
    } catch (error) {
        console.warn('error', error);
        // todo [szymon]: does connect.init throw when for example timeout error?
        dispatch({
            // todo: type probably missing in reducer
            type: 'connect-error',
            error,
        });
    }
};

const getFeatures = () => call(CALLS.GET_FEATURES);
const firmwareErase = params => call(CALLS.FIRMWARE_ERASE, params);
const firmwareUpload = params => call(CALLS.FIRMWARE_UPLOAD, params);
const resetDevice = () => call(CALLS.RESET_DEVICE);
const backupDevice = () => call(CALLS.BACKUP_DEVICE);
const applySettings = params => call(CALLS.APPLY_SETTINGS, params);
const applyFlags = params => call(CALLS.APPLY_FLAGS, params);
const changePin = () => call(CALLS.CHANGE_PIN);
// todo [szymon]: unify recoveryDevice from connect with recoverDevice here
const recoveryDevice = params => call(CALLS.RECOVER_DEVICE, params);
const wipeDevice = () => call(CALLS.WIPE_DEVICE);

const submitNewPin = params => uiResponseCall(UI.RECEIVE_PIN, params);
const submitWord = params => uiResponseCall(UI.RECEIVE_WORD, params);

const callActionAndGoToNextStep = (name, params, stepId, goOnSuccess = true, goOnError = false) => (dispatch) => {
    dispatch(call(name, params)).then((response) => {
        if (response.success && goOnSuccess) {
            dispatch(goToNextStep(stepId));
        } if (!response.success && goOnError) {
            dispatch(goToNextStep(stepId));
        }
    });
};

const getDefaultParams = (name) => {
    if (name === CALLS.RESET_DEVICE) {
        return {
            label: 'My Trezor',
            skipBackup: true,
            // todo: enable passphraseProtection when problem with invoking passphrase request solved
            // passhpraseProtection: true, )
        };
    }
    return {};
};

const call = (name, params) => async (dispatch, getState) => {
    const { device } = getState().connect;
    // eslint-disable-next-line no-param-reassign
    const callParams = {};

    Object.assign(callParams, getDefaultParams(name, params), params);
    if (device !== null) {
        callParams.device = device;
    }
    try {
        const currentCall = getState().connect.deviceCall;
        if (currentCall.isProgress) {
            console.warn('[ConnectActions]: device call in progress. Aborting call');
        }

        // todo: maybe useles to have RESET and START right after?
        dispatch({ type: CONNECT.DEVICE_CALL_RESET });

        dispatch({
            type: CONNECT.DEVICE_CALL_START,
            name,
        });

        let fn;

        switch (name) {
            case CALLS.FIRMWARE_ERASE:
                fn = () => TrezorConnect.firmwareErase(callParams);
                break;
            case CALLS.FIRMWARE_UPLOAD:
                fn = () => TrezorConnect.firmwareUpload(callParams);
                break;
            case CALLS.RESET_DEVICE:
                fn = () => TrezorConnect.resetDevice(callParams);
                break;
            case CALLS.BACKUP_DEVICE:
                fn = () => TrezorConnect.backupDevice(callParams);
                break;
            case CALLS.APPLY_SETTINGS:
                fn = () => TrezorConnect.applySettings(callParams);
                break;
            case CALLS.APPLY_FLAGS:
                fn = () => TrezorConnect.applyFlags(callParams);
                break;
            case CALLS.GET_FEATURES:
                fn = () => TrezorConnect.getFeatures(callParams);
                break;
            case CALLS.CHANGE_PIN:
                fn = () => TrezorConnect.changePin(callParams);
                break;
            case CALLS.RECOVER_DEVICE:
                fn = () => TrezorConnect.recoveryDevice(callParams);
                break;
            case CALLS.WIPE_DEVICE:
                fn = () => TrezorConnect.wipeDevice(callParams);
                break;
            default: throw new Error(`call ${name} does not exist`);
        }
        const response = await fn();
        if (response.success) {
            dispatch({
                type: CONNECT.DEVICE_CALL_SUCCESS,
                result: response.payload,
                name,
            });
            return response;
        }
        dispatch({
            type: CONNECT.DEVICE_CALL_ERROR,
            error: response.payload.error,
            name,
        });
        return response;
    } catch (error) {
        console.warn('app error');
        dispatch({
            type: ONBOARDING.SET_APPLICATION_ERROR,
            error,
        });
        return error;
    }
};

const uiResponseCall = (name, params) => async (dispatch) => {
    try {
        let fn;
        switch (name) {
            case UI.RECEIVE_PIN:
                fn = () => TrezorConnect.uiResponse({ type: UI.RECEIVE_PIN, payload: params.pin });
                break;
            case UI.RECEIVE_WORD:
                fn = () => TrezorConnect.uiResponse({ type: UI.RECEIVE_WORD, payload: params.word });
                break;
            default: throw new Error(`call ${name} does not exist`);
        }
        // todo: listen to response success here? probably not
        await fn(params);
    } catch (err) {
        dispatch({
            type: ONBOARDING.SET_APPLICATION_ERROR,
            err,
        });
    }
};

const resetCall = () => ({ type: CONNECT.DEVICE_CALL_RESET });

const updateFirmware = () => async (dispatch, getState) => {
    const model = getState().connect.device.features.major_version;
    const versions = {
        1: 'trezor-1.8.0.bin',
        2: 'trezor-2.1.0.bin',
    };
    let fw;
    try {
        // todo [stick]: use special updating firware
        dispatch(getFirmware(`/${model}/${versions[model]}`)).then(async (response) => {
            if (!response.ok) {
                return;
            }
            const ab = await response.arrayBuffer();
            if (model === 1) {
                fw = ab.slice(256);
            } else {
                fw = ab.slice(0);
            }
            fw = arrayBufferToBuffer(fw);
            dispatch(firmwareErase({ keepSession: true, skipFinalReload: true, length: fw.byteLength }))
                .then((callResponse) => {
                    if (callResponse.success) {
                        dispatch(firmwareUpload({
                            payload: fw,
                            keepSession: false,
                            skipFinalReload: true,
                            offset: callResponse.payload.offset,
                            length: callResponse.payload.length,
                        }));
                    }
                });
        });
    } catch (error) {
        // todo: ?
        console.warn('error', error);
    }
};

export {
    init,
    // calls to connect
    resetCall,
    getFeatures,
    firmwareErase,
    firmwareUpload,
    resetDevice,
    backupDevice,
    applySettings,
    applyFlags,
    changePin,
    recoveryDevice,
    wipeDevice,
    // customizable call
    callActionAndGoToNextStep,
    // responses to device events
    submitNewPin,
    submitWord,
    // compound calls
    updateFirmware,
};