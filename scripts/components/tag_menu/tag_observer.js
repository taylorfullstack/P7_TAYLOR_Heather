import { ingredientLabel, applianceLabel, utensilLabel } from "../../factories/dropdown_factory.js";

const recipesOutputCollection = document.getElementById("recipesOutput").children;

const recipeData = (recipe) => {
	let hiddenRecipeApplianceData = recipe.dataset.recipeAppliance.split();
	let hiddenRecipeUtensilsData = recipe.dataset.recipeUtensils.split(",");
	let hiddenRecipeIngredientsData = recipe.dataset.recipeIngredients.split(",");
	let allRecipeTags = [];
	allRecipeTags = hiddenRecipeApplianceData.concat(hiddenRecipeUtensilsData, hiddenRecipeIngredientsData);
	return allRecipeTags;
}

//#tagMenu Mutation Observer
//Update the visible RECIPES on the page every time a tag is created or deleted
export const tagMenuMutant = document.querySelector("#tagMenu");
export const tagMutationObserver = new MutationObserver(mutations => {
	let addedTag;

	//For each mutation to the tagMenu
	mutations.forEach(mutation => {
		// If a tag is ADDED, update the visibile RECIPES
		if(mutation.addedNodes.length) {
			addedTag = mutation.addedNodes[0];

			let addedApplianceTagData = addedTag.dataset[`${applianceLabel}`];
			let addedUtensilTagData = addedTag.dataset[`${utensilLabel}`];
			let addedIngredientTagData = addedTag.dataset[`${ingredientLabel}`];

			//Call the hideRecipes() function with arguments relative to the type of added tag
			if(addedApplianceTagData !== undefined){
				hideRecipes(1, addedApplianceTagData, recipesOutputCollection);
			}

			if(addedUtensilTagData !== undefined){
				hideRecipes(2, addedUtensilTagData, recipesOutputCollection);
			}

			if(addedIngredientTagData !== undefined){
				hideRecipes(3, addedIngredientTagData, recipesOutputCollection);
			}
		}
        
		//If a tag is REMOVED, update the visibile RECIPES
		if(mutation.removedNodes.length) {
			const allTags = async () => {
				let allTagsTogether = []; 
				let allTags = document.querySelectorAll("[data-tag]");
				for(let tag of allTags){
					allTagsTogether.push(tag.textContent.toLowerCase());
				}
				return allTagsTogether;
			}
			revealHiddenRecipes(allTags);
		}
	});
})

//OBSERVE the childList of the #tagMenu
tagMutationObserver.observe(tagMenuMutant, {
	childList: true
})

const allTagMenuTagsPresentInRecipeData = async (tags, allRecipeTags) => {
	for (let i = 0; i < tags.length; i++){
		if (allRecipeTags.indexOf(tags[i]) === -1) {
			return false;
		} else {
			return true;
		}   
	}
}

async function revealHiddenRecipes(allTags){
	const tags = await allTags();
	if(tags.length === 0) {
		for(let recipe of recipesOutputCollection){
			recipe.classList.remove("tagEliminated");
			if(recipe.classList.contains("searchEliminated")){
				continue;
			}
			recipe.classList.replace("notfound", "found");
		}
		return;
	}
    
	//For every hidden recipe
	//If every single tag in the updated tagMenu is part of the recipe, display the recipe
	for(let recipe of recipesOutputCollection){
		const allRecipeTags = await recipeData(recipe);
		const result = await allTagMenuTagsPresentInRecipeData(tags, allRecipeTags);
		if (result === true) {
			recipe.classList.remove("tagEliminated");
			if(recipe.classList.contains("searchEliminated")){
				continue;
			}
			recipe.classList.replace("notfound", "found");
		}
	}
}

//Function factory to hide recipes if they do not contain the
//...ingredient, appliance, or utensil specified by an added tag
const hideRecipes = (dataCategoryIndex, addedTagData, nodeList) => {
	for(let recipe of nodeList){
		const recipeItemsDataCategory = Object.keys(recipe.dataset)[`${dataCategoryIndex}`];
		const recipeItemsData = recipe.dataset[`${recipeItemsDataCategory}`].split(",");
		if(recipeItemsData.includes(addedTagData) === false){
			recipe.classList.add("tagEliminated");
			recipe.classList.replace("found", "notfound");
		}
	}
}