import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';

import Onboarding from 'components/onboarding';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 40px;
`;

const App = ({state}) => (
    <Wrapper>
        <Onboarding state={state} />
    </Wrapper>
);

export default hot(App);
