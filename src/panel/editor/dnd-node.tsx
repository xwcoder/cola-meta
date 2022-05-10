/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import Components, { CONFIGS } from '../../components';
import { Dispatch, VNode } from '../../store';

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

function handleClick(event, { id, parentId, dispatch }) {
  event.stopPropagation();
  document.querySelectorAll('.highlight').forEach((element) => {
    element.classList.remove('highlight');
  });
  document.getElementById(id)!.classList.add('highlight');

  dispatch.nodes.setCurrentData({ id, parentId });
}

interface Props {
  item: VNode
  // eslint-disable-next-line react/require-default-props
  parentId?: number
}

export default function DndNode(props: Props) {
  const dispatch = useDispatch<Dispatch>();
  const {
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
  const [, drag] = useDrag(() => ({
    type: 'component-item',
    item: {
      id,
      parentId,
      type,
    },
    canDrag: () => id !== 1,
    end(_, monitor) {
      const result = monitor.getDropResult();
      if (monitor.didDrop() && result) {
        dispatch.nodes.move({
          dragItem: {
            id,
            parentId,
          },
          dropItem: {
            ...(result as any),
          },
        });
      }
    },
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'component-item',
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    drop(_, monitor) {
      if (monitor.didDrop()) {
        return;
      }

      return {
        id,
        type,
        parentId,
      };
    },
  }), []);

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
        drag(drop(node as any));
      }}
      {...finalProps}
      onClick={(event) => handleClick(event, { id, parentId, dispatch })}
    >
      {children && children.length
        ? children.map((node) => <DndNode key={node.id} parentId={id} item={node} />)
        : null}
    </CurrentComponet>
  );
}
