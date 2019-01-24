import React from 'react';

import { types } from 'config/state';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

const CallToAction = ({ visible }) => (
    <div style={{ visibility: visible ? 'visible' : 'hidden' }}>
        Complete action on your device
    </div>
);

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
        });
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Create or recover</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    { !this.state.created && (
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