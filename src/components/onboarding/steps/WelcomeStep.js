import React from 'react';

import { types } from 'config/types';

import Button from 'components/button';
import { Heading1 } from 'components/headings';

// import { ButtonText } from 'trezor-ui-components';
import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const WelcomeStep = ({ actions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Thank you for choosing Trezor</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Button text="Get started (7 minutes)" onClick={actions.nextStep} />
            {/* <ButtonText>bla bla</ButtonText> */}
        </StepBodyWrapper>

    </StepWrapper>
);

WelcomeStep.propTypes = {
    actions: types.actions,
};

export default WelcomeStep;