import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ProgressStep from './components/ProgressStep';

const Wrapper = styled.div`
    display: flex;  
`;

const isStepFinished = (steps, index, activeStep) => {
    const activeStepIndex = steps.findIndex(s => s === activeStep.dot);
    return activeStepIndex > index;
};

const ProgressSteps = props => (
    <React.Fragment>
        <Wrapper>
            { props.steps.map((step, index) => (
                <React.Fragment key={step}>
                    <ProgressStep
                        step={step}
                        index={index}
                        isActive={props.activeStep.dot === step}
                        isFinished={isStepFinished(props.steps, index, props.activeStep)}
                        isLast={props.steps.length - 1 === index}
                    />
                </React.Fragment>
            ))}
        </Wrapper>
    </React.Fragment>
);

ProgressSteps.propTypes = {
    activeStep: PropTypes.object.isRequired, // todo: better
    dot: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired, // todo: better types string
};

export default ProgressSteps;