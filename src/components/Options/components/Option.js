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
        { props.content }
    </OptionWrapper>
);

Option.propTypes = {
    content: PropTypes.object, // todo probably required
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Option;