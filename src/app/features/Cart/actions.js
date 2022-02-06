import { ADD_ITEM, CLEAR_ITEM, REMOVE_ITEM, SET_ITEM } from "./constants";

export function addItem(item) {
  return {
    type: ADD_ITEM,
    payload: {
      item: {
        ...item,
        product: item.product || item,
      },
    },
  };
}
export function removeItem(item) {
  return {
    type: REMOVE_ITEM,
    payload: {
      item: item,
    },
  };
}
export function clearItem() {
  return {
    type: CLEAR_ITEM,
  };
}
export function setItems(items) {
  return {
    type: SET_ITEM,
    payload: { items },
  };
}
