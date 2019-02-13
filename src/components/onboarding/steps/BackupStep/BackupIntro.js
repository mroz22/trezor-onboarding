import React from 'react';
import styled from 'styled-components';
import {
    H1, P, ButtonText, Checkbox,
} from 'trezor-ui-components';

import colors from 'config/colors';
import { types } from 'config/types';

// import { Checkbox } from 'components/inputs';
import { UnorderedList } from 'components/lists';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const BackupStepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 500px;
`;

const Panel = styled.div`
    background-color: ${colors.grayLight};
    color: ${colors.grayDark};
    padding: 15px 15px 15px 15px;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

class BackupStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userUnderstands: false,
        };
    }

    render() {
        const { device } = this.props.state;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>Seed is more important than your device</H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <BackupStepWrapper>
                        <P>
                            Owning cryptocurrencies means having a secret and not sharing it with anyone! Now your device will
                            tell you the secret. This will happen only once. Write it down and keep it safe. Never tell anyone!
                        </P>
                        <UnorderedList items={[
                            'Do not upload words on the internet.',
                            'Hide them somewhere safe.',
                            'Your device can be lost or stolen but seed means access to your money.',
                        ]}
                        />

                        <Panel>
                            <P>
                            Trezor cannot be held responsible for security liabilities or financial losses resulting from not following these security instructions
                            </P>
                        </Panel>
                        {/* TODO: checkbox - take it from UI components */}
                        <CheckboxWrapper>
                            <Checkbox
                                isChecked={this.state.userUnderstands}
                                onClick={() => this.setState(prevState => ({ userUnderstands: !prevState.userUnderstands }))}
                                // onClick={}
                            />
                            <P>I have read the instructions and agree</P>
                        </CheckboxWrapper>

                        <ControlsWrapper>
                            <ButtonText
                                onClick={this.props.actions.nextStep}
                                isDisabled={!this.props.state.device || !this.state.userUnderstands}
                            >
                            Start backup
                            </ButtonText>
                        </ControlsWrapper>

                    </BackupStepWrapper>

                    <div style={{ color: 'pink' }}>
                        device.features.needs_backup: { `${device.features.needs_backup}`}
                    </div>

                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

BackupStep.propTypes = {
    actions: types.actions,
    state: types.state,
};

export default BackupStep;