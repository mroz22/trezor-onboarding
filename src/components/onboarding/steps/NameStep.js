import React from 'react';

import { Heading1 } from 'components/headings';
import { CallToAction } from 'components/prompts';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';

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
            callToActionVisible: false,
            labelChanged: false,
        };
    }

    changeLabel = (label) => {
        const { Connect, device } = this.props.state;
        const onCreateNewHandler = (event) => {
            if (event.type === 'button') {
                this.setState({ callToActionVisible: true });
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
            this.setState({ labelChanged: true });
        }).catch((err) => {
            console.log('err', err);
        });
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    {
                        !this.state.labelChanged && <Heading1>Name your device</Heading1>
                    }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.state.labelChanged
                            ? <div><Heading1>Excellent, your device has a custom name now. It will be visible on your device display from now on.</Heading1></div>
                            : (
                                <React.Fragment><div>Personalize your device with your own name.</div>
                                    <NameForm value={this.state.label} onSubmit={(label) => { this.changeLabel(label); }} />
                                    <CallToAction visible={this.state.callToActionVisible} />
                                </React.Fragment>
                            )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default NameStep;