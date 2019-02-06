import React from 'react';

import { UnorderedList } from 'components/lists';

const StartStepError = ({ state }) => {
    if (state.error === 'reset-device-err' || true) {
        return (
            <div>
                <div>Failed to create wallet</div>
                <div>
                This might happen due to number of reasons:
                </div>

                <UnorderedList items={[
                    'Some other window or application is communicatig with your device',
                    'Cable is not well connected',
                    'Cable is broken',
                ]}
                />

                <div>Please try again. If the problem persists, contact our support.</div>
            </div>

        );
    }
    return null;
};

export default StartStepError;