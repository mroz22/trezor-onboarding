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
        this.props.state.Connect.default.on(this.props.state.Connect.DEVICE_EVENT, this.onDeviceEvent);
        this.props.setTimeout(() => {
            this.searchForDevice();
        }, 5000);
    }

    componentWillUnmount() {
        this.props.state.Connect.default.off(this.props.state.Connect.DEVICE_EVENT, this.onDeviceEvent);
    }

    onDeviceEvent = (event) => {
        console.warn('event', event);
        if (event.type === 'device-disconnect' && this.state.status !== 'connect') {
            this.setState({ status: 'searching', searchingTooLong: false });
            this.props.setTimeout(() => {
                this.searchForDevice();
            }, 1000);
        } else if (event.type === 'device-connect' || event.type === 'device-changed') {
            // todo: hmm is this 'if' needed?
            if (this.props.state.device) {
                return this.setState({
                    status: 'found',
                    searchingTooLong: false,
                });
            }
        }
    };

    searchForDevice() {
        if (this.props.state.device) {
            return this.setState({
                status: 'found',
                searchingTooLong: false,
            });
        }
        this.props.setTimeout(() => {
            this.setState({ searchingTooLong: true });
        }, 1000 * 15);

        return this.setState({
            status: 'searching',
        });
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Time to connect your device</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <TrezorConnect model={this.props.state.selectedModel} />

                    {
                        this.state.status === 'connect' && (
                            <React.Fragment>
                                <P>Make sure its well connected to avoid communication failures</P>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'searching' && (
                            <React.Fragment>
                                <P>Searching for your device</P>
                                <Dots />
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'searching' && this.state.searchingTooLong && (
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
                        this.state.status === 'found' && this.props.state.device && (
                            <React.Fragment>
                                <P>Detected device!</P>
                                {
                                    this.props.state.device.isFresh() && (
                                        <React.Fragment>
                                            <ControlsWrapper>
                                                <Button
                                                    onClick={this.props.actions.nextStep}
                                                    isDisabled={this.props.state.device.mode === 'bootloader'}
                                                >
                                                Continue
                                                </Button>
                                            </ControlsWrapper>
                                            { this.props.state.device.mode === 'bootloader' && 'Device is in bootloader mode, reconnect it to continue'}
                                        </React.Fragment>
                                    )
                                }

                                {
                                    !this.props.state.device.isFresh() && (
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