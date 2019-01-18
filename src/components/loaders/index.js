import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'config/colors';

const Donut = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-right: solid 5px ${colors.brandPrimary};
    transform: translateZ(100);
    animation: linear 1.1s infinite linear;
    
    @keyframes linear {
        from {
            transform: linear(360deg);
        }
        to {
            transform: linear(120deg);
        }
    }
`;

const Loader = () => <Donut />;

export default Loader;
// Loader.propTypes = {
//     type: PropTypes.string.isRequired, // todo: enum
// };

/*

.trz-spinner-wrapper {
  max-height: 41px;
  margin-right: 5px;
  display: inline;
}

.trz-spinner-countdown {
  position: relative;
  left: 14.8px;
}

.trz-spinner,
.trz-spinner:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.trz-spinner {
  display: inline-block;
  font-size: 2.2px;
  top: 1.5px;
  margin: -4px;
  position: relative;
  border: .8em solid rgba(255, 255, 255, 0.2);
  border-left-color: #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: spin 1.1s infinite linear;
  animation: spin 1.1s infinite linear;
}
*/