export interface AddNode {
  id?: number
  type: string
}

export interface VNode extends AddNode {
  id: number
  props?: object
  styles?: object
  class?: object
}

export type IDragItem<T = 'add' | 'move'> = {
  method: T
  node: T extends 'add' ? AddNode : T extends 'move' ? VNode : unknown
};
