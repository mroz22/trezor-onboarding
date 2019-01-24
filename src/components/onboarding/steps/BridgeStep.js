import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { types } from 'config/state';
import colors from 'config/colors';
import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

const VersionBadgeWrapper = styled.div`
    border: 1px solid ${colors.brandPrimary};
    display: inline-block;
`;

const VersionBadge = ({ version }) => (
    <VersionBadgeWrapper>
        {version}
    </VersionBadgeWrapper>
);

VersionBadge.propTypes = {
    version: PropTypes.string,
};

const WebUSBCase = () => (
    <div>Your browser supports WebUSB functionality. You might proceed to next step now.</div>
);

const BridgeNotInstalledCase = () => (
    <React.Fragment>
        <h1>
            Trezor Bridge
            {/* <VersionBadge version={props.state.transport.version} /> */}
        </h1>
        <div>A communication tool to facilitate the connection between your Trezor and your internet browser</div>
        <div>Install bridge to establish communication with your device</div>
        <ul>
            <li>Download bridge</li>
            <li>Install bridge</li>
            <li>Check connection</li>
            <button type="button">Download</button>
        </ul>
    </React.Fragment>
);

const BridgeInstalledCase = ({ version }) => (
    <React.Fragment>
        <h1>
            Trezor Bridge
            <VersionBadge version={version} />
        </h1>
        <div>It looks like Trezor Bridge is already installed. You can proceed to the next step</div>
    </React.Fragment>
);

BridgeInstalledCase.propTypes = {
    version: PropTypes.string,
};

class BridgeStep extends React.Component {
    componentDidMount() {
        this.props.state.Connect.default.renderWebUSBButton('.webusb');
    }

    render() {
        return (
            <StepWrapper className="wrapper">
                <StepHeadingWrapper>
                    <Heading1>Establish connection with your device</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        (this.props.state.transport.actual.type !== 'bridge' && this.props.state.transport.toBeUsed === 'bridge') && <BridgeNotInstalledCase />
                    }
                    {
                        (this.props.state.transport.actual.type === 'bridge' && this.props.state.transport.toBeUsed === 'bridge') && <BridgeInstalledCase />
                    }

                    {
                        (this.props.state.transport.actual.type === 'webUSB' && this.props.state.transport.toBeUsed === 'webUSB') && <WebUSBCase />
                    }
                    <div className="webusb" />
                    <div className="trezor-webusb-button">bla</div>
                    <div className="trezor-webusb-button" />
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default BridgeStep;