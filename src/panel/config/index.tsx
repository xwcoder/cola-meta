import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CONFIGS } from '../../components';
import { RootState, Dispatch } from '../../store';
import ConfigForm from './config-form';

import './style.css';

export default function Config() {
  const dispatch = useDispatch<Dispatch>();
  const node = useSelector((state: RootState) => state.nodes.currentItem);
  const type = node?.type || '';
  return (
    <section className="config-panel">
      <header>
        属性配置区
        {type ? `（${CONFIGS[type].name}）` : ''}
      </header>
      <div className="config-area">
        <button
          type="button"
          onClick={() => dispatch.nodes.removeCurrent()}
        >
          删除组件
        </button>
        {type ? <ConfigForm /> : null }
      </div>
    </section>
  );
}
