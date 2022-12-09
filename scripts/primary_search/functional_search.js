import { validateInput, removeAccents } from "../helpers/text_input.js";

const searchInput = document.getElementById("searchInput");
const recipesCollection = document.getElementsByTagName("article");

let deletion;

//Detect any deletion of text input in the search bar
function detectDeletion(event){
	if(event.key === "Enter"){
		event.preventDefault();
		return;
	}

	let xKey = event.key === "x" || event.key ==="X";
	let metaKey = event.metaKey;
	let ctrlKey = event.ctrlKey;
	(event.key === "Backspace" || event.key === "Delete" || (ctrlKey && xKey) || (metaKey && xKey)) ? (deletion = true) : (deletion = false);
}

//Validate user input, then store valid input text as userInput
//Trigger the elimination and/or restoration of recipes based on the search terms 
function searchRecipes(event) {
	let userInput = event.target.value;
	if (deletion === false && (userInput.length >= 3)){
		validateInput(userInput);
		updateRecipes(recipesCollection, userInput);
		return;
	}
	if(deletion === true){
		validateInput(userInput);
		const hiddenList = document.querySelectorAll(".searchEliminated");
		updateRecipes(hiddenList, userInput);
		return;
	}
}

//Update the class of every recipe based on the search results
//Add or remove the searchEliminated class to a single recipe based on the search results
function updateRecipes(recipes, userInput){
	Array.from(recipes).forEach(recipe => {
		const found = searchRecipeForUserInput(recipe, userInput);
		if(found === undefined || found === true){
			recipe.classList.remove("searchEliminated");
			if(!recipe.classList.contains("tagEliminated")){
				recipe.classList.replace("notfound", "found");
			}
		}
		if(found === false && !recipe.classList.contains("searchEliminated")){
			recipe.classList.add("searchEliminated");
			recipe.classList.replace("found", "notfound");
		}
	});
}

//Search recipes based on the user text input in the search bar
function searchRecipeForUserInput(recipe, userInput) {
	if(userInput.length === 0) return undefined;
	const recipeTitle = removeAccents(recipe.dataset.recipeArticle); 
	const recipeIngredients = removeAccents(recipe.dataset.recipeIngredients);
	const recipeDescription = (removeAccents(recipe.querySelector('p').textContent.toLowerCase())).replaceAll(/[,.:()]+/g, "");
	
	if(recipeTitle.includes(userInput) || recipeIngredients.includes(userInput) || recipeDescription.includes(userInput)) return true;

	return false;
}

searchInput.addEventListener("keydown", detectDeletion);
searchInput.addEventListener("input", searchRecipes);