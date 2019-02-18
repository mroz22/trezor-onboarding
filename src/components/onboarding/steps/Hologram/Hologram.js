/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import t1Hologram from 'components/onboarding/steps/Hologram/videos/T1_hologram.mp4';
import t2Hologram from 'components/onboarding/steps/Hologram/videos/TT_hologram.mp4';

const Hologram = (props) => {
    const sources = {
        1: t1Hologram,
        2: t2Hologram,
    };
    return (
        <video width={320} height={240} autoPlay loop>
            {/* <track src={`${path}/track.vtt`} kind="descriptions" /> */}
            <source src={sources[props.model]} type="video/mp4" />
        </video>
    );
};

Hologram.propTypes = {
    model: PropTypes.string.isRequired,
};

export default Hologram;