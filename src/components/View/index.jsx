/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from '@tarojs/components/dist-h5/react';

export default class ViewContainer extends Component {
  render() {
    const { children, ...restProps } = this.props;
    return (
      <View {...restProps}>
        {children}
      </View>
    );
  }
}
