/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Icon } from '@tarojs/components/dist-h5/react';

export default class IconContainer extends Component {
  render() {
    return <Icon {...this.props} />;
  }
}
