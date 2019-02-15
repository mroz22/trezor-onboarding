import React from 'react';
import { P, Link } from 'trezor-ui-components';
import { UnorderedList } from 'components/lists';

const instructions = [{
    component: <P>Some other window or application is communicatig with your device</P>,
    key: '1',
}, {
    component: <P>Cable is not well connected</P>,
    key: '2',
}, {
    component: <P>Cable is broken</P>,
    key: '3',
}];

const StartStepError = ({ state }) => {
    if (state.error === 'reset-device-err' || true) {
        return (
            <React.Fragment>
                <div>Failed to create wallet</div>
                <div>
                This might happen due to number of reasons:
                </div>

                <UnorderedList items={instructions}/>

                <div>Please try again. If the problem persists, contact our support.</div>
            </React.Fragment>

        );
    }
    return null;
};

export default StartStepError;