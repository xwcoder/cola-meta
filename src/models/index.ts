import { Models } from '@rematch/core';
import { nodes } from './nodes';

export type { VNode } from './nodes';

export interface RootModel extends Models<RootModel> {
  nodes: typeof nodes,
}

export const models: RootModel = { nodes };
