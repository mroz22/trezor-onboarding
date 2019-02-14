import React from 'react';
import { H1, P, ButtonText } from 'trezor-ui-components';
import { types } from 'config/types';

import { TrezorAction } from 'components/prompts';

import {
 StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper 
} from '../components/Wrapper';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class NameStep extends React.Component {
    constructor() {
        super();
        this.state = {
            label: 'Hodl-nator',
            labelChanged: false,
        };
    }

    changeLabel = (label) => {
        const { Connect, device } = this.props.state;
        const onCreateNewHandler = (event) => {
            if (event.type === 'button') {
                this.props.actions.toggleDeviceInteraction(true);
                console.log('onCreateNewHandle', event);
            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onCreateNewHandler);
        this.props.actions.applySettings({ label }).then((response) => {
            Connect.default.off(Connect.DEVICE_EVENT, onCreateNewHandler);
            this.setState({ callToActionVisible: false });
            console.log('response', response);
            if (!response.success) {
                return this.props.actions.handleError(response.payload.error);
            }
            this.props.actions.toggleDeviceInteraction(false);
            this.setState({ labelChanged: true });
        }).catch((err) => {
            console.log('err', err);
        });
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
                    {
                        !this.state.labelChanged && <H1>Name your device</H1>
                    }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.state.labelChanged && (
                            <React.Fragment>
                                <H1>Excellent, your device has a custom name now. It will be visible on your device display from now on.</H1>
                                <ButtonText onClick={this.props.actions.nextStep}>Continue</ButtonText>
                            </React.Fragment>
                        )
                    }
                    {
                        !this.state.labelChanged && (
                            <React.Fragment><P>Personalize your device with your own name.</P>
                                <NameForm value={this.state.label} onSubmit={(label) => { this.changeLabel(label); }} />
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

NameStep.propTypes = {
    actions: types.actions,
    state: types.state,
};

export default NameStep;