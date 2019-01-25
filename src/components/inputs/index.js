import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, value, name }) => (
    <div style={{
        flexDirection: 'row',
    }}
    >
        <input type="checkbox" name={name} value={value} /> { label }
    </div>
);

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
};

export {
    Checkbox,
};