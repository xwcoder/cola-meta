import React from 'react';
import Card from './card';
import { VNode, AddNode } from '../../types';

export default function PlaceHolderCard({ node }: { node: VNode | AddNode }) {
  return (
    <div className="min-h-30px relative">
      <div className="absolute inset-0 z-50 border border-red-500 border-dashed" />
      <div className="invisible">
        <Card node={node} />
      </div>
    </div>
  );
}
