// pages/category/[slug].tsx

import { useRouter } from "next/router";
import { NextPage } from "next";

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Replace this with real data fetching based on 'slug'
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">
        Category: {slug ? slug.toString().replace("-", " ") : "Loading..."}
      </h1>
      {/* You can list blog posts or items related to this category here */}
    </div>
  );
};

export default CategoryPage;
