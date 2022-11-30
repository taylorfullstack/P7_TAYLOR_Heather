import { ingredientsInput, appliancesInput, utensilsInput, ingredientsList, appliancesList, utensilsList } from "../dropdown/dropdown_inputs.js";
import {menuIngredients, menuAppliances, menuUtensils} from "../../app.js";

export const dropdownReset = () => {
	allDropdownInputsReset();
	allErrorMessagesReset();
	resetOptions(ingredientsList);
	resetOptions(appliancesList);
	resetOptions(utensilsList);
}

//Reset the dropdown menu options' classes
const resetOptions = (menu) => {
	for(let listOption of menu) {
		if(listOption.classList.contains("noMatch")) {
			listOption.classList.remove("noMatch");
			if(!listOption.classList.contains("tagged") && !listOption.classList.contains("eliminated")) {
				listOption.classList.replace("hidden", "notHidden");
			}
		}
	}
}

//Reset the dropdown input fields
const allDropdownInputsReset = () => {
	ingredientsInput.value = "";
	appliancesInput.value = "";
	utensilsInput.value = "";
}

//Reset the dropdown data errors
const allErrorMessagesReset = () => {
	menuIngredients.dataset.errorVisible = "false";
	menuAppliances.dataset.errorVisible = "false";
	menuUtensils.dataset.errorVisible = "false";
}