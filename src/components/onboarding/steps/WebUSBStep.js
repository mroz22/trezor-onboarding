import React from 'react';
import styled from 'styled-components';

import { types } from 'config/types';
import colors from 'config/colors';
import { Heading1 } from 'components/headings';
import { Device } from 'components/device';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

const WebUSBButtonWrapper = styled.div`
    width: 100px;
    height: 40px;
    background-color: ${colors.brandPrimary};
    color: ${colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
        position: initial !important;
    }
`;

class WebUSBButton extends React.Component {
    componentDidMount() {
        this.props.renderWebUSBFn('.webusb');
    }

    render() {
        return (
            <WebUSBButtonWrapper className="webusb">
                <span style={{ position: 'absolute' }}>Check for devices</span>
            </WebUSBButtonWrapper>
        );
    }
}

const WebUSBStep = ({ state }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Establish connection with your device</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <WebUSBButton renderWebUSBFn={state.Connect.default.renderWebUSBButton} />
            <Device device={state.device} />
        </StepBodyWrapper>
    </StepWrapper>
);


WebUSBStep.propTypes = {
    state: types.state,
};

export default WebUSBStep;