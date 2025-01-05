// pages/categories.tsx
import { NextPage } from "next";
import CategoryList from "./CategoryList";

const categories = [
  { name: "Trends", slug: "trends" },
  { name: "Street Style", slug: "street-style" },
  { name: "Accessories", slug: "accessories" },
  { name: "Men's Fashion", slug: "mens-fashion" },
  { name: "Women's Fashion", slug: "womens-fashion" },
  { name: "Sustainable", slug: "sustainable" },
];

const CategoriesPage: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent uppercase my-12 text-center shadow-md">Categories</h1>

      {/* Reusable component for the grid of categories */}
      <CategoryList categories={categories} />
    </div>
  );
};

export default CategoriesPage;
