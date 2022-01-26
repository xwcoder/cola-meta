/* eslint-disable react/no-array-index-key */
import React from 'react';
import DragSource from './drag-source';
import data from './data';

import './style.css';

function Item({ type, name }) {
  return (
    <DragSource type={type}>
      <li className="list-panel-item">
        {type}
        :
        {name}
      </li>
    </DragSource>
  );
}

function List({ text, list }) {
  return (
    <div className="list-panel-group">
      <div className="header">
        {text}
      </div>
      <ul>
        {list.map(({ type, name }) => <Item key={type} type={type} name={name} />)}
      </ul>
    </div>
  );
}

export default function ListPanel() {
  return (
    <div className="list-panel">
      <header>组件列表面板</header>
      {data.map(({ text, list }, index) => <List key={index} text={text} list={list} />)}
    </div>
  );
}
