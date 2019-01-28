import React from 'react';

import { types } from 'config/state';

import { OptionsList } from 'components/options';
import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

class SelectDeviceStep extends React.Component {
    static propTypes = types;

    constructor(props) {
        super(props);
        this.state = {
            options: [{
                text: 'Model One',
                value: 1,
            }, {
                text: 'Model T',
                value: 2,
            }],
        };
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Select your device</Heading1>
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