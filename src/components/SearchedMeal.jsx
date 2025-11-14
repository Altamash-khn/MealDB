import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MealBySearch = ({ region }) => {
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function fetchMeals() {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`
      );
      const data = await res.json();
      console.log(data);
      
      setSearchedMeals(data.meals);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  }

  function handleMealClick(mealId) {
    navigate(`/meal/${mealId}`, {
      state: mealId,
    });
  }

  useEffect(() => {
    fetchMeals();
  }, [region]);

  if (loading) {
    return (
      <p className="text-center text-2xl text-amber-800">
        Fetching meals for {region}...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-2xl text-amber-800">
        Oops! Something went wrong while fetching meals. <br />
        Please try again in a moment.
      </p>
    );
  }

  return (
    <section className="mb-10">
      <p className="text-3xl font-normal text-gray-900 border-b-1 border-gray-300 pb-3 mb-10">
        Search for: <span className="text-amber-950 font-serif">{region}</span>
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {searchedMeals.map((meal, index) => {
          return (
            <li
              key={index}
              className="rounded-lg shadow-lg flex flex-col items-start gap-3 group transition-all duration-700 hover:-translate-y-2.5"
              onClick={() => handleMealClick(meal.idMeal)}
            >
              <img
                src={meal.strMealThumb}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <p className="text-xl text-amber-900 font-semibold text-center ml-4">
                {meal.strMeal}
              </p>
              <span className="bg-amber-100 text-amber-800 px-2 rounded-full ml-4 mb-5">{`# ${region}`}</span>
              <button className=" rounded-2xl block lg:opacity-0 group-hover:opacity-100 text-amber-900 bg-amber-100 hover:bg-amber-100 hover:cursor-pointer font-semibold ml-4 px-3 py-1.5 mb-5">
                View Recipe →
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default MealBySearch;
