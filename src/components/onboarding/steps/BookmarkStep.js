import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const BookmarkStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Bookmark</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Protect yourself from phishing sites.</div>
        </StepBodyWrapper>
    </StepWrapper>
);

export default BookmarkStep;
