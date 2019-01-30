import React from 'react';
import styled from 'styled-components';

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

export default UnorderedList;