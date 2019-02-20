import React from 'react';
import styled from 'styled-components';
import { H1, Button } from 'trezor-ui-components';
import { types } from 'config/types';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../Wrapper';

import NthWord from './NthWord';

const Wrapper = styled.div`
    font-size: xx-large;
`;

class BackupProgressModelOne extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'initial',
            nthWord: 0,
            checkingWords: false,
        };
    }

    startBackup = async () => {
        const { Connect } = this.props.state;

        this.setState({
            status: 'started',
        });
        const onStartBackupHandler = (event) => {
            if (event.type === 'button' && event.payload.code === 'ButtonRequest_ConfirmWord') {
                this.setState(prevState => ({ nthWord: prevState.nthWord + 1 }));
                this.setState(prevState => ({ checkingWords: (prevState.nthWord - 24) > 0 }));
            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onStartBackupHandler);
        await this.props.actions.startBackup();
        // const response =
        // if (response.success) {

        // } else {
        //     //todo: //
        // }
        Connect.default.off(Connect.DEVICE_EVENT, onStartBackupHandler);
        this.setState({ status: 'finished' });
    }

    render() {
        const { status, checkingWords } = this.state;
        return (
            <StepWrapper>
                <StepHeadingWrapper />
                <StepBodyWrapper>
                    {
                        status === 'initial' && (
                            <React.Fragment>
                                <H1>
                                Now your device is going to show you 24 words to backup your wallet. Write them down.
                                </H1>
                                <ControlsWrapper>
                                    <Button onClick={this.startBackup}>Okey</Button>
                                </ControlsWrapper>
                            </React.Fragment>

                        )
                    }

                    {
                        checkingWords && status === 'started' && (
                            <Wrapper>
                            Check <br />
                                <NthWord number={this.state.nthWord - 24} /> <br />
                            </Wrapper>
                        )
                    }

                    {
                        !this.state.checkingWords && status === 'started' && this.state.nthWord > 0 && (
                            <Wrapper>
                                Write down <br />
                                <NthWord number={this.state.nthWord} /> <br />
                                From your device to your recovery seed card.
                            </Wrapper>
                        )
                    }

                    {
                        this.state.status === 'finished' && (
                            <React.Fragment>
                                <H1>
                                Good job.<br />
                                Backup is now on your recovery seed card. Once again dont lose it and keep it private!
                                </H1>
                                <ControlsWrapper>
                                    <Button onClick={this.props.actions.nextStep}>My recovery card is safe</Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

BackupProgressModelOne.propTypes = {
    actions: types.actions,
    state: types.state,
};

export default BackupProgressModelOne;
