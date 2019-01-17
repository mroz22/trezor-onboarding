import React from 'react';
import PropTypes from 'prop-types';

const IconCheck = props => (<span style={props.style}>✔</span>);

IconCheck.propTypes = {
    style: PropTypes.object,
};

export default IconCheck;