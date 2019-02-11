/* @flow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';

import colors from 'config/colors';
import { FONT_SIZE, FONT_WEIGHT } from 'config/constants';
// import ICONS from 'config/icons';

import {
    Select, Link, H1, H2, ButtonText, P, Icon,
} from 'trezor-ui-components';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    padding: 0 24px;
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 500px;
    flex: 1;
    padding-top: 30px;
`;

const Bottom = styled.div`
    padding-bottom: 20px;
`;

const TitleHeader = styled(H1)`
    display: flex;
    font-size: ${FONT_SIZE.HUGE};
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const Version = styled.span`
    color: ${colors.GREEN_PRIMARY};
    padding: 6px 10px;
    border: 1px solid ${colors.GREEN_PRIMARY};
    border-radius: 3px;
    font-size: ${FONT_SIZE.BASE};
    font-weight: ${FONT_WEIGHT.LIGHT};
    margin-left: 24px;
`;

const LearnMoreText = styled.span`
    margin-right: 4px;
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

const DownloadBridgeButton = styled(ButtonText)`
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const GoBack = styled.span`
    color: ${colors.GREEN_PRIMARY};
    text-decoration: underline;
    &:hover {
        cursor: pointer;
        text-decoration: none;
    }
`;

const Ol = styled.ul`
    margin: 0 auto;
    color: ${colors.TEXT_SECONDARY};
    font-size: ${FONT_SIZE.BIG};
    padding: 0px 0 15px 25px;
    text-align: left;
`;

const Li = styled.li`
    text-align: justify;
`;

class InstallBridge extends PureComponent {
    constructor(props) {
        super(props);

        const installers = props.state.transport.new.installers.map(p => ({
            label: p.name,
            value: p.url,
            signature: p.signature,
            preferred: p.preferred,
        }));

        const currentTarget = installers.find(i => i.preferred === true);
        this.state = {
            currentVersion: props.state.transport.actual.type === 'bridge' ? `Your version ${props.state.transport.actual.version}` : 'Not installed',
            latestVersion: props.state.transport.new.version.join('.'),
            installers,
            target: currentTarget || installers[0],
            uri: 'https://data.trezor.io/',
        };
    }

    onChange(value) {
        this.setState({
            target: value,
        });
    }

    render() {
        const { target } = this.state;

        return (
            <Wrapper>
                <Top>
                    <TitleHeader>
                    Trezor Bridge<Version>2.xx</Version>
                    </TitleHeader>
                    <P>New communication tool to facilitate the connection between your Trezor and your internet browser.</P>
                    <Download>
                        <SelectWrapper
                            isSearchable={false}
                            isClearable={false}
                            value={target}
                            onChange={v => this.onChange(v)}
                            options={this.state.installers}
                        />
                        <Link href={`${this.state.uri}${target.value}`}>
                            <DownloadBridgeButton>
                                {/* <Icon
                                    icon={ICONS.DOWNLOAD}
                                    color={colors.WHITE}
                                    size={30}
                                /> */}
                                Download latest Bridge {this.state.latestVersion}
                            </DownloadBridgeButton>
                        </Link>
                    </Download>

                    <P>
                        {target.signature && (
                            <Link
                                href={this.state.uri + target.signature}
                                isGreen
                            >Check PGP signature
                            </Link>
                        )}
                    </P>
                </Top>
                <Bottom>
                    {/* {this.props.transport.type && (
                        <P>
                                No, i dont want to upgrade Bridge now<br />
                                Take me <GoBack onClick={() => this.props.selectFirstAvailableDevice()}>back to the wallet</GoBack>
                        </P>
                    )} */}
                </Bottom>
            </Wrapper>
        );
    }
}

export default InstallBridge;