import BackButton from "@/components/BackButton";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleCategoryPage = () => {
  const { categoryName } = useParams();
  const [catergoryData, setCategoryData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  async function fetchMealByCategory() {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    const data = await res.json();
    setCategoryData(data.meals);
  }

  useEffect(() => {
    fetchMealByCategory();
  }, [categoryName]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 px-5 py-6 md:px-10 transition-all duration-300 flex flex-col gap-5 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex flex-col items-start gap-4">
          <BackButton />
          <h1 className="text-3xl font-bold text-amber-900 capitalize">
            {categoryName} Meals
          </h1>
        </div>
      </header>

      <section className="grid grid-cols-1 min-[550px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1100px]:grid-cols-4  gap-6 p-5 md:p-10 max-w-[90rem] mx-auto">
        {catergoryData.map((mealItem) => (
          <Link to={`/meal/${mealItem.idMeal}`} key={mealItem.idMeal}>
            <div className="relative border rounded-lg shadow-md hover:shadow-xl transition-all duration-500 group hover:-translate-y-2 bg-white">
              <div className="relative">
                <img
                  src={mealItem.strMealThumb}
                  alt={mealItem.strMeal}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="absolute inset-0 rounded-t-md bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <button className="absolute bottom-3 left-3 px-3 py-1 text-sm bg-amber-500 text-white rounded-lg shadow opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Recipe
                </button>
              </div>

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
