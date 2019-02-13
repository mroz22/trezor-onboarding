import React from 'react';
import {
    P, H1, Pin, ButtonText, Link,
} from 'trezor-ui-components';

import { PIN_MANUAL_URL } from 'config/urls';
import { TrezorAction } from 'components/prompts';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

class SetPinStep extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'initial',
        };
    }

    async changePin() {
        const { Connect } = this.props.state;
        const onEvent = (event) => {
            if (event.type === 'ui-close_window' && this.state.status === 'started') {
                console.warn('ui-close-window', event);
                this.setState({ status: 'initial' });
            } else if (event.type === 'ui-request_pin' && this.state.status === 'initial') {
                this.setState({ status: 'started' });
            }
        };
        // this.state.Connect.default.on(this.state.Connect.DEVICE_EVENT, onEvent);
        Connect.default.on(Connect.UI_EVENT, onEvent);

        let response;
        try {
            response = await this.props.actions.changePin();
        } catch (err) {
            // hmm
        } finally {
            console.warn('response', response);
            if (response.payload.code === 'Failure_PinMismatch') {
                console.warn('mimatcch@!!!');
                this.setState({ status: 'mismatch' });
            }
            Connect.default.off(Connect.UI_EVENT, onEvent);
        }
    }

    render() {
        const { deviceInteraction } = this.props.state;
        if (deviceInteraction) {
            return (
                <div style={{
                    marginTop: 'auto',
                    position: 'absolute',
                    top: '50%',
                    left: '35%',
                    right: '35%',
                }}
                >
                    <TrezorAction />
                </div>

            );
        }
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>PIN</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>

                    {
                        this.state.status === 'initial' && (
                            <React.Fragment>
                                <P>Protect device from unauthorized access by using a strong pin.</P>
                                <ControlsWrapper>
                                    <ButtonText onClick={
                                        () => {
                                            this.changePin();
                                        }
                                    }
                                    >
                                    Set pin
                                    </ButtonText>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'started' && (
                            <React.Fragment>
                                <P>
                                In order to secure maximum security, we do not display pin on your computer. We will just show
                                a "blind matrix", real layout is displayed on your device.
                                </P>
                                <div>
                                    <img src="src/components/onboarding/steps/Pin/videos/pin.gif" alt="How to enter pin" width="400px" />
                                </div>

                                <ButtonText onClick={
                                    () => {
                                        this.setState({ status: 'newPin' });
                                    }
                                }
                                >I understand
                                </ButtonText>
                            </React.Fragment>

                        )
                    }

                    {
                        this.state.status === 'newPin' && (
                            <React.Fragment>
                                <Pin
                                    header={<P>Enter your new PIN</P>}
                                    device={{
                                        label: this.props.state.device.label,
                                        path: this.props.state.device.path,
                                    }}
                                    onPinSubmit={
                                        (pin) => {
                                            this.setState({ status: 'newPinEntered' });
                                            this.props.actions.submitNewPin(pin);
                                        }
                                    }
                                />
                            </React.Fragment>

                        )
                    }

                    {
                        this.state.status === 'newPinEntered' && (
                            <React.Fragment>
                                <P>
                            Good. You entered a new pin. But to make sure you did not make mistake, please enter it again. Look
                            at your device now, numbers are now different.
                                </P>
                                <ButtonText onClick={() => this.setState({ status: 'repeatPin' })}>I understand</ButtonText>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'repeatPin' && (
                            <React.Fragment>
                                <Pin
                                    header={<P>Repeat PIN</P>}
                                    device={{
                                        label: this.props.state.device.label,
                                        path: this.props.state.device.path,
                                    }}
                                    onPinSubmit={
                                        (pin) => {
                                            this.props.actions.submitNewPin(pin);
                                            this.setState({ status: 'repeatPinEntered' });
                                        }
                                    }
                                />
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'repeatPinEntered' && (
                            <React.Fragment>
                                <P>Purfect! Your device is now secured by pin.</P>
                                <ButtonText onClick={() => this.props.actions.nextStep()}>Continue</ButtonText>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'mismatch' && (
                            <React.Fragment>
                                <P>Pin mismatch. </P>
                                <P>
                                Are you confused, how PIN works? You can always refer to our

                                </P>  <Link href={PIN_MANUAL_URL}>documentation</Link>
                                <ButtonText onClick={() => this.setState({ status: 'initial' })}>Start again</ButtonText>
                            </React.Fragment>
                        )
                    }

                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default SetPinStep;