import PropTypes from 'prop-types';

const types = {
    state: PropTypes.exact({
        transport: PropTypes.exact({
            toBeUsed: PropTypes.string,
            actual: PropTypes.exact({
                type: PropTypes.string,
                version: PropTypes.string,
            }),
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
    }),
};

const state = {
    transport: {
        toBeUsed: null,
        actual: {
            type: '',
            version: '',
        },
    },
    device: {},
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