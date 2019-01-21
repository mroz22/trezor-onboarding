import React from 'react';
import styled from 'styled-components';

import colors from 'config/colors';
import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

const VersionBadgeWrapper = styled.div`
    border: 1px solid ${colors.brandPrimary};
`;

const VersionBadge = ({ version }) => (
    <VersionBadgeWrapper>
        {version}
    </VersionBadgeWrapper>
);

const BridgeStep = props => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper className="blabla">
            <Heading1>Install bridge</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <h1>Trezor Bridge</h1>
            <div>New communication tool to facilitate the connection between your Trezor and your internet browser</div>
            <VersionBadge version={props.state.transport.version} />
        </StepBodyWrapper>
    </StepWrapper>
);


export default BridgeStep;