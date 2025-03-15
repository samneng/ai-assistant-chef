"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ChefHat } from "lucide-react";
import { Recipe } from '../types/recipes';

interface RecipeFormProps {
  onRecipeGenerated: (recipe: Recipe) => void;
  onLoading: (loading: boolean) => void;
}

export default function RecipeForm({ onRecipeGenerated, onLoading }: RecipeFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    onLoading(true);
    const response = await fetch('/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });


    if (!response.ok) {
      throw new Error('Failed to generate recipe');
    }
    onLoading(false);

    const recipe = await response.json();
    onRecipeGenerated(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className='md:w-1/2 w-full max-w-2xl mx-auto space-y-4'>
      <div className='p-5 bg-green-300/15 rounded-3xl'>
        <div className="flex items-center space-x-2 justify-center">
          <ChefHat className="w-8 h-8 text-green-600" />
          <h1 className='text-2xl font-bold text-gray-800'>តើអ្នកចង់ចម្អិនម្ហូបអ្វីដែរ?</h1>
        </div>
        <p className='text-sm text-gray-700 mt-5 mb-3 text-center'>គ្រាន់តែបញ្ចូលឈ្មោះមុខម្ហូប ឬបង្អែមដែលអ្នកចង់ធ្វើ<br/>ខ្ញុំនឹងជាជំនួយការចុងភៅរបស់អ្នក។</p>
        <div className="flex gap-2 flex-col">
          <Textarea
            placeholder="បញ្ចូលឈ្មោះមុខម្ហូប ដូចជា៖ សម្លរប្រហើរ, សម្លរម្ជូគ្រឿង, spaghetti, ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='flex-1 bg-white'
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-500">
            <Sparkles className="w-4 h-4 mr-2" />
            បង្កើតវិធីធ្វើ
          </Button>
        </div>
      </div>
    </form>
  );
}