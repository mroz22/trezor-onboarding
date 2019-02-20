import React from 'react';
import styled from 'styled-components';
import {
    P, H2, Button, Link, PinButton, PinInput,
} from 'trezor-ui-components';

const InputWrapper = styled.div`
    margin-top: 24px;
    max-width: 260px;
`;

const PinRow = styled.div``;

const PinFooter = styled.div`
    margin: 20px 0 10px 0;
    display: flex;
    flex-direction: column;
`;

const PinMatrix = () => (
    <React.Fragment>
        <H2>Enter Trezor PIN</H2>
        <P isSmaller>
            The PIN layout is displayed on your Trezor.
        </P>
        <PinButton />
        {/* <InputWrapper>
            <PinInput onDeleteClick={() => { console.log('pin delete clicked'); }} value="" />
        </InputWrapper>
        <PinRow>
            <PinButton>•</PinButton>
            <PinButton>•</PinButton>
            <PinButton>•</PinButton>
        </PinRow>
        <PinRow>
            <PinButton>•</PinButton>
            <PinButton>•</PinButton>
            <PinButton>•</PinButton>
        </PinRow>
        <PinRow>
            <PinButton>•</PinButton>
            <PinButton>•</PinButton>
            <PinButton>•</PinButton>
        </PinRow>
        <PinFooter>
            <Button>
                Enter PIN
            </Button>
            <P isSmaller>
                Not sure how PIN works?
                <Link isGreen href="https://wiki.trezor.io/User_manual:Entering_PIN">
                    Learn more
                </Link>
            </P>
        </PinFooter> */}
    </React.Fragment>
);

export default PinMatrix;