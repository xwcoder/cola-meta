import React from 'react';
import { connect } from 'react-redux';
import DndNode from './dnd-node';
import store from '../../store';
import './style.css';

function reset() {
  store.dispatch.global.reset();
}

function Editor({ root }) {
  return (
    <div className="editor-panel">
      <header>编辑面板</header>
      <button
        type="button"
        onClick={reset}
      >
        清空
      </button>
      <div className="edit-container">
        <DndNode item={root} />
      </div>
    </div>
  );
}

const mapState = (state) => ({
  root: state.global.root,
});

export default connect(mapState)(Editor);
