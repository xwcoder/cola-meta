import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DndNode from './dnd-node';
import { RootState, Dispatch } from '../../store';
import './style.css';

export default function Editor() {
  const dispatch = useDispatch<Dispatch>();
  const root = useSelector((state: RootState) => state.nodes.root);

  return (
    <div className="editor-panel">
      <header>编辑面板</header>
      <button
        type="button"
        onClick={() => dispatch.nodes.reset()}
      >
        清空
      </button>
      <div className="edit-container">
        <DndNode item={root} />
      </div>
    </div>
  );
}
