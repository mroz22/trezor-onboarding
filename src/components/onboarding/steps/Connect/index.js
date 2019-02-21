import React from 'react';
import ReactTimeout from 'react-timeout';
import {
    P, H1, H2, Button,
} from 'trezor-ui-components';

import { types } from 'config/types';
import { TrezorConnect } from 'components/Prompts';
import { Dots } from 'components/Loaders';
import { UnorderedList } from 'components/Lists';
import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../Wrapper';

class ConnectStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'connect',
            searchingTooLong: false,
        };
    }

    componentDidMount() {
        this.props.setTimeout(() => {
            this.searchForDevice();
        }, 1000);
    }

    searchForDevice() {
        this.setState({
            status: 'searching',
        });

        if (this.props.device && this.props.device.connected) {
            return this.setState({
                searchingTooLong: false,
            });
        }
        this.props.setTimeout(() => {
            this.setState({ searchingTooLong: true });
        }, 1000 * 15);
    }

    render() {
        const deviceIsConnected = Boolean(this.props.device && this.props.device.connected);
        const device = this.props.device;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Time to connect your device {`${deviceIsConnected}`}</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <TrezorConnect model={this.props.model} />

                    {
                        this.state.status === 'connect' && (
                            <React.Fragment>
                                <P>Make sure its well connected to avoid communication failures</P>
                            </React.Fragment>
                        )
                    }

                    {
                        !deviceIsConnected && this.state.status !== 'connect' && (
                            <React.Fragment>
                                <P>Searching for your device</P>
                                <Dots />
                            </React.Fragment>
                        )
                    }

                    {
                        !deviceIsConnected && this.state.searchingTooLong && this.state.status !== 'connect' && (
                            <React.Fragment>
                                <P />
                                <P>Searching for your device takes too long, you might want to try to:</P>
                                <UnorderedList
                                    items={[{
                                        component: <P>Reconnect your device and wait a while</P>,
                                        key: '1',
                                    }, {
                                        component: <P>Refresh your internet browser window</P>,
                                        key: '2',
                                    }, {
                                        component: <P>Try using another cable</P>,
                                        key: '3',
                                    }, {
                                        component: <P>If nothing helps, contact Trezor support</P>,
                                        key: '4',
                                    }]}
                                />
                            </React.Fragment>
                        )
                    }

                    {
                        // todo: resolve duplicity of status === 'found' and device.connected
                        deviceIsConnected && this.state.status !== 'connect' && (
                            <React.Fragment>
                                <P>Detected device!</P>
                                {
                                    !device.features.initialized && (
                                        <React.Fragment>
                                            <ControlsWrapper>
                                                <Button
                                                    onClick={this.props.onboardingActions.goToNextStep}
                                                    isDisabled={!device.features.firmware_present ? false : device.mode === 'bootloader'}
                                                >
                                                Continue
                                                </Button>
                                            </ControlsWrapper>
                                            { device.features.firmware_present && device.mode === 'bootloader' && 'Device is in bootloader mode, reconnect it to continue'}
                                        </React.Fragment>
                                    )
                                }

                                {
                                    device.features.initialized && (
                                        <React.Fragment>
                                            <H2>Hold on</H2>
                                            <P>
                                            Someone has already worked with this device. It is already initialized which means
                                            that someone might be have access to funds stored on it.
                                            </P>
                                        </React.Fragment>
                                    )
                                }
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

ConnectStep.propTypes = types;

export default ReactTimeout(ConnectStep);