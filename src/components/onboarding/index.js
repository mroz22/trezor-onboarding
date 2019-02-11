import React from 'react';
import styled from 'styled-components';
import { Flags } from 'trezor-flags';
import { ButtonText, P } from 'trezor-ui-components';
import { types } from 'config/types';
import { USER_MANUAL_URL } from 'config/urls';

import ProgressSteps from 'components/progress-steps';
import Reconnect from './components/Reconnect';

import BackupStepIntro from './steps/BackupStep/BackupIntro';
import BackupModelOne from './steps/BackupStep/BackupModelOne';
import BackupOutro from './steps/BackupStep/BackupOutro';
import BookmarkStep from './steps/BookmarkStep';
import BridgeStep from './steps/BridgeStep';
import FinalStep from './steps/FinalStep';
import FirmwareStep from './steps/FirmwareStep';
import HologramStep from './steps/HologramStep/HologramStep';
import NewsletterStep from './steps/NewsletterStep';
import SelectDeviceStep from './steps/SelectDeviceStep';
import SetPinStep from './steps/Pin/SetPinStep';
import StartStep from './steps/StartStep/index'; // i dont get this..
import WelcomeStep from './steps/WelcomeStep';
import NameStep from './steps/NameStep';
import ConnectStep from './steps/ConnectStep';

import StartStepError from './steps/StartStep/Error';

const Wrapper = styled.div`
    display: grid;
    grid-template-areas: 
        'steps'
        'main'
        'controls';
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

const ControlsWrapper = styled.div`
    grid-area: controls;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0px 50px 50px 50px;
`;

class Onboarding extends React.Component {
    static propTypes = {
        state: types.state,
        actions: types.actions,
    };

    constructor(props) {
        super(props);
        this.state = {
            steps: [
                {
                    name: 'Welcome',
                    component: WelcomeStep,
                    showProgressSteps: false,
                    showControls: false,
                    needsDevice: false,
                }, {
                    name: 'Select device',
                    component: SelectDeviceStep,
                    dot: 'Select device',
                    showProgressSteps: true,
                    showControls: false,
                    needsDevice: false,
                }, {
                    name: 'Unboxing',
                    component: HologramStep,
                    dot: 'Unboxing',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: false,
                    nextDisabled: state => state.transport.actual.type !== 'bridge',
                }, {
                    name: 'Bridge',
                    component: BridgeStep,
                    dot: 'Connect device',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: false,
                }, {
                    name: 'Connect',
                    component: ConnectStep,
                    dot: 'Connect device',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: false,
                    nextDisabled: state => !state.device || !state.device.isFresh(),
                }, {
                    name: 'Firmware',
                    component: FirmwareStep,
                    dot: 'Firmware',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: false, // is handled internally by FirwmareStep component
                    nextDisabled: state => !state.device || state.device.firmware !== 'valid',
                }, {
                    name: 'Start',
                    component: StartStep,
                    error: StartStepError,
                    dot: 'Start',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: true,
                }, {
                    name: 'Backup',
                    component: BackupStepIntro,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: true,
                }, {
                    name: 'Backup model one',
                    component: BackupModelOne,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: false,
                    needsDevice: true,
                }, {
                    name: 'Backup outro',
                    component: BackupOutro,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: true,
                }, {
                    name: 'Pin',
                    component: SetPinStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: true,
                }, {
                    name: 'Name',
                    component: NameStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: true,
                }, {
                    name: 'Bookmark',
                    component: BookmarkStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: true,
                    onNextFn: () => {
                        const flags = Flags.setFlag('hasBookmark', this.props.state.device.features.flags);
                        return this.props.actions.applyFlags(flags);
                    },
                }, {
                    name: 'Newsletter',
                    component: NewsletterStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: true,
                    needsDevice: true,
                    onNextFn: () => {
                        const flags = Flags.setFlag('hasEmail', this.props.state.device.features.flags);
                        return this.props.actions.applyFlags(flags);
                    },
                }, {
                    name: 'Final',
                    component: FinalStep,
                    showProgressSteps: false,
                    showControls: false,
                    needsDevice: false,
                }],
        };
    }

    getCurrentStep = () => this.state.steps[this.props.state.activeStep]

    render() {
        const { activeStep } = this.props.state;
        const { steps } = this.state;

        const shouldDisplayReconnect = this.getCurrentStep().needsDevice && !this.props.state.device;
        const shouldDisplayStepErr = !!this.props.state.error;

        let Component;
        if (shouldDisplayStepErr) {
            Component = this.getCurrentStep().error;
        } else {
            Component = this.getCurrentStep().component;
        }
        return (
            <Wrapper>
                <ProgressStepsWrapper>
                    {
                        this.getCurrentStep().showProgressSteps
                        && <ProgressSteps steps={[...new Set(steps.filter(s => s.dot).map(s => s.dot))]} activeStep={steps[activeStep]} dot={steps[activeStep].dot} />
                    }
                </ProgressStepsWrapper>

                <ComponentWrapper>
                    {
                        shouldDisplayReconnect
                            ? <Reconnect model={this.props.state.selectedModel} />
                            : <Component state={this.props.state} actions={this.props.actions} />
                    }
                </ComponentWrapper>

                <ControlsWrapper>
                    {
                        (this.getCurrentStep().showControls && !this.props.state.deviceInteraction)
                    && (
                        <React.Fragment>
                            <ButtonText onClick={this.props.actions.previousStep}>Back</ButtonText>
                            <P>
                            Dont know what to do? <a href={USER_MANUAL_URL} target="_blank" rel="noopener noreferrer"> Read user manual</a>
                            </P>
                            <ButtonText
                                onClick={
                                    () => {
                                        if (this.getCurrentStep().onNextFn) {
                                            this.getCurrentStep().onNextFn();
                                        }
                                        this.props.actions.nextStep();
                                    }
                                }
                                isDisabled={this.getCurrentStep().nextDisabled && this.getCurrentStep().nextDisabled(this.props.state)}
                            >
                                Continue
                            </ButtonText>
                        </React.Fragment>
                    )
                    }
                </ControlsWrapper>
            </Wrapper>
        );
    }
}

export default Onboarding;
