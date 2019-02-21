import * as ONBOARDING from 'actions/constants/onboarding';
import * as CONNECT from 'actions/constants/connect';
import TrezorConnect, { DEVICE_EVENT, TRANSPORT_EVENT } from 'trezor-connect';

export const goToNextStep = () => ({
    type: ONBOARDING.GO_TO_NEXT_STEP,
});

export const selectTrezorModel = model => ({
    type: ONBOARDING.SELECT_TREZOR_MODEL,
    model,
});

export const toggleDeviceInteraction = value => ({
    type: ONBOARDING.TOGGLE_DEVICE_INTERACTION,
    value,
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

const firmwareErase = async (params, dispatch) => {
    dispatch({
        type: CONNECT.FIRMWARE_ERASE,
        isProgress: true,
    });
    try {
        const response = await TrezorConnect.firmwareErase(params);
        if (response.success) {
            dispatch({
                type: CONNECT.FIRMWARE_ERASE,
                isSuccess: true,
                response,
            });
        } else {
            dispatch({
                type: CONNECT.FIRMWARE_ERASE,
                isError: true,
                errorMessage: response.error,
            });
        }
    } catch (err) {
        dispatch({
            type: CONNECT.FIRMWARE_ERASE,
            isError: true,
        });
    }
    dispatch({
        type: CONNECT.FIRMWARE_ERASE,
        isProgress: false,
    });
};


const firmwareUpload = async (params, dispatch) => {
    dispatch({
        type: CONNECT.FIRMWARE_UPLOAD,
        isProgress: true,
    });
    try {
        const response = await TrezorConnect.firmwareUpload(params);
        if (response.success) {
            dispatch({
                type: CONNECT.FIRMWARE_UPLOAD,
                isSuccess: true,
                response,
            });
        } else {
            dispatch({
                type: CONNECT.FIRMWARE_UPLOAD,
                errorMessage: response.error,
            });
        }
    } catch (err) {
        dispatch({
            type: CONNECT.FIRMWARE_UPLOAD,
            isError: true,
        });
    }
    dispatch({
        type: CONNECT.FIRMWARE_UPLOAD,
        isProgress: false,
    });
};


export {
    firmwareErase,
    firmwareUpload,
};