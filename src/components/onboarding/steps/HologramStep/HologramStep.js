import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from 'components/onboarding/components/Wrapper';
import Hologram from './Hologram';

const HologramStep = () => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper className="blabla">
            <Heading1>Check hologram</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Hologram model={2} />
        </StepBodyWrapper>
    </StepWrapper>
);


export default HologramStep;