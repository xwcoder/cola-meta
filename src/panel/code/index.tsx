import React from 'react';
import { connect } from 'react-redux';
import genCode from './gencode';

import './style.css';

function CodePanel({ root }) {
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

const mapState = (state) => ({
  root: state.global.root,
});

export default connect(mapState)(CodePanel);
