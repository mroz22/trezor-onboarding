import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'config/colors';

const OptionWrapper = styled.div`
    height: 200px;
    width: 170px;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border: solid 1px ${colors.gray};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`;

const OptionText = styled.div`
`;

const Circle = styled.div`
    background-color: ${colors.brandPrimary};
    border-radius: 50%;
    height: 20px;
    width: 20px;
    align-self: flex-end;
`;


const Option = props => (
    <OptionWrapper onClick={props.onClick} style={{ borderColor: props.isSelected ? colors.brandPrimary : colors.gray }}>
        <Circle style={{ visibility: props.isSelected ? 'visible' : 'hidden' }} />
        <OptionText>{props.text}</OptionText>
    </OptionWrapper>
);

Option.propTypes = {
    text: PropTypes.string,
    isSelected: PropTypes.bool,
};

export default Option;