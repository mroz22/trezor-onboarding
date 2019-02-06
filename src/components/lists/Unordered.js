import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'config/colors';

const ListItem = styled.li`
    margin-bottom: 14px;
    &:before {
        content: "●";
        padding-right: 7px;
        color: ${colors.grayDark}
    }
`;

const UnorderedListWrapper = styled.ul`
    list-style: none;
`;

const UnorderedList = ({ items }) => (
    <UnorderedListWrapper>
        {
            items.map(item => <ListItem key={item}>{item}</ListItem>)
        }
    </UnorderedListWrapper>
);

UnorderedList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
};

export default UnorderedList;