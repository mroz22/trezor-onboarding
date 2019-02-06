/* eslint-disable */
 
import React from 'react';

const Checkbox = ({ label, value, name }) => (
    <div style={{
        flexDirection: 'row',
    }}
    >
        <input type="checkbox" name={name} value={value} /> { label }
    </div>
);

export {
    Checkbox,
};