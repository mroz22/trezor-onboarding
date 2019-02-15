import React from 'react';
import styled from 'styled-components';
import { ButtonText, P, Link } from 'trezor-ui-components';
import { types } from 'config/types';
import { USER_MANUAL_URL } from 'config/urls';

import ProgressSteps from 'components/progress-steps';
import Reconnect from 'components/onboarding/Reconnect';

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

    getCurrentStep = () => this.props.state.steps[this.props.state.activeStep]

    render() {
        const { activeStep, steps } = this.props.state;

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
                            Dont know what to do? <Link href={USER_MANUAL_URL}> Read user manual</Link>
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
