import { applianceLabel, utensilLabel, ingredientLabel } from "../../factories/dropdown_factory.js";
import { classMutationConfiguration } from "../../helpers/mutation_observer_configuration.js";
import {ingredientsList, appliancesList, utensilsList } from "../dropdown/dropdown_inputs.js"

const noRecipes = document.getElementById("noRecipes");

//RecipesOutput Mutation Observer
const recipesOutputMutant = document.querySelector("#recipesOutput");
const recipesOutputMutationObserver = new MutationObserver(_mutations => {
	const foundList = document.querySelectorAll(".found");
    
	//Call the function to display a message if no recipes are found
	displayNoRecipes(foundList);

	//Arrays to hold the data of all currently displayed recipes 
	let allFoundRecipeIngredients = [];
	let allFoundRecipeUtensils = [];
	let allFoundRecipeAppliances = [];

	//For every currently displayed recipe ...push its data into the appropriate array
	for(let recipe of foundList){
		let recipeApplianceData = recipe.dataset.recipeAppliance
		let recipeUtensilsData = recipe.dataset.recipeUtensils.split(",");
		let recipeIngredientsData = recipe.dataset.recipeIngredients.split(",");

		allFoundRecipeIngredients.push(recipeIngredientsData);
		allFoundRecipeUtensils.push(recipeUtensilsData);
		allFoundRecipeAppliances.push(recipeApplianceData);
	}

	const uniqueFoundRecipeAppliances = [...new Set (allFoundRecipeAppliances)];
	const uniqueFoundRecipeUtensils = [...new Set (allFoundRecipeUtensils.flatMap(utensil => utensil))];
	const uniqueFoundRecipeIngredients = [...new Set (allFoundRecipeIngredients.flatMap(ingredient => ingredient))];

	//Update the dropdown menu list options
	editDropdownList(ingredientsList, uniqueFoundRecipeIngredients, ingredientLabel);
	editDropdownList(utensilsList, uniqueFoundRecipeUtensils, utensilLabel);
	editDropdownList(appliancesList, uniqueFoundRecipeAppliances, applianceLabel);

});

//Function to edit the available options in the dropdown menus
//...based on the currently displayed recipes
//Note - eliminated class refers to list options that are not included in the visible recipes
export const editDropdownList = (dropdownList, uniqueFoundRecipeData, datalabel) => {
	for(let listOption of dropdownList) {
		if(uniqueFoundRecipeData.includes(listOption.dataset[`${datalabel}`])) {
			if(listOption.classList.contains("hidden") && listOption.classList.contains("eliminated") 
                && !(listOption.classList.contains("tagged"))) {
				listOption.classList.replace("hidden", "notHidden");
				listOption.classList.remove("eliminated");
			}
		} else {
			listOption.classList.replace("notHidden", "hidden");
			listOption.classList.add("eliminated");
		}
	}
};

recipesOutputMutationObserver.observe(recipesOutputMutant, classMutationConfiguration);

//Function to display a notification if none of the recipes match the user search
const displayNoRecipes = (collection) => {
	if(collection.length === 0) {
		noRecipes.dataset.results = "none";
		return;
	}
	noRecipes.dataset.results = "some";
}