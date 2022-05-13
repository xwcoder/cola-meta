/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import Card from './card';
import { VNode } from '../../types';
import { Dispatch } from '../../store';

export default function DragCard({ node, index }: { node: VNode, index: number }) {
  const dispatch = useDispatch<Dispatch>();
  const [, drag] = useDrag(() => ({
    type: 'card',
    item: {
      method: 'move',
      node,
    },
  }));

  const handleClick = (event) => {
    event.preventDefault();
    dispatch.nodes.setCurrentNode(node.id);
  };

  return (
    <div
      ref={drag}
      className="card"
      data-index={index}
      onClick={handleClick}
    >
      <Card node={node} />
    </div>
  );
}
