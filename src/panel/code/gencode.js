import template from 'lodash/template';

const compiled = template(
  `
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { <%= types %> } from '@tarojs/components';
import './index.css';

export default class App extends Component {
  render() {
    return <%= jsx %>;
  }
}
`,
);

function renderProps(props) {
  if (!props) {
    return '';
  }

  return Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(' ');
}

function inlineStyle(styles) {
  const entries = Object.entries(styles);

  if (!entries.length) {
    return '';
  }

  const style = entries.map(([key, value]) => `${key}: ${value}`).join(',');

  return ` style={{ ${style} }}`;
}

function generate(root) {
  const types = new Set();

  const renderNode = (node) => {
    let jsx = '';

    const {
      type,
      styles: {
        className = '',
        ...styles
      },
      props,
      children = [],
    } = node;

    types.add(type);

    jsx += `<${type}`;

    if (className) {
      jsx += ` className="${className}"`;
    }

    jsx += ` ${inlineStyle(styles)}`;
    jsx += renderProps(props);

    if (children.length) {
      jsx += '>\n';
      children.forEach((child) => {
        jsx += renderNode(child);
      });

      jsx += `\n</${type}>\n`;
    } else {
      jsx += '/>\n';
    }

    return jsx;
  };

  const jsx = renderNode(root);

  return { jsx, types };
}

export default function genCode(root) {
  const { jsx, types } = generate(root);

  return compiled({
    jsx,
    types: Array.from(types).join(', '),
  });
}
