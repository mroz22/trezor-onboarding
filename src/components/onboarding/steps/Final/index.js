import React from 'react';
import { H1, Button } from 'trezor-ui-components';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../Wrapper';

const FinalStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <H1>Good job!</H1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <H1>Now you are as secure, as a regular bank.</H1>
            <Button>Continue to wallet</Button>
        </StepBodyWrapper>
    </StepWrapper>
);

export default FinalStep;
