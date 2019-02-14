import React from 'react';

class Dots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        };
        this.interval = null;
        this.willUnmount = false;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.willUnmount) {
                return;
            }
            if (this.state.count < this.props.maxCount) {
                this.setState(prevState => ({ count: prevState.count + 1 }));
            } else {
                this.setState({ count: 1 });
            }
        }, this.props.speed);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <React.Fragment>
                { '.'.repeat(this.state.count)}
            </React.Fragment>
        );
    }
}

Dots.defaultProps = {
    maxCount: 3,
    speed: 1000,
};

export default Dots;