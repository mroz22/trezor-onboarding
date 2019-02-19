import React from 'react';
import {
    H1, Button, P, Link,
} from 'trezor-ui-components';

import { TREZOR_RESELLERS_URL, SUPPORT_URL } from 'config/urls';
import { types } from 'config/types';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../Wrapper';
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
                    {
                        this.state.status !== 'hologram-different' && (
                            <React.Fragment>
                                <Hologram model={this.props.state.selectedModel} />

                                <ControlsWrapper>
                                    <Button onClick={this.props.actions.nextStep}>My hologram is OK</Button>
                                    <Button onClick={() => this.setState({ status: 'hologram-different' })} isWhite>
                                        My hologram looks different
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.status === 'hologram-different' && (
                            <React.Fragment>
                                <P>Did you purchase your device from <Link href={TREZOR_RESELLERS_URL}>a trusted reseller</Link>?
                                If no, device you are holding in hands might be a counterfeit. Please <Link href={SUPPORT_URL}>contact our support</Link>
                                </P>
                                <ControlsWrapper>
                                    <Button isWhite onClick={() => this.setState({ status: 'initial' })}>Back</Button>
                                    <Link href={SUPPORT_URL}>
                                        <Button>Contact support</Button>
                                    </Link>
                                </ControlsWrapper>
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