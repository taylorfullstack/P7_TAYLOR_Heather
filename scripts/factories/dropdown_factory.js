
import { createTag, selectedOption } from "../components/tag_menu/tags.js";

//Labels for datasets
export const utensilLabel = "utensil";
export const applianceLabel = "appliance";
export const ingredientLabel = "ingredient";

//Function to create the list items for each dropdown menu
export const createDropdownList = (array, menu, datalabel, textShadow) => {
    array.forEach(option => {
        const listItem = document.createElement("li");
        listItem.textContent = option;
        listItem.role = "option";
        listItem.addEventListener("click", createTag);
        listItem.addEventListener("keydown", selectedOption);
        listItem.classList.add("notHidden");
        listItem.classList.add(`${textShadow}`);
        listItem.tabIndex = "-1";
        listItem.dataset[`${datalabel}`] = `${option}`.toLowerCase();
        
        menu.append(listItem);
        menu.dataset.errorVisible = "false";
        menu.dataset.emptyVisible = "false";
        menu.dataset.error = "Veuillez essayer un autre terme de recherche.";
        menu.dataset.empty = "Veuillez enlever un tag pour voir plus d'options.";
    });
}