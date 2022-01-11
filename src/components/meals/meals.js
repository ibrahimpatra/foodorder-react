import { Fragment, useState } from "react";
import classes from "./meals.module.css";
import Card from "../ui/Card";
import Mealitem from "./Mealitem";
import { useEffect } from "react";




const Meals = () => {
  const [meals, setmeals] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    const fetchmeals = async () => {
      const response = await fetch('https://react-projects-52724-default-rtdb.firebaseio.com/meals.json');
      const respdata = await response.json();

      const allmeals = [];

      for(const key in respdata){
        allmeals.push({
          id: key,
          name: respdata[key].name,
          description: respdata[key].description,
          price: respdata[key].price
        });
      };

      setmeals(allmeals);
      setloading(false);
  }
    fetchmeals();
  },[]);

  if(loading) {
    return <section className={classes.mealsloading}>
      <p>Loading..</p>
    </section>
  }

  return (
    <Fragment>
      <section className={classes.summary}>
        <h2>Delicious Food, Delivered To You</h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </section>

      <section className={classes.meals}>
        <Card>
          <ul>
            {meals.map((meal) => (
              <Mealitem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              ></Mealitem>
            ))}
          </ul>
        </Card>
      </section>
    </Fragment>
  );
};

export default Meals;
