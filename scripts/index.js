import { recipes } from "./data/recipes.js";
import { recipeFactory} from "./factories/recipe_factory.js"
import { applianceLabel,  utensilLabel,  ingredientLabel, createDropdownList } from "./factories/dropdown_factory.js";

export const menuIngredients = document.getElementById("menuIngredients");
export const menuAppliances = document.getElementById("menuAppliances");
export const menuUtensils = document.getElementById("menuUtensils");

export const recipesOutput = document.getElementById("recipesOutput");

//Function to display all recipe cards
async function displayRecipes() {
	const allAppliances = [];
	const allUtensils = [];
	const allIngredients = [];

	recipes.forEach((recipe) => {
		//for each recipe in the array recipes[] ...
		const recipeModel = recipeFactory(recipe);
		const recipeCardDOM = recipeModel.recipeCardDOM(); //recipeCardDOM() returns the recipe's DOM
		const recipeData = recipeCardDOM.searchData; //recipeData is all of the recipe data that is used in the search functionalities
		recipesOutput.appendChild(recipeCardDOM.article); //Append each recipe to the recipesOutput section
		
		allAppliances.push(recipeData.appliance);
		allUtensils.push(recipeData.utensils);
		allIngredients.push(recipeData.ingredients);
	});

	return [allAppliances, allUtensils, allIngredients]
	
}

async function displayDropdowns(){
	const [allAppliances, allUtensils, allIngredients] = await displayRecipes();

	const dropdownAppliances = [...new Set(allAppliances)];
	const dropdownUtensils = [...new Set(allUtensils.flatMap(utensil => utensil))];
	const dropdownIngredients = [...new Set(allIngredients.flatMap(ingredient => ingredient))];

	const applianceOptions = createDropdownList(dropdownAppliances, menuAppliances, applianceLabel, "textShadow--2");
	const utensilOptions = createDropdownList(dropdownUtensils, menuUtensils, utensilLabel, "textShadow--3")
	const ingredientOptions = createDropdownList(dropdownIngredients, menuIngredients, ingredientLabel, "textShadow--1");

	return {applianceOptions, utensilOptions, ingredientOptions}
}

export const main = async () => {
	const ready = await displayDropdowns();
	return ready
}