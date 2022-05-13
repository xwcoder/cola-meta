/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CONFIGS } from '../../components';
import { RootState, Dispatch } from '../../store';

export default function ConfigForm() {
  const dispatch = useDispatch<Dispatch>();
  const item = useSelector((state: RootState) => state.nodes.currentNode)!;
  const { type } = item;
  const configs = CONFIGS[type].config;

  function handleChange(event) {
    const { key } = event.target.dataset;
    const { value } = event.target;

    dispatch.nodes.updateCurrentProps({ [key]: value });
  }

  const renderByType = (config) => {
    const { key } = config;
    const value = (item.props || {})[key] || CONFIGS[type].defaultProps[key];

    const formItemType = config.type.toLowerCase();

    if (formItemType === 'input') {
      return (
        <>
          <label>
            {config.label}
            ：
          </label>
          <input
            value={value}
            data-key={key}
            onChange={handleChange}
          />
        </>
      );
    }

    if (formItemType === 'number') {
      const min = config.min || -Infinity;
      const max = config.max || Infinity;
      return (
        <>
          <label>
            {config.label}
            ：
          </label>
          <input
            type="number"
            value={value}
            data-key={key}
            min={min}
            max={max}
            onChange={handleChange}
          />
          ;
        </>
      );
    }

    if (formItemType === 'select') {
      const { dataSource } = config;
      return (
        <>
          <label>
            {config.label}
            ：
          </label>
          <select
            data-key={key}
            onChange={handleChange}
          >
            {dataSource.map((ds) => (
              <option key={ds.value} value={ds.value}>
                {ds.label}
              </option>
            ))}
          </select>
        </>
      );
    }

    return null;
  };

  return (
    <div className="my-5 p-4">
      <h3>组件属性配置</h3>
      <form>
        {configs.map((config) => (
          <div key={config.key}>
            { renderByType(config) }
          </div>
        ))}
      </form>
    </div>
  );
}
