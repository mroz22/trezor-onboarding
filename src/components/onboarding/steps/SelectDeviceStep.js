import React from 'react';

import { Option } from 'components/options';
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
        };
    }

    render() {
        return (
            <StepWrapper className="wrapper">
                <StepHeadingWrapper className="blabla">
                    <Heading1>Chose your device</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    { this.state.options.map(opt => <Option key={opt.text} text={opt.text} />)}
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default SelectDeviceStep;