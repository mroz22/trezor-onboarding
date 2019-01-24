import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const SetPinStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>PIN</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Protect device from unauthorized access by using a strong pin.</div>
            {/* <Button text="Start" onClick={actions.nextStep} /> */}
        </StepBodyWrapper>
    </StepWrapper>
);

export default SetPinStep;