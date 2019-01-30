import React from 'react';
import styled from 'styled-components';
import colors from 'config/colors';

import { Heading1 } from 'components/headings';
import { Checkbox } from 'components/inputs';
import { UnorderedList } from 'components/lists';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../components/Wrapper';
import BackupProgressStepModelOne from './BackupProgressModelOne';
import BackupProgressModelT from './BackupProgressModelT';

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
    constructor(props) {
        super();
        this.state = {
            started: false,
        };
    }

    startBackup = () => {
        this.setState({
            started: true,
        });
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Seed is more important than your device</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <BackupStepWrapper>
                        {
                            // todo: use only needs_backup, but it it always false even after device-changed event is fired after
                            // backup is finished, might be a connect issue
                            !this.state.started
                            && (
                                <React.Fragment>
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
                                    <Checkbox label="I have read the instructions and agree" name="agreed" value={this.state.backupUnderstood} />
                                    {/* <Button text="Start" onClick={actions.nextStep} /> */}
                                    <button onClick={this.startBackup} disabled={!this.props.state.device}>Start backup</button>
                                </React.Fragment>
                            )
                        }

                        {
                            (this.state.started && this.props.state.device.features.needs_backup && this.props.state.device.features.model === '1')
                            && <BackupProgressStepModelOne actions={this.props.actions} state={this.props.state} />
                        }

                        {
                            (this.state.starteds && this.props.state.device.features.needs_backup && this.props.state.device.features.model == '2')
                            && <BackupProgressModelT />
                        }

                        {
                            this.props.state.device.features.needs_backup === false
                            && (
                                <React.Fragment>
                                    <div>
                                    Excellent, your device is now backed up. Remember to keep your seed card somewhere safe
                                    and never share it with anybody except your device!
                                    </div>
                                </React.Fragment>
                            )

                        }
                        {/* // needs_backup == false */}


                    </BackupStepWrapper>

                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default BackupStep;