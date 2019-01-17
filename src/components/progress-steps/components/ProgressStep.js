import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'config/colors';

import { IconCheck } from 'components/icons';

const ProgressStepWrapper = styled.div`
    flex-direction: row;
`;

const Circle = styled.div` 
    border: 1px solid; 
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.div`
    color: ${colors.brandPrimary};
    position: absolute;
`;

const ProgressStep = (props) => {
    const color = props.isActive ? colors.brandPrimary : colors.gray;
    const backgroundColor = props.isFinished && !props.isActive ? colors.brandPrimary : 'trasparent';
    const borderColor = props.isActive ? colors.brandPrimary : colors.gray;
    return (
        <ProgressStepWrapper>
            <Circle style={{
                borderColor,
                color,
                backgroundColor,
            }}
            >
                { props.isFinished ? <IconCheck style={{ color: colors.white }} /> : props.index + 1}
            </Circle>

            <Text style={{
                color: props.isFinished ? colors.brandPrimary : colors.gray,
            }}
            >{props.step.name}
            </Text>
        </ProgressStepWrapper>
    );
};

ProgressStep.propTypes = {
    isActive: PropTypes.bool,
    isFinished: PropTypes.bool,
    index: PropTypes.number.isRequired,
    step: PropTypes.object, // todo: better validation
};

export default ProgressStep;