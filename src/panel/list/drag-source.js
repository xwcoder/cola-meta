import { DragSource } from 'react-dnd';
import store from '../../store';

const spec = {
  beginDrag(props) {
    return { type: props.type };
  },

  endDrag(props, monitor) {
    const result = monitor.getDropResult();

    if (monitor.didDrop() && result) {
      store.dispatch.global.add({ id: result.id, type: props.type });
    }
  },
};

const collect = (connect) => ({
  connectDragSource: connect.dragSource(),
});

function Wrapper({ connectDragSource, children }) {
  return connectDragSource(children, { dropEffect: 'copy' });
}

export default DragSource('component-item', spec, collect)(Wrapper);
