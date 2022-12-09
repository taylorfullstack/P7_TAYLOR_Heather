import { lettersSpacesApostrophesOnly, removeAccents } from "../helpers/text_input.js";

const searchInput = document.getElementById("searchInput");
const searchError = document.getElementById("searchError");
const recipesCollection = document.getElementsByTagName("article");

let userTextInput;
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

//Validate user input, then store valid input text as userInputText
//Trigger the elimination and/or restoration of recipes based on the search terms 
function searchRecipes(event) {
	userTextInput = removeAccents((event.target.value).toLowerCase().trim()); 

	if(lettersSpacesApostrophesOnly(userTextInput) === false && (userTextInput !== "")){
		searchError.dataset.searchErrorVisible = "true";
		return;
	}
	
	searchError.dataset.searchErrorVisible = "false";
	
	if(deletion === true){
		const hiddenList = document.querySelectorAll(".searchEliminated")
		updateRecipes(hiddenList);
		return;
	}

	if (deletion === false && (userTextInput.length >= 3)){
		updateRecipes(recipesCollection);
		return;
	}
}

//Update the class of every recipe based on the search results
//Add or remove the searchEliminated class to a single recipe based on the search results
function updateRecipes(recipes){
	Array.from(recipes).forEach(recipe => {
		const found = searchRecipeForUserInput(recipe);
		if(found === undefined || found === true){
			recipe.classList.remove("searchEliminated");
			if(!recipe.classList.contains("tagEliminated")){
				recipe.classList.replace("notfound", "found");
			};
		}
		if(found === false && !recipe.classList.contains("searchEliminated")){
			recipe.classList.add("searchEliminated");
			recipe.classList.replace("found", "notfound");
		}
	});
}

//Search recipes based on the user text input in the search bar
function searchRecipeForUserInput(recipe) {
	if(userTextInput.length === 0) return undefined;
	const recipeTitle = removeAccents(recipe.dataset.recipeArticle); 
	const recipeIngredients = removeAccents(recipe.dataset.recipeIngredients);
	const recipeDescription = (removeAccents(recipe.querySelector('p').textContent.toLowerCase())).replaceAll(/[,.:()]+/g, "");
	
	if(recipeTitle.includes(userTextInput) || recipeIngredients.includes(userTextInput) || recipeDescription.includes(userTextInput)) return true;

	return false;
}

searchInput.addEventListener("keydown", detectDeletion);
searchInput.addEventListener("input", searchRecipes);