import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';

import { ID } from 'constants/steps';

import ProgressSteps from 'components/Progress-steps';
import UnexpectedState from 'components/onboarding/UnexpectedState';

import BackupStep from 'components/onboarding/steps/Backup'; // todo: path convention
import BookmarkStep from 'components/onboarding/steps/Bookmark';
import BridgeStep from 'components/onboarding/steps/Bridge';
import FinalStep from 'components/onboarding/steps/Final';
import FirmwareStep from 'components/onboarding/steps/Firmware';
import HologramStep from 'components/onboarding/steps/Hologram';
import NewsletterStep from 'components/onboarding/steps/Newsletter';
import SelectDeviceStep from 'components/onboarding/steps/SelectDevice';
import SetPinStep from 'components/onboarding/steps/Pin';
import StartStep from 'components/onboarding/steps/Start';
import WelcomeStep from 'components/onboarding/steps/Welcome';
import NameStep from 'components/onboarding/steps/Name';
import ConnectStep from 'components/onboarding/steps/Connect';

import steps from './config/steps';

const Wrapper = styled.div`
    display: grid;
    grid-template-areas: 
        'steps'
        'main';
    grid-template-rows: 1fr 80vh 1fr;    
    grid-template-columns: 1fr;
`;

const ProgressStepsWrapper = styled.div`
    grid-area: steps;
`;

const ComponentWrapper = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
`;

class Onboarding extends React.Component {
    componentWillMount() {
        this.props.onboardingActions.init();
    }

    render() {
        const {
            onboardingActions, selectedModel, transport, activeStep, device, deviceInteraction,
        } = this.props;

        return (
            <Wrapper>
                <ProgressStepsWrapper>
                    <ProgressSteps
                        steps={[...new Set(steps.filter(s => s.title).map(s => s.title))]}
                        activeStep={steps.find(step => step.id === activeStep)}
                    />
                </ProgressStepsWrapper>

                <ComponentWrapper>
                    {activeStep === ID.WELCOME_STEP && (
                        <WelcomeStep
                            onboardingActions={onboardingActions}
                            transport={transport}
                        />
                    )}
                    {activeStep === ID.SELECT_DEVICE_STEP && (
                        <SelectDeviceStep
                            onboardingActions={onboardingActions}
                        />
                    )}
                    {activeStep === ID.UNBOXING_STEP && (
                        <HologramStep
                            onboardingActions={onboardingActions}
                            model={selectedModel}
                        />
                    )}
                    {activeStep === ID.BRIDGE_STEP && (
                        <BridgeStep
                            onboardingActions={onboardingActions}
                            transport={transport}
                        />
                    )}
                    {activeStep === ID.CONNECT_STEP && (
                        <ConnectStep
                            onboardingActions={onboardingActions}
                            model={selectedModel}
                            device={device}
                        />
                    )}
                    {activeStep === ID.FIRMWARE_STEP && (
                        <FirmwareStep
                            onboardingActions={onboardingActions}
                            device={device}
                        />
                    )}
                    {activeStep === ID.START_STEP && (
                        <StartStep
                            onboardingActions={onboardingActions}
                            device={device}
                            deviceInteraction={deviceInteraction}
                        />
                    )}
                    {activeStep === ID.BACKUP_STEP && (
                        <BackupStep
                            onboardingActions={onboardingActions}
                            device={device}
                        />
                    )}
                    {activeStep === ID.SET_PIN_STEP && (
                        <SetPinStep
                            onboardingActions={onboardingActions}
                        />
                    )}
                    {activeStep === ID.NAME_STEP && (
                        <NameStep
                            onboardingActions={onboardingActions}
                        />
                    )}
                    {activeStep === ID.NEWSLETTER_STEP && (
                        <NewsletterStep
                            onboardingActions={onboardingActions}
                        />
                    )}
                    {activeStep === ID.BOOKMARK_STEP && (
                        <BookmarkStep
                            onboardingActions={onboardingActions}
                        />
                    )}
                    {activeStep === ID.FINAL_STEP && (
                        <FinalStep
                            onboardingActions={onboardingActions}
                        />
                    )}
                </ComponentWrapper>
            </Wrapper>
        );
    }
}

Onboarding.propTypes = {
    // state: types.state,
    activeStep: Proptypes.string.isRequired,
};

export default Onboarding;