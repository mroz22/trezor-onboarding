import React from 'react';
import { H1 } from 'trezor-ui-components';

import { types } from 'config/types';

import { OptionsList } from 'components/options';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

class SelectDeviceStep extends React.Component {
    static propTypes = types;

    constructor(props) {
        super(props);
        this.state = {
            options: [{
                text: 'Model One',
                value: '1',
            }, {
                text: 'Model T',
                value: '2',
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