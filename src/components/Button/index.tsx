/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button } from '@tarojs/components/dist-h5/react';

type Props = {
  content?: string
};

export default class ButtonContainer extends Component<Props> {
  render() {
    const { content, ...restProps } = this.props;
    return (
      <Button {...restProps}>
        {content}
      </Button>
    );
  }
}
