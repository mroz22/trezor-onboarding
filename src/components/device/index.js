import React from 'react';

const Device = ({ device }) => (
    <React.Fragment>
        <div>todo img</div>
        <div>model: { device.features.major_version}</div>
        <div>path: {device.path}</div>
    </React.Fragment>
);

export {
    Device,
};