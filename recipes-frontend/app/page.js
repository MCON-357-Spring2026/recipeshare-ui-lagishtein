"use client";

import { useEffect, useState } from "react";
import { fetchRecipes } from "@/lib/api";
import RecipeCardList from "@/components/RecipeCardList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        RecipeShare
      </Typography>
      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <RecipeCardList recipes={recipes} />
      )}
    </Container>
  );
}