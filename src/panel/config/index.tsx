import React from 'react';
import { connect } from 'react-redux';
import { CONFIGS } from '../../components';
import store from '../../store';
import ConfigForm from './config-form';

import './style.css';

function handleRemove() {
  store.dispatch.global.removeCurrent();
}

function Config({ node }) {
  const type = node ? node.type : '';
  return (
    <section className="config-panel">
      <header>
        属性配置区
        {type ? `（${CONFIGS[type].name}）` : ''}
      </header>
      <div className="config-area">
        <button
          type="button"
          onClick={handleRemove}
        >
          删除组件
        </button>
        {type ? <ConfigForm /> : null }
      </div>
    </section>
  );
}

const mapState = (state) => ({
  node: state.global.currentItem,
});

export default connect(mapState)(Config);
