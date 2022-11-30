import { recipes } from "./data/recipes.js";
import { recipeFactory} from "./factories/recipe_factory.js"
import { applianceLabel,  utensilLabel,  ingredientLabel, createDropdownList } from "./factories/dropdown_factory.js";

export const menuIngredients = document.getElementById("menuIngredients");
export const menuAppliances = document.getElementById("menuAppliances");
export const menuUtensils = document.getElementById("menuUtensils");

export const recipesOutput = document.getElementById("recipesOutput");

//Function to display all recipe cards
async function displayRecipes() {
	const appliances = [];
	const utensils = [];
	const ingredients = [];

	recipes.forEach((recipe) => {
		//for each recipe in the array recipes[] ...
		const recipeModel = recipeFactory(recipe); //The value of recipeModel is the return value of recipeFactory(recipe)
		const recipeCardDOM = recipeModel.recipeCardDOM(); //recipeCardDOM() returns the recipe's DOM
		recipesOutput.appendChild(recipeCardDOM); //Append each recipe to the recipesOutput section
		
		const recipeAppliance = recipeModel.appliance;
		const recipeIngredientsArray = recipeModel.ingredientsArray;
		const recipeUtensilsArray = recipeModel.utensilsArray;

		appliances.push(recipeAppliance);
		utensils.push(recipeUtensilsArray);
		ingredients.push(recipeIngredientsArray);
	});

	return [appliances, utensils, ingredients]
	
}

async function displayDropdowns(){
	const [appliances, utensils, ingredients] = await displayRecipes();

	const allAppliances = [...new Set(appliances)];
	const allUtensils = [...new Set(utensils.flatMap(utensil => utensil))];
	const allIngredients = [...new Set(ingredients.flatMap(ingredient => ingredient))];

	const applianceOptions = createDropdownList(allAppliances, menuAppliances, applianceLabel, "textShadow--2");
	const utensilOptions = createDropdownList(allUtensils, menuUtensils, utensilLabel, "textShadow--3")
	const ingredientOptions = createDropdownList(allIngredients, menuIngredients, ingredientLabel, "textShadow--1");

	return {applianceOptions, utensilOptions, ingredientOptions}
}

export const main = async () => {
	const ready = await displayDropdowns();
	return ready
}