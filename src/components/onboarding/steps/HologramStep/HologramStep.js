import React from 'react';

import { types } from 'config/state';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from 'components/onboarding/components/Wrapper';
import Hologram from './Hologram';

const HologramStep = ({ state }) => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper>
            <Heading1>Please make sure the hologram on the box is authentic</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Hologram model={state.selectedModel} />
            <p>My hologram is not the same. Contact our support.</p>
        </StepBodyWrapper>
    </StepWrapper>
);

HologramStep.propTypes = types;


export default HologramStep;