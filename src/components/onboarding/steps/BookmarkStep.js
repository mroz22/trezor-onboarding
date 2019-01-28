import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const BookmarkStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Bookmark</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Protect yourself from phishing sites. Attacker might create a fake site and try to trick you into entering your seed in it. Bookmark wallet.trezor.io to always use genuine website.</div>
        </StepBodyWrapper>
    </StepWrapper>
);

export default BookmarkStep;
