import React from 'react';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../components/Wrapper';

const ConnectStep = ({ state }) => {
    const path = 'src/components/onboarding/steps/ConnectStep';
    const models = {
        1: 'trezor-click-1.mp4',
        2: 'trezor-click-2.mp4',
    };
    return (
        <StepWrapper className="wrapper">
            <StepHeadingWrapper>
                <Heading1>Time to connect your device</Heading1>
            </StepHeadingWrapper>
            <StepBodyWrapper>
                <video height={240} autoPlay loop>
                    <source src={`${path}/${models[state.selectedModel]}`} type="video/mp4" />
                </video>
                <div>Just make sure its well connected to avoid communication failures</div>
            </StepBodyWrapper>
        </StepWrapper>
    );
};

export default ConnectStep;