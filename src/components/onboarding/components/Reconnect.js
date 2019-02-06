import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { UnorderedList } from 'components/lists';
import { TrezorConnect } from 'components/prompts';

const ReconnectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Reconnect = ({ model }) => (
    <ReconnectWrapper>
        <div>Reconnect your device</div>
        <TrezorConnect model={model} />
        <div>
            We lost connection with your device. This might mean:
        </div>
        <UnorderedList items={[
            'Device is not well connected to cable',
            'Cable is wrong',
            'If in chrome, usb might have been disabled in settings',
            'Trezor bridge might have stopped working',
        ]}
        />
    </ReconnectWrapper>
);

Reconnect.propTypes = {
    model: PropTypes.string.isRequired,
};

export default Reconnect;