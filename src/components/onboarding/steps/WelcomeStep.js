import React from 'react';

import { types } from 'config/state';

import Button from 'components/button';
import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const WelcomeStep = ({ actions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Thank you for choosing Trezor</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Button text="Start" onClick={actions.nextStep} />
        </StepBodyWrapper>
    </StepWrapper>
);

WelcomeStep.propTypes = {
    actions: types.actions,
};

export default WelcomeStep;