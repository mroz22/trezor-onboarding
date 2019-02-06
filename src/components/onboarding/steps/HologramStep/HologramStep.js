import React from 'react';

import { types } from 'config/types';
import { SUPPORT_URL } from 'config/constants';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from 'components/onboarding/components/Wrapper';
import Hologram from './Hologram';

const HologramStep = ({ state }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Please make sure the hologram on the box is authentic</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Hologram model={state.selectedModel} />
            <p>My hologram is not the same. <a href={SUPPORT_URL} rel="noopener noreferrer">Contact our support.</a></p>
        </StepBodyWrapper>
    </StepWrapper>
);

HologramStep.propTypes = types;


export default HologramStep;