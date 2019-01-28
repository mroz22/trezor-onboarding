import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { types } from 'config/state';
import colors from 'config/colors';
import { Heading1 } from 'components/headings';

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

class WebUSBStep extends React.Component {
    render() {
        console.log(this.props.state.device);
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Establish connection with your device</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <h1>
                        Check for devices
                    </h1>
                    Your browser supports WebUSB functionality. You might proceed to next step now.
                    <br /><br />
                    <WebUSBButton renderWebUSBFn={this.props.state.Connect.default.renderWebUSBButton} />
                    <br />
                    {
                        this.props.state.device && this.props.state.device.path
                            ? (
                                <div>
                                Conected device <br />
                                    { this.props.state.device.path }
                                </div>
                            )
                            : <div>No device connected</div>
                    }

                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default WebUSBStep;