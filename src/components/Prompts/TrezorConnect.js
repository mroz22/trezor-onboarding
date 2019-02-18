/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import t1video from 'components/Prompts/videos/trezor-click-1.mp4';
import t2video from 'components/Prompts/videos/trezor-click-2.mp4';

const TrezorConnect = ({ model }) => {
    const models = new Map([
        ['1', t1video],
        ['2', t2video],
    ]);
    return (
        <video height={240} autoPlay loop>
            <source src={models.get(model)} type="video/mp4" />
        </video>
    );
};

TrezorConnect.propTypes = {
    model: PropTypes.string.isRequired,
};

export default TrezorConnect;