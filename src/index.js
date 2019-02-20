import React from 'react';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'support/BaseStyles';
import { Provider } from 'react-redux';
import App from 'views/index';
import configureStore from './configureStore';

const store = configureStore();

const root = document.getElementById('root');

if (root) {
    render(
        <Provider store={store}>
            <React.Fragment>
                <Normalize />
                <BaseStyles />
                <App />
            </React.Fragment>
        </Provider>,
        root // eslint-disable-line
    );
}
