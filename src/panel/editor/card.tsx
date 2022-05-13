/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Components, { CONFIGS } from '../../components';
import { VNode } from '../../types';

function parseStyles(styles) {
  const reg = /\B([A-Z])/g;

  let res = '';

  Object.keys(styles)
    .filter((item) => item !== 'className')
    .forEach((key) => {
      const k = key.replace(reg, '-$1').toLowerCase();
      res += `${k}: ${styles[key]};`;
    });

  return res;
}

interface Props {
  node: Partial<VNode>
}

export default function Card({ node }: Props) {
  const {
    type = '',
    props = {},
    styles = {},
  } = node;

  const Componet = Components[type];
  const { defaultProps } = CONFIGS[type] || {};

  const finalProps = {
    ...defaultProps,
    ...props,
  };

  return (
    <Componet
      style={parseStyles(styles)}
      {...finalProps}
    />
  );
}
