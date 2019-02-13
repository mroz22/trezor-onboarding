import React from 'react';
import { P, H1 } from 'trezor-ui-components';

import { types } from 'config/types';

import { TrezorConnect } from 'components/prompts';

import ButtonText from 'trezor-ui-components/lib/components/buttons/ButtonText';
import { StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper } from '../../components/Wrapper';

class ConnectStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'connect',
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.searchForDevice();
        }, 5000);

        this.props.state.Connect.default.on(this.props.state.Connect.DEVICE_EVENT, this.onDeviceEvent);
    }

    componentWillUnmount() {
        this.props.state.Connect.default.off(this.props.state.Connect.DEVICE_EVENT, this.onDeviceEvent);
        clearTimeout(this.searchForDeviceTimeout);
    }

    onDeviceEvent = (event) => {
        if (event.type === 'device-connected') {
            this.setState({ status: 'found' });
            clearTimeout(this.searchForDeviceTimeout);
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
                        this.state.status === 'searching' && <P>Sarching for your device</P>
                    }

                    {
                        this.state.status === 'found' && (
                            <React.Fragment>
                                <P>Detected device!</P>
                                <ControlsWrapper>
                                    <ButtonText onClick={this.props.actions.nextStep}>Continue</ButtonText>
                                </ControlsWrapper>
                                {
                                    this.props.state.device && !this.props.state.device.isFresh() && (
                                        <P>Someone has already worked with this device. It appears to be initialized!</P>
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