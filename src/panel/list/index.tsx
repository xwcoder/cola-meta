/* eslint-disable react/no-array-index-key */
import React from 'react';
import { List, Card } from 'antd';
import DragNode from './drag-node';
import data from './data';

// function Item({ type, name }) {
//   return (
//     <DragNode type={type}>
//       <li className="list-panel-item">
//         {type}
//         :
//         {name}
//       </li>
//     </DragNode>
//   );
// }

// function List({ text, list }) {
//   return (
//     <div className="list-panel-group">
//       <div className="header">
//         {text}
//       </div>
//       <ul>
//         {list.map(({ type, name }) => <Item key={type} type={type} name={name} />)}
//       </ul>
//     </div>
//   );
// }

// {data.map(({ text, list }, index) => <List key={index} text={text} list={list} />)}

export default function ListPanel() {
  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <DragNode
            type={item.type}
          >
            <Card
              hoverable
              cover={<img alt={item.name} src={item.img} />}
            >
              <Card.Meta
                title={item.name}
              />
            </Card>
          </DragNode>
        </List.Item>
      )}
    />
  );
}
