/* eslint-disable no-param-reassign */
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import { CONFIGS } from '../components';

export interface VNode {
  id: number
  type: string
  props: object
  styles?: object
  class?: object
  children?: VNode[]
}

interface State {
  root: VNode
  currentItem: VNode | null
  currentParentId: number
}

const DEFAULT_STATE: State = {
  root: {
    id: 1,
    type: 'View',
    props: {},
    styles: {
      minHeight: '500px',
    },
    class: {},
    children: [],
  },

  currentItem: null,
  currentParentId: 0,
};

const initstate: State = JSON.parse(JSON.stringify(DEFAULT_STATE));

let gid = 1;
// eslint-disable-next-line no-plusplus
const genId = () => ++gid;

function findById(root: VNode, id: number): VNode | null {
  let ans: VNode | null = null;
  const find = (item: VNode) => {
    if (item.id === id) {
      ans = item;
      return;
    }

    const { children = [] } = item;
    for (let i = 0; i < children.length; i += 1) {
      find(children[i]);
    }
  };

  find(root);

  return ans;
}

function removeNode(root: VNode, id: number, parentId: number) {
  const parent = findById(root, parentId)!;
  const { children } = parent!;
  const index = children!.findIndex((item) => item.id === id);

  children!.splice(index, 1);
}

export const nodes = createModel<RootModel>()({
  state: {
    ...initstate,
  },

  reducers: {
    // TODO to be delete, 暂不支持楼层嵌套
    add({ root }, { id, type }: { id: number, type: string }) {
      const node = findById(root, id)!;
      node.children = node.children || [];

      node.children.push({
        id: genId(),
        type,
        props: CONFIGS[type].defaultProps || {},
        styles: CONFIGS[type].defaultStyles || {},
      });
    },

    reset() {
      gid = 1;
      return {
        ...initstate,
      };
    },

    // TODO
    move({ root }, { dragItem, dropItem }) {
      const {
        id: dragId,
        parentId: dragParentId,
      } = dragItem;

      const {
        id: dropId,
        type: dropType,
        parentId: dropParentId,
      } = dropItem;

      const sourceItem = { ...findById(root, dragId)! };
      const { droppable } = CONFIGS[dropType];

      if (droppable) {
        const item = findById(root, dropId)!;
        item.children = item.children || [];
        removeNode(root, dragId, dragParentId);
        item.children.push(sourceItem);
      } else {
        const dropParentItem = findById(root, dropParentId)!;
        const { children } = dropParentItem;
        const index = children!.findIndex((item) => item.id === dropId);
        removeNode(root, dragId, dragParentId);
        children!.splice(index, 0, sourceItem);
      }
    },

    setCurrentData(state, { id, parentId }: { id: number, parentId: number}) {
      const { root } = state;
      const item = findById(root, id);

      state.currentItem = item;
      state.currentParentId = parentId;
    },

    removeCurrent(state) {
      const {
        currentItem,
        currentParentId,
        root,
      } = state;

      if (!currentItem) {
        return;
      }

      removeNode(root, currentItem.id, currentParentId);
      state.currentItem = null;
    },

    updateCurrentProps(state, props: object) {
      const { currentItem, root } = state;

      if (!currentItem) {
        return;
      }

      const polyProps = {
        ...(currentItem.props || {}),
        ...props,
      };

      currentItem.props = {
        ...polyProps,
      };

      const item = findById(root, currentItem.id)!;
      item.props = {
        ...polyProps,
      };
    },
  },
});
