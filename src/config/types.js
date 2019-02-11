import PropTypes from 'prop-types';

const types = {
    state: PropTypes.exact({
        transport: PropTypes.exact({
            actual: PropTypes.exact({
                type: PropTypes.string,
                version: PropTypes.string,
            }),
            new: PropTypes.exact({
                installers: PropTypes.array,
                version: PropTypes.array,
            }),
            error: PropTypes.object, // todo: better;
        }),
        device: PropTypes.object, // todo: better
        selectedModel: PropTypes.string,
        activeStep: PropTypes.number,
        Connect: PropTypes.object, // todo: better
        error: PropTypes.any, // todo: better
        backupUnderstood: PropTypes.bool,
        deviceInteraction: PropTypes.bool,
    }),

    actions: PropTypes.exact({
        toggleDeviceInteraction: PropTypes.func,
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

export {
    types,
};