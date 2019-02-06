import React from 'react';
import styled from 'styled-components';
import colors from 'config/colors';

import { Heading1 } from 'components/headings';

const ErrorWrapper = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`;

const Attribution = styled.div`
    margin-top: auto;
    text-align: center;
    color: ${colors.grayDark};
    size: 0.5em;
`;

const Bug = styled.div`
    background-image: url('src/components/onboarding/components/bug.png');
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
                            <Heading1>
                        Unfortunately, a bug occured. While you read this, our developers are already being tortured by their masters and are working hard to fix this.
                            </Heading1>
                        </Message>

                    </ErrorWrapper>

                    <Attribution>
                        Fancy bug icon by Font Awesome Free 5.2.0 by @fontawesome - https://fontawesome.com
                    </Attribution>
                </React.Fragment>

            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;