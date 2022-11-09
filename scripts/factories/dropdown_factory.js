import { recipes } from "../data/recipes.js";
import { createTag, selectedOption } from "../components/tag_menu/tags.js";

//Dropdown menu constants
export const menuIngredients = document.getElementById("menuIngredients");
export const menuAppliances = document.getElementById("menuAppliances");
export const menuUtensils = document.getElementById("menuUtensils");

//Labels for datasets
export const utensilLabel = "utensil";
export const applianceLabel = "appliance";
export const ingredientLabel = "ingredient";

//These arrays will include repeated values
let allIngredients = []; //console.log(allIngredients); ///254 ingredients
let allAppliances = []; //console.log(allAppliances) //50 appliances
let allUtensils = []; //console.log(allUtensils); //122 utensils

//Loop through each recipe in [recipes]
//For each recipe, add its ingredients, appliance, and utensils to
//[allIngredients], [allAppliances], and [allUtensils], respectively
recipes.forEach(recipe => {
    const {ingredients, appliance, utensils} = recipe;

    ingredients.forEach(ingredient => {
        const uniqueIngredient = (ingredient.ingredient);
        const capitalizedIngredient = uniqueIngredient.charAt(0).toUpperCase() + uniqueIngredient.slice(1);
        allIngredients.push(capitalizedIngredient);
    })

    allAppliances.push(appliance);

    utensils.forEach(utensil => {
        const uniqueUtensil = utensil;
        const capitalizedUtensil = uniqueUtensil.charAt(0).toUpperCase() + uniqueUtensil.slice(1).toLowerCase();
        allUtensils.push(capitalizedUtensil);
    })
});

//Create new arrays that only include unique values (no repetitions)
const uniqueUtensils = [...new Set(allUtensils)]; //console.log(uniqueUtensils); //25 utensils
const uniqueIngredients = [...new Set(allIngredients)]; //console.log(uniqueIngredients); //119 unique ingredients
const uniqueAppliances = [...new Set(allAppliances)]; //console.log(uniqueAppliances); //11 appliances

//Function to create the list items for each dropdown menu
const createDropdownList = (array, menu, datalabel) => {
    array.forEach(option => {
        const listItem = document.createElement("li");
        listItem.textContent = option;
        listItem.setAttribute("role", "option");
        listItem.addEventListener("click", createTag);
        listItem.addEventListener("keydown", selectedOption);
        listItem.classList.add("notHidden");
        listItem.tabIndex = "-1";
        listItem.dataset[`${datalabel}`] = `${option}`.toLowerCase();
        menu.append(listItem);
        menu.dataset.errorVisible = "false";
        menu.dataset.emptyVisible = "false";
        menu.dataset.error = "Veuillez essayer un autre terme de recherche.";
        menu.dataset.empty = "Veuillez enlever un tag pour voir plus d'options.";
    });
}

//Call createDropdownList(array, menu, datalabel) to create the dropdown menu list items
createDropdownList(uniqueUtensils, menuUtensils, utensilLabel);
createDropdownList(uniqueAppliances, menuAppliances, applianceLabel);
createDropdownList(uniqueIngredients, menuIngredients, ingredientLabel);

//Arrays from dropdown list option HTML collections
export const ingredientsList = Array.from(menuIngredients.children);
export const appliancesList = Array.from(menuAppliances.children);
export const utensilsList = Array.from(menuUtensils.children);
