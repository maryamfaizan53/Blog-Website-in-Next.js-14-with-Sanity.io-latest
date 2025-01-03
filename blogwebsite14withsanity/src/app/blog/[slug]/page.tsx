// app/blog/[slug]/page.tsx (or pages/blog/[slug].tsx if you're using the Pages Router)
import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import CommentForm from "@/components/CommentForm"; // <--- import here

export default async function SinglePostPage({ params: { slug } }: { params: { slug: string } }) {
  // 1. Query to fetch post details
  const query = `*[_type=='post' && slug.current == "${slug}"]{
    _id,
    title,
    summary,
    image,
    content,
    author->{bio, image, name},
    "comments": *[_type=="comment" && post._ref == ^._id]|order(_createdAt desc){
      _id,
      name,
      email,
      comment,
      _createdAt
    }
  }[0]`;

  const post = await client.fetch(query);

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <article className="mt-12 mb-24 px-2 flex flex-col gap-y-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <Image
        src={urlForImage(post.image)}
        width={500}
        height={500}
        alt="Featured image"
        className="rounded"
      />

      <section>
        <h2 className="text-2xl font-bold">Summary</h2>
        <p>{post.summary}</p>
      </section>

      <section className="flex gap-4 items-center">
        <Image
          src={urlForImage(post.author.image)}
          width={48}
          height={48}
          alt="author"
          className="object-cover rounded-full"
        />
        <div>
          <h3 className="text-xl font-bold">{post.author.name}</h3>
          <p className="italic text-sm">{post.author.bio}</p>
        </div>
      </section>

      <section className="prose">
        <PortableText value={post.content} />
      </section>

      {/* Comments List */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {post.comments && post.comments.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment: any) => (
              <li key={comment._id} className="border p-4 rounded">
                <p className="font-semibold">{comment.name}</p>
                <p>{comment.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment._createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </section>

      {/* 2. Render CommentForm here */}
      <CommentForm postId={post._id} />
    </article>
  );
}



// import Image from "next/image";
// import { client } from "../../../../sanity/lib/client";
// import { urlForImage } from "../../../../sanity/lib/image";
// import { PortableText } from "@portabletext/react";
// import { components } from "@/components/CustomComponent";

// export const revalidate = 60; //seconds

//  export async function generateStaticParams() {
//   const query = `*[_type=='post']{
//     "slug":slug.current
//   }`;
//   const slugs = await client.fetch(query);
//   const slugRoutes = slugs.map((item:{slug:string})=>(
//     item.slug
//   ));
//   // console.log(slugRoutes)
//   return slugRoutes.map((slug:string)=>(
//     {slug}
//   ))
  
// }

// // To create static pages for dynamic routes
// export default async function page({params:{slug}}:{params:{slug:string}}) {

//   const query = `*[_type=='post' && slug.current=="${slug}"]{
//     title,summary,image,content,
//       author->{bio,image,name}
//   }[0]`;
//   const post = await client.fetch(query);
//   // console.log(post);



//   return (
//     <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">

//       {/* Blog Title */}
//       <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
//         {post.title}
//       </h1>

//       {/* Featured Image */}
//       <Image
//         src={urlForImage(post.image)}
//         width={500}
//         height={500}
//         alt="AI for everyone"
//         className="rounded"
//       />

//       {/* Blog Summary Section */}
//       <section>
//       <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
//         Summary
//       </h2>
//       <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
//         {post.summary}
//       </p>
//       </section>

//       {/* Author Section (Image & Bio) */}
//       <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
//         <Image
//           src={urlForImage(post.author.image)}
//           width={200}
//           height={200}
//           alt="author"
//           className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
//         />
//         <div className="flex flex-col gap-1">
//           <h3 className="text-xl font-bold text-dark dark:text-light">{post.author.name}</h3>
//           <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
//             {post.author.bio}
//           </p>
//         </div>
//       </section>

//       {/* Main Body of Blog */}
//       <section className="text-lg leading-normal text-dark/80 dark:text-light/80
//       prose-h4:text-accentDarkPrimary prose-h4:text-3xl prose-h4:font-bold
//       prose-li:list-disc prose-li:list-inside prose-li:marker:text-accentDarkSecondary
//       prose-strong:text-dark dark:prose-strong:text-white
      
//       ">
//         <PortableText 
//         value={post.content} 
//         // components={components} 
//         />
        
//       </section>
//     </article>
//   );
// }
