import styled from 'styled-components';
import colors from 'config/colors';

const Line = styled.div`
    flex-grow: 1;
    height: 1.3px;
    background-color: ${colors.brandPrimary};
    align-self: center;
`;

export default Line;