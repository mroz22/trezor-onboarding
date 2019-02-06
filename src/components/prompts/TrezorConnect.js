import React from 'react';
import PropTypes from 'prop-types';

const TrezorConnect = ({ model }) => {
    const path = 'src/components/prompts/videos';
    const models = new Map([
        ['1', 'trezor-click-1.mp4'],
        ['2', 'trezor-click-2.mp4'],
    ]);
    return (
        <video height={240} autoPlay loop>
            <source src={`${path}/${models.get(model)}`} type="video/mp4" />
        </video>
    );
};

TrezorConnect.propTypes = {
    model: PropTypes.string.isRequired,
};

export default TrezorConnect;