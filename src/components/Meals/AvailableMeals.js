import classes from "./AvailableMeals.Module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
const AvailableMeals = () => {

  const [meals,setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  /**
   * The function to useEffect should not return a promise.
   * It must have a clean up function and that needs to be synchronous.
   */
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-3ebec-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for( const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    /**
     * Error inside a promise will casue it to reject.
     * To catch this reject we need async await. 
     * Hence we convert this try-catch.
     */
      fetchMeals()
      .catch((error) => {
        setIsLoading(false);
      setHttpError(error.message);
      });
  }, []);

  if(isLoading){
    return (
      <section className={classes.MealIsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section classes={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
