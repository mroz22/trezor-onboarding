import React from 'react';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'support/BaseStyles';
import App from 'views/index';

// import TrezorConnect, { DEVICE_EVENT, TRANSPORT_EVENT } from 'trezor-connect';

// TrezorConnect.on(DEVICE_EVENT, (event) => {
//     console.warn('event', event);
// });

// TrezorConnect.on(TRANSPORT_EVENT, (event) => {
//     console.warn('event', event);
// });

// TrezorConnect.init({
//     // transportReconnect: true,
//     debug: true,
//     popup: false,
//     webusb: false,
// }).then(() => {
const root = document.getElementById('root');
if (root) {
    render(
        <React.Fragment>
            <Normalize />
            <BaseStyles />
            <App />
        </React.Fragment>,
                root // eslint-disable-line
    );
}
// }).catch((err) => {
//     console.error(err);
// });
