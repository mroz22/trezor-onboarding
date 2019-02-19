/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import * as Connect from 'trezor-connect';

import Onboarding from 'components/onboarding';
import ErrorBoundary from 'components/Errors';
import DeviceManager from 'utils/Device';
import * as conditions from 'utils/conditions';

import BackupStepIntro from 'components/onboarding/steps/Backup/BackupIntro';
import BookmarkStep from 'components/onboarding/steps/Bookmark';
import BridgeStep from 'components/onboarding/steps/Bridge';
import FinalStep from 'components/onboarding/steps/Final';
import FirmwareStep from 'components/onboarding/steps/Firmware';
import HologramStep from 'components/onboarding/steps/Hologram';
import NewsletterStep from 'components/onboarding/steps/Newsletter';
import SelectDeviceStep from 'components/onboarding/steps/SelectDevice';
import SetPinStep from 'components/onboarding/steps/Pin';
import StartStep from 'components/onboarding/steps/Start';
import WelcomeStep from 'components/onboarding/steps/Welcome';
import NameStep from 'components/onboarding/steps/Name';
import ConnectStep from 'components/onboarding/steps/Connect';

// TODO; env
// eslint-disable-next-line no-underscore-dangle
window.__TREZOR_CONNECT_SRC = 'https://sisyfos.trezor.io/blyat/';

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
            steps: [
                {
                    name: 'Welcome',
                    component: WelcomeStep,
                    showProgressSteps: false,
                    showControls: false,
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Select device',
                    component: SelectDeviceStep,
                    dot: 'Select device',
                    showProgressSteps: true,
                    showControls: false,
                }, {
                    name: 'Unboxing',
                    component: HologramStep,
                    dot: 'Unboxing',
                    showProgressSteps: true,
                    showControls: false,
                }, {
                    name: 'Bridge',
                    component: BridgeStep,
                    dot: 'Connect device',
                    showProgressSteps: true,
                    showControls: false,
                }, {
                    name: 'Connect',
                    component: ConnectStep,
                    dot: 'Connect device',
                    showProgressSteps: true,
                    showControls: false,
                }, {
                    name: 'Firmware',
                    component: FirmwareStep,
                    dot: 'Firmware',
                    showProgressSteps: true,
                    showControls: false,
                    entryConditions: [conditions.DEVICE_IS_NOT_INITIALIZED],
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Start',
                    component: StartStep,
                    dot: 'Start',
                    showProgressSteps: true,
                    showControls: false,
                    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_IS_NOT_INITIALIZED],
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Backup',
                    component: BackupStepIntro,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: false,
                    entryConditions: [conditions.DEVICE_IS_CONNECTED],
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Pin',
                    component: SetPinStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: false,
                    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Name',
                    component: NameStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: false,
                    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Bookmark',
                    component: BookmarkStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: false,
                    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Newsletter',
                    component: NewsletterStep,
                    dot: 'Security',
                    showProgressSteps: true,
                    showControls: false,
                    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
                    reconnectConditions: [conditions.IS_SAME_DEVICE],
                }, {
                    name: 'Final',
                    component: FinalStep,
                    showProgressSteps: false,
                    showControls: false,
                }],
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
                    const response = await this.state.Connect.default.resetDevice({
                        label: 'My Trezor',
                        skipBackup: true,
                        passhpraseProtection: true,
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
            applySettings: ({ label }) => this.state.Connect.default.applySettings({ label }),
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
                this.state.Connect.default.uiResponse({ type: this.state.Connect.UI.RECEIVE_PIN, payload: pin });
            },
            firmwareErase: () => this.state.Connect.default.firmwareErase({ keepSession: true }),
            firmwareUpload: firmware => this.state.Connect.default.firmwareUpload(firmware),
            initConnect: async () => {
                await Connect.default.init({
                    transportReconnect: true,
                    debug: false,
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
                                error: false,
                            },
                        });
                    } else if (event.type === 'transport-error') {
                        this.setState({
                            transport: {
                                actual: {
                                    type: '',
                                    version: '',
                                },
                                new: {
                                    installers: event.payload.bridge.packages,
                                    version: event.payload.bridge.version,
                                },
                                error: true,
                            },
                        });
                    }
                });

                const onDeviceEvent = (event) => {
                    console.warn('DEVICE_EVENT', event);
                    if (event.type === 'device-connected' || event.type === 'device-changed') {
                        if (event.payload.type === 'unacquired') {
                            return; // skip unacquired;
                        }
                        this.setState({ device: DeviceManager.createDevice(event.payload) });
                    // not sure about this
                    } else if (event.type === 'button') {
                        this.setState({ device: DeviceManager.createDevice(event.payload.device) });
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

            reorganizeSteps: () => {
                this.setState((prevState) => {
                    const { steps } = prevState;
                    const newSteps = steps.map((step) => {
                        if (step.dot !== 'Security') {
                            step.dot = 'Setup';
                        } else if (step.dot) {
                            step.dot = step.name;
                        }
                        return step;
                    });
                    return { steps: newSteps };
                });
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