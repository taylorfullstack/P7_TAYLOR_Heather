import { lettersSpacesApostrophesOnly, removeAccents } from "../helpers/text_input.js";

const searchInput = document.getElementById("searchInput");
const searchError = document.getElementById("searchError");
const recipesCollection = document.getElementsByTagName("article");

let userText;
let userTextInput;
let words = [];
let deletion;

//Detect any deletion of text input in the search bar
function detectDeletion(event){
	let xKey = event.key === "x" || event.key ==="X";
	let metaKey = event.metaKey;
	let ctrlKey = event.ctrlKey;
	(event.key === "Backspace" || event.key === "Delete" || (ctrlKey && xKey) || (metaKey && xKey)) ? (deletion = true) : (deletion = false);
}

//Validate user input, then store valid input text in the words array
//Trigger the elimination and/or restoration of recipes based on the search terms 
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
		return;
	}

	if (deletion === false && (userTextInput.length >= 3)){
		hideSearchEliminatedRecipes();
		displayRestoredRecipes();
		return;
	}
}

//Hide recipes if they do not match the search results 
async function hideSearchEliminatedRecipes(){
	const updateComplete = await updateAllRecipes(recipesCollection);
	if(updateComplete){
		const eliminatedList = document.querySelectorAll(".searchEliminated");
		eliminatedList.forEach((recipe => {
			recipe.classList.replace("found", "notfound");
		}));
	}
}

//Display hidden recipes if they match the new search results
async function displayRestoredRecipes(){
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

//Update the class of every recipe based on the search results
async function updateAllRecipes(collection){
	try {
		Array.from(collection).forEach(recipe => {
			eliminateOrRestoreRecipe(recipe);
		});
		
	} catch (error) {
		return false;
	}

	return true;
}

//Add or remove the searchEliminated class to a single recipe based on the search results
async function eliminateOrRestoreRecipe(recipe) {
	const results = await searchRecipeForAllWords(recipe);
	if(results.includes(undefined) || !results.includes(false)){
		recipe.classList.remove("searchEliminated");
	}

	if(results.includes(false) && !recipe.classList.contains("searchEliminated")){
		recipe.classList.add("searchEliminated");
	}
}

//Search recipes based on every word in the search bar
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

//Search recipes based on an individual word or group of letters
function searchRecipeForWord(word, recipeTitle, recipeIngredients, recipeDescription) {
	if(words.at(0) === "") return undefined;
	if(recipeTitle.includes(word) || recipeIngredients.includes(word) || recipeDescription.includes(word)) return true;

	return false;
}

searchInput.addEventListener("keydown", detectDeletion);
searchInput.addEventListener("input", searchRecipes);