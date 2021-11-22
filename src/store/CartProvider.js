import CartContext from "./cart-context";
import { useReducer } from "react";



const defaultCartState = {
  items: [],
  totalAmount: 0, 

}
/**
 * Reducer is set outside as it does not need anything
 * from inside the component.
 * We need this reducer to update the state.
 * @param {*} props
 * @returns
 */
const cartReducer = (state, action) => {
  if(action.type === 'ADD'){
    /**
     * Concat returns a new array
     * Hence needed here.
     */
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount+ action.item.price * action.item.account;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
}
const CartProvider = (props) => {

  /**
   * This useReducer needs to get executed.
   * Every time cart state changes. 
   */
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  /**
   * Managaing context data
   */
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type:'ADD', item: item})
  };
  const removeItemFromCartHandler = (id) => {};
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
