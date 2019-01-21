import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'config/colors';
import { IconCheck } from 'components/icons';

import Line from './Line';

const ProgressStepWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & :nth-child(4) {
        flex-basis: 100%;
        text-align: center;
    }
    flex-grow: 1;
`;

const Circle = styled.div` 
    border: 1.2px solid; 
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.div`
    color: ${colors.brandPrimary};
`;

const ProgressStep = (props) => {
    const color = props.isActive ? colors.brandPrimary : colors.gray;
    const backgroundColor = props.isFinished && !props.isActive ? colors.brandPrimary : 'trasparent';
    const borderColor = props.isActive || props.isFinished ? colors.brandPrimary : colors.gray;
    return (
        <ProgressStepWrapper>
            <Line style={{
                backgroundColor: ((!props.isFinished && !props.isActive) || props.index === 0) ? colors.gray : colors.brandPrimary,
                visibility: props.index === 0 ? 'hidden' : 'visible',
            }}
            />
            <Circle style={{
                borderColor,
                color,
                backgroundColor,
            }}
            >
                { props.isFinished ? <IconCheck style={{ color: colors.white }} /> : props.index + 1}
            </Circle>
            <Line style={{
                backgroundColor: props.isFinished ? colors.brandPrimary : colors.gray,
                visibility: props.isLast ? 'hidden' : 'visible',
            }}
            />

            <Text style={{
                color: props.isFinished || props.isActive ? colors.brandPrimary : colors.gray,
            }}
            >{props.step}
            </Text>
        </ProgressStepWrapper>
    );
};

ProgressStep.propTypes = {
    isActive: PropTypes.bool,
    isFinished: PropTypes.bool,
    isLast: PropTypes.bool,
    index: PropTypes.number.isRequired,
    step: PropTypes.string,
};

export default ProgressStep;