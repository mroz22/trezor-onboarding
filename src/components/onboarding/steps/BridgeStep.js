import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

const BridgeStep = () => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper className="blabla">
            <Heading1>Install bridge</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
        bla bla bridge
        </StepBodyWrapper>
    </StepWrapper>
);


export default BridgeStep;