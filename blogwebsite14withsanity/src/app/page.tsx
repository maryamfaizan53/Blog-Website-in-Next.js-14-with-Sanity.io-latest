import BlogCard from "@/components/BlogCard"
import { client } from "../../sanity/lib/client";
import Hero from "@/components/Hero"
import CategoryList from "@/components/CategoryList"

import CommentForm from "@/components/CommentForm";

// export interface Post {
//   _id: string;
//   slug: string;
//   title: string;
//   summary: string;
//   image: any;


const categoriesData = [
  { name: "Trends", slug: "trends" },
  { name: "Street Style", slug: "street-style" },
  { name: "Accessories", slug: "accessories" },
  { name: "Men's Fashion", slug: "mens-fashion" },
  { name: "Women's Fashion", slug: "womens-fashion" },
  { name: "Sustainable", slug: "sustainable" },
];

// If you want Incremental Static Regeneration every 60 seconds:
export const revalidate = 60

export default async function Home() {
  // 1) Write a GROQ query to fetch *all* posts, in descending order
  const query = `*[_type=="post"] | order(_createdAt desc){
    _id,
    "slug": slug.current,
    title,
    summary,
    image,
    author->{ bio, image, name }
  }`

  let posts: Post[] = []

  // 2) Fetch from Sanity
  try {
    posts = await client.fetch(query)
  } catch (error) {
    console.error("Error fetching posts:", error)
  }

  // 3) Return the JSX
  return (
    <main className="flex min-h-screen bg-gray-200 flex-col shadow-md">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent uppercase my-12 text-center ">
      Fashion Fusion - A Modern Blog Concept
      </h1>
      <Hero
        title="Elevate Your Style"
        subtitle="Discover the latest trends and timeless classics on our fashion blog."
        buttonLabel="Start Exploring"
        buttonLink="/blog"
        backgroundImageUrl="/f2.jpeg"
      />

<section>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent uppercase my-12 text-center ">Categories</h1>

        <CategoryList categories={categoriesData} />


      </section>

      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent uppercase my-12 text-center ">Our Featured Blogs</h1>

      {/* Grid of Blog Cards */}
      <section className="grid grid-cols-1 m-3 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
      
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard post={post} key={post._id} />
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </section>

 

    </main>
  )
}


