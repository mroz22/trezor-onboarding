import React from 'react';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'support/BaseStyles';
import App from 'views/index';

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
