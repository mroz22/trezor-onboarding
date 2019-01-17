import React from 'react';
import styled from 'styled-components';

import ProgressSteps from 'components/progress-steps';
import UnboxingStep from './components/UnboxingStep';
import SelectDeviceStep from './components/SelectDeviceStep';

const Wrapper = styled.div`
    display: grid;
    grid-template-areas: 
        'steps'
        'main'
        'controls';
    grid-template-rows: 100px 5fr 1fr;    
    grid-template-columns: 1fr;
`;

const ProgressStepsWrapper = styled.div`
    grid-area: steps;
    border: 1px dashed bisque
`;

const ComponentWrapper = styled.div`
    grid-area: main;
    border: 1px dotted darkolivegreen
`;

const ControlsWrapper = styled.div`
    grid-area: controls;
    border: 1px dotted dodgerblue
`;

class Onboarding extends React.Component {
    constructor() {
        super();
        this.state = {
            steps: [{
                name: 'SelectDevice',
                component: <SelectDeviceStep />,
                hasDot: false,
                showProgressSteps: true,
            }, {
                name: 'Unboxing',
                component: <UnboxingStep />,
                hasDot: true,
                showProgressSteps: true,
            }, {
                name: 'Bridge',
                component: <UnboxingStep />,
                hasDot: true,
                showProgressSteps: true,
            }, {
                name: 'Firmware',
                component: <UnboxingStep />,
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
            activeStep: 'SelectDevice',
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
                        this.getCurrentStep().showProgressSteps && <ProgressSteps steps={this.state.steps} activeStep={this.state.activeStep} />
                    }
                </ProgressStepsWrapper>
                active step: {this.state.activeStep}

                <ComponentWrapper>
                    {this.getCurrentStep().component}
                </ComponentWrapper>

                <ControlsWrapper>
                    <button type="button" onClick={this.nextStep}>Next</button>
                </ControlsWrapper>
                {/* <Button text="Next" fn={() => Onboarding.nextStep()} /> */}
            </Wrapper>
        );
    }
}

export default Onboarding;
