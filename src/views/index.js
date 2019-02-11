import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import * as Connect from 'trezor-connect';

import Onboarding from 'components/onboarding';
import ErrorBoundary from 'components/onboarding/components/Error';
import Device from 'utils/Device';

window.__TREZOR_CONNECT_SRC = 'http://localhost:8088/';

console.log(Connect);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 40px;
`;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            transport: {
                actual: {
                    type: '',
                    version: '',
                },
                new: {
                    installers: [],
                    version: [],
                },
                error: null,
            },
            device: null,
            selectedModel: null,
            activeStep: 0,
            Connect: null,
            error: null,
            backupUnderstood: true,
            deviceInteraction: false,
        };
        this.actions = {
            toggleDeviceInteraction: (state) => {
                this.setState({ deviceInteraction: state });
            },
            selectedModel: (selectedModel) => {
                this.setState({ selectedModel });
            },
            nextStep: () => {
                this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }));
            },
            previousStep: () => {
                this.setState(prevState => ({ activeStep: prevState.activeStep - 1 }));
            },
            // initialize new wallet with default name and skip backup
            resetDevice: async () => {
                try {
                    // throw new Error('error');
                    const response = await this.state.Connect.default.resetDevice({
                        label: 'My Trezor',
                        skipBackup: true,
                    });
                    console.log('response', response);
                    if (!response.success && response.payload.code !== 'Failure_ActionCancelled') {
                        this.setState({ error: 'reset-device-err' });
                    }
                    return response;
                } catch (err) {
                    console.log(err);
                    console.log('err.message', err.message);
                    console.log('err.name', err.name);
                    this.setState({ error: 'reset-device-err' });
                    throw (err);
                }
            },
            applyFlags: flags => this.state.Connect.default.applyFlags({
                flags,
            }),
            applySettings: ({ label }) => this.state.Connect.default.applySettings({
                label,
            }),
            startBackup: () => this.state.Connect.default.backupDevice(),
            changePin: () => {
                const onDeviceEvent = (event) => {
                    console.warn('onDeviceEvent in changePin', event);
                    if (event.type === 'button' /* payload.code ButtonRequest_ProtectCall*/) {
                        this.actions.toggleDeviceInteraction(true);
                    }
                };
                const onUIEvent = (event) => {
                    console.warn('onUIEvent in changePin', event);
                    if (event.type === 'ui-request_pin' || event.type === 'ui-close_window') {
                        this.actions.toggleDeviceInteraction(false);
                    }
                };
                this.state.Connect.default.on(this.state.Connect.DEVICE_EVENT, onDeviceEvent);
                this.state.Connect.default.on(this.state.Connect.UI_EVENT, onUIEvent);

                return this.state.Connect.default.changePin();
            },
            submitNewPin: (pin) => {
                console.log(pin);
                this.state.Connect.default.uiResponse({ type: this.state.Connect.UI.RECEIVE_PIN, payload: pin });
            },

            firmwareErase: () => this.state.Connect.default.firmwareErase({ keepSession: true }),
            firmwareUpload: firmware => this.state.Connect.default.firmwareUpload(firmware),
            initConnect: async () => {
                console.log('init');
                await Connect.default.init({
                    transportReconnect: true,
                    debug: true,
                    popup: false,
                    webusb: false,
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
                                new: {
                                    installers: event.payload.bridge.packages,
                                    version: event.payload.bridge.version,
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
                        this.setState({ device: new Device(event.payload) });
                    // not sure about this
                    } else if (event.type === 'button') {
                        this.setState({ device: new Device(event.payload.device) });
                    } else if (event.type === 'device-disconnect') {
                        this.setState({ device: null });
                    }
                };

                this.state.Connect.default.on(Connect.DEVICE_EVENT, onDeviceEvent);
                this.state.Connect.default.on(Connect.UI_EVENT, (event) => {
                    console.log('UI_EVENT', event);
                });
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

    render() {
        return (
            <Wrapper>
                <ErrorBoundary>
                    <Onboarding state={this.state} actions={this.actions} />
                </ErrorBoundary>
            </Wrapper>
        );
    }
}

export default hot(App);