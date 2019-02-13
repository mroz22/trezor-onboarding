import React from 'react';
import styled from 'styled-components';

import {
    H1, ButtonText,
} from 'trezor-ui-components';

import { types } from 'config/types';
// import { SUPPORT_URL } from 'config/urls';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from 'components/onboarding/components/Wrapper';
import Hologram from './Hologram';

const HologramStep = ({ state, actions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <H1>Please make sure the hologram on the box is authentic</H1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Hologram model={state.selectedModel} />
            <ControlsWrapper>
                <ButtonText onClick={actions.nextStep}>My hologram is OK</ButtonText>
                <ButtonText isWhite>My hologram looks different</ButtonText>
            </ControlsWrapper>
        </StepBodyWrapper>
    </StepWrapper>
);

HologramStep.propTypes = types;


export default HologramStep;