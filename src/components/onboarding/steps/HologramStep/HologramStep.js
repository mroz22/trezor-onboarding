import React from 'react';
import styled from 'styled-components';

import {
    H1, ButtonText, P,
} from 'trezor-ui-components';

import { types } from 'config/types';
// import { SUPPORT_URL } from 'config/urls';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from 'components/onboarding/components/Wrapper';
import Hologram from './Hologram';

class HologramStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'initial',
        };
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Please make sure the hologram on the box is authentic</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <Hologram model={this.props.state.selectedModel} />

                    <ControlsWrapper>
                        <ButtonText onClick={this.props.actions.nextStep}>My hologram is OK</ButtonText>
                        <ButtonText onClick={() => this.setState({ status: 'hologram-different' })} isWhite>
                        My hologram looks different
                        </ButtonText>
                    </ControlsWrapper>
                    {
                        this.state.status === 'hologram-different' && (
                            <React.Fragment>
                                <P>Please contact our support</P>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

HologramStep.propTypes = types;


export default HologramStep;