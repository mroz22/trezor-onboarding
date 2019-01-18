import React from 'react';
import TrezorConnect, { DEVICE_EVENT, DEVICE, TRANSPORT_EVENT } from 'trezor-connect';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

class FirmwareStep extends React.Component {
    render() {
        return (
            <StepWrapper className="wrapper">
                <StepHeadingWrapper className="blabla">
                    <Heading1>Firmware</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    bla bla firmware
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}


export default FirmwareStep;