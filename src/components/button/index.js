import React from 'react';
import PropTypes from 'prop-types';

const button = props => (
    <button type="button">{props.text}</button>
);


button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default button;