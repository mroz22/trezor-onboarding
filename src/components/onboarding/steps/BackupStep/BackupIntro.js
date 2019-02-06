import React from 'react';
import styled from 'styled-components';

import colors from 'config/colors';
import { types } from 'config/types';

import { Heading1 } from 'components/headings';
import { Checkbox } from 'components/inputs';
import { UnorderedList } from 'components/lists';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../components/Wrapper';

const BackupStepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 500px;
`;

const Panel = styled.div`
    background-color: ${colors.grayLight};
    color: ${colors.grayDark};
    padding: 15px 15px 15px 15px;
`;

class BackupStep extends React.Component {
    render() {
        const { device } = this.props.state;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Seed is more important than your device</Heading1>

                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <BackupStepWrapper>
                        <div>
                            Owning cryptocurrencies means having a secret and not sharing it with anyone! Now your device will
                            tell you the secret. This will happen only once. Write it down and keep it safe. Never tell anyone!
                        </div>
                        <UnorderedList items={[
                            'Do not upload words on the internet.',
                            'Hide them somewhere safe.',
                            'Your device can be lost or stolen but seed means access to your money.',
                        ]}
                        />

                        <Panel>
                            Trezor cannot be held responsible for security liabilities or financial losses resulting from not following these security instructions
                        </Panel>
                        {/* TODO: checkbox - take it from UI components */}
                        <Checkbox label="I have read the instructions and agree" name="agreed" value={false} />
                        {/* <Button text="Start" onClick={actions.nextStep} /> */}
                        <button
                            type="button"
                            onClick={this.startBackup}
                            disabled={!this.props.state.device}
                        >
                            Start backup
                        </button>
                    </BackupStepWrapper>

                    <div style={{ color: 'pink' }}>
                        device.features.needs_backup: { `${device.features.needs_backup}`}
                    </div>

                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

BackupStep.propTypes = {
    actions: types.actions,
    state: types.state,
};

export default BackupStep;