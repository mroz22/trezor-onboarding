import React from 'react';

import { types } from 'config/state';

import { Heading1 } from 'components/headings';
import { CallToAction } from 'components/prompts';
import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

class StartStep extends React.Component {
    constructor() {
        super();
        this.state = {
            callToActionVisible: false,
            created: false,
        };
    }

    createNew = () => {
        const { Connect, device } = this.props.state;
        console.log(device);
        const onCreateNewHandler = (event) => {
            if (event.type === 'button') {
                this.setState({ callToActionVisible: true });
                console.log('onCreateNewHandle', event);
            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onCreateNewHandler);
        this.props.actions.resetDevice().then((response) => {
            Connect.default.off(Connect.DEVICE_EVENT, onCreateNewHandler);
            this.setState({ callToActionVisible: false });
            console.log('response', response);
            if (!response.success) {
                return this.props.actions.handleError(response.payload.error);
            }
            this.setState({ created: true });
        }).catch((err) => {
            console.log('err', err);
        });
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Create or recover</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.props.state.device.features.initialized && <div>Device is already initialized. This means someone has already created a wallet and has access to it. You should reset your device and start again.</div>
                    }

                    { !this.props.state.device.features.initialized && !this.state.created && (
                        <React.Fragment>
                            <div>Have not used Trezor before?</div>
                            <button type="button" onClick={this.createNew}>Create new</button>
                            <CallToAction visible={this.state.callToActionVisible} />
                        </React.Fragment>
                    )}

                    {
                        this.state.created && <div>Good job, your wallet is ready. But we strongly recommend you to spend few more minutes and improve your security</div>
                    }

                    {
                        this.state.callToActionVisible && <div>By clicking confirm on your device you agree with terms of services</div>
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