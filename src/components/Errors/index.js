import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import { P } from 'trezor-ui-components';

const ErrorWrapper = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`;

const Attribution = styled.div`
    margin-top: auto;
    text-align: center;
`;

const Bug = styled.div`
    background-image: url('src/components/Errors/images/bug.png');
    background-color: transparent;
    background-size: contain;
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
`;

const Message = styled.div`
    text-align: center;
    padding-top: 20px;
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log('getDerivedStateFromError', error);
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('componentDidCatch', error);
        console.log('componentDidCatch', info);
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <React.Fragment>
                    <ErrorWrapper>
                        <Bug />
                        <Message>
                            <P>
                            Unfortunately, a bug occured. While you read this, our developers are already being tortured by their masters and are working hard to fix this.
                            </P>
                        </Message>
                    </ErrorWrapper>

                    <Attribution>
                        <P isSmaller>
                        Fancy bug icon by Font Awesome Free 5.2.0 by @fontawesome - https://fontawesome.com
                        </P>
                    </Attribution>
                </React.Fragment>

            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: Proptypes.node.isRequired,
};

export default ErrorBoundary;