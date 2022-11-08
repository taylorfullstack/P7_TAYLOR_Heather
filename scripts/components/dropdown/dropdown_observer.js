
import { classMutationConfiguration } from "../../helpers/mutation_observer_configuration.js";

const menuIngredientsMutant = document.querySelector("#menuIngredients");
const menuAppliancesMutant = document.querySelector("#menuAppliances");
const menuUtensilsMutant = document.querySelector("#menuUtensils");

//Function to check whether a dropdown menu option has either of the
//...eliminated or tagged classes
export const isEliminatedOrTagged = (element) => {
    if(element.classList.contains("eliminated") || element.classList.contains("tagged")){
        return true;
    }
}

//Dropdown menu Mutation Observer
//...to display a message if there are no more available dropdown menu list options
const dropdownMutationObserver = new MutationObserver(mutations => {
    
    let parentMenu;
    mutations.forEach(mutation => {
        parentMenu = mutation.target.parentElement;
    })
    
    let parentMenuArray = Array.from(parentMenu.children);

    if(parentMenuArray.every(isEliminatedOrTagged)){
        parentMenu.dataset.emptyVisible = "true";
        parentMenu.dataset.errorVisible = "false";
    } else {
        parentMenu.dataset.emptyVisible = "false";
    }
})

//Observe all three dropdown menus
dropdownMutationObserver.observe(menuIngredientsMutant, classMutationConfiguration);
dropdownMutationObserver.observe(menuAppliancesMutant, classMutationConfiguration);
dropdownMutationObserver.observe(menuUtensilsMutant, classMutationConfiguration);