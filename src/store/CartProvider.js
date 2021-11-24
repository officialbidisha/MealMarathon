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
    const updatedTotalAmount = state.totalAmount+ action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if(existingCartItem){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount+ action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else{
      updatedItems = state.items.concat(action.item);
    }
    console.log({
      items: updatedItems,
      totalAmount: updatedTotalAmount
    })
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if(action.type === 'REMOVE'){
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
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
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };
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
