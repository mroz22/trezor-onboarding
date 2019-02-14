import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H1, P } from 'trezor-ui-components';

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
        <H1>Reconnect your device</H1>
        <TrezorConnect model={model} />
        <P>
            We lost connection with your device. This might mean:
        </P>
        <UnorderedList items={[
            'Device is not well connected to the cable',
            'Cable is broken, try another one',
            'Trezor bridge might have stopped working, try restarting',
        ]}
        />
    </ReconnectWrapper>
);

Reconnect.propTypes = {
    model: PropTypes.string.isRequired,
};

export default Reconnect;