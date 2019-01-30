import React from 'react';
import { Heading1 } from 'components/headings';
import Progress from 'components/loaders';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

class FirmwareStep extends React.Component {
    constructor() {
        super();
        this.state = {
            progress: 0,
            status: 'initial',
        };
    }

    componentDidMount() {
        const { Connect } = this.props.state;
        Connect.default.on(Connect.DEVICE_EVENT, (event) => {
            console.log('event after reconnect', event);
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
            uploading: 80,
            reconnect: 90,
            finished: 100,
        };
        const interval = setInterval(() => {
            if (this.state.progress >= tresholds[this.state.status]) {
                if (this.state.status === 'finished') {
                    clearInterval(interval);
                }
                return;
            }
            progressFn();
        }, 150);

        const firmware = await this.download();
        // imitate wait of download
        setTimeout(async () => {
            this.setState({ status: 'erasing' });
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
                    <Heading1>Firmware</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        !connectedDevice && <div>No device connected</div>
                    }
                    {
                        connectedDevice ? this.state.progress === 0 && connectedDevice.firmware === 'outdated' && (
                            <React.Fragment>
                                <div>Your device is shipped without firmware. Its time to install it.</div>
                                <button type="button" onClick={this.install}>Install</button>
                            </React.Fragment>
                        ) : null
                    }

                    {
                        connectedDevice ? connectedDevice.firmware === 'valid'
                        && (<div>Perfect. The newest firwmare is installed. Time to continue</div>) : null
                    }

                    <Progress progress={this.state.progress} radius={60} stroke={20} />
                    status: { this.state.status }


                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}


export default FirmwareStep;