import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as OnboardingActions from 'actions/onboardingActions';

import Onboarding from './index';

const mapStateToProps = state => ({
    device: state.onboarding.device,
    selectedModel: state.onboarding.selectedModel,
    activeStep: state.onboarding.activeStep,
    error: state.onboarding.error,
    backupUnderstood: state.onboarding.backupUnderstood,
    deviceInteraction: state.onboarding.deviceInteraction,
    transport: state.onboarding.transport,
});

const mapDispatchToProps = dispatch => ({
    onboardingActions: bindActionCreators(OnboardingActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Onboarding);