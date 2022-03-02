import { DragSource, DragSourceMonitor } from 'react-dnd';
import store from '../../store';

type Props = {
  type: string,
}

const spec = {
  beginDrag(props: Props) {
    return { type: props.type };
  },

  endDrag(props: Props, monitor: DragSourceMonitor) {
    const result = monitor.getDropResult();

    if (monitor.didDrop() && result) {
      store.dispatch.global.add({ id: (result as any).id, type: props.type });
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
