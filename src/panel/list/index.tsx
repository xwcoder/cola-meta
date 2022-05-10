import React from 'react';
import { List, Card } from 'antd';
import DragNode from './drag-node';
import data from './data';

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
