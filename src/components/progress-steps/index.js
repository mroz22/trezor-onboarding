import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ProgressStep from './components/ProgressStep';

const Wrapper = styled.div`
    display: flex;  
`;

const isStepFinished = (stepIndex, steps, activeStep) => {
    const activeIndex = steps.findIndex(s => s.name === activeStep);
    return stepIndex < activeIndex;
};

const isStepActive = (stepIndex, steps, activeStep) => steps[stepIndex].dot === activeStep;

const ProgressSteps = props => (
    <React.Fragment>
        <Wrapper>
            { props.steps.map((step, index) => (
                <React.Fragment key={step.name}>
                    <ProgressStep
                        step={step}
                        index={index}
                        isActive={isStepActive(index, props.steps, props.activeStep)}
                        isFinished={isStepFinished(index, props.steps, props.activeStep)}
                        isLast={props.steps.length - 1 === index}
                    />
                </React.Fragment>
            ))}
        </Wrapper>
    </React.Fragment>
);

ProgressSteps.propTypes = {
    activeStep: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired, // todo: better types
};

export default ProgressSteps;