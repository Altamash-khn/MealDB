import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import { useEffect, useState } from "react";

const SingleMeal = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  let ingredientsArr = [];
  const data = location.state;
  console.log(data);

  async function fetchMeal() {
    if (data.idMeal) {
      setMeal(data);
    } else {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`
      );
      const mealDetails = await res.json();
      setMeal(mealDetails.meals[0]);
      console.log("meal;Datealos", mealDetails.meals[0]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMeal();
  }, [data]);

  for (let i = 0; i <= 20; i++) {
    if (meal?.[`strIngredient${i}`] && meal?.[`strMeasure${i}`]) {
      ingredientsArr.push({
        ingredient: meal?.[`strIngredient${i}`],
        measure: meal?.[`strMeasure${i}`],
      });
    }
  }

  if (loading) {
    return (
      <p className="text-center mt-[10vh] text-amber-900 text-5xl font-serif">
        Loading
      </p>
    );
  }

  return (
    <section className="w-full max-w-6xl mx-auto mt-14 px-4">
      <BackButton />

      <div className="flex flex-col md:flex-row gap-8 my-14">
        <div className="relative w-full md:w-[50%]">
          {!imageLoaded && (
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl absolute top-0 left-0" />
          )}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            onLoad={() => setImageLoaded(true)}
            className={`rounded-2xl w-full h-auto max-h-[350px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[550px] object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="w-full md:w-[50%] flex flex-col justify-between">
          <h2 className="text-3xl md:text-4xl font-semibold font-[inter] text-gray-900 mb-4">
            {meal.strMeal}
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <p className="bg-orange-100 text-orange-800 px-3 py-2 rounded-full text-sm font-medium font-[inter] leading-none">
              {meal.strCategory}
            </p>
            <p className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium font-[inter] leading-none">
              {meal.strArea}
            </p>
          </div>

          <p className="text-base md:text-lg text-gray-700 font-[inter] mb-10">
            A delicious {meal.strMeal.toLowerCase()} recipe that you will love!
          </p>

          <div className="border-1 border-t-0 bg-white border-gray-200 p-5 pt-0 rounded-b-lg">
            <p className="text-2xl md:text-3xl font-semibold text-gray-900 border-b-1 pb-2 mb-5">
              Instructions
            </p>
            <p className="text-base md:text-lg leading-normal text-gray-700 mb-2">
              {expanded
                ? meal.strInstructions
                : `${meal.strInstructions.substring(0, 300)}...`}
            </p>
            <button
              className="text-blue-600 text-lg hover:underline w-full text-left hover:text-blue-800 cursor-pointer focus:outline-none border-b-1 pb-7"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>

            <p className="text-lg md:text-xl text-gray-800 pt-5 mb-3">Source</p>
            <a
              href={meal.strSource}
              target="_blank"
              className="text-orange-600 hover:text-orange-700 hover:underline break-words"
            >
              {meal.strSource}
            </a>
          </div>
        </div>
      </div>

      <a
        href={meal.strYoutube}
        target="_blank"
        className="flex items-center justify-center gap-3 rounded-lg py-3 bg-red-600 hover:bg-red-700 text-lg md:text-xl text-white text-center"
      >
        <ion-icon name="logo-youtube"></ion-icon> Watch on Youtube
      </a>

      <ul className="border-1 border-gray-200 shadow-sm border-t-0 rounded-b-lg p-5 mb-10 flex flex-col gap-3 mt-8">
        <p className="text-2xl md:text-3xl font-semibold text-gray-900 pb-3 border-b-1 border-gray-200">
          Ingredients
        </p>
        {ingredientsArr.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center gap-3 mt-2 flex-wrap text-base md:text-lg"
          >
            <span className="w-6 h-6 bg-orange-100 font-[inter] text-orange-800 rounded-full flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-gray-700 font-[inter]">
              {ingredient.measure} {ingredient.ingredient}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SingleMeal;
