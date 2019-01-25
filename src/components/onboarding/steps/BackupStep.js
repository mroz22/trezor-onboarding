import React from 'react';
import styled from 'styled-components';
import colors from 'config/colors';

import { Heading1 } from 'components/headings';
import { Checkbox } from 'components/inputs';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const BackupStepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 500px;

`;

const ListItem = styled.li`
    margin-bottom: 14px;
    &:before {
        content: "●";
        padding-right: 7px;
        color: ${colors.grayDark}
    }
`;

const Panel = styled.div`
    background-color: ${colors.grayLight};
    color: ${colors.grayDark};
    padding: 15px 15px 15px 15px;
`;

const BackupStep = ({ state }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Seed is more important than your device</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <BackupStepWrapper>
                <ul>
                    <ListItem>Do not upload words on the internet.</ListItem>
                    <ListItem>Hide them somewhere safe.</ListItem>
                    <ListItem>Your device can be lost or stolen but seed means access to your money.</ListItem>
                </ul>
                <Panel>
            Trezor cannot be held responsible for security liabilities or financial losses resulting from not following these security instructions
                </Panel>
                {/* TODO: checkbox - take it from UI components */}
                <Checkbox label="I have read the instructions and agree" name="agreed" value={state.backupUnderstood} />
                {/* <Button text="Start" onClick={actions.nextStep} /> */}

            </BackupStepWrapper>

        </StepBodyWrapper>
    </StepWrapper>
);

export default BackupStep;