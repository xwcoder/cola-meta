import React from 'react';
import { useDispatch } from 'react-redux';
import Page from './page';
import { Dispatch } from '../../store';

export default function Editor() {
  const dispatch = useDispatch<Dispatch>();

  return (
    <>
      <div className="mx-6">
        <button
          type="button"
          onClick={() => dispatch.nodes.reset()}
        >
          清空
        </button>
      </div>
      <div className="mt-3">
        <Page />
      </div>
    </>
  );
}
