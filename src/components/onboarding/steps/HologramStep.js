import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

const HologramStep = () => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper className="blabla">
            <Heading1>Check hologram</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
        is it intact?
        </StepBodyWrapper>
    </StepWrapper>
);


export default HologramStep;