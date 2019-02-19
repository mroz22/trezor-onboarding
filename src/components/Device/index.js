/*
TODO: NOT USED NOW
*/

import React from 'react';
import styled from 'styled-components';

import colors from 'config/colors';
import Proptypes from 'prop-types';

const DeviceWrapper = styled.div`
    background-color: ${colors.grayLight};
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 600px;
    min-width: 300px;
    width: 40vw;
`;

const Device = ({ device }) => {
    if (!device) {
        return <div>No device detected</div>;
    }
    return (
        <DeviceWrapper style={{
            backgroundColor: device.isFresh() ? colors.grayLight : colors.danger,
        }}
        >
            <React.Fragment>
                <div>todo img</div>
                <div>path: {device.path}</div>
                {
                    !device.isFresh()
                    && <div>This device was manipulated with before. You should not use it and contact Trezor suppport immediately.</div>
                }
            </React.Fragment>
        </DeviceWrapper>
    );
};

Device.propTypes = {
    device: Proptypes.object, // todo: better
};

export {
    Device,
};