import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from 'antd';
import { applyPolyfills, defineCustomElements } from '@tarojs/components/loader';
import ListPanel from './panel/list';
import EditorPanel from './panel/editor';
import ConfigPanel from './panel/config';

// https://github.com/NervJS/taro/issues/6883
applyPolyfills()
  .then(() => {
    defineCustomElements(window);
  });

const {
  Header,
  Sider,
  Content,
} = Layout;

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Header
          className="nav"
        >
          cola-meta
        </Header>
        <Layout>
          <Sider
            theme="light"
            collapsible
            collapsedWidth={0}
          >
            <ListPanel />
          </Sider>
          <Content>
            <EditorPanel />
          </Content>
          <Sider
            theme="light"
            collapsible
            collapsedWidth={0}
            reverseArrow
          >
            <ConfigPanel />
          </Sider>
        </Layout>
      </Layout>
    </DndProvider>
  );
}
