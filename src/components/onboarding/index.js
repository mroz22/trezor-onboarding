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
    constructor(props) {
        super(props);
        this.state = {
            steps: [{
                name: 'Welcome',
                component: <WelcomeStep />,
                showProgressSteps: false,
            }, {
                name: 'Select device',
                component: <SelectDeviceStep />,
                dot: 'Select device',
                showProgressSteps: true,
            }, {
                name: 'Unboxing',
                component: <HologramStep />,
                dot: 'Unboxing',
                showProgressSteps: true,
            }, {
                name: 'Bridge',
                component: <BridgeStep state={props.state} />,
                dot: 'Bridge',
                showProgressSteps: true,
            }, {
                name: 'Firmware',
                component: <FirmwareStep />,
                dot: 'Firmware',
                showProgressSteps: true,
            }, {
                name: 'Start',
                component: <UnboxingStep />,
                dot: 'Start',
                showProgressSteps: true,
            }, {
                name: 'Security',
                component: <UnboxingStep />,
                dot: 'Security',
                showProgressSteps: true,
            }, {
                name: 'Backup',
                component: <div>Backup</div>,
                dot: 'Security',
                showProgressSteps: true,
            }, {
                name: 'Pin',
                component: <div>PIN</div>,
                dot: 'Security',
                showProgressSteps: true,
            }, {
                name: 'Bookmark',
                component: <div>Bookmark</div>,
                dot: 'Security',
                showProgressSteps: true,
            }, {
                name: 'Newsletter',
                component: <div>Newsletter</div>,
                dot: 'Security',
                showProgressSteps: true,
            }],
            activeStep: 'Select device',
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
                        this.getCurrentStep().showProgressSteps
                        && <ProgressSteps steps={[...new Set(this.state.steps.filter(s => s.dot).map(s => s.dot))]} activeStep={this.state.steps.find(s => s.name === this.state.activeStep).dot} />
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
