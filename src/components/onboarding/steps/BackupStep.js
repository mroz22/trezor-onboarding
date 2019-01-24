import React from 'react';
import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';


const BackupStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Seed is more important than your device</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <ul>
                <li>Do not upload words on the internet.</li>
                <li>Hide them somewhere safe.</li>
                <li>Your device can be lost or stolen but seed means access to your money.</li>
            </ul>
            <div>Trezor cannot be held responsible for security liabilities or financial losses resulting from not following these security instructions </div>
            {/* <Button text="Start" onClick={actions.nextStep} /> */}
        </StepBodyWrapper>
    </StepWrapper>
);

export default BackupStep;