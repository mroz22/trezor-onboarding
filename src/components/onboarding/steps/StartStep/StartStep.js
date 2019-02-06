import React from 'react';

import { types } from 'config/types';
import { DONUT_RADIUS, DONUT_STROKE, TOS_URL } from 'config/constants';

import { Heading1 } from 'components/headings';
import { Donut } from 'components/loaders';
import { TrezorAction } from 'components/prompts';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../components/Wrapper';

class StartStep extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'initial',
            progress: 0,
        };
    }

    createNew = async () => {
        const { Connect } = this.props.state;
        const onCreateNewHandler = (event) => {
            if (event.type === 'button') {
                this.props.actions.toggleDeviceInteraction(true);
            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onCreateNewHandler);

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
            }
        }, 40);

        let response;
        try {
            response = await this.props.actions.resetDevice();
            this.setState({ status: 'creating' });
        } catch (err) {
            // ?
        } finally {
            console.log('finally');
            if (!response || !response.success) {
                this.setState({ status: 'initial' });
            }
            this.props.actions.toggleDeviceInteraction(false);
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
                    <Heading1>
                        {
                            status === 'initial' && 'Create or recover'
                        }
                        {
                            status === 'creating' && 'Creating new wallet'
                        }

                    </Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        // todo: tohle je blbost tak samo o sobe. Ta detekce bude asi nekde nahore
                        this.props.state.device.features.initialized && <div>Device is already initialized. This means someone has already created a wallet and has access to it. You should reset your device and start again.</div>
                    }

                    {
                        status === 'initial'
                            && (
                                <React.Fragment>
                                    <div>Have not used Trezor before?</div>
                                    <button type="button" onClick={this.createNew}>Create new</button>
                                </React.Fragment>
                            )
                    }

                    {
                        status === 'creating' && <Donut progress={this.state.progress} radius={DONUT_RADIUS} stroke={DONUT_STROKE} />
                    }

                    {
                        status === 'finished' && <Heading1>Good job, your wallet is ready. But we strongly recommend you to spend few more minutes and improve your security</Heading1>
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