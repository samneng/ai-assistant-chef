"use client";

import { useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeCard from './components/RecipeCard';
import { Recipe } from './types/recipes';
import { Loader2 } from "lucide-react";

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDF7F2] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <RecipeForm
          onRecipeGenerated={setRecipe}
          onLoading={setLoading}
        />

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        )}

        {recipe && !loading && <RecipeCard recipe={recipe} />}
      </div>
    </main>
  );
}