"use client";
import React, { useState, useEffect, FormEvent } from "react";

interface CommentFormProps {
  postId: string;
}

interface CommentDraft {
  name: string;
  email: string;
  comment: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1) Load localStorage draft on mount
  useEffect(() => {
    const storedDraft = localStorage.getItem("commentDraft");
    if (storedDraft) {
      const parsedDraft: CommentDraft = JSON.parse(storedDraft);
      setName(parsedDraft.name || "");
      setEmail(parsedDraft.email || "");
      setComment(parsedDraft.comment || "");
    }
  }, []);

  // 2) Save any changes to localStorage
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    saveDraftToLocalStorage(e.target.value, email, comment);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    saveDraftToLocalStorage(name, e.target.value, comment);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    saveDraftToLocalStorage(name, email, e.target.value);
  };

  const saveDraftToLocalStorage = (name: string, email: string, comment: string) => {
    const draft: CommentDraft = { name, email, comment };
    localStorage.setItem("commentDraft", JSON.stringify(draft));
  };

  // 3) Handle Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !comment) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch("/api/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          comment,
          postId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }

      // 4) If successful, clear the localStorage draft + clear form
      localStorage.removeItem("commentDraft");
      setSuccess("Thank you for your comment!");
      setName("");
      setEmail("");
      setComment("");
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      // The draft remains in localStorage if something went wrong
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md">
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
          onChange={handleNameChange}
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
          onChange={handleEmailChange}
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
          onChange={handleCommentChange}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded bg-accentDarkSecondary text-dark font-semibold"
      >
        Submit
      </button>
    </form>
  );
}


// // components/CommentForm.tsx
// "use client"; 
// import React, { useState } from "react";

// interface CommentFormProps {
//   postId: string;
// }

// export default function CommentForm({ postId }: CommentFormProps) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [comment, setComment] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!name || !email || !comment) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/createComment", {
//         method: "POST",
//         body: JSON.stringify({
//           name,
//           email,
//           comment,
//           postId,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit comment");
//       }

//       setSuccess("Thank you for your comment!");
//       setName("");
//       setEmail("");
//       setComment("");
//     } catch (err: any) {
//       console.error(err);
//       setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md">
//       <h2 className="text-lg font-bold">Leave a Comment</h2>

//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       <div>
//         <label htmlFor="name" className="block font-semibold mb-1">Name</label>
//         <input
//           id="name"
//           type="text"
//           className="w-full border rounded p-2"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>

//       <div>
//         <label htmlFor="email" className="block font-semibold mb-1">Email</label>
//         <input
//           id="email"
//           type="email"
//           className="w-full border rounded p-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div>
//         <label htmlFor="comment" className="block font-semibold mb-1">Comment</label>
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
//         Submit
//       </button>
//     </form>
//   );
// }
