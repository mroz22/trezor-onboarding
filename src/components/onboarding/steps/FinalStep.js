import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const FinalStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Good job!</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Now you are as secure, as a regular bank.</div>
            <button type="button">Continue to wallet</button>
        </StepBodyWrapper>
    </StepWrapper>
);

export default FinalStep;
