import React from 'react';
import * as conditions from 'utils/conditions';
import { P } from 'trezor-ui-components';
import Reconnect from '../Reconnect';
import { StepWrapper, StepBodyWrapper } from '../Wrapper';

const UnexpectedStateCommon = ({ children }) => (
    <StepWrapper>
        {/* <StepHeadingWrapper>
            <H1>Unexpected state</H1>
        </StepHeadingWrapper> */}
        <StepBodyWrapper>
            {children}
        </StepBodyWrapper>
    </StepWrapper>
);

const IsSameDevice = () => (
    <P>Device you reconnected is different from the previous device. Connect the right one or refresh your internet browser and start again.</P>
);

const DeviceHasBackup = () => (
    <P>Connected device does not have backup finished.</P>
);

const UnexpectedState = ({ caseType, model }) => {
    switch (caseType) {
        case conditions.DEVICE_IS_CONNECTED:
            // todo: reconnect might have the same wrappers as UnexpectedStateCommon
            return <UnexpectedStateCommon><Reconnect model={model} /></UnexpectedStateCommon>;
        case conditions.IS_SAME_DEVICE:
            return <UnexpectedStateCommon><IsSameDevice /></UnexpectedStateCommon>;
        case conditions.DEVICE_HAS_BACKUP:
            return <UnexpectedStateCommon><DeviceHasBackup /></UnexpectedStateCommon>;
        default:
            throw new Error(`wrong type ${caseType}`);
    }
};

export default UnexpectedState;
