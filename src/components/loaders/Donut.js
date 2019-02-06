import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'config/colors';

import { IconCheck } from 'components/icons';

const DonutWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DonutContent = styled.div`
    position: absolute
`;

class Donut extends React.Component {
    isMounted = false;

    constructor({ progress }) {
        super();
        this.state = {
            showCheck: progress === 100,
        };
        console.log('this.isMounted', this.isMounted);
    }

    componentDidMount() {
        this.isMounted = true;
        console.log('this.isMounted', this.isMounted);
    }

    componentDidUpdate() {
        if (this.props.progress === 100 && !this.state.showCheck) {
            setTimeout(() => {
                console.log('this.isMounted comp did update', this.isMounted);
                if (this.isMounted) {
                    this.setState({ showCheck: true });
                }
            }, 1000);
        }
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    progress = percent => this.circumference(this.normalizeRadius()) - percent / 100 * this.circumference(this.normalizeRadius());

    circumference = radius => radius * 2 * Math.PI;

    normalizeRadius = () => this.props.radius - this.props.stroke; //* 2;

    render() {
        const style = {
            transition: 'stroke-dashoffset 0.05s',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            strokeDashoffset: `${this.progress(this.props.progress)}`,
            strokeDasharray: `${this.circumference(this.normalizeRadius())}  ${this.circumference(this.normalizeRadius())}`,
        };
        return (
            <DonutWrapper>
                <svg height={this.props.radius * 2} width={this.props.radius * 2}>
                    <circle
                        style={style}
                        stroke={colors.brandPrimary}
                        strokeWidth={this.props.stroke}
                        fill="transparent"
                        r={this.props.radius - this.props.stroke}
                        cx={this.props.radius}
                        cy={this.props.radius}
                    />
                </svg>
                {
                    this.props.progress > 0 && (
                        <DonutContent>
                            {
                                this.state.showCheck
                                    ? <IconCheck />
                                    : <div>{this.props.progress} %</div>
                            }
                        </DonutContent>
                    )
                }

            </DonutWrapper>

        );
    }
}

Donut.propTypes = {
    radius: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    progress(props, propName, componentName) {
        if (props[propName] < 0 || props[propName] > 100) {
            return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Should be a number between 0 (inc.) and 100 (inc.) Validation failed.`);
        }
        return null;
    },
};

export default Donut;