import React from 'react';
import styled from 'styled-components';

import { Heading1 } from 'components/headings';

import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../components/Wrapper';
import SocialLogo from './SocialLogo';

const SocialWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    & * {
        margin: 10px
    }
`;

const NewsleterStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Stay in touch</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Receive information on important security updates</div>
            {/* <Button text="Start" onClick={actions.nextStep} /> */}
            <SocialWrapper>
                <div>Follow us on: </div>
                <SocialLogo name="medium" />
                <SocialLogo name="facebook" />
                <SocialLogo name="twitter" />
            </SocialWrapper>
        </StepBodyWrapper>
    </StepWrapper>
);

export default NewsleterStep;