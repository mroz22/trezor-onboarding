import {
    GO_TO_NEXT_STEP, SELECT_TREZOR_MODEL, ERASE_FIRMWARE, DEVICE_CALL_START, DEVICE_CALL_ERROR, DEVICE_CALL_SUCCESS,
    TOGGLE_DEVICE_INTERACTION,
} from 'actions/constants/onboarding';
import { ID } from 'constants/steps';
import steps from 'components/onboarding/config/steps';

const initialState = {
    device: null,
    selectedModel: null,
    activeStep: ID.WELCOME_STEP,
    error: null,
    backupUnderstood: true,
    deviceInteraction: false,
    transport: null,
    deviceCall: {
        name: null,
        status: null,
        error: null,
        result: null,
    },
};

const findNextStepId = (currentStep) => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex + 1 > steps.length) {
        throw new Error('no next step exists');
    }
    return steps[currentIndex + 1].id;
};

const onboarding = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_NEXT_STEP:
            return {
                ...state,
                activeStep: findNextStepId(state.activeStep),
            };
        case SELECT_TREZOR_MODEL:
            return {
                ...state,
                selectedModel: action.model,
            };
        case TOGGLE_DEVICE_INTERACTION:
            return {
                ...state,
                deviceInteraction: action.value,
            };
        case 'transport-start':
            return {
                ...state,
                transport: action.transport,
            };
        case 'transport-error':
            return {
                ...state,
                transport: action.transport,
            };
        case 'device-connect':
            return {
                ...state,
                device: { connected: true, ...action.device },
            };
        case 'device-changed':
            return {
                ...state,
                device: { connected: true, ...action.device },
            };
        case 'device-disconnect':
            return {
                ...state,
                device: { connected: false, ...action.device },
            };
        // case ERASE_FIRMWARE:
        //     return {
        //         ...state,
        //         // todo:
        //     };
        case DEVICE_CALL_START:
            return {
                ...state,
                deviceCall: {
                    name: action.name, status: 'pending', error: null, result: null,
                },
            };
        case DEVICE_CALL_SUCCESS:
            return {
                ...state,
                deviceCall: {
                    name: action.name, status: 'success', error: null, result: action.result,
                },
            };
        case DEVICE_CALL_ERROR:
            return {
                ...state,
                deviceCall: {
                    name: action.name, status: 'error', error: action.error, result: null,
                },
            };
        default:
            return state;
    }
};

export default onboarding;