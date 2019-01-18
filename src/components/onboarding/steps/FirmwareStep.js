import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

const FirmwareStep = () => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper className="blabla">
            <Heading1>Firmware</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
        bla bla firmware
        </StepBodyWrapper>
    </StepWrapper>
);


export default FirmwareStep;