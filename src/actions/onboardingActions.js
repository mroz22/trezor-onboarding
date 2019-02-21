import * as ONBOARDING from 'actions/constants/onboarding';
import TrezorConnect, { DEVICE_EVENT, TRANSPORT_EVENT } from 'trezor-connect';

export const goToNextStep = () => ({
    type: ONBOARDING.GO_TO_NEXT_STEP,
});

export const selectTrezorModel = model => ({
    type: ONBOARDING.SELECT_TREZOR_MODEL,
    model,
});

export const init = () => async (dispatch, getState) => {
    // set listeners
    TrezorConnect.on(DEVICE_EVENT, (event) => {
        // post event to reducers
        const type = event.type; // eslint-disable-line prefer-destructuring
        dispatch({
            type,
            device: event.payload,
        });
    });

    TrezorConnect.on(TRANSPORT_EVENT, (event) => {
        // post event to reducers
        const type = event.type; // eslint-disable-line prefer-destructuring
        dispatch({
            type,
            transport: event.payload,
        });
    });

    // todo env dev || prod
    // window.__TREZOR_CONNECT_SRC = 'http://localhost:8088/'; // eslint-disable-line no-underscore-dangle
    window.__TREZOR_CONNECT_SRC = 'https://sisyfos.trezor.io/blyat/'; // eslint-disable-line no-underscore-dangle
    // todo: na co je tohle? potrebuju to?
    window.TrezorConnect = TrezorConnect;

    try {
        await TrezorConnect.init({
            transportReconnect: true,
            debug: false,
            popup: false,
            webusb: false,
        });
    } catch (error) {
        dispatch({
            // todo: type probably missing in reducer
            type: 'connect-error',
            error,
        });
    }
};

export const firmwareErase = params => call('firmwareErase', params);
export const firmwareUpload = params => call('firmwareUpload', params);

// tohle jsem videl v nejakem tutorialu ale pripada mi to zbytecne na to delat funkci jeste
const startCall = name => ({
    type: ONBOARDING.DEVICE_CALL_START,
    name,
});

const successCall = (name, payload) => ({
    type: ONBOARDING.DEVICE_CALL_SUCCESS,
    result: payload,
    name,
});

export const call = (name, params) => async (dispatch) => {
    let fn;

    switch (name) {
        case 'firmwareErase':
            fn = () => TrezorConnect.firmwareErase(params);
            break;
        case 'firmwareUpload':
            fn = () => TrezorConnect.firmwareUpload(params);
            break;
        default: throw new Error(`call ${name} does not exist`);
    }

    dispatch(startCall(name));
    try {
        const response = await fn(params);
        if (response.success) {
            dispatch(successCall(name, response.payload));
        } else {
            dispatch({
                type: ONBOARDING.DEVICE_CALL_ERROR,
                error: response.error,
                name,
            });
        }
    } catch (err) {
        // todo: rethink
        dispatch({
            type: ONBOARDING.DEVICE_CALL_ERROR,
            name,
        });
    }
};