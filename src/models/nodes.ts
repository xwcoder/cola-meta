/* eslint-disable no-param-reassign */
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import { VNode } from '../types';
import { CONFIGS } from '../components';

interface State {
  nodes: VNode[]
  currentNode: VNode | null
}

const DEFAULT_STATE: State = {
  nodes: [],
  currentNode: null,
};

const initstate: State = JSON.parse(JSON.stringify(DEFAULT_STATE));

let gid = 1;
// eslint-disable-next-line no-plusplus
const genId = () => ++gid;

export const nodes = createModel<RootModel>()({
  state: {
    ...initstate,
  },

  reducers: {
    reset() {
      gid = 1;
      return {
        ...initstate,
      };
    },

    add(state, { type, index }: { type: string, index: number }) {
      const node = {
        id: genId(),
        type,
        props: CONFIGS[type].defaultProps || {},
        styles: CONFIGS[type].defaultStyles || {},
      };
      state.nodes.splice(index, 0, node);
    },

    move(state, { node, index }: { node: VNode, index: number}) {
      const lastIndex = state.nodes.findIndex((v) => v.id === node.id);

      if (lastIndex === index) {
        return;
      }

      if (index > lastIndex) {
        state.nodes.splice(index, 0, node);
        state.nodes.splice(lastIndex, 1);
      } else {
        state.nodes.splice(lastIndex, 1);
        state.nodes.splice(index, 0, node);
      }
    },

    setCurrentNode(state, id: number) {
      const node = state.nodes.find((v) => v.id === id);

      if (node) {
        state.currentNode = node;
      }
    },

    removeCurrent({ currentNode, nodes: list }) {
      if (!currentNode) {
        return;
      }

      const index = list.findIndex((v) => v.id === currentNode.id);
      if (index === -1) {
        return;
      }

      list.splice(index, 1);
    },

    updateCurrentProps({ currentNode, nodes: list }, props: object) {
      if (!currentNode) {
        return;
      }

      const polyProps = {
        ...(currentNode.props || {}),
        ...props,
      };

      currentNode.props = {
        ...polyProps,
      };

      const node = list.find((v) => v.id === currentNode.id);
      if (!node) {
        return;
      }

      node.props = {
        ...polyProps,
      };
    },
  },
});
