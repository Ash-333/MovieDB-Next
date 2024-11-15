"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function MovieDetailsPage({ params }) {
  const [movie, setMovie] = useState(null);
  const id = params.id;
  console.log(id);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}`, options)
        .then((res) => res.json())
        .then((data) => setMovie(data));
    }
  }, [id]);

  if (!movie) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="rounded-lg shadow-lg"
      />
      <p className="mt-4 text-gray-800">{movie.overview}</p>
      <p className="mt-2">
        <span className="font-bold">Release Date:</span> {movie.release_date}
      </p>
      <p className="mt-2">
        <span className="font-bold">Rating:</span> {movie.vote_average} / 10
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Back to Home
      </button>
    </div>
  );
}
