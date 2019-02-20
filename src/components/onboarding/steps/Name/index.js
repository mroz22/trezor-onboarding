import React from 'react';
import {
    H1, P, Button, Input,
} from 'trezor-ui-components';
import { types } from 'config/types';
import styled from 'styled-components';

import { validateASCII } from 'utils/validate';
import { TrezorAction } from 'components/Prompts';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../Wrapper';

const InputWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;

class NameStep extends React.Component {
    constructor() {
        super();
        this.state = {
            label: '',
            labelChanged: false,
        };
    }

    changeLabel = () => {
        console.warn('changeLabel');
        const { Connect } = this.props.state;
        const onCreateNewHandler = (event) => {
            if (event.type === 'button') {
                this.props.actions.toggleDeviceInteraction(true);
                console.log('onCreateNewHandle', event);
            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onCreateNewHandler);
        this.props.actions.applySettings({ label: this.state.label }).then((response) => {
            Connect.default.off(Connect.DEVICE_EVENT, onCreateNewHandler);
            if (!response.success) {
                this.props.actions.handleError(response.payload.error);
            } else {
                this.setState({ labelChanged: true });
            }
            this.props.actions.toggleDeviceInteraction(false);
        }).catch((err) => {
            console.log('err', err);
        });
    }

    handleInputChange = (event) => {
        this.setState({ label: event.target.value });
    }

    validateInput = () => {
        console.warn('this.state.label', this.state.label);
        if (!this.state.label) {
            return { state: '' };
        }
        if (!validateASCII(this.state.label)) {
            return { state: 'error', bottomText: 'name can contain only ASCII letters' };
        }
        if (this.state.label.length > 16) {
            return { state: 'error', bottomText: 'name is too long' };
        }
        return { state: 'success', bottomText: 'cool name' };
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
                        !this.state.labelChanged && (
                            <React.Fragment>
                                <P>Personalize your device with your own name.</P>
                                <InputWrapper>
                                    <Input
                                        value={this.state.label}
                                        placeholder=""
                                        state={this.validateInput().state}
                                        bottomText={this.validateInput().bottomText ? this.validateInput().bottomText: '' }
                                        onChange={this.handleInputChange}
                                    />
                                    <Button isDisabled={this.validateInput().state !== 'success'} onClick={this.changeLabel}>Submit</Button>
                                </InputWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.labelChanged && (
                            <React.Fragment>
                                <H1>Excellent, your device has a custom name now. It will be visible on your device display from now on.</H1>
                                <ControlsWrapper>
                                    <Button onClick={this.props.actions.nextStep}>Continue</Button>
                                </ControlsWrapper>
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