import React from 'react';

import { types } from 'config/types';
import { DONUT_RADIUS, DONUT_STROKE } from 'config/constants';

import { Donut } from 'components/loaders';
import { TrezorAction } from 'components/prompts';
import { OptionsList } from 'components/options';

import { ButtonText, P, H1 } from 'trezor-ui-components';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const StartOption = () => (
    <React.Fragment>
        <P>Start from scratch</P>
        <img src="src/components/onboarding/steps/StartStep/images/create-2.svg" />
    </React.Fragment>
);

const RecoverOption = () => (
    <React.Fragment>
        <P>Recover</P>
        <img src="src/components/onboarding/steps/StartStep/images/recover-2.svg" />
    </React.Fragment>
);

class StartStep extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'initial',
            progress: 0,
            options: [{
                content: <StartOption />,
                value: 1, // todo
                key: 1,
            }, {
                content: <RecoverOption />,
                value: 2, // todo
                key: 2,
            }],
        };
    }

    createNew = async () => {
        const { Connect } = this.props.state;
        const onCreateNewHandler = (event) => {
            console.warn('Event', event);
            console.warn('this.state.status', this.state.status);
            if (event.type === 'button' && this.state.status === 'initial') {
                this.props.actions.toggleDeviceInteraction(true);
            } else if (event.type === 'ui-close_window' && this.state.status === 'initial') {

            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onCreateNewHandler);
        Connect.default.on(Connect.UI_EVENT, onCreateNewHandler);
        Connect.default.on(Connect.RESPONSE_EVENT, onCreateNewHandler);

        let response;
        try {
            response = await this.props.actions.resetDevice();
            console.log('response', response);
        } catch (err) {
            console.warn('catch', err);
            // ?
        } finally {
            console.log('finally');
            this.props.actions.toggleDeviceInteraction(false);

            if (!response || !response.success) {
                this.setState({ status: 'initial' });
            } else {
                this.setState({ status: 'creating' });
                const progressFn = () => {
                    this.setState(prevState => ({ progress: prevState.progress + 1 }));
                };
                const tresholds = {
                    creating: 100,
                };
                const interval = setInterval(() => {
                    if (this.state.progress <= tresholds[this.state.status]) {
                        progressFn();
                    }
                    if (this.state.progress === 100) {
                        this.setState({ status: 'finished' });
                    }
                    if (this.state.status === 'finished') {
                        clearInterval(interval);
                        this.props.actions.reorganizeSteps();
                    }
                }, 20);
            }
            Connect.default.off(Connect.DEVICE_EVENT, onCreateNewHandler);
        }
    }

    render() {
        const { status } = this.state;
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
                    <H1>
                        {
                            status === 'initial' && 'Create or recover'
                        }
                        {
                            status === 'creating' && 'Creating new wallet'
                        }

                    </H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        // todo: tohle je blbost tak samo o sobe. Ta detekce bude asi nekde nahore
                        this.props.state.device.features.initialized && <P>Device is already initialized. This means someone has already created a wallet and has access to it. You should reset your device and start again.</P>
                    }

                    {
                        status === 'initial'
                            && (
                                <React.Fragment>
                                    <OptionsList
                                        options={this.state.options}
                                        selected={this.props.state.selectedModel}
                                        selectedAccessor="value"
                                        onSelect={() => { this.createNew(); }}
                                    />
                                    {/* <P>Are you new to crypto or have not used Trezor before? </P>
                                    <ButtonText onClick={this.createNew}>Create new wallet</ButtonText>
                                    <P>Do you have recovery seed? You might use it to recovery your wallet</P>
                                    <ButtonText onClick={this.createNew}>Recover wallet</ButtonText> */}
                                </React.Fragment>
                            )
                    }

                    {
                        status === 'creating' && <Donut progress={this.state.progress} radius={DONUT_RADIUS} stroke={DONUT_STROKE} />
                    }

                    {
                        status === 'finished'
                            && (
                                <React.Fragment>
                                    <P>Good job, your wallet is ready. But we strongly recommend you to spend few more minutes and improve your security</P>
                                    <ControlsWrapper>
                                        <ButtonText onClick={this.props.actions.nextStep}>
                                        Take me to security <br />
                                        (5 minutes)
                                        </ButtonText>
                                        <ButtonText isWhite>Skip for now</ButtonText>
                                    </ControlsWrapper>
                                </React.Fragment>
                            )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

StartStep.propTypes = {
    actions: types.actions,
    state: types.state,
};

export default StartStep;