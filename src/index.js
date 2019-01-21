import React from 'react';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'support/BaseStyles';
import App from 'views/index';

import TrezorConnect, { DEVICE_EVENT, TRANSPORT_EVENT } from 'trezor-connect';

const state = {};

TrezorConnect.on(DEVICE_EVENT, (event) => {
    console.warn('event', event);
});

TrezorConnect.on(TRANSPORT_EVENT, (event) => {
    if (event.type === 'transport-start') {
        state.transport = {
            type: event.payload.type,
            version: event.payload.version,
        };
    }
    console.warn('event', event);
});

TrezorConnect.init({
    // transportReconnect: true,
    debug: true,
    popup: false,
    webusb: true,
}).then(() => {
    const root = document.getElementById('root');
    if (root) {
        render(
            <React.Fragment>
                <Normalize />
                <BaseStyles />
                <App state={state} />
            </React.Fragment>,
                root // eslint-disable-line
        );
    }
}).catch((err) => {
    console.error(err);
});
