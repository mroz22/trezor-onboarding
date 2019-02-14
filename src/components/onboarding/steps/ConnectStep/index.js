import React from 'react';
import { P, H1, H2 } from 'trezor-ui-components';

import { types } from 'config/types';

import { TrezorConnect } from 'components/prompts';
import { Dots } from 'components/loaders';
import { UnorderedList } from 'components/lists';
import ButtonText from 'trezor-ui-components/lib/components/buttons/ButtonText';
import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';

class ConnectStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'connect',
            searchingTooLong: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.searchForDevice();
        }, 5000);

        this.searchingTooLongTimeout = setTimeout(() => {
            this.setState({ searchingTooLong: true });
        }, 1000 * 15);

        this.props.state.Connect.default.on(this.props.state.Connect.DEVICE_EVENT, this.onDeviceEvent);
    }

    componentWillUnmount() {
        this.props.state.Connect.default.off(this.props.state.Connect.DEVICE_EVENT, this.onDeviceEvent);
        clearTimeout(this.searchForDeviceTimeout);
        clearTimeout(this.searchingTooLongTimeout);
    }

    onDeviceEvent = (event) => {
        if (event.type === 'device-connected') {
            this.setState({
                status: 'found',
                searchingTooLong: false,
            });

            clearTimeout(this.searchForDeviceTimeout);
            clearTimeout(this.searchingTooLongTimeout);
        } else if (event.type === 'device-disconnect') {
            this.searchForDevice();
        }
    };

    searchForDevice() {
        this.setState({
            status: 'searching',
        });
        this.searchForDeviceTimeout = setTimeout(() => {
            if (this.props.state.device) {
                clearTimeout(this.searchForDeviceTimeout);
                return this.setState({
                    status: 'found',
                });
            }
            return this.searchForDevice();
        }, 200);
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
                        this.state.status === 'connect' && <P>Make sure its well connected to avoid communication failures</P>
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
                                <P>Searching for your device takes too long, you might want to try to:</P>
                                <UnorderedList items={[
                                    'Reconnect your device and wait a while',
                                    'Refresh your internet browser window',
                                    'Try using another cable',
                                    'If nothing helps, contat Trezor support',
                                ]}
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
                                                <ButtonText
                                                    onClick={this.props.actions.nextStep}
                                                    isDisabled={this.props.state.device.mode === 'bootloader'}
                                                >
                                                Continue
                                                </ButtonText>
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

ConnectStep.propTypes = {
    state: types.state,
};

export default ConnectStep;