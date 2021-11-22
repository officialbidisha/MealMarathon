import classes from "./MealItemForm.Module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  /**
   * Validation state
   */
  const [amountIsValid, setAmountIsValid] = useState(true);
  /**
   * For custom component, ref works differently.
   */
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    /**
     * This value is ALWAYS a string
     */
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    /**
     * We only have the amount and not others needed in context
     */
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
