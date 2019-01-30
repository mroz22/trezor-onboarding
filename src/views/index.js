import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import * as Connect from 'trezor-connect';

import { state } from 'config/state';
import Onboarding from 'components/onboarding';

window.__TREZOR_CONNECT_SRC = 'http://localhost:8088/';
console.log(Connect);
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
            resetDevice: () => this.state.Connect.default.resetDevice({
                label: 'My fancy Trezor',
                skipBackup: true,
            }),
            applyFlags: () => this.state.Connect.default.applyFlags({
                flags: 1,
            }),
            applySettings: ({ label }) => this.state.Connect.default.applySettings({
                label,
            }),
            startBackup: () => this.state.Connect.default.backupDevice(),
            changePin: () => this.state.Connect.default.changePin(),
            submitNewPin: () => this.state.Connect.default.uiResponse({ type: this.state.Connect.UI.RECEIVE_PIN, payload: '12345' }),

            firmwareErase: () => this.state.Connect.default.firmwareErase({ keepSession: true }),
            firmwareUpload: firmware => this.state.Connect.default.firmwareUpload(firmware),
            initConnect: async () => {
                await Connect.default.init({
                    transportReconnect: true,
                    debug: true,
                    popup: false,
                    webusb: this.state.usbAvailable,
                });
                this.setState({ Connect });
                this.state.Connect.default.on(Connect.TRANSPORT_EVENT, (event) => {
                    console.warn('event', event);
                    if (event.type === 'transport-start') {
                        this.setState({
                            transport: {
                                actual: {
                                    type: event.payload.type,
                                    version: event.payload.version,
                                },
                                error: null,
                            },
                        });
                    } else if (event.type === 'transport-error') {
                        this.setState(prevState => ({ transport: Object.assign({}, prevState.transport, { error: event.payload }) }));
                    }
                });

                const onDeviceEvent = (event) => {
                    console.log('DEVICE_EVENT', event);
                    if (event.type === 'device-connected' || event.type === 'device-changed') {
                        this.setState({ device: event.payload });
                    // not sure about this
                    } else if (event.type === 'button') {
                        this.setState({ device: event.payload.device });
                    } else if (event.type === 'device-disconnect') {
                        this.setState({ device: null });
                    }
                };

                this.state.Connect.default.on(Connect.DEVICE_EVENT, onDeviceEvent);
            },
            handleError: (error) => {
                console.log('handling Error');
                this.setState({ error });
            },
        };
    }

    async componentDidMount() {
        try {
            await this.actions.initConnect();
        } catch (err) {
            console.warn('err', err);
        }

        this.setState({ Connect });
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
                    activeStep: {this.state.activeStep} <br />
                    usbAvailable: {this.state.usbAvailable ? 'true' : 'false'}

                </div>
            </Wrapper>
        );
    }
}

export default hot(App);