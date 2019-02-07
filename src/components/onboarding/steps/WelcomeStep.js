import React from 'react';

import { types } from 'config/types';

import { Heading1 } from 'components/headings';

import { ButtonText, P, H1 } from 'trezor-ui-components';
import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const WelcomeStep = ({ actions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Thank you for choosing Trezor</Heading1>
            <H1>Heading 1</H1>
            <P>Paragraph</P>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <ButtonText onClick={actions.nextStep}>Get started (7 minutes)</ButtonText>
        </StepBodyWrapper>
    </StepWrapper>
);

WelcomeStep.propTypes = {
    actions: types.actions,
};

export default WelcomeStep;