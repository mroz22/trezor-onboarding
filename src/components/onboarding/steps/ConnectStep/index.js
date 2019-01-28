import React from 'react';
import styled from 'styled-components';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../components/Wrapper';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ConnectStep = () => (
    <StepWrapper className="wrapper">
        <StepHeadingWrapper>
            <Heading1>Time to connect your device</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <video height={240} autoPlay loop>
                <source src="src/components/onboarding/steps/ConnectStep/trezor-click-2.gif.mp4" type="video/mp4" />
            </video>
            <div>Just make sure its well connected to avoid communication failures</div>
        </StepBodyWrapper>
    </StepWrapper>

    // <Wrapper>
    //     <video height={240} autoPlay loop>
    //         <source src="src/components/onboarding/steps/ConnectStep/trezor-click-2.gif.mp4" type="video/mp4" />
    //     </video>
    // </Wrapper>
);

export default ConnectStep;