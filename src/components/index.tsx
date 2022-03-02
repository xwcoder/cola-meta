/* eslint-disable global-require */
import Button from './Button';
import Icon from './Icon';
import Text from './Text';
import View from './View';

export default {
  Button,
  Icon,
  Text,
  View,
};

export const CONFIGS = {
  Button: require('./Button/config.json'),
  Icon: require('./Icon/config.json'),
  Text: require('./Text/config.json'),
  View: require('./View/config.json'),
};
