import React from 'react';
import { P } from 'trezor-ui-components';

import { types } from 'config/types';

import { Heading1 } from 'components/headings';
import { TrezorConnect } from 'components/prompts';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../components/Wrapper';

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
        }, 5000);
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Time to connect your device</Heading1>
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