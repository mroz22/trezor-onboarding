import React from 'react';
import styled from 'styled-components';
import {
    H1, P, Button, Link, Input,
} from 'trezor-ui-components';
import ReactTimeout from 'react-timeout';
import { Flags } from 'trezor-flags';
import { types } from 'config/types';
import { SOCIAL_FACEBOOK_URL, SOCIAL_BLOG_URL, SOCIAL_TWITTER_URL } from 'config/urls';
import { IconSocial } from 'components/Icons';
import { validateEmail } from 'utils/validate';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../Wrapper';

const MAILCHIMP_URL = '//trezor.us7.list-manage.com/subscribe/post-json?u=a87eb6070c965ef1be1b02854&id=0ac8b24e69&c=?&group[1][2]=true&EMAIL=';

const SocialWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    margin-bottom: 30px;
    & * {
        margin: auto 8px auto 8px
    }
`;

// todo: currently the same InputWrapper used also in NameStep
const InputWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    height: 70px;
`;

class NewsleterStep extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            status: 'initial',
            emailSendStatus: '', // sending || success || error \\ skipped
        };
    }

    handleInputChange = (event) => {
        this.setState({ email: event.target.value });
    }

    validateInput = () => {
        if (!this.state.email) {
            return { state: '' };
        }
        if (!validateEmail(this.state.email)) {
            return { state: 'error', bottomText: 'wrong email format' };
        }
        return { state: 'success' };
    }

    submitEmail = () => {
        const url = MAILCHIMP_URL + encodeURIComponent(this.emailAddress);
        // this fails due to cors but submits successfully. should not fail on trezor.io domain
        this.setState({ emailSendStatus: 'sending' });
        // 1 second to make it more interactive;
        this.props.setTimeout(async () => {
            try {
                console.warn('url', url);
                const response = await fetch(url, { method: 'GET' });
                console.warn('response', response);
                this.setState({ status: 'social' });
                this.setState({ emailSendStatus: 'success' });

                await this.applyHasEmailFlag();
            } catch (err) {
                console.warn('err', err);
                this.setState({ emailSendStatus: 'error' });
                // todo: tudu tudu
                // todo: handle email error
                // todo: handle setFlag Error;
            }
        }, 1000);
    }


    applyHasEmailFlag = () => {
        const flags = Flags.setFlag('hasEmail', this.props.state.device.features.flags);
        this.props.actions.applyFlags(flags);
    }

    getBottomText = () => {
        const { emailSendStatus } = this.state;
        if (emailSendStatus === 'sending') {
            return this.state.emailSendStatus;
        }
        if (emailSendStatus === 'error') {
            return 'failed to submit email';
        }
        return this.validateInput().bottomText;
    }

    skipEmail = () => {
        this.setState({ emailSendStatus: 'skipped' });
        this.applyHasEmailFlag(); // todo error handling;
        this.setState({ status: 'social' });
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Stay in touch</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.state.status === 'initial' && (
                            <React.Fragment>
                                <P>Receive information on important security updates</P>
                                <InputWrapper>
                                    <Input
                                        value={this.state.email}
                                        placeholder=""
                                        state={this.validateInput().state}
                                        bottomText={this.getBottomText()}
                                        onChange={this.handleInputChange}
                                    />
                                </InputWrapper>
                                <ControlsWrapper>
                                    <Button isWhite onClick={() => this.skipEmail()}>
                                        Skip
                                    </Button>
                                    <Button isDisabled={this.validateInput().state !== 'success'} onClick={this.submitEmail}>
                                        Submit
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'social' && (
                            <React.Fragment>
                                {
                                    this.state.emailSendStatus === 'success' && (
                                        <P>
                                            Thank you for providing your email. You can also follow us on socials:
                                        </P>
                                    )
                                }
                                {
                                    this.state.emailSendStatus === 'skipped' && (
                                        <P>
                                            You chose not to provide your email. This is Ok. If you want, you might still follow us on socials:
                                        </P>
                                    )
                                }
                                <SocialWrapper>
                                    <Link href={SOCIAL_BLOG_URL}>
                                        <IconSocial name="medium" sizeMultiplier={2} />
                                    </Link>
                                    <Link href={SOCIAL_FACEBOOK_URL}>
                                        <IconSocial name="facebook" sizeMultiplier={2} />
                                    </Link>
                                    <Link href={SOCIAL_TWITTER_URL}>
                                        <IconSocial name="twitter" sizeMultiplier={2} />
                                    </Link>
                                </SocialWrapper>
                                <ControlsWrapper>
                                    <Button onClick={() => this.props.actions.nextStep()}>Continue</Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

NewsleterStep.propTypes = types;

export default ReactTimeout(NewsleterStep);