import React from "react";
import Link from "next/link";

// 1) Define a Category type (optional, but recommended)
export interface Category {
  name: string;
  slug: string;
}

// 2) Define the interface for props
interface CategoryListProps {
  categories: Category[]; // expects an array of {name, slug}
}

// 3) Define the component
const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug}
           className="block bg-white p-6 border text-center text-black font-bold hover:bg-gray-100 hover:scale-105 with transform  border-gray-200 hover:shadow-lg transition-shadow duration-300 rounded">
            <h2 className="text-xl text-center font-semibold">{category.name}</h2>
          
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
