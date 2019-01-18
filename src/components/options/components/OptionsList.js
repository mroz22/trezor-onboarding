import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Option from './Option';

const OptionsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const OptionsList = props => (
    <OptionsWrapper>
        {props.options.map(opt => (
            <Option
                onClick={() => props.onSelect(opt.text)}
                key={opt.text}
                text={opt.text}
                isSelected={opt.text === props.selected}
            />
        ))}
    </OptionsWrapper>
);

OptionsList.propTypes = {
    options: PropTypes.array, // todo: better
    selected: PropTypes.string, // todo: better
    onSelect: PropTypes.func, // todo: better
};

export default OptionsList;