import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import SingleMeal from "./components/SingleMeal";
import SingleCategoryPage from "./Pages/SingleCategoryPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal/:meal" element={<SingleMeal />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:categoryName" element={<SingleCategoryPage />} />
      </Routes>
    </>
  );
};

export default App;
