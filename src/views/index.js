import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
// import TrezorConnect, { DEVICE_EVENT, TRANSPORT_EVENT } from 'trezor-connect';
import * as Connect from 'trezor-connect';

import { state } from 'config/state';
import Onboarding from 'components/onboarding';

console.log(Connect);

// window.__TREZOR_CONNECT_SRC = 'https://localhost:8088/';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 40px;
`;

const Error = ({ error }) => (
    <div>Error: { error } </div>
);

class App extends React.Component {
    constructor() {
        super();
        this.state = state;
        this.actions = {
            selectedModel: (selectedModel) => {
                this.setState({ selectedModel });
            },
            nextStep: () => {
                this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }));
            },
            previousStep: () => {
                this.setState(prevState => ({ activeStep: prevState.activeStep - 1 }));
            },
            resetDevice: () => Connect.default.resetDevice({
                label: 'My fancy Trezor',
                skipBackup: true,
            }),
            handleError: (error) => {
                console.log('handling Error');
                this.setState({ error });
            },
        };
    }

    async componentDidMount() {
        Connect.default.on(Connect.TRANSPORT_EVENT, (event) => {
            if (event.type === 'transport-start') {
                if (event.payload.type === 'ParallelTransport') {
                    this.setState({
                        transport: {
                            toBeUsed: 'webUSB',
                            actual: {
                                type: 'webUSB',
                                version: event.payload.version,
                            },
                        },
                    });
                } else if (event.payload.type === 'bridge') {
                    this.setState({
                        transport: {
                            toBeUsed: 'bridge',
                            actual: {
                                type: 'bridge',
                                version: event.payload.version,
                            },
                        },
                    });
                } else {
                    throw new Error('Unexpected transport type ', event.payload.type);
                }
            } else if (event.type === 'transport-error') {
                if (event.payload.error === 'WebUSB is not available on this browser.') {
                    this.setState({
                        transport: {
                            toBeUsed: 'bridge',
                        },
                    });
                } else {
                    // hmm?
                    throw new Error('Unexpected error ', event.payload.error);
                }
            }
        });


        const onDeviceEvent = (event) => {
            console.log('DEVICE_EVENT', event);
            if (event.type === 'device-connect') {
                this.setState({ device: event.payload });
            } else if (event.type === 'device-disconnect') {
                this.setState({ device: null });
            }
        };

        Connect.default.on(Connect.DEVICE_EVENT, onDeviceEvent);

        // how to turn it off ->
        // TrezorConnect.off(DEVICE_EVENT, onDeviceEvent);

        this.setState({ Connect });

        try {
            await Connect.default.init({
                // transportReconnect: true,
                debug: false,
                popup: false,
                webusb: true,
            });
        } catch (err) {
            console.warn('err', err);
        }
    }

    componentDidCatch(error, info) {
        console.log('component did catch');
        console.error('TODO: log this error to logging service', error, info);
    }

    render() {
        return (
            <Wrapper>
                <Onboarding state={this.state} actions={this.actions} />
                <Error error={this.state.error} />
                <div>
                    debug <br />
                    device: { this.state.device ? this.state.device.path : 'no device' } <br />
                    actual transport: {this.state.transport.actual.type} <br />
                    to be used transport: {this.state.transport.toBeUsed} <br />
                    activeStep: {this.state.activeStep}
                </div>
            </Wrapper>
        );
    }
}

export default hot(App);