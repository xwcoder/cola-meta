import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import genCode from './gencode';

import './style.css';

export default function CodePanel() {
  const root = useSelector((state: RootState) => state.nodes.root);
  return (
    <section className="code-panel">
      <header>代码预览区</header>
      <section>
        <div className="js-block">
          <pre className="code-block">
            {genCode(root)}
          </pre>
        </div>
      </section>
    </section>
  );
}
