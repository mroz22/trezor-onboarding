import React from 'react';
import { H1, P } from 'trezor-ui-components';

import { types } from 'config/types';

import { OptionsList } from 'components/Options';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../Wrapper';

class SelectDeviceStep extends React.Component {
    static propTypes = types;

    constructor(props) {
        super(props);
        this.state = {
            options: [{
                content: <P>Model One</P>,
                value: '1',
                key: 1,
            }, {
                content: <P>Model T</P>,
                value: '2',
                key: 2,
            }],
        };
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Select your device</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <OptionsList
                        options={this.state.options}
                        selected={this.props.state.selectedModel}
                        selectedAccessor="value"
                        onSelect={(model) => { this.props.actions.selectedModel(model); this.props.actions.nextStep(); }}
                    />
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default SelectDeviceStep;