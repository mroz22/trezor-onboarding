import PropTypes from 'prop-types';

const types = {
    state: PropTypes.exact({
        transport: PropTypes.exact({
            actual: PropTypes.exact({
                type: PropTypes.string,
                version: PropTypes.string,
            }),
            error: PropTypes.object, // todo: better;
        }),
        device: PropTypes.object, // todo: better
        selectedModel: PropTypes.number,
        activeStep: PropTypes.number,
        Connect: PropTypes.object, // todo: better
        error: PropTypes.any, // todo: better
        backupUnderstood: PropTypes.bool,
        usbAvailable: PropTypes.bool,
    }),

    actions: PropTypes.exact({
        selectedModel: PropTypes.func,
        nextStep: PropTypes.func,
        previousStep: PropTypes.func,
        resetDevice: PropTypes.func,
        handleError: PropTypes.func,
        applyFlags: PropTypes.func,
        applySettings: PropTypes.func,
        startBackup: PropTypes.func,
        changePin: PropTypes.func,
        submitNewPin: PropTypes.func,
        initConnect: PropTypes.func,
        firmwareErase: PropTypes.func,
        firmwareUpload: PropTypes.func,
    }),
};

const state = {
    transport: {
        actual: {
            type: '',
            version: '',
        },
        error: null,
    },
    device: null,
    selectedModel: null,
    activeStep: 0,
    Connect: null,
    error: null,
    backupUnderstood: true,
    usbAvailable: !!navigator.usb,
};

export {
    types,
    state,
};