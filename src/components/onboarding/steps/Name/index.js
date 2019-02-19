import React from 'react';
import { H1, P, Button } from 'trezor-ui-components';
import { types } from 'config/types';

import { TrezorAction } from 'components/Prompts';
import NameForm from './Form';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../Wrapper';

class NameStep extends React.Component {
    constructor() {
        super();
        this.state = {
            label: 'Hodl-nator',
            labelChanged: false,
        };
    }

    changeLabel = (label) => {
        const { Connect } = this.props.state;
        const onCreateNewHandler = (event) => {
            if (event.type === 'button') {
                this.props.actions.toggleDeviceInteraction(true);
                console.log('onCreateNewHandle', event);
            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onCreateNewHandler);
        this.props.actions.applySettings({ label }).then((response) => {
            Connect.default.off(Connect.DEVICE_EVENT, onCreateNewHandler);
            if (!response.success) {
                return this.props.actions.handleError(response.payload.error);
            }
            this.props.actions.toggleDeviceInteraction(false);
            return this.setState({ labelChanged: true });
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
                                <ControlsWrapper>
                                    <Button onClick={this.props.actions.nextStep}>Continue</Button>
                                </ControlsWrapper>
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