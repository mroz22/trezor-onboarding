import React from 'react';
import PropTypes from 'prop-types';

import Option from 'components/options/Option';

const OptionsList = ({ options }) => options.map(option => <Option text={option.text} />);

export default OptionsList;