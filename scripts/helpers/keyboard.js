import { ingredientsInput, appliancesInput, utensilsInput } from "./inputs.js";
import { ingredientsList, appliancesList, utensilsList } from "../factories/dropdownFactory.js";

//Primary dropdown menu containing the three dropdowns
const dropdownMenu = document.getElementById("dropdownMenu");

//Each of the 3 dropdowns is an <li> with 4 children: label, input, img, & menu
const dropdownIngredients = document.getElementById("dropdownIngredients");
const dropdownAppliances = document.getElementById("dropdownAppliances");
const dropdownUtensils = document.getElementById("dropdownUtensils");

//If the "Escape" key is pressed
//..restore focus to the dropdown menu
const escapeFunction = (event) => { 
    if(event.key !== "Escape"){
        return;
    } 
    dropdownMenuFocus(); //console.log("escape was pressed");
}

//Listen for the "Escape" key while the user is focused in a dropdown menu
dropdownIngredients.addEventListener("keydown", escapeFunction);
dropdownAppliances.addEventListener("keydown", escapeFunction);
dropdownUtensils.addEventListener("keydown", escapeFunction);

//Function to restore focus to the primary dropdown menu
const dropdownMenuFocus = () => {
    dropdownMenu.focus(); //console.log("focus has been restored the dropdown menu");
}

//If "ArrowDown" key is pressed by the user, while their cursor is in a dropdown input
//...move focus to the first dropdown menu list item
const navigateToDropdownList = (event) => {
    if(event.key !== "ArrowDown") {
        return;
    }

    const targetedInput = event.target; //console.log(targetedInput);

    let menuOptions;

    if(targetedInput === ingredientsInput) {
        menuOptions = ingredientsList; //array from HTML collection
    }
    
    if(targetedInput === appliancesInput) {
        menuOptions = appliancesList; //array from HTML collection
    }

    if(targetedInput === utensilsInput) {
        menuOptions = utensilsList; //array from HTML collection
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

    //Navigate through the dropdown menu list options
    //..using the "ArrowUp" and "ArrowDown" keys
    const navigateList = (event) => {

        if(event.key === "Escape" || event.key === "Enter") {
            for (let option of menuOptionsFiltered) {
                option.tabIndex = -1;
            }
            dropdownMenuFocus();
        }
    
        if(event.key !== "ArrowDown" && event.key !== "ArrowUp") {
            return;
        }

        if (event.key === "ArrowDown") {
            if (currentIndex < menuOptionsFiltered.length - 1) {
                currentIndex = (currentIndex + 1);
            }
        }
    
        if (event.key === "ArrowUp") {
            if (currentIndex > 0) {
                currentIndex = (currentIndex - 1);
            }
        }

        for (let option of menuOptionsFiltered) {
            option.addEventListener("keydown", navigateList);
        }

        let listItem = menuOptionsFiltered[currentIndex]; 
        listItem.tabIndex = 0;
        listItem.focus();
        listItem.tabIndex = -1;
    }

    listItem.addEventListener("keydown", navigateList);
}

//Listen for the "ArrowDown" key in the dropdown inputs
ingredientsInput.addEventListener("keydown", navigateToDropdownList);
appliancesInput.addEventListener("keydown", navigateToDropdownList);
utensilsInput.addEventListener("keydown", navigateToDropdownList);
