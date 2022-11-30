
import { classMutationConfiguration } from "../../helpers/mutation_observer_configuration.js";
import { menuAppliances, menuIngredients, menuUtensils } from "../../app.js";
import { ingredientsList, appliancesList, utensilsList } from "../dropdown/dropdown_inputs.js"

//Dropdown menu Mutation Observer
//...to display a message if there are no more available dropdown menu list options
const dropdownMutationObserver = new MutationObserver(_mutations => {

	//Returns true if all dropdown menu options are hidden
	const foundIngredient = ingredientsList.some(element => element.classList.contains("notHidden"));
	const foundAppliance = appliancesList.some(element => element.classList.contains("notHidden"));
	const foundUtensil = utensilsList.some(element => element.classList.contains("notHidden"));

	//Returns true if any menu options were only hidden due to text input (not by selected tag or recipe output changes)
	const notMatchedIngredient = ingredientsList.some(element => element.classList.contains("noMatch"));
	const notMatchedAppliance = appliancesList.some(element => element.classList.contains("noMatch"));
	const notMatchedUtensil = utensilsList.some(element => element.classList.contains("noMatch"));

	//If all of the menu options have been eliminated from the available choices, or are
	//...currently tagged, display the data-empty message
	
	if(notMatchedUtensil === false){
		foundUtensil ? menuUtensils.dataset.emptyVisible = "false" : menuUtensils.dataset.emptyVisible = "true";
	}

	if(notMatchedAppliance === false){
		foundAppliance ? menuAppliances.dataset.emptyVisible = "false" : menuAppliances.dataset.emptyVisible = "true";
	}

	if(notMatchedIngredient === false) {
		foundIngredient ? menuIngredients.dataset.emptyVisible = "false" : menuIngredients.dataset.emptyVisible = "true";
	}

});

export const menuIngredientsMutant = document.querySelector("#menuIngredients");
export const menuAppliancesMutant = document.querySelector("#menuAppliances");
export const menuUtensilsMutant = document.querySelector("#menuUtensils");

//Observe all three dropdown menus
//dropdownMutationObserver.observe(dropdownMenu, classMutationConfiguration);
dropdownMutationObserver.observe(menuIngredientsMutant, classMutationConfiguration);
dropdownMutationObserver.observe(menuAppliancesMutant, classMutationConfiguration);
dropdownMutationObserver.observe(menuUtensilsMutant, classMutationConfiguration);
