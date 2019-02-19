import React from 'react';
import { Button, H1 } from 'trezor-ui-components';

import { types } from 'config/types';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../Wrapper';

const WelcomeStep = ({ actions, state }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <H1>Thank you for choosing Trezor</H1>
        </StepHeadingWrapper>
        <StepBodyWrapper>           
            {
                state.transport.error === false && (
                    <Button onClick={actions.nextStep}>Get started (5 minutes)</Button>
                )
            }
        </StepBodyWrapper>
    </StepWrapper>
);

WelcomeStep.propTypes = types;

export default WelcomeStep;