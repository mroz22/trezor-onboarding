import React from 'react';
import styled from 'styled-components';
import {
    H1, P, Button, Checkbox,
} from 'trezor-ui-components';

import colors from 'config/colors';
import { types } from 'config/types';

import { UnorderedList } from 'components/Lists';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../Wrapper';
import BackupModelOne from './BackupModelOne';

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
    padding: 15px;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

class BackupStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userUnderstands: false,
            status: 'initial',
        };
    }

    render() {
        const { status } = this.state;
        const instructions = [{
            component: <P>Do not upload words on the internet.</P>,
            key: '1',
        }, {
            component: <P>Hide them somewhere safe.</P>,
            key: '2',
        }, {
            component: <P>Your device can be lost or stolen but seed means access to your money.</P>,
            key: '3',
        }];
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Seed is more important than your device</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <BackupStepWrapper>
                        {
                            status === 'initial' && (
                                <React.Fragment>
                                    <P>
                                        Owning cryptocurrencies means having a secret and not sharing it with anyone! Now your device will
                                        tell you the secret. This will happen only once. Write it down and keep it safe. Never tell anyone!
                                    </P>
                                    <UnorderedList items={instructions} />

                                    <Panel>
                                        <P>
                                            Trezor cannot be held responsible for security liabilities or financial losses resulting from not following these security instructions
                                        </P>
                                    </Panel>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            isChecked={this.state.userUnderstands}
                                            onClick={() => this.setState(prevState => ({ userUnderstands: !prevState.userUnderstands }))}
                                            // onClick={}
                                        />
                                        <P>I have read the instructions and agree</P>
                                    </CheckboxWrapper>

                                    <ControlsWrapper>
                                        <Button
                                            onClick={() => { this.setState({ status: 'started' }); }}
                                            isDisabled={!this.props.state.device || !this.state.userUnderstands}
                                        >
                                            Start backup
                                        </Button>
                                    </ControlsWrapper>
                                </React.Fragment>
                            )
                        }

                        {
                            status === 'started' && <BackupModelOne state={this.props.state} actions={this.props.actions} />
                        }


                    </BackupStepWrapper>

                    {/* <div style={{ color: 'pink' }}>
                        device.features.needs_backup: { `${device.features.needs_backup}`}
                    </div> */}

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