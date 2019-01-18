import React from 'react';
import styled from 'styled-components';

import ProgressSteps from 'components/progress-steps';
import Button from 'components/button';

import UnboxingStep from './steps/UnboxingStep';
import SelectDeviceStep from './steps/SelectDeviceStep';
import HologramStep from './steps/HologramStep/HologramStep';
import BridgeStep from './steps/BridgeStep';
import FirmwareStep from './steps/FirmwareStep';
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
    /* border: 1px dashed bisque; */
`;

const ComponentWrapper = styled.div`
    grid-area: main;
    /* border: 1px dotted darkolivegreen */
`;

const ControlsWrapper = styled.div`
    grid-area: controls;
    /* border: 1px dotted dodgerblue */
`;

class Onboarding extends React.Component {
    constructor() {
        super();
        this.state = {
            steps: [{
                name: 'Welcome',
                component: <WelcomeStep />,
                hasDot: false,
                showProgressSteps: false,
            }, {
                name: 'Select device',
                component: <SelectDeviceStep />,
                hasDot: true,
                showProgressSteps: true,
            }, {
                name: 'Unboxing',
                component: <HologramStep />,
                hasDot: true,
                showProgressSteps: true,
            }, {
                name: 'Bridge',
                component: <BridgeStep />,
                hasDot: true,
                showProgressSteps: true,
            }, {
                name: 'Firmware',
                component: <FirmwareStep />,
                hasDot: true,
                showProgressSteps: true,
            }, {
                name: 'Start',
                component: <UnboxingStep />,
                hasDot: true,
                showProgressSteps: true,
            }, {
                name: 'Security',
                component: <UnboxingStep />,
                hasDot: true,
                showProgressSteps: true,
            }],
            activeStep: 'Welcome',
        };
    }

    nextStep = () => {
        const currentIndex = this.state.steps.findIndex(step => step.name === this.state.activeStep);
        // todo: remove circular
        if (currentIndex === this.state.steps.length - 1) {
            this.setState(prevState => ({ activeStep: prevState.steps[0].name }));
        } else {
            this.setState(prevState => ({ activeStep: prevState.steps[currentIndex + 1].name }));
        }
    }

    getCurrentStep = () => this.state.steps.find(s => s.name === this.state.activeStep)

    render() {
        return (
            <Wrapper>
                <ProgressStepsWrapper>
                    {
                        this.getCurrentStep().showProgressSteps && <ProgressSteps steps={this.state.steps.filter(step => step.hasDot)} activeStep={this.state.activeStep} />
                    }
                </ProgressStepsWrapper>

                <ComponentWrapper>
                    {this.getCurrentStep().component}
                </ComponentWrapper>

                <ControlsWrapper>
                    <Button text="Next" onClick={() => this.nextStep()} />
                </ControlsWrapper>
            </Wrapper>
        );
    }
}

export default Onboarding;
