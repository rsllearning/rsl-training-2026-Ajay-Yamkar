"use client";

import { useEffect, useState } from "react";

import { Star } from "lucide-react";

export default function FavoriteButton({ id }: { id: string }) {
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(
      JSON.parse(localStorage.getItem("orbit-favorites") || "[]").includes(id),
    );
  }, [id]);
  function toggle() {
    const current: string[] = JSON.parse(
      localStorage.getItem("orbit-favorites") || "[]",
    );
    const next = favorite ? current.filter((x) => x !== id) : [...current, id];
    localStorage.setItem("orbit-favorites", JSON.stringify(next));
    setFavorite(!favorite);
  }
  return (
    <button
      className={`favorite-button ${favorite ? "favorited" : ""}`}
      onClick={toggle}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      title={favorite ? "Remove favorite" : "Add favorite"}
    >
      <Star size={17} fill={favorite ? "currentColor" : "none"} />
    </button>
  );
}
