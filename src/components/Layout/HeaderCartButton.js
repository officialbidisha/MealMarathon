import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighLighted] = useState(false);

  const { items } = cartCtx;

  /**
   * We want to run this only when items are effected.
   */
  useEffect(() => {
    /**
     * In case there is no items, this should not happen.
     */
    if (items.length === 0) {
      return;
    }

    setButtonIsHighLighted(true);
    const timer = setTimeout(()=> {
        setButtonIsHighLighted(false);
    }, 300)

    return () => {
        clearTimeout(timer);
    }
  }, [items]);
  const numberOfCartItems = cartCtx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    buttonIsHighlighted ? classes.bump : ""
  }`;

  /**
   * Animation is a side effect. So use useEffect hook.
   */

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
