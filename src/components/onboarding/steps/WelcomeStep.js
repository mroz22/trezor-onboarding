import React from 'react';

import { types } from 'config/types';

import { Button, H1 } from 'trezor-ui-components';
import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const WelcomeStep = ({ actions, state }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <H1>Thank you for choosing Trezor</H1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Button isDisabled={state.transport.error === null} onClick={actions.nextStep}>Get started (5 minutes)</Button>
        </StepBodyWrapper>
    </StepWrapper>
);

WelcomeStep.propTypes = {
    actions: types.actions,
};

export default WelcomeStep;