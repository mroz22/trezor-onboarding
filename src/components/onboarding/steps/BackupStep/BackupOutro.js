import React from 'react';

import { Heading1 } from 'components/headings';
import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../components/Wrapper';

const BackupOutro = () => (
    <StepWrapper>
        <StepHeadingWrapper />
        <StepBodyWrapper>
            <Heading1>
                    Good job.<br />
                    Backup is now on your recovery seed card. Once again dont lose it and keep it private!
            </Heading1>
        </StepBodyWrapper>
    </StepWrapper>
);

export default BackupOutro;