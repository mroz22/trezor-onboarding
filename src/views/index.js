import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';

import Onboarding from 'components/onboarding';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const App = () => (
    <Wrapper>
        <Onboarding />
    </Wrapper>
);

export default hot(App);
