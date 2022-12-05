import { removeAccents } from "../../helpers/text_input.js";
import { appliancesList, utensilsList, ingredientsList} from "../../app.js";

//Check whether a dropdown menu option has already been search eliminated or tagged
const isEliminatedOrTagged = (element) => {
	if(element.classList.contains("eliminated") || element.classList.contains("tagged")){
		return true;
	}
}

//Dropdown inputs and buttons
const ingredientsInput = document.getElementById("ingredientsInput");
const appliancesInput = document.getElementById("appliancesInput");
const utensilsInput = document.getElementById("utensilsInput");
const ingredientsButton = document.getElementById("ingredientsButton");
const appliancesButton = document.getElementById("appliancesButton");
const utensilsButton = document.getElementById("utensilsButton");

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

//Check if an element has the class "hidden"
const isHidden = (element) => element.classList.contains("hidden");

//Show the menu when its sibling input receives focus
function showMenuOnInputFocus(event){
	const input = event.currentTarget;
	const button = input.nextElementSibling;
	const menu = button.nextElementSibling;
	const menus = document.querySelectorAll("menu");
	for(let menu of menus){
		menu.dataset.state = "closed";
	}
	menu.dataset.state = "open";
	input.addEventListener("focusout", hideMenuOnFocusOut);
}

//Open or close the menu when the dropdown arrow is clicked
function toggleMenuOnButtonClick(event){
	const combobox = event.currentTarget.parentElement;
	const label = combobox.firstElementChild;
	const input = label.nextElementSibling;
	const menu = combobox.lastElementChild;
	const menustate = menu.dataset.state;
	if(menustate === "closed"){
		menu.dataset.state = "open";
		menu.addEventListener("click", inputFocusOnMenuClick);
		input.focus();
	}
	if(menustate === "open"){
		menu.dataset.state = "closed";
	}
}

//Close the menu when the dropdown loses focus
function hideMenuOnFocusOut(event){
	const input = event.currentTarget;
	const relatedTarget = event.relatedTarget;
	if(relatedTarget === null || relatedTarget.id === "searchInput"){
		const menu = input.nextElementSibling.nextElementSibling;
		menu.dataset.state = "closed";
	}
	input.removeEventListener("focusout", hideMenuOnFocusOut);
}

//Move focus to the input if its sibling menu is clicked
function inputFocusOnMenuClick(event){
	const menu = event.currentTarget;
	const input = menu.previousElementSibling.previousElementSibling;
	input.focus();
}

ingredientsInput.addEventListener("focus", showMenuOnInputFocus);
appliancesInput.addEventListener("focus", showMenuOnInputFocus);
utensilsInput.addEventListener("focus", showMenuOnInputFocus);

ingredientsButton.addEventListener("click", toggleMenuOnButtonClick);
appliancesButton.addEventListener("click", toggleMenuOnButtonClick);
utensilsButton.addEventListener("click", toggleMenuOnButtonClick);

export {appliancesList, utensilsList, ingredientsList, ingredientsInput, appliancesInput, utensilsInput};
