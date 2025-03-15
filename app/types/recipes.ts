export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  equipment: string[];
}