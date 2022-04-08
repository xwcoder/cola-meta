import React from 'react';
import { useDrag } from 'react-dnd';
import store from '../../store';

export default function DragNode({ type, children }) {
  const [, drag] = useDrag(() => ({
    type: 'component-item',
    item: { type },
    end(_, monitor) {
      const result = monitor.getDropResult();

      if (monitor.didDrop() && result) {
        store.dispatch.global.add({ id: (result as any).id, type });
      }
    },
  }), []);

  return (
    <div ref={drag}>
      {children}
    </div>
  );
}
