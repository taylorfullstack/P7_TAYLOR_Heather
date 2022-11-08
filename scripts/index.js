import { recipeFactory, recipes } from "./factories/recipe_factory.js"
import { } from "./factories/dropdown_factory.js";
import { } from "./components/dropdown/dropdown_keyboard_navigation.js";
import { } from "./components/dropdown/dropdown_inputs.js";
import { } from "./components/dropdown/dropdown_observer.js"
import { } from "./components/tag_menu/tags.js";
import { } from "./components/tag_menu/tag_observer.js";
import { } from "./components/recipes_output/recipe_observer.js";

const recipesOutput = document.getElementById("recipesOutput");
//Function to display all recipe cards
const displayData = recipes => {
    
    recipes.forEach((recipe) => {
        //for each recipe in the array recipes[] ...
        const recipeModel = recipeFactory(recipe); //The value of recipeModel is the return value of recipeFactory(recipe)
        const recipeCardDOM = recipeModel.recipeCardDOM(); //recipeCardDOM() returns the recipe's DOM
        recipesOutput.appendChild(recipeCardDOM); //Append each recipe to the recipesOutput section
        //console.log(recipe);
        //console.log(recipe.time);
        //console.log(recipe.servings);
    });
}

const main = () => {
    displayData(recipes);
}

main();
