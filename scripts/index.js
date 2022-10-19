import { recipeFactory, recipes } from "./factories/recipeFactory.js";

//Function to display all recipe cards
const displayData = recipes => {
    const recipesSection = document.querySelector("[data-recipes-section]");
    recipes.forEach((recipe) => {
        //for each recipe in the array recipes[] ...
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.recipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

const main = () => {
    displayData(recipes);
}

main();