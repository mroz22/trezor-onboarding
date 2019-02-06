import React from 'react';
import styled from 'styled-components';

import { Heading1 } from 'components/headings';

import { IconSocial } from 'components/icons';
import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../components/Wrapper';


const SocialWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    & * {
        margin: 10px
    }
`;
const FinalStep = () => (
    <StepWrapper>
        <StepHeadingWrapper>
            <Heading1>Good job!</Heading1>
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <div>Now you are as secure, as a regular bank.</div>
            <button type="button">Continue to wallet</button>

            <SocialWrapper>
                <div>Follow us on: </div>
                <IconSocial name="medium" />
                <IconSocial name="facebook" />
                <IconSocial name="twitter" />
            </SocialWrapper>
        </StepBodyWrapper>
    </StepWrapper>
);

export default FinalStep;
