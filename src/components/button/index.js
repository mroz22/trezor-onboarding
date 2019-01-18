import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
    <button onClick={props.onClick} type="button">{props.text}</button>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button;