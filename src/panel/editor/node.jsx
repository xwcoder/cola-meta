/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';
import Components, { CONFIGS } from '../../components';
import store from '../../store';

function parseStyles(styles) {
  const reg = /\B([A-Z])/g;

  let res = '';

  Object.keys(styles)
    .filter((item) => item !== 'className')
    .forEach((key) => {
      const k = key.replace(reg, '-$1').toLowerCase();
      res += `${k}: ${styles[key]};`;
    });

  return res;
}

const spec = {
  beginDrag(props) {
    const { parentId, item } = props;
    const { id, type } = item;
    return {
      id,
      parentId,
      type,
    };
  },

  canDrag(props) {
    return props.item.id !== 1;
  },

  isDragging(props, monitor) {
    return props.item.id === monitor.getItem().id;
  },

  endDrag(props, monitor) {
    const result = monitor.getDropResult();
    if (monitor.didDrop() && result.dragItem) {
      const {
        dragItem,
        dropItem,
      } = result;
      store.dispatch.global.move({ dragItem, dropItem });
    }
  },
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const target = {
  canDrop(props, monitor) {
    const dragType = monitor.getItem().type;
    const dropType = props.item.type;

    if (dragType === 'Form' && dropType === 'Form') {
      return false;
    }

    if (dropType === 'Label') {
      const types = ['Button', 'Checkbox', 'Radio', 'Switch'];
      return types.indexOf(dragType) !== -1;
    }

    return true;
  },

  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }

    // drag item
    const {
      id: dragId,
      parentId: dragParentId,
    } = monitor.getItem();

    // drop item
    const {
      parentId: dropParentId,
      item: {
        id: dropId,
        type: dropType,
      },
    } = props;

    // editor内拖动
    if (dragId) {
      if (dragId === dropId
        || dragId === dropParentId
        || dragParentId === dropId
        || dropParentId === null) {
        return;
      }

      return {
        dragItem: {
          id: dragId,
          parentId: dragParentId,
        },

        dropItem: {
          id: dropId,
          type: dropType,
          parentId: dropParentId,
        },
      };
    }

    // list拖到eidtor
    return { id: dropId };
  },
};

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  };
}

function handleClick(event, { id, parentId, type }) {
  event.stopPropagation();
  document.querySelectorAll('.highlight').forEach((element) => {
    element.classList.remove('highlight');
  });
  document.getElementById(id).classList.add('highlight');

  store.dispatch.global.setCurrentData({ id, parentId, type });
}

function Node(props) {
  const {
    connectDropTarget,
    connectDragSource,
    canDrop,
    isOver,
    parentId,
    item,
  } = props;

  const {
    id,
    type,
    props: itemProps,
    styles,
    children,
  } = item;

  const CurrentComponet = Components[type];
  const { droppable, defaultProps } = CONFIGS[type];

  const finalProps = {
    ...defaultProps,
    ...itemProps,
  };

  const classes = classnames({
    draggable: droppable,
    active: canDrop && isOver,
  });

  return (
    <CurrentComponet
      id={id}
      type={type}
      className={classes}
      style={parseStyles(styles)}
      ref={(instance) => {
        const node = findDOMNode(instance);
        connectDragSource(node);
        connectDropTarget(node);
      }}
      {...finalProps}
      onClick={(event) => handleClick(event, { id, parentId, type })}
    >
      {children && children.length
        ? children.map((node) => <DndNode key={node.id} parentId={id} item={node} />)
        : null}
    </CurrentComponet>
  );
}

const DragSourceNode = DragSource('component-item', spec, sourceCollect)(Node);
const DndNode = DropTarget('component-item', target, targetCollect)(DragSourceNode);

export default DndNode;
