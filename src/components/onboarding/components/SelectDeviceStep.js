import React from 'react';
import styled from 'styled-components';

import { Option } from 'components/options';
import { Heading1 } from 'components/headings';

const StepWrapper = styled.div`
    display: grid;
    grid-template-areas: 
        'heading'
        'options';
    grid-template-rows: 20% 80%;    
    grid-template-columns: 100%;
    ${Heading1} {
        grid-area: heading;
        text-align: center;
    }
`;

const OptionsWrapper = styled.div`
    grid-area: options;
    display: flex;
    justify-content: center;
`;

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
            <StepWrapper>
                <Heading1>Chose your device</Heading1>
                <OptionsWrapper>
                    { this.state.options.map(opt => <Option key={opt.text} text={opt.text} />)}
                </OptionsWrapper>
            </StepWrapper>
        );
    }
}

export default SelectDeviceStep;