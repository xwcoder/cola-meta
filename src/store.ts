/* eslint-disable no-param-reassign */
import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import { CONFIGS } from './components';

type Node = {
  id: number,
  type: string,
  props: object,
  styles?: object,
  class?: object,
  children?: Node[],
};

type State = {
  root: Node,
  currentItem: Node | null,
  currentParentId: number,
};

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

const initstate = JSON.parse(JSON.stringify(DEFAULT_STATE));

let gid = 1;
// eslint-disable-next-line no-plusplus
const genId = () => ++gid;

function findById(root, id): Node | null {
  let ans: Node | null = null;
  const find = (item) => {
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

function removeNode(root, id, parentId) {
  const parent = findById(root, parentId)!;
  const { children } = parent!;
  const index = children!.findIndex((item) => item.id === id);

  children!.splice(index, 1);
}

const models = {
  global: {
    state: {
      ...initstate,
    },

    reducers: {
      add(state: State, payload) {
        const { id, type } = payload;
        const { root } = state;

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

      move(state: State, { dragItem, dropItem }) {
        const { root } = state;
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

      setCurrentData(state, { id, parentId }) {
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

      updateCurrentProps(state, props) {
        const { currentItem, root } = state;
        const polyProps = {
          ...(currentItem.props || {}),
          ...props,
        };

        currentItem.props = {
          ...polyProps,
        };

        // TODO 解决更新问题
        const item = findById(root, currentItem.id)!;
        item.props = {
          ...polyProps,
        };
      },
    },
  },
};

const store = init({
  models,
  plugins: [immerPlugin() as any],
});

export default store;
