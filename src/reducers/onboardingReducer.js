import { GO_TO_NEXT_STEP } from 'actions/constants/onboarding';

const initialState = {
    device: null,
    selectedModel: null,
    activeStep: 'welcome',
    error: null,
    backupUnderstood: true,
    deviceInteraction: false,
};

const onboarding = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_NEXT_STEP:
            return {
                ...state,
                activeStep: action.nextStep,
            };
        default:
            return state;
    }
};

export default onboarding;