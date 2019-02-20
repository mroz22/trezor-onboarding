import * as ONBOARDING from 'actions/constants/onboarding';

export const goToNextStep = nextStep => ({
    type: ONBOARDING.GO_TO_NEXT_STEP,
    nextStep,
});
