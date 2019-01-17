import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'config/colors';

import ProgressStep from './components/ProgressStep';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Line = styled.div`
    flex-grow: 1;
    height: 4px;
    background-color: ${colors.brandPrimary};
    align-self: center;
`;

const isStepFinished = (stepIndex, steps) => {
    const active = steps.findIndex(s => s.active);
    return stepIndex < active;
};

const ProgressSteps = props => (
    <Wrapper>
        { props.steps.map((step, index) => (
            <React.Fragment key={step.name}>
                <ProgressStep
                    step={step}
                    index={index}
                    isActive={props.activeStep === step.name}
                    isFinished={isStepFinished(index, props.steps)}
                />
                {index !== props.steps.length - 1 ? <Line /> : null}
            </React.Fragment>
        ))}
    </Wrapper>
);

ProgressSteps.propTypes = {
    activeStep: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired, // todo: better types
};

export default ProgressSteps;