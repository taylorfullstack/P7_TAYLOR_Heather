import { recipeFactory, recipes } from "./factories/recipeFactory.js";
import { } from "./factories/dropdownFactory.js";
import { } from "./helpers/keyboard.js";
import { } from "./helpers/dropdownInputs.js";
import { } from "./helpers/tags.js";
import { } from "./helpers/tagObserver.js";
import { } from "./helpers/recipeObserver.js";

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
