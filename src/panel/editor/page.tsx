import React, { ReactElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import PlaceHolderCard from './placeholder-card';
import DragCard from './drag-card';
import { RootState, Dispatch } from '../../store';
import { IDragItem, VNode } from '../../types';

export default function Page() {
  const dispatch = useDispatch<Dispatch>();
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const [placeholderIndex, setPlaceholderIndex] = useState(-1);
  const [{ isOver, item }, drop] = useDrop({
    accept: 'card',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      item: monitor.getItem<IDragItem>(),
    }),
    hover: (_, monitor) => {
      const { x, y } = monitor.getClientOffset()!;

      const els = document.elementsFromPoint(x, y);
      const el = els.find((iel) => iel.classList.contains('card'));

      if (!el) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const cardIndex = Number((el as HTMLDivElement).dataset.index);
      let posIndex = placeholderIndex;

      posIndex = y >= (rect.top + rect.height / 2) ? cardIndex + 1 : cardIndex;

      setPlaceholderIndex(posIndex);
    },
    drop: (_, monitor) => {
      const { method, node } = monitor.getItem<IDragItem>();

      if (method === 'add') {
        dispatch.nodes.add({ type: node.type, index: placeholderIndex });
      } else if (method === 'move') {
        dispatch.nodes.move({ node: (node as VNode), index: placeholderIndex });
      }
    },
  });

  const render = () => {
    const list: ReactElement[] = [];
    nodes.forEach((node, i) => {
      if ((isOver && placeholderIndex === i)) {
        list.push(<PlaceHolderCard key="placeholder" node={item.node} />);
      }

      if (!isOver || (item && node.id !== item.node.id)) {
        list.push(
          <DragCard
            key={node.id}
            node={node}
            index={i}
          />,
        );
      }
    });

    if (isOver && (!nodes.length || placeholderIndex === nodes.length)) {
      list.push(<PlaceHolderCard key="placeholder" node={item.node} />);
    }

    return list;
  };

  return (
    <div
      ref={drop}
      className="box-content w-414px h-600px mx-auto border-1 border-blue-500 border-solid overflow-x-hidden overflow-y-auto"
    >
      {render()}
    </div>
  );
}
