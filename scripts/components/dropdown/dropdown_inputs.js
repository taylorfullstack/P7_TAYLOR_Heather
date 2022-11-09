import { ingredientsList, appliancesList, utensilsList } from "../../factories/dropdown_factory.js";
import { removeAccents } from "../../helpers/text_input.js";

//Function to check whether a dropdown menu option has either of the
//...eliminated or tagged classes
const isEliminatedOrTagged = (element) => {
    if(element.classList.contains("eliminated") || element.classList.contains("tagged")){
        return true;
    }
}

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
        if(array.every(isHidden) && array.every(isEliminatedOrTagged)) {
            option.parentElement.dataset.errorVisible = "false";
        } else if(array.every(isHidden)){
            option.parentElement.dataset.errorVisible = "true";
        } else {
            option.parentElement.dataset.errorVisible = "false";
        }
    }
}

//Listen for typed text in any and all of the three dropdown input fields
ingredientsInput.addEventListener("input", dropdownSearch);
appliancesInput.addEventListener("input", dropdownSearch);
utensilsInput.addEventListener("input", dropdownSearch);

//Function to check if an element has the class hidden
export const isHidden = (element) => element.classList.contains("hidden");
