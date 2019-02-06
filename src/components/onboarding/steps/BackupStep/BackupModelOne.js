import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../components/Wrapper';

import NthWord from './NthWord';

const Wrapper = styled.div`
    margin-left: 55px;
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

    componentDidMount() {
        setTimeout(() => {
            this.startBackup();
        }, 5000);
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
        const response = await this.props.actions.startBackup();
        if (response.success) {

        } else {
            //todo: //
        }
        Connect.default.off(Connect.DEVICE_EVENT, onStartBackupHandler);
        this.props.actions.nextStep();
    }

    render() {
        if (this.state.status === 'initial') {
            return (
                <StepWrapper>
                    <StepHeadingWrapper />
                    <StepBodyWrapper>
                        <Heading1>
                    Now your device is going to show you 24 words to backup your wallet. Write them down.
                        </Heading1>
                    </StepBodyWrapper>
                </StepWrapper>

            );
        }
        if (this.state.checkingWords) {
            return (
                <StepWrapper>
                    <StepHeadingWrapper />
                    <Wrapper>
                    Check <br />
                        <NthWord number={this.state.nthWord - 24} /> <br />
                    </Wrapper>
                </StepWrapper>
            );
        }
        return (
            <StepWrapper>
                <StepHeadingWrapper />
                <Wrapper>
                Write down <br />
                    <NthWord number={this.state.nthWord} /> <br />
                From your device to your recovery seed card.
                </Wrapper>
            </StepWrapper>
        );
    }
}

BackupProgressModelOne.propTypes = {
    checkingWords: PropTypes.bool,
    nthWord: PropTypes.number, // todo: validation 1 - 24
};

export default BackupProgressModelOne;
