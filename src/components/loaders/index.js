import React from 'react';
// import PropTypes from 'prop-types';

import colors from 'config/colors';

class Progress extends React.Component {
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
        );
        /* eslint-enable react/react-in-jsx-scope */
    }
}

export default Progress;