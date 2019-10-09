import { ElementCorners, Coord, GraphItem, Item } from '@/models';

enum DropAction {
  'ADD' = 'ADD',
  'UPDATE' = 'UPDATE',
  'REMOVE' = 'REMOVE',
  'NONE' = 'NONE',
}

const getElementCornersFromElement = (element: Element): ElementCorners => {
  const elementRect: ClientRect = element.getBoundingClientRect();
  const top: number = elementRect.top;
  const left: number = elementRect.left;
  const width: number = elementRect.width;
  const height: number = elementRect.height;

  return {
    topLeft: {
      x: left,
      y: top,
    },
    topRight: {
      x: left + width,
      y: top,
    },
    bottomLeft: {
      x: left,
      y: top + height,
    },
    bottomRight: {
      x: left + width,
      y: top + height,
    },
  };
};

const isInsideElement = (element: ElementCorners, coord: Coord): boolean => {
  if (coord.x < element.topLeft.x) {
    return false;
  }
  if (coord.x > element.topRight.x) {
    return false;
  }
  if (coord.y < element.topLeft.y) {
    return false;
  }
  if (coord.y > element.bottomRight.y) {
    return false;
  }
  return true;
};

const getNormalizedInnerElementPosition = (
  element: ElementCorners,
  coord: Coord,
): Coord => {
  const width: number = element.topRight.x - element.topLeft.x;
  const height: number = element.bottomLeft.y - element.topLeft.y;
  const x: number = (coord.x - element.topLeft.x) / width;
  const y: number = (coord.y - element.topLeft.y) / height;
  return {
    x: Math.min(1, Math.max(0, x)),
    y: Math.min(1, Math.max(0, y)),
  };
};

const graphItemAsItem = (graphItem: GraphItem): Item => {
  const copy = { ...graphItem };
  delete copy.coord;
  return copy as Item;
};

const updateGraphItemsOnDrop = (
  graphItems: GraphItem[],
  dropItem: GraphItem,
  action: DropAction,
): GraphItem[] => {
  if (action === DropAction.ADD) {
    return graphItems.concat({ ...dropItem });
  }
  if (action === DropAction.UPDATE) {
    return graphItems.map(item => {
      if (item.id === dropItem.id) {
        item.coord = dropItem.coord;
      }
      return item;
    });
  }
  if (action === DropAction.REMOVE) {
    return graphItems.filter(item => item.id !== dropItem.id);
  }
  return graphItems;
};

export {
  getElementCornersFromElement,
  getNormalizedInnerElementPosition,
  graphItemAsItem,
  updateGraphItemsOnDrop,
  isInsideElement,
  Coord,
  ElementCorners,
  Item,
  GraphItem,
  DropAction,
};
