import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'config/colors';

const ProgressStepWrapper = styled.div`
    flex-direction: row;
`;

const Circle = styled.div` 
    border: 2px solid ${colors.brandPrimary}; 
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.brandPrimary};
`;

const Text = styled.div`
    color: ${colors.brandPrimary};
    position: absolute;
`;

const ProgressStep = props => (
    <ProgressStepWrapper style={{
        backgroundColor: props.isActive ? 'red' : 'blue',
    }}
    >
        {
            props.isFinished
                ? <div>finished</div>
                : <Circle>{props.index + 1}</Circle>
        }
        <Text>{props.step.name}</Text>
    </ProgressStepWrapper>
);

ProgressStep.propTypes = {
    isActive: PropTypes.bool,
    isFinished: PropTypes.bool,
    index: PropTypes.number.isRequired,
    step: PropTypes.object, // todo: better validation
};

export default ProgressStep;