import React from 'react';

import { OptionsList } from 'components/options';
import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';


class SelectDeviceStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [{
                text: 'Model One',
            }, {
                text: 'Model T',
            }],

            selected: '',
        };
    }

    selectDevice(text) {
        this.setState({ selected: text });
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Chose your device</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <OptionsList
                        options={this.state.options}
                        selected={this.state.selected}
                        onSelect={this.selectDevice.bind(this)}
                        // onSelect={() => this.selectDevice()} // hmm how to get around this?
                    />
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default SelectDeviceStep;