import * as FIRMWARE_UPDATE from 'actions/constants/firmwareUpdate';
import * as ONBOARDING from 'actions/constants/onboarding';

import arrayBufferToBuffer from 'utils/arrayBufferToBuffer';

import { getFirmware } from './fetchActions';
import { firmwareErase, firmwareUpload } from './connectActions';

const setProgress = progress => ({
    type: FIRMWARE_UPDATE.SET_PROGRESS,
    progress,
});

const updateFirmware = () => async (dispatch, getState) => {
    const model = getState().connect.device.features.major_version;
    const versions = {
        1: 'trezor-1.8.0.bin',
        2: 'trezor-2.1.0.bin',
    };
    const { device } = getState().connect;
    let fw;

    dispatch({
        type: FIRMWARE_UPDATE.SET_PROGRESS,
        progress: 0,
    });

    const progressFn = () => {
        dispatch({
            type: FIRMWARE_UPDATE.SET_PROGRESS,
            progress: getState().firmwareUpdate.progress + 1,
        });
    };
    let maxProgress = 0;
    console.warn(getState());
    const interval = setInterval(() => {
        if (getState().connect.deviceCall.error || getState().fetch.error) {
            dispatch({
                type: FIRMWARE_UPDATE.SET_PROGRESS,
                progress: 100,
            });
            clearInterval(interval);
            return;
        }
        if (getState().firmwareUpdate.progress === 100) {
            clearInterval(interval);
        }
        if (getState().firmwareUpdate.progress < maxProgress) {
            progressFn();
        }
    }, device.features.major_version === 1 ? 170 : 561);

    try {
        // todo [stick]: use special updating firware
        maxProgress = 10;
        dispatch(getFirmware(`/${model}/${versions[model]}`)).then(async (response) => {
            if (!response.ok) {
                return;
            }
            maxProgress = 40;
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
                        const payload = {
                            payload: fw,
                            keepSession: false,
                            skipFinalReload: true,
                        };
                        if (callResponse.offset) {
                            payload.offset = callResponse.offset;
                        }
                        if (callResponse.length) {
                            payload.length = callResponse.lenght;
                        }
                        maxProgress = 99;
                        dispatch(firmwareUpload(payload)).then(() => {
                            maxProgress = 100;
                        });
                    }
                });
        });
    } catch (err) {
        dispatch({
            type: ONBOARDING.SET_APPLICATION_ERROR,
            err,
        });
    }
};

export {
    setProgress,
    updateFirmware,
};