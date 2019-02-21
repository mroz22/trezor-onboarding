import React from 'react';
import Proptypes from 'prop-types';
import { Button, H1 } from 'trezor-ui-components';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../Wrapper';

const WelcomeStep = props => (
    <StepWrapper>
        <StepHeadingWrapper>
            <H1>Thank you for choosing Trezor</H1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            {
                props.transport !== null && (
                    <Button onClick={props.onboardingActions.goToNextStep}>Get started (5 minutes)</Button>
                )
            }
        </StepBodyWrapper>
    </StepWrapper>
);

// WelcomeStep.propTypes = {

// };

export default WelcomeStep;