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
          className="px-4 py-2 rounded bg-pink-700 text-dark font-semibold"
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



