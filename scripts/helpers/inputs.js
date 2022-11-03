import { ingredientsList, appliancesList, utensilsList } from "../factories/dropdownFactory.js";

//Function to convert strings to the NFD normalized Unicode format
//Then, replace accents with empty strings
const removeAccents = (string) =>
string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//INPUT CONSTANTS
export const ingredientsInput = document.getElementById("ingredientsInput");
export const appliancesInput = document.getElementById("appliancesInput");
export const utensilsInput = document.getElementById("utensilsInput");

//Function to modify the dropdown list options
//If a user inputs text into a dropdown input
const dropdownSearch = (event) => {
    let targetInput = event.target;
    //Set the value of the variable "typedText" to equal the user's inputed text
    //...converted to lowercase with accents removed
    let typedText = removeAccents(targetInput.value.toLowerCase());
    let array;

    //Identify where the user is inputing text
    //Set the value of the variable "array" 
    //...to match the dropdown menu to its corresponding input field
    if(targetInput === ingredientsInput) {
        array = ingredientsList;
    }
    
    if(targetInput === appliancesInput) {
        array = appliancesList;
    }

    if(targetInput === utensilsInput) {
        array = utensilsList;
    }

    //For every option in the dropdown menu
    //If the option doesn't include the user's inputed text, then hide it
    for (const option of array) {
        if(!removeAccents(option.textContent.toLowerCase()).includes(typedText)) {
            option.classList.add("hidden");
        } else {
            option.classList.remove("hidden");
        }
    }
}

//Listen for typed text in any and all of the three dropdown input fields
ingredientsInput.addEventListener("input", dropdownSearch);
appliancesInput.addEventListener("input", dropdownSearch);
utensilsInput.addEventListener("input", dropdownSearch);
