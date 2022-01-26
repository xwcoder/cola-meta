import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { applyPolyfills, defineCustomElements } from '@tarojs/components/loader';
import ListPanel from './panel/list';
import EditorPanel from './panel/editor';
import ConfigPanel from './panel/config';
import CodePanel from './panel/code';

import '@tarojs/components/dist/taro-components/taro-components.css';
import './style.css';

// https://github.com/NervJS/taro/issues/6883
applyPolyfills()
  .then(() => {
    defineCustomElements(window);
  });

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <ListPanel />
          <EditorPanel />
          <ConfigPanel />
          <CodePanel />
        </DndProvider>
      </div>
    );
  }
}
