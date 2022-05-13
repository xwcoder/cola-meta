import React, { PropsWithChildren } from 'react';
import { useDrag } from 'react-dnd';

type Props = PropsWithChildren<{ type: string }>;

export default function DragNode({ type, children }: Props) {
  const [, drag] = useDrag(() => ({
    type: 'card',
    item: {
      method: 'add',
      node: { type },
    },
  }), []);

  return (
    <div ref={drag}>
      {children}
    </div>
  );
}
