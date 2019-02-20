import React, { Component } from 'react';
import styled from 'styled-components';
import { types } from 'config/types';
import * as conditions from 'utils/conditions';

import { ID } from 'constants/steps';

import ProgressSteps from 'components/Progress-steps';
import UnexpectedState from 'components/onboarding/UnexpectedState';

import BackupStepIntro from 'components/onboarding/steps/Backup/BackupIntro'; // todo: path convention
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

class Onboarding extends Component {
    static propTypes = {
        state: types.state,
    };

    getCurrentStep = () => this.props.state.steps[this.props.state.activeStep]

    render() {
        const { activeStep } = this.props;
        const { steps } = this.props.state;
        console.log('this.props', this.props);
        // this.props.onboardingActions.goToNextStep('dssfd');
        // const reconnectConditionsResults = conditions.resolve(this.props.state, this.getCurrentStep().reconnectConditions);
        // const unmetConditions = conditions.filterUnmet(reconnectConditionsResults);

        // const Component = this.getCurrentStep().component;

        return (
            <Wrapper>
                <ProgressStepsWrapper>
                    {/* {
                        this.getCurrentStep().showProgressSteps
                        && <ProgressSteps steps={[...new Set(steps.filter(s => s.dot).map(s => s.dot))]} activeStep={steps[activeStep]} dot={steps[activeStep].dot} />
                    } */}
                </ProgressStepsWrapper>

                <ComponentWrapper>
                    {activeStep === ID.WELCOME_STEP && <WelcomeStep />}
                </ComponentWrapper>

            </Wrapper>
        );
    }
}

export default Onboarding;