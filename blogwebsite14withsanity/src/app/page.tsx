// app/page.tsx (Next.js 13 App Router example)
import { client } from "../../sanity/lib/client"

// If you need incremental static regeneration
export const revalidate = 60

// 1) Define or import the interface(s)
interface Comment {
  _id: string
  name: string
  email: string
  comment: string
  _createdAt: string
}

interface Author {
  bio?: string
  image?: string
  name?: string
}

interface Post {
  _id: string
  slug: string
  title: string
  summary: string
  image?: string
  author?: Author
  comments?: Comment[]
}

export default async function Home() {
  // 2) Query to fetch all posts including their comments
  const query = `*[_type=="post"] | order(_createdAt desc){
    _id,
    "slug": slug.current,
    title,
    summary,
    image,
    author->{ bio, image, name },
    "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc){
      _id,
      name,
      email,
      comment,
      _createdAt
    }
  }`

  // 3) Initialize posts as a Post[] array
  let posts: Post[] = []

  // 4) Fetch from Sanity
  try {
    posts = await client.fetch(query)
  } catch (error) {
    console.error("Error fetching posts:", error)
  }

  // 5) Render
  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="text-2xl font-bold uppercase my-12 text-center">
        Most Recent Blogs
      </h1>

      {/* Check if posts array has items */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <section key={post._id} className="border p-4 rounded my-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="italic mb-2">{post.summary}</p>

            {/* Comments Section */}
            <h3 className="font-semibold">Comments:</h3>
            {post.comments && post.comments.length > 0 ? (
              <ul className="ml-4 mb-2 list-disc">
                {/* Declare comment: Comment to avoid implicit any */}
                {post.comments.map((comment: Comment) => (
                  <li key={comment._id} className="mb-2">
                    <p className="font-semibold">{comment.name}:</p>
                    <p>{comment.comment}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(comment._createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </section>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </main>
  )
}
