import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
import { applyPolyfills, defineCustomElements } from '@tarojs/components/loader';
import ListPanel from './panel/list';
import EditorPanel from './panel/editor';
import ConfigPanel from './panel/config';

import '@tarojs/components/dist/taro-components/taro-components.css';
import 'antd/dist/antd.css';

// https://github.com/NervJS/taro/issues/6883
applyPolyfills()
  .then(() => {
    defineCustomElements(window);
  });

const {
  Sider,
  Content,
} = Layout;

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Sider
          theme="light"
          collapsible
          collapsedWidth={0}
        >
          <ListPanel />
        </Sider>
        <Layout>
          <Content>
            <EditorPanel />
          </Content>
        </Layout>
        <Sider
          theme="light"
          collapsible
        >
          <ConfigPanel />
        </Sider>
      </Layout>
    </DndProvider>
  );
}
