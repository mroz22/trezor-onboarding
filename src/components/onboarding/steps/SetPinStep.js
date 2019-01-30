import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const SetPinStep = ({ actions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>PIN</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Protect device from unauthorized access by using a strong pin.</div>
            <button onClick={actions.changePin}>Set pin</button>
            <button onClick={actions.submitNewPin}>Submit new pin</button>

            // wait for trezor-ui-components
        </StepBodyWrapper>
    </StepWrapper>
);

export default SetPinStep;