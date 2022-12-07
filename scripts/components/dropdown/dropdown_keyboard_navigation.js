import { menuIngredients, menuAppliances, menuUtensils } from "../../index.js";
import { ingredientsInput, appliancesInput, utensilsInput, ingredientsList, appliancesList, utensilsList } from "./dropdown_inputs.js";

//Each of the 3 dropdowns is an <li> with 4 children: label, input, img, & menu
export const dropdownIngredients = document.getElementById("dropdownIngredients");
export const dropdownAppliances = document.getElementById("dropdownAppliances");
export const dropdownUtensils = document.getElementById("dropdownUtensils");

//If "ArrowDown" key is pressed by the user, while their cursor is in a dropdown input
//...move focus to the first dropdown menu list item
const navigateToDropdownList = (event) => {
	const targetedInput = event.target;
	const menu = targetedInput.nextElementSibling.nextElementSibling;

	if(event.key === "Enter") {
		event.preventDefault();
		return;
	}

	if(event.key === "Escape"){
		menu.dataset.state = "closed";
		return;
	}

	if(event.key === "Tab"){
		menu.dataset.state = "closed";
		return;
	}

	menu.dataset.state = "open";

	if(event.key !== "ArrowDown") {
		return;
	}

	let menuOptions;

	if(targetedInput === ingredientsInput) {
		menuOptions = ingredientsList;
	}
    
	if(targetedInput === appliancesInput) {
		menuOptions = appliancesList;
	}

	if(targetedInput === utensilsInput) {
		menuOptions = utensilsList;
	}
    
	const notHidden = (option) => {
		return !option.classList.contains("hidden");
	}

	let menuOptionsFiltered = menuOptions.filter(notHidden);

	let currentIndex = 0;
	let listItem = menuOptionsFiltered[currentIndex];
	listItem.tabIndex = 0;
	listItem.focus();
	listItem.tabIndex = -1;

	//Navigate through the dropdown menu list options using the "ArrowUp" and "ArrowDown" keys
	const navigateList = (event) => {

		if(event.key === "Enter") {
			event.preventDefault();
			inputFocus();
			menu.dataset.state = "closed";
		}

		function inputFocus(){
			const input = event.target.parentElement.previousElementSibling.previousElementSibling;
			input.focus();
			for (let option of menuOptionsFiltered) {
				option.tabIndex = -1;
			}
		}
    
		if(event.key === "ArrowDown" || event.key === "ArrowUp") {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				if (currentIndex < menuOptionsFiltered.length - 1) {
					currentIndex = (currentIndex + 1);
				}
			}
		
			if (event.key === "ArrowUp") {
				event.preventDefault();
				if (currentIndex > 0) {
					currentIndex = (currentIndex - 1);
				}
			}
		}

		for (let option of menuOptionsFiltered) {
			option.addEventListener("keydown", navigateList);
		}

		let listItem = menuOptionsFiltered[currentIndex]; 
		listItem.tabIndex = 0;
		listItem.focus();
		if(event.key === "Escape"){
			inputFocus();
		}
		listItem.tabIndex = -1;
	}

	listItem.addEventListener("keydown", navigateList);
}

//Listen for the "ArrowDown" key in the dropdown inputs
ingredientsInput.addEventListener("keydown", navigateToDropdownList);
appliancesInput.addEventListener("keydown", navigateToDropdownList);
utensilsInput.addEventListener("keydown", navigateToDropdownList);
