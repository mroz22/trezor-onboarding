import Button from 'components/button';
import ProgressSteps from 'components/progress-steps';
import { types } from 'config/state';
import React from 'react';
import styled from 'styled-components';
import BackupStep from './steps/BackupStep';
import BookmarkStep from './steps/BookmarkStep';
import BridgeStep from './steps/BridgeStep';
import FinalStep from './steps/FinalStep';
import FirmwareStep from './steps/FirmwareStep';
import HologramStep from './steps/HologramStep/HologramStep';
import NewsletterStep from './steps/NewsletterStep';
import SelectDeviceStep from './steps/SelectDeviceStep';
import SetPinStep from './steps/SetPinStep';
import StartStep from './steps/StartStep';
import WelcomeStep from './steps/WelcomeStep';

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
`;

const ControlsWrapper = styled.div`
    grid-area: controls;
    display: flex;
    justify-content: space-around;
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
            steps: [{
                name: 'Welcome',
                component: WelcomeStep,
                showProgressSteps: false,
                showControls: false,
            }, {
                name: 'Select device',
                component: SelectDeviceStep,
                dot: 'Select device',
                showProgressSteps: true,
                showControls: false,
            }, {
                name: 'Unboxing',
                component: HologramStep,
                dot: 'Unboxing',
                showProgressSteps: true,
                showControls: true,
            }, {
                name: 'Bridge',
                component: BridgeStep,
                dot: 'Bridge',
                showProgressSteps: true,
                showControls: true,
                nextDisabled: state => state.device === null,
            }, {
                name: 'Firmware',
                component: FirmwareStep,
                dot: 'Firmware',
                showProgressSteps: true,
                showControls: true,
            }, {
                name: 'Start',
                component: StartStep,
                dot: 'Start',
                showProgressSteps: true,
                showControls: true,
            }, {
                name: 'Backup',
                component: BackupStep,
                dot: 'Security',
                showProgressSteps: true,
                showControls: true,
            }, {
                name: 'Pin',
                component: SetPinStep,
                dot: 'Security',
                showProgressSteps: true,
                showControls: true,
            }, {
                name: 'Bookmark',
                component: BookmarkStep,
                dot: 'Security',
                showProgressSteps: true,
                showControls: true,
            }, {
                name: 'Newsletter',
                component: NewsletterStep,
                dot: 'Security',
                showProgressSteps: true,
                showControls: true,
            }, {
                name: 'Final',
                component: FinalStep,
                showProgressSteps: false,
                showControls: false,
            }],
        };
    }

    getCurrentStep = () => this.state.steps[this.props.state.activeStep]

    render() {
        const StepTag = this.getCurrentStep().component;
        const { activeStep } = this.props.state;
        const { steps } = this.state;
        return (
            <Wrapper>
                <ProgressStepsWrapper>
                    {
                        this.getCurrentStep().showProgressSteps
                        && <ProgressSteps steps={[...new Set(steps.filter(s => s.dot).map(s => s.dot))]} activeStep={steps[activeStep]} dot={steps[activeStep].dot} />
                    }
                </ProgressStepsWrapper>

                <ComponentWrapper>
                    <StepTag state={this.props.state} actions={this.props.actions} />
                </ComponentWrapper>

                {
                    this.getCurrentStep().showControls
                    && (
                        <ControlsWrapper>
                            <Button text="Back" onClick={this.props.actions.previousStep} />
                            <div>Dont know what to do? Read user manual</div>
                            <button
                                type="button"
                                onClick={this.props.actions.nextStep}
                                disabled={this.getCurrentStep().nextDisabled && this.getCurrentStep().nextDisabled(this.props.state)}
                            >Continue
                            </button>
                        </ControlsWrapper>
                    )
                }
            </Wrapper>
        );
    }
}

export default Onboarding;
