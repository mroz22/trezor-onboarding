import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'config/colors';

const OptionWrapper = styled.div`
    height: 200px;
    width: 100px;
    border: solid 1px ${colors.gray}
`;

class Option extends React.Component {
    static propTypes = {
        text: PropTypes.string,
    }

    render() {
        return (<OptionWrapper>{this.props.text}</OptionWrapper>);
    }
}

export default Option;