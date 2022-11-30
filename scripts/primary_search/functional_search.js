
import { lettersSpacesApostrophesOnly, removeAccents } from "../helpers/text_input.js";

const searchInput = document.getElementById("searchInput");
const searchError = document.getElementById("searchError");

let userText;
let userTextInput;
let words = [];
let deletion;

const recipesCollection = document.getElementsByTagName("article");

export function searchRecipes(event) {
	userText = event.target.value;
	userTextInput = removeAccents(userText.toLowerCase().trim()); 

	if(lettersSpacesApostrophesOnly(userTextInput) === false && (userTextInput !== "")){
		searchError.dataset.searchErrorVisible = "true";
		return;
	}
	
	searchError.dataset.searchErrorVisible = "false";
	
	words = userTextInput.split(" ");
    
	if(deletion === true){
		displayRestoredRecipes();
		hideSearchEliminatedRecipes();
		return;
	}

	if (deletion === false && (userTextInput.length >= 3)) {    
		hideSearchEliminatedRecipes();
		return;
	}
}

async function updateAllRecipes(collection){
	try {
		Array.from(collection).forEach(recipe => {
			searchRecipeForAllWords(recipe);
			eliminateOrRestoreRecipe(recipe);
		});
		
	} catch (error) {
		return false;
	}

	return true;
}

async function searchRecipeForAllWords(recipe) {
	const recipeTitle = removeAccents(recipe.dataset.recipeArticle); 
	const recipeIngredients = removeAccents(recipe.dataset.recipeIngredients);
	const recipeDescription = (removeAccents(recipe.querySelector("[data-recipe-description]").textContent.toLowerCase())).replaceAll(/[,.:()]+/g, "");
	const results = [];
	words.forEach(word => {
		let result = searchRecipeForWord(word, recipeTitle, recipeIngredients, recipeDescription);
		results.push(result);
	})

	return [...results];
}

function searchRecipeForWord(word, recipeTitle, recipeIngredients, recipeDescription) {
	if(words.at(0) === "") return undefined;
	if(recipeTitle.includes(word) || recipeIngredients.includes(word) || recipeDescription.includes(word)) return true;

	return false;
}

async function eliminateOrRestoreRecipe(recipe) {
	const results = await searchRecipeForAllWords(recipe);
	if(results.includes(undefined) || !results.includes(false)){
		recipe.classList.remove("searchEliminated");
	}

	if(results.includes(false) && !recipe.classList.contains("searchEliminated")){
		recipe.classList.add("searchEliminated");
	}
}

const hideSearchEliminatedRecipes = async () => {
	const updateComplete = await updateAllRecipes(recipesCollection);
	if(updateComplete){
		const eliminatedList = document.querySelectorAll(".searchEliminated");
		eliminatedList.forEach((recipe => {
			recipe.classList.replace("found", "notfound");
		}));
	}
}

const displayRestoredRecipes = async () => {
	const updateComplete = await updateAllRecipes(recipesCollection);
	if(updateComplete){
		const hiddenList = document.querySelectorAll(".notfound");
		hiddenList.forEach((recipe => {
			if(!recipe.classList.contains("tagEliminated") && !recipe.classList.contains("searchEliminated")){
				recipe.classList.replace("notfound", "found");
			};
		}));
	}
}

function detectDeletion(event){
	(event.key === "Backspace" || event.key === "Delete") ? (deletion = true) : (deletion = false);
}

searchInput.addEventListener("input", searchRecipes);
searchInput.addEventListener("keydown", detectDeletion);