import React from 'react';
import { Flags } from 'trezor-flags';
import {
    H1, P, Link, ButtonText,
} from 'trezor-ui-components';
import { PHISING_URL } from 'config/urls';
import { types } from 'config/types';
import { StepWrapper, StepBodyWrapper, StepHeadingWrapper } from '../../Wrapper';

class BookmarkStep extends React.Component {
    async setBookmarkFlagAndContinue() {
        const flags = Flags.setFlag('hasBookmark', this.props.state.device.features.flags);
        await this.props.actions.applyFlags(flags);
        this.props.actions.nextStep();
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Bookmark</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <P>
                    Protect yourself against <Link isGreen href={PHISING_URL}>phishing attacks</Link>.
                    Bookmark Trezor Wallet (wallet.trezor.io) to avoid visiting fake sites. Use the keyboard shortcut Ctrl / ⌘ + D
                    </P>
                    <ButtonText onClick={() => this.setBookmarkFlagAndContinue()}>Continue</ButtonText>
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

BookmarkStep.propTypes = types;

export default BookmarkStep;
