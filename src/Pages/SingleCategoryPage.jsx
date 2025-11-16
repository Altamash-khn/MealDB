import BackButton from "@/components/BackButton";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleCategoryPage = () => {
  const { categoryName } = useParams();
  const [catergoryData, setCategoryData] = useState([]);

  async function fetchMealByCategory() {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    const data = await res.json();
    console.log(data);

    setCategoryData(data.meals);
  }

  useEffect(() => {
    fetchMealByCategory();
  }, [categoryName]);

  return (
    <>
      <header>
        <BackButton />
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 md:p-10 max-w-[90rem] mx-auto">
        {catergoryData.map((mealItem) => (
          <Link to={`/meal/${mealItem.idMeal}`} key={mealItem.idMeal}>
            <div
              className="border rounded-lg shadow-md hover:shadow-xl
                transition-all duration-500 
                hover:-translate-y-2"
            >
              <img
                src={mealItem.strMealThumb}
                alt={mealItem.strMeal}
                className="w-full h-48 object-cover rounded-t-md mb-4"
              />
              <div className="px-4 pb-8">
                <h3 className="text-xl font-semibold text-amber-950 line-clamp-1 mb-3">
                  {mealItem.strMeal}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-amber-700">International</p>
                  <p className="text-amber-800 bg-amber-100 px-3 py-1 rounded-2xl">
                    #{categoryName}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default SingleCategoryPage;
