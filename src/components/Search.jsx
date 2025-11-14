import { Search, X } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";

const SearchComponent = ({ setSearchRegion }) => {
  const [cuisines, setCuisines] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchCuisines() {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      const cuisines = await res.json();
      setCuisines(cuisines.meals);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchCuisines();
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchRegion(inputValue);
      sessionStorage.setItem("searchedCategory", JSON.stringify(inputValue));
      setInputValue("");
    }
  }

  return (
    <>
      <section className="pt-6 pb-20 mx-auto px-4 sm:px-6 lg:max-w-3xl lg:px-0">
        {/* Back button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-semibold text-center mb-10 mt-6">
          Find Your Perfect Recipe
        </h2>

        {/* Search Bar */}
        <form onSubmit={handleFormSubmit}>
          <div
            className="mb-5 border border-gray-300 shadow-sm flex items-center gap-3 py-3 sm:py-4 rounded-lg px-3 
          focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-black focus-within:shadow-lg"
          >
            <Search className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />

            <input
              type="text"
              placeholder="Search for a region or area..."
              className="text-base sm:text-lg lg:text-xl outline-0 w-full text-gray-700"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <X
              className={`text-gray-500 hover:text-gray-900 cursor-pointer ${
                inputValue.trim().length > 0 ? "block" : "hidden"
              }`}
              onClick={() => setInputValue("")}
            />
          </div>

          <button className="text-base sm:text-lg bg-orange-500 text-white font-semibold w-full py-2.5 sm:py-3 shadow-md rounded-lg cursor-pointer hover:bg-orange-600 mb-10">
            Search Recipes
          </button>
        </form>

        {/* Instructions Box */}
        <div className="bg-blue-50 px-5 sm:px-7 py-6 sm:py-8 rounded-lg">
          <h4 className="text-gray-900 font-semibold text-xl sm:text-2xl mb-4">
            How to Search
          </h4>

          <ul className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 [@media(max-width:350px)]:grid grid-cols-2">
            {loading
              ? Array.from({ length: 20 }).map((_, index) => (
                  <li
                    key={index}
                    className="bg-orange-200 text-orange-800 w-16 sm:w-20 h-6 sm:h-8 rounded-full shadow animate-pulse"
                  ></li>
                ))
              : cuisines.map((cuisine, index) => (
                  <li
                    key={index}
                    className="bg-orange-100 text-orange-800 text-center px-3 py-1 text-sm sm:text-base rounded-full cursor-pointer hover:bg-orange-800 hover:text-orange-50 transition"
                    onClick={() => setInputValue(cuisine.strArea)}
                  >
                    {cuisine.strArea}
                  </li>
                ))}
          </ul>
          {/* <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 20 }).map((_, index) => (
                  <li
                    key={index}
                    className="bg-orange-200 text-orange-800 w-full h-6 sm:h-8 rounded-full shadow animate-pulse"
                  ></li>
                ))
              : cuisines.map((cuisine, index) => (
                  <li
                    key={index}
                    className="w-full text-center bg-orange-100 text-orange-800 px-3 py-1 
                     text-sm sm:text-base rounded-full cursor-pointer 
                     hover:bg-orange-800 hover:text-orange-50 transition"
                    onClick={() => setInputValue(cuisine.strArea)}
                  >
                    {cuisine.strArea}
                  </li>
                ))}
          </ul> */}
        </div>
      </section>
    </>
  );
};

export default SearchComponent;
