import React, { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Dispatch } from '../../store';

type Props = PropsWithChildren<{
  type: string
}>;

export default function DragNode({ type, children }: Props) {
  const dispatch = useDispatch<Dispatch>();

  const [, drag] = useDrag(() => ({
    type: 'component-item',
    item: { type },
    end(_, monitor) {
      const result = monitor.getDropResult();

      if (monitor.didDrop() && result) {
        dispatch.nodes.add({ id: (result as any).id, type });
      }
    },
  }), []);

  return (
    <div ref={drag}>
      {children}
    </div>
  );
}
