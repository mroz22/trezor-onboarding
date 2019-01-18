import React from 'react';

import Button from 'components/button';
import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const WelcomeStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Thank you for choosing Trezor</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Button text="Start" />
        </StepBodyWrapper>
    </StepWrapper>
);

export default WelcomeStep;