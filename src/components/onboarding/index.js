import React from 'react';
import styled from 'styled-components';
import { types } from 'config/types';
import * as conditions from 'utils/conditions';
import ProgressSteps from 'components/Progress-steps';
import UnexpectedState from 'components/onboarding/UnexpectedState';

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
    static propTypes = {
        state: types.state,
        actions: types.actions,
    };

    getCurrentStep = () => this.props.state.steps[this.props.state.activeStep]

    render() {
        const { activeStep, steps } = this.props.state;
        const reconnectConditionsResults = conditions.resolve(this.props.state, this.getCurrentStep().reconnectConditions);
        const unmetConditions = conditions.filterUnmet(reconnectConditionsResults);

        const Component = this.getCurrentStep().component;

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
                        unmetConditions.length
                            // TODO: its more render condition than reconnect or other condition
                            ? <UnexpectedState caseType={unmetConditions[0].condition} model={this.props.state.selectedModel || '1'} />
                            : <Component state={this.props.state} actions={this.props.actions} />
                    }
                </ComponentWrapper>
            </Wrapper>
        );
    }
}

export default Onboarding;
