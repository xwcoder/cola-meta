/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text } from '@tarojs/components/dist-h5/react';

export default class TextContainer extends Component {
  render() {
    const { content, ...restProps } = this.props;
    return (
      <Text {...restProps}>
        {content}
      </Text>
    );
  }
}
