import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../components/Wrapper';

const NewsleterStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Stay in touch</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Receive information on important security updates</div>
        </StepBodyWrapper>
    </StepWrapper>
);

export default NewsleterStep;