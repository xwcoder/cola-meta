/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { CONFIGS } from '../../components';
import store from '../../store';

function ConfigForm({ item }) {
  const { type } = item;
  const configs = CONFIGS[type].config;

  function handleChange(event) {
    const { key } = event.target.dataset;
    const { value } = event.target;

    store.dispatch.global.updateCurrentProps({ [key]: value });
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
    <div className="form-container">
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

const mapState = (state) => ({
  item: state.global.currentItem,
});

export default connect(mapState)(ConfigForm);
