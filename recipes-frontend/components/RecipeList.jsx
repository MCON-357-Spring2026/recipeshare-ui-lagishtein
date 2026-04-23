"use client";

import { useState, useEffect } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log("Error fetching recipes:", error));
  }, []);

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>{recipe.title || recipe.name}</li>
      ))}
    </ul>
  );
}