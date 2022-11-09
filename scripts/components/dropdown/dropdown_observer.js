
import { classMutationConfiguration } from "../../helpers/mutation_observer_configuration.js";
import { ingredientsList, appliancesList, utensilsList, menuAppliances, menuIngredients, menuUtensils } from "../../factories/dropdown_factory.js";

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
    if(notMatchedUtensil === false) {
        if(foundUtensil === false) {
            menuUtensils.dataset.emptyVisible = "true";
        } else {
            menuUtensils.dataset.emptyVisible = "false";
        }
    }

    if(notMatchedAppliance === false) {
        if(foundAppliance === false) {
            menuAppliances.dataset.emptyVisible = "true";
        } else {
            menuAppliances.dataset.emptyVisible = "false";
        }
    }

    if(notMatchedIngredient === false) {
        if(foundIngredient === false) {
            menuIngredients.dataset.emptyVisible = "true";
        } else {
            menuIngredients.dataset.emptyVisible = "false";
        }
    }
});

const menuIngredientsMutant = document.querySelector("#menuIngredients");
const menuAppliancesMutant = document.querySelector("#menuAppliances");
const menuUtensilsMutant = document.querySelector("#menuUtensils");

//Observe all three dropdown menus
//dropdownMutationObserver.observe(dropdownMenu, classMutationConfiguration);
dropdownMutationObserver.observe(menuIngredientsMutant, classMutationConfiguration);
dropdownMutationObserver.observe(menuAppliancesMutant, classMutationConfiguration);
dropdownMutationObserver.observe(menuUtensilsMutant, classMutationConfiguration);