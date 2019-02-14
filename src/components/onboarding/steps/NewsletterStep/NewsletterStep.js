import React from 'react';
import styled from 'styled-components';
import {
    H1, P, ButtonText, Link,
} from 'trezor-ui-components';
import { Flags } from 'trezor-flags';
import { SOCIAL_FACEBOOK_URL, SOCIAL_BLOG_URL, SOCIAL_TWITTER_URL } from 'config/urls';
import { IconSocial } from 'components/icons';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const SocialWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    & * {
        margin: auto 5px auto 5px
    }
`;

class NewsleterStep extends React.Component {
    applyHasEmailFlagAndContinue() {
        const flags = Flags.setFlag('hasEmail', this.props.state.device.features.flags);
        this.props.actions.applyFlags(flags);
        this.props.actions.nextStep();
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Stay in touch</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <P>Receive information on important security updates</P>
                    <SocialWrapper>
                        <P>Follow us on: </P>
                        <Link href={SOCIAL_BLOG_URL}>
                            <IconSocial name="medium" />
                        </Link>
                        <Link href={SOCIAL_FACEBOOK_URL}>
                            <IconSocial name="facebook" />
                        </Link>
                        <Link href={SOCIAL_TWITTER_URL}>
                            <IconSocial name="twitter" />
                        </Link>
                    </SocialWrapper>
                    <ControlsWrapper>
                        <ButtonText onClick={() => this.applyHasEmailFlagAndContinue()}>Continue</ButtonText>
                    </ControlsWrapper>
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

export default NewsleterStep;