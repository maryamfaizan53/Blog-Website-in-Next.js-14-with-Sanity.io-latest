import BlogCard from "@/components/BlogCard"
import { client } from "../../sanity/lib/client";

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
    <main className="flex min-h-screen flex-col">
      <h1 className="text-2xl font-bold uppercase my-12 text-center">
        Most Recent Blogs
      </h1>

      {/* Grid of Blog Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
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


// // app/page.tsx or pages/index.tsx
// import { client } from "../../sanity/lib/client";
// import BlogCard from "@/components/BlogCard";

// export const revalidate = 60;

// export default async function Home() {
//   const query = `*[_type=="post"] | order(_createdAt desc){
//     _id,
//     "slug": slug.current,
//     title,
//     summary,
//     image,
//     author->{ bio, image, name },
//     "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc){
//       _id,
//       name,
//       email,
//       comment,
//       _createdAt
//     }
//   }`;

//   let posts: Post[] = [];
//   try {
//     posts = await client.fetch(query);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//   }

//   return (
//     <main className="flex min-h-screen flex-col">
//       <h1 className="text-2xl font-bold uppercase my-12 text-center">
//         Most Recent Blogs
//       </h1>

//       {posts.length > 0 ? (
//         posts.map((post) => (
//           <section key={post._id} className="border p-4 rounded my-4">
//             <h2 className="text-xl font-bold mb-2">{post.title}</h2>
//             <p className="italic mb-2">{post.summary}</p>

//             {/* Here you could use <BlogCard post={post} /> if you want the same styling, 
//                 but then you'd also want to show the comments below it.
//              */}
            
//             <h3 className="font-semibold">Comments:</h3>
//             {post.comments && post.comments.length > 0 ? (
//               <ul className="ml-4 mb-2 list-disc">
//                 {post.comments.map((comment) => (
//                   <li key={comment._id} className="mb-2">
//                     <p className="font-semibold">{comment.name}:</p>
//                     <p>{comment.comment}</p>
//                     <span className="text-xs text-gray-500">
//                       {new Date(comment._createdAt).toLocaleString()}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No comments yet.</p>
//             )}
//           </section>
//         ))
//       ) : (
//         <p>No blogs available.</p>
//       )}
//     </main>
//   );
// }


// // import BlogCard from "@/components/BlogCard";
// // import Image from "next/image";
// // import { client } from "../../sanity/lib/client";

// // // export const revalidate = 60; //seconds

// // //export default async function Home() {
// //   const query = `*[_type=="post"] | order(_createdAt desc){
// //     _id,
// //     "slug": slug.current,
// //     title,
// //     summary,
// //     image,
// //     author->{ bio, image, name },
// //     "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc){
// //       _id,
// //       name,
// //       email,
// //       comment,
// //       _createdAt
// //     }
// //   }`;

// //   let posts: Post[] = [];
// //   try {
// //     posts = await client.fetch(query);
// //   } catch (error) {
// //     console.error("Error fetching posts:", error);
// //   }

// //   return (
// //     <main className="flex min-h-screen flex-col">
// //       <h1 className="text-2xl font-bold uppercase my-12 text-center">
// //         Most Recent Blogs
// //       </h1>

// //       {posts.length > 0 ? (
// //         posts.map((post) => (
// //           <section key={post._id} className="border p-4 rounded my-4">
// //             <h2 className="text-xl font-bold mb-2">{post.title}</h2>
// //             <p className="italic mb-2">{post.summary}</p>

// //             {/* Here you could use <BlogCard post={post} /> if you want the same styling, 
// //                 but then you'd also want to show the comments below it.
// //              */}
            
// //             <h3 className="font-semibold">Comments:</h3>
// //             {post.comments && post.comments.length > 0 ? (
// //               <ul className="ml-4 mb-2 list-disc">
// //                 {post.comments.map((comment) => (
// //                   <li key={comment._id} className="mb-2">
// //                     <p className="font-semibold">{comment.name}:</p>
// //                     <p>{comment.comment}</p>
// //                     <span className="text-xs text-gray-500">
// //                       {new Date(comment._createdAt).toLocaleString()}
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p>No comments yet.</p>
// //             )}
// //           </section>
// //         ))
// //       ) : (
// //         <p>No blogs available.</p>
// //       )}
// //     </main>
// //   );
// // }



// // {posts.map((post) => (
// //   <section key={post._id} className="border p-4 rounded my-4">
// //     {/* Reuse your BlogCard for the post details */}
// //     <BlogCard post={post} /> 

// //     {/* Then display this post's comments below */}
// //     <h3 className="font-semibold mt-4">Comments:</h3>
// //     {post.comments && post.comments.length > 0 ? (
// //       <ul className="ml-4 mb-2 list-disc">
// //         {post.comments.map((comment) => (
// //           <li key={comment._id} className="mb-2">
// //             <p className="font-semibold">{comment.name}</p>
// //             <p>{comment.comment}</p>
// //             <span className="text-xs text-gray-500">
// //               {new Date(comment._createdAt).toLocaleString()}
// //             </span>
// //           </li>
// //         ))}
// //       </ul>
// //     ) : (
// //       <p>No comments yet.</p>
// //     )}
// //   </section>
// // ))}