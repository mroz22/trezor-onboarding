import React from 'react';
import { P, H1, ButtonText } from 'trezor-ui-components';

import { types } from 'config/types';
import { DONUT_STROKE, DONUT_RADIUS } from 'config/constants';

import { Donut } from 'components/loaders';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../components/Wrapper';

// todo: handle case when already has firmware, but it is outdated
class FirmwareStep extends React.Component {
    constructor({ state }) {
        super();
        this.state = {
            progress: state.device.firmware === 'outdated' ? 0 : 100,
            status: state.device.firmware === 'outdated' ? 'initial' : 'finished',
        };
    }

    componentDidMount() {
        const { Connect } = this.props.state;
        Connect.default.on(Connect.DEVICE_EVENT, (event) => {
            // todo: what if different device connected?
            if (event.type === 'device-changed' && this.state.status === 'reconnect') {
                this.setState({ status: 'finished' });
            // not sure about this
            }
        });
    }

    download = async () => {
        this.setState({ status: 'downloading' });
        const response = await fetch('src/trezor-1.7.3.bin');
        return response.arrayBuffer();
    }

    install = async () => {
        const progressFn = () => {
            this.setState(prevState => ({ progress: prevState.progress + 1 }));
        };
        const tresholds = {
            downloading: 10,
            erasing: 40,
            uploading: 100,
        };
        const interval = setInterval(() => {
            if (this.state.progress >= tresholds[this.state.status] || this.state.progress >= 100) {
                if (this.state.status === 'finished') {
                    clearInterval(interval);
                }
                return;
            }
            progressFn();
        }, 170);

        const firmware = await this.download();
        // imitate wait of download
        setTimeout(async () => {
            this.setState({ status: 'preparing' });
            await this.props.actions.firmwareErase();
            this.setState({ status: 'uploading' });
            await this.props.actions.firmwareUpload({ payload: firmware });
            this.setState({ status: 'reconnect' });
        }, 4000);
    }

    render() {
        const connectedDevice = this.props.state.device;

        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Get the latest firmware</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.state.progress === 0 && connectedDevice.firmware === 'outdated' && (
                            <React.Fragment>
                                <P>Device is shipped without firmware. Time to install it.</P>
                                <ButtonText onClick={this.install}>Install</ButtonText>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status !== 'finished' && this.state.progress > 0 && (
                            <React.Fragment>
                                <Donut progress={this.state.progress} radius={DONUT_RADIUS} stroke={DONUT_STROKE} />
                                { connectedDevice && this.state.status === 'reconnect' && <H1>Disconnect your device now</H1> }
                                { !connectedDevice && this.state.status === 'reconnect' && <H1>And connect it again</H1> }
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'finished' && connectedDevice.firmware === 'valid'
                        && (
                            <React.Fragment>
                                <H1>
                                    Perfect. The newest firwmare is installed. Time to continue
                                </H1>
                                <ControlsWrapper>
                                    <ButtonText onClick={this.props.actions.nextStep}>Continue</ButtonText>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }


                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

FirmwareStep.propTypes = {
    actions: types.actions,
    state: types.state,
};


export default FirmwareStep;