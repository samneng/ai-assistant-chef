import { NextResponse } from "next/server"
import { OpenAI } from "openai";
import { franc } from "franc";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(request: Request) {

  const { query } = await request.json();
  const langCode = franc(query, {minLength: 3});

  let prompt = `As a professional chef, provide a detailed recipe for "${query}". Format the response in JSON with the following structure:
    {
      "title": "Recipe name",
      "description": "Brief description",
      "prepTime": "Preparation time",
      "cookTime": "Cooking time",
      "totalTime": "Total time",
      "servings": number,
      "difficulty": "Easy/Medium/Hard",
      "ingredients": ["List of ingredients with measurements"],
      "instructions": ["Numbered steps"],
      "equipment": ["Required equipment"]
    }`;

  if(langCode === "khm"){
    prompt = `ក្នុងនាមជាចុងភៅដ៏ជំនាញសូមផ្តល់នូវរូបមន្តលម្អិតសម្រាប់ "${query}". Format the response in JSON with the following structure:
    {
      "title": "ឈ្មោះមុខម្ហូប",
      "description": "ពត៌មានសង្ខេបអំពីម្ហូប",
      "prepTime": "ពេលវេលារៀបចំចម្អិន",
      "cookTime": "ពេលវេលាចម្អិន",
      "totalTime": "ពេលវេលាសរុប",
      "servings": number,
      "difficulty": "Easy/Medium/Hard",
      "ingredients": ["បញ្ជីគ្រឿងផ្សំជាមួយនឹងការវាស់វែង"],
      "instructions": ["ជំហាននិមួយៗនៃការធ្វើ"],
      "equipment": ["គ្រឿងបរិក្ខារដែលត្រូវការ"]
    }`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-pro-exp-02-05:free",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }
    const recipe = JSON.parse(content);

    // const recipe = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Recipe generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe' },
      { status: 500 }
    );
  }

}