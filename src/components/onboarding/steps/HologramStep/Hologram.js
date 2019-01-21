import React from 'react';
import PropTypes from 'prop-types';

const Hologram = (props) => {
    const path = 'src/components/onboarding/steps/HologramStep/videos';
    const sources = {
        1: 'T1_hologram.mp4',
        2: 'TT_hologram.mp4',
    };
    return (
        <video width={320} height={240} autoPlay loop>
            <track src={`${path}/track.vtt`} kind="descriptions" />
            <source src={`${path}/${sources[props.model]}`} type="video/mp4" />
        </video>

    );
};

Hologram.propTypes = {
    model: PropTypes.number.isRequired,
};

export default Hologram;