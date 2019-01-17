import React from 'react';
import PropTypes from 'prop-types';

class Option extends React.Component {
    static propTypes = {
        text: PropTypes.string,
    }

    constructor() {
        super();
    }

    render() {
        return (<div>opt</div>);
    }
}

export default Option;