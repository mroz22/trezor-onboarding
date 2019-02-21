/* @flow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    Select, Link, H1, Button, P,
} from 'trezor-ui-components';

import colors from 'config/colors';
import { FONT_SIZE, FONT_WEIGHT } from 'config/constants';
import { types } from 'config/types';

import { UnorderedList } from 'components/Lists';
import { Dots } from 'components/Loaders';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../Wrapper';

const Version = styled.span`
    color: ${colors.GREEN_PRIMARY};
    padding: 6px 10px;
    border: 1px solid ${colors.GREEN_PRIMARY};
    border-radius: 3px;
    font-size: ${FONT_SIZE.BASE};
    font-weight: ${FONT_WEIGHT.LIGHT};
    margin-left: 24px;
`;

const SelectWrapper = styled(Select)`
    margin-right: 10px;
    width: 180px;
    margin-bottom: 5px;
`;

const Download = styled.div`
    margin: 24px auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const DownloadBridgeButton = styled(Button)`
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

class InstallBridge extends PureComponent {
    constructor(props) {
        super(props);
        const installers = this.getInstallers();
        this.state = {
            target: installers.find(i => i.preferred === true) || installers[0],
            uri: 'https://data.trezor.io/',
            installers,
            status: 'initial',
        };
    }

    onChange(value) {
        this.setState({
            target: value,
        });
    }

    getStatus() {
        if (this.props.transport.type === 'bridge') {
            return 'installed';
        }
        return this.state.status;
    }

    getInstallers() {
        return this.props.transport.bridge.packages.map(p => ({
            label: p.name,
            value: p.url,
            signature: p.signature,
            preferred: p.preferred,
        }));
    }

    render() {
        const { target, uri, installers } = this.state;
        const status = this.getStatus();
        const installInstructions = [{
            component: <P>Wait for file to download</P>,
            key: '1',
        }, {
            component: <P>Double click it to run installer</P>,
            key: '2',
        }];
        if (target.signature) {
            installInstructions.push({
                component: (
                    <Link
                        href={uri + target.signature}
                        isGreen
                    > Optional. Check PGP signature
                    </Link>),
                key: '3',
            });
        }
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>
                        Trezor Bridge
                        <Version>
                            { status === 'installed' ? this.props.transport.version : 'not installed' }
                        </Version>
                    </H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>

                    {
                        status === 'initial' && (
                            <React.Fragment>
                                <P>Trezor Bridge is a communication tool to facilitate the connection between your Trezor and your internet browser.</P>
                                <Download>
                                    <SelectWrapper
                                        isSearchable={false}
                                        isClearable={false}
                                        value={target}
                                        onChange={v => this.onChange(v)}
                                        options={installers}
                                    />
                                    <Link href={`${uri}${target.value}`}>
                                        <DownloadBridgeButton onClick={() => this.setState({ status: 'downloading' })}>
                                            Download
                                        </DownloadBridgeButton>
                                    </Link>
                                </Download>
                            </React.Fragment>
                        )
                    }

                    {
                        status === 'downloading' && (
                            <React.Fragment>
                                <UnorderedList items={installInstructions} />
                                <br />
                                <P>Detecting Trezor Bridge instalation</P>
                                <P><Dots maxCount={3} /></P>

                            </React.Fragment>
                        )
                    }

                    {
                        status === 'installed' && (
                            <React.Fragment>
                                <H1>Trezor bridge was successfully installed</H1>
                                <ControlsWrapper>
                                    <Button onClick={this.props.onboardingActions.goToNextStep}>Continue</Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }


                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

InstallBridge.propTypes = types;

export default InstallBridge;

/*
bridge:
changelog: (6) ["Use interrupt reads without timeouts even on FreeBSD and linux", "Stop using hidapi for t1 on linux", "Lowlevel code cleanup", "Add debuglink support (UDP + libusb)", "Add support for one-directional calls (read, write)", "Fix windows 7 driver installer when run first time"]
directory: "bridge/2.0.25/"
packages: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
version: (3) [2, 0, 25]
__proto__: Object
outdated: false
type: "bridge"
version: "2.0.25"
*/
