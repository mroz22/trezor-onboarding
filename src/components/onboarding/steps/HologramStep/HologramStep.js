import React from 'react';
import { P, Link } from 'trezor-ui-components';

import { types } from 'config/types';
import { SUPPORT_URL } from 'config/urls';

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
            <P>My hologram is not the same.</P>
            <Link href={SUPPORT_URL}>Contact our support.</Link>
        </StepBodyWrapper>
    </StepWrapper>
);

HologramStep.propTypes = types;


export default HologramStep;