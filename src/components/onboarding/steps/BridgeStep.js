import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { types } from 'config/state';
import colors from 'config/colors';
import { Heading1 } from 'components/headings';
import { Device } from 'components/device';

import { ReplaySubject } from 'rxjs';
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

class BridgeStep extends React.Component {
    componentDidMount() {
        console.log('did mount :D');
    }

    downloadBridge = async () => {
        const url = 'https://data.trezor.io/bridge/2.0.25/trezor-bridge_2.0.25_amd64.deb';
        try {
            const data = await fetch(url, { credentials: 'same-origin' });
            // .then(res => res.blob())
            // .then(d => d);
            console.log('data', data);
        } catch (err) {
            console.log('err', err);
        }
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <Heading1>Establish connection with your device</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <h1>
                        Trezor Bridge
                        {/* <VersionBadge version={props.state.transport.version} /> */}
                    </h1>
                    <div>A communication tool to facilitate the connection between your Trezor and your internet browser</div>
                    {
                        (this.props.state.transport.actual.type !== 'bridge' || this.props.state.transport.error)
                        && (
                            <React.Fragment>
                                <div>Install bridge to establish communication with your device</div>
                                <ul>
                                    <li>Download bridge</li>
                                    <li>Install bridge</li>
                                    <li>Check connection</li>
                                    <a
                                        href="https://data.trezor.io/bridge/2.0.25/trezor-bridge_2.0.25_amd64.deb"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <button type="button">
                                        Download
                                        </button>
                                    </a>
                                </ul>
                            </React.Fragment>
                        )
                    }

                    {
                        (this.props.state.transport.actual.type === 'bridge' && !this.props.state.transport.error)
                        && (
                            <React.Fragment>
                                <br />
                                <div>Trezor Bridge is installed, runs on background and does all the hard job.</div>
                                <br />
                                <div>Connected device: </div>
                                { this.props.state.device && <Device device={this.props.state.device} />}
                            </React.Fragment>
                        )
                    }

                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default BridgeStep;