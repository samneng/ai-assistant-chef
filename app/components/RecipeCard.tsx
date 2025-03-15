"use client";

import { useState, useRef } from 'react';
import { Recipe } from '../types/recipes';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Printer } from "lucide-react";
import { motion } from "framer-motion";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const recipeRef = useRef<HTMLDivElement>(null)

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const handlePrint = () => {
    window.print();
  };

  const getDifficultyColor = (difficulty: string) => {
    if (!difficulty) {
      return 'text-gray-500';
    }
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-orange-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    if (!difficulty) {
      return '';
    }
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'ងាយស្រួល';
      case 'medium':
        return 'មធ្យម';
      case 'hard':
        return 'ពិបាក';
      default:
        return 'មធ្យម';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto p-6 space-y-6 print:shadow-none print-section" ref={recipeRef}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
            <p className="text-gray-600 mt-2">{recipe.description}</p>
          </div>
          <Button onClick={handlePrint} variant="outline" className="print:hidden">
            <Printer className="w-4 h-4 mr-2" />
            បោះពុម្ភ
          </Button>
        </div>

        <div className="recipe">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">រយៈពេលរៀបចំ</p>
                <p className="font-medium">{recipe.prepTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">រយៈពេលចម្អិន</p>
                <p className="font-medium">{recipe.cookTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">សម្រាប់មនុស្ស</p>
                <p className="font-medium text-center">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className={`w-5 h-5 ${getDifficultyColor(recipe.difficulty)}`} />
              <div>
                <p className="text-sm text-gray-500">កម្រិត</p>
                <p className="font-medium">{getDifficultyText(recipe.difficulty)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold pt-3">គ្រឿងផ្សំ</h3>
            <ul className="space-y-2">
              {(recipe.ingredients || []).map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Checkbox
                    id={`ingredient-${index}`}
                    checked={checkedIngredients.has(index)}
                    onCheckedChange={() => toggleIngredient(index)}
                    className="print:hidden"
                  />
                  <label
                    htmlFor={`ingredient-${index}`}
                    className={`${
                      checkedIngredients.has(index) ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {ingredient}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold pt-3">វិធីធ្វើ</h3>
            <ol className="space-y-4">
              {(recipe.instructions || []).map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {(recipe.equipment || []).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold pt-3">ឧបករណ៍ត្រូវការ</h3>
              <ul className="list-disc list-inside space-y-2">
                {(recipe.equipment || []).map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}