import { removeAccents } from "../../helpers/text_input.js";
import { appliancesList, utensilsList, ingredientsList} from "../../app.js";

//Check whether a dropdown menu option has already been search eliminated or tagged
const isEliminatedOrTagged = (element) => {
	if(element.classList.contains("eliminated") || element.classList.contains("tagged")){
		return true;
	}
}

//INPUT CONSTANTS
const ingredientsInput = document.getElementById("ingredientsInput");
const appliancesInput = document.getElementById("appliancesInput");
const utensilsInput = document.getElementById("utensilsInput");

//Modify the dropdown list options when a user inputs text into a dropdown input
const dropdownSearch = (event) => {
	let targetInput = event.target;
	//Set the value of the variable "typedText" to equal the user's inputed text
	//...converted to lowercase with accents removed
	let typedText = removeAccents(targetInput.value.toLowerCase());
	let array;

	//Identify where the user is inputing text
	//Set the value of the variable "array" to match the dropdown menu to its corresponding input field
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
	for (let option of array) {
		if(!removeAccents(option.textContent.toLowerCase()).includes(typedText)) {
			if(!option.classList.contains("eliminated") && !option.classList.contains("tagged")){
				option.classList.replace("notHidden", "hidden");
				option.classList.add("noMatch");
			}
		} 
		else if(!option.classList.contains("eliminated") && !option.classList.contains("tagged")){
			option.classList.replace("hidden", "notHidden");
			option.classList.remove("noMatch");
		}

		//Call isHidden() to display an error message if no list options match the user input
		if(array.length > 0){
			if(array.every(isHidden) && !array.every(isEliminatedOrTagged)) {
				option.parentElement.dataset.errorVisible = "true";
			} else {
				option.parentElement.dataset.errorVisible = "false";
			}
		}
	}
}

//Listen for typed text in any and all of the three dropdown input fields
ingredientsInput.addEventListener("input", dropdownSearch);
appliancesInput.addEventListener("input", dropdownSearch);
utensilsInput.addEventListener("input", dropdownSearch);

//Function to check if an element has the class hidden
const isHidden = (element) => element.classList.contains("hidden");

export {appliancesList, utensilsList, ingredientsList, ingredientsInput, appliancesInput, utensilsInput};
