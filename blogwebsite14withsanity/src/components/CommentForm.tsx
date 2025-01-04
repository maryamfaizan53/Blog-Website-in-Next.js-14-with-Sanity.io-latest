"use client";
import React, { useState, useEffect, FormEvent } from "react";

interface SingleComment {
  name: string;
  email: string;
  comment: string;
  createdAt: string; // we can store a timestamp
}

export default function CommentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // This array will hold all comments from local storage
  const [allComments, setAllComments] = useState<SingleComment[]>([]);

  // 1. Load any previously saved comments from local storage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("allComments");
    if (storedData) {
      const parsedComments: SingleComment[] = JSON.parse(storedData);
      setAllComments(parsedComments);
    }
  }, []);

  // 2. Handle Submit: Save the new comment in local storage + display it
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !comment) {
      setError("Please fill out all fields.");
      return;
    }

    // Build a new comment object
    const newComment: SingleComment = {
      name,
      email,
      comment,
      createdAt: new Date().toISOString(),
    };

    // Merge with existing comments
    const updatedComments = [...allComments, newComment];

    // Store in local storage
    localStorage.setItem("allComments", JSON.stringify(updatedComments));

    // Update state
    setAllComments(updatedComments);

    // Clear form and show success
    setName("");
    setEmail("");
    setComment("");
    setSuccess("Your comment has been saved locally!");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-bold">Leave a Comment</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="comment" className="block font-semibold mb-1">
            Comment
          </label>
          <textarea
            id="comment"
            className="w-full border rounded p-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-accentDarkSecondary text-dark font-semibold"
        >
          Save Comment Locally
        </button>
      </form>

      {/* 3. Display all comments stored in local storage */}
      <section className="mt-8">
        <h3 className="text-xl font-bold mb-4">All Comments (Local Storage)</h3>
        {allComments.length > 0 ? (
          <ul className="space-y-4">
            {allComments.map((cmt, index) => (
              <li key={index} className="border p-4 rounded">
                <p className="font-semibold mb-1">{cmt.name} ({cmt.email}):</p>
                <p>{cmt.comment}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(cmt.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>.</p>
        )}
      </section>
    </div>
  );
}



// "use client";
// import React, { useState, useEffect, FormEvent } from "react";

// export default function CommentForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [comment, setComment] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 1. On component mount, load any existing comment from local storage
//   useEffect(() => {
//     const storedComment = localStorage.getItem("localComment");
//     if (storedComment) {
//       // parse the JSON and populate form fields
//       const { name: storedName, email: storedEmail, comment: storedMsg } = JSON.parse(storedComment);
//       setName(storedName || "");
//       setEmail(storedEmail || "");
//       setComment(storedMsg || "");
//     }
//   }, []);

//   // 2. Handle form submit — only saving to local storage, no fetch calls
//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!name || !email || !comment) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     // Save user input in local storage
//     const dataToStore = { name, email, comment };
//     localStorage.setItem("localComment", JSON.stringify(dataToStore));

//     setSuccess("Your comment has been saved in local storage!");
//     // Optionally clear the form:
//     // setName("");
//     // setEmail("");
//     // setComment("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md">
//       <h2 className="text-lg font-bold">Leave a Comment</h2>

//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       <div>
//         <label htmlFor="name" className="block font-semibold mb-1">
//           Name
//         </label>
//         <input
//           id="name"
//           type="text"
//           className="w-full border rounded p-2"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>

//       <div>
//         <label htmlFor="email" className="block font-semibold mb-1">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           className="w-full border rounded p-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div>
//         <label htmlFor="comment" className="block font-semibold mb-1">
//           Comment
//         </label>
//         <textarea
//           id="comment"
//           className="w-full border rounded p-2"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//       </div>

//       <button
//         type="submit"
//         className="px-4 py-2 rounded bg-accentDarkSecondary text-dark font-semibold"
//       >
//         Save Comment Locally
//       </button>
//     </form>
//   );
// }


// // "use client";
// // import React, { useState, useEffect, FormEvent } from "react";

// // interface CommentFormProps {
// //   postId: string;
// // }

// // interface CommentDraft {
// //   name: string;
// //   email: string;
// //   comment: string;
// // }

// // export default function CommentForm({ postId }: CommentFormProps) {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [comment, setComment] = useState("");
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   // 1) Load localStorage draft on mount
// //   useEffect(() => {
// //     const storedDraft = localStorage.getItem("commentDraft");
// //     if (storedDraft) {
// //       const parsedDraft: CommentDraft = JSON.parse(storedDraft);
// //       setName(parsedDraft.name || "");
// //       setEmail(parsedDraft.email || "");
// //       setComment(parsedDraft.comment || "");
// //     }
// //   }, []);

// //   // 2) Save any changes to localStorage
// //   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setName(e.target.value);
// //     saveDraftToLocalStorage(e.target.value, email, comment);
// //   };

// //   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setEmail(e.target.value);
// //     saveDraftToLocalStorage(name, e.target.value, comment);
// //   };

// //   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// //     setComment(e.target.value);
// //     saveDraftToLocalStorage(name, email, e.target.value);
// //   };

// //   const saveDraftToLocalStorage = (name: string, email: string, comment: string) => {
// //     const draft: CommentDraft = { name, email, comment };
// //     localStorage.setItem("commentDraft", JSON.stringify(draft));
// //   };

// //   // 3) Handle Submit
// //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     if (!name || !email || !comment) {
// //       setError("Please fill out all fields.");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("/api/createComment", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           name,
// //           email,
// //           comment,
// //           postId,
// //         }),
// //       });

// //       if (!res.ok) {
// //         throw new Error("Failed to submit comment");
// //       }

// //       // 4) If successful, clear the localStorage draft + clear form
// //       localStorage.removeItem("commentDraft");
// //       setSuccess("Thank you for your comment!");
// //       setName("");
// //       setEmail("");
// //       setComment("");
// //     } catch (err: any) {
// //       console.error(err);
// //       setError("Something went wrong. Please try again later.");
// //       // The draft remains in localStorage if something went wrong
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md">
// //       <h2 className="text-lg font-bold">Leave a Comment</h2>

// //       {error && <p className="text-red-500">{error}</p>}
// //       {success && <p className="text-green-500">{success}</p>}

// //       <div>
// //         <label htmlFor="name" className="block font-semibold mb-1">
// //           Name
// //         </label>
// //         <input
// //           id="name"
// //           type="text"
// //           className="w-full border rounded p-2"
// //           value={name}
// //           onChange={handleNameChange}
// //         />
// //       </div>

// //       <div>
// //         <label htmlFor="email" className="block font-semibold mb-1">
// //           Email
// //         </label>
// //         <input
// //           id="email"
// //           type="email"
// //           className="w-full border rounded p-2"
// //           value={email}
// //           onChange={handleEmailChange}
// //         />
// //       </div>

// //       <div>
// //         <label htmlFor="comment" className="block font-semibold mb-1">
// //           Comment
// //         </label>
// //         <textarea
// //           id="comment"
// //           className="w-full border rounded p-2"
// //           value={comment}
// //           onChange={handleCommentChange}
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         className="px-4 py-2 rounded bg-accentDarkSecondary text-dark font-semibold"
// //       >
// //         Submit
// //       </button>
// //     </form>
// //   );
// // }


// // // // components/CommentForm.tsx
// // // "use client"; 
// // // import React, { useState } from "react";

// // // interface CommentFormProps {
// // //   postId: string;
// // // }

// // // export default function CommentForm({ postId }: CommentFormProps) {
// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [comment, setComment] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");

// // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setSuccess("");

// // //     if (!name || !email || !comment) {
// // //       setError("Please fill out all fields.");
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch("/api/createComment", {
// // //         method: "POST",
// // //         body: JSON.stringify({
// // //           name,
// // //           email,
// // //           comment,
// // //           postId,
// // //         }),
// // //       });

// // //       if (!res.ok) {
// // //         throw new Error("Failed to submit comment");
// // //       }

// // //       setSuccess("Thank you for your comment!");
// // //       setName("");
// // //       setEmail("");
// // //       setComment("");
// // //     } catch (err: any) {
// // //       console.error(err);
// // //       setError("Something went wrong. Please try again later.");
// // //     }
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md">
// // //       <h2 className="text-lg font-bold">Leave a Comment</h2>

// // //       {error && <p className="text-red-500">{error}</p>}
// // //       {success && <p className="text-green-500">{success}</p>}

// // //       <div>
// // //         <label htmlFor="name" className="block font-semibold mb-1">Name</label>
// // //         <input
// // //           id="name"
// // //           type="text"
// // //           className="w-full border rounded p-2"
// // //           value={name}
// // //           onChange={(e) => setName(e.target.value)}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label htmlFor="email" className="block font-semibold mb-1">Email</label>
// // //         <input
// // //           id="email"
// // //           type="email"
// // //           className="w-full border rounded p-2"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label htmlFor="comment" className="block font-semibold mb-1">Comment</label>
// // //         <textarea
// // //           id="comment"
// // //           className="w-full border rounded p-2"
// // //           value={comment}
// // //           onChange={(e) => setComment(e.target.value)}
// // //         />
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         className="px-4 py-2 rounded bg-accentDarkSecondary text-dark font-semibold"
// // //       >
// // //         Submit
// // //       </button>
// // //     </form>
// // //   );
// // // }
