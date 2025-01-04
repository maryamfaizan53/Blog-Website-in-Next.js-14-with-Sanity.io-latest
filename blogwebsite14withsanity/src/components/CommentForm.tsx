"use client";
import React, { useState, FormEvent } from "react";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
          "Content-Type": "application/json", // <-- Important
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

      setSuccess("Thank you for your comment!");
      setName("");
      setEmail("");
      setComment("");
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
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
        Submit
      </button>
    </form>
  );
}
