
import SearchComponent from "@/components/Search";
import MealBySearch from "@/components/SearchedMeal";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [searchRegion, setSearchRegion] = useState("");

  useEffect(() => {
    const category = sessionStorage.getItem("searchedCategory");
    if (category) {
      setSearchRegion(JSON.parse(category));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <SearchComponent setSearchRegion={setSearchRegion} />
      {searchRegion && <MealBySearch region={searchRegion} />}
    </div>
  );
};

export default SearchPage;
