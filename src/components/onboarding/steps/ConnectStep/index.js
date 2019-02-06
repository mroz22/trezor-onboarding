import React from 'react';

import { types } from 'config/types';

import { Heading1 } from 'components/headings';
import { TrezorConnect } from 'components/prompts';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../components/Wrapper';

const ConnectStep = ({ state }) => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper>
            <Heading1>Time to connect your device</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <TrezorConnect model={state.selectedModel} />
            <div>Just make sure its well connected to avoid communication failures</div>
        </StepBodyWrapper>
    </StepWrapper>
);

ConnectStep.propTypes = {
    state: types.state,
};

export default ConnectStep;