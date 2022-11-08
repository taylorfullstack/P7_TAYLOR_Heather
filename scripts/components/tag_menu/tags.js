import { ingredientsInput, appliancesInput, utensilsInput } from "../dropdown/dropdown_inputs.js"
import { ingredientLabel, applianceLabel, utensilLabel } from "../../factories/dropdown_factory.js";

export const tagMenu = document.getElementById("tagMenu");
export const closeIconSource = `assets/close_icon.svg`;

//Allow keyboard users to create tags with "Enter" key
export const selectedOption = (event) => {
    if(event.key !== "Enter") return;
    createTag(event);
}

//Function to create tags when a dropdown menu list item is clicked on
export const createTag = (event) => {
    let option = event.target;
    let inputField = option.parentElement.parentElement.firstElementChild;

    const tag = document.createElement("li"); //console.log("making a tag");

    //Create the tag close button and its icon
    const closeTagButton = document.createElement("button");
    const closeButtonImg = document.createElement("img");
    closeButtonImg.setAttribute("src", closeIconSource);
    closeButtonImg.setAttribute("alt", "effacer cette option");
    closeButtonImg.setAttribute("width", "20");
    closeButtonImg.setAttribute("height", "20");
    closeTagButton.append(closeButtonImg);

    //Read the first key of the option's dataset to see which type of option it is
    const typeOfOption = Object.keys(option.dataset)[0]; //console.log(typeOfOption);

    //Function to create tag and clear input field relative to the selected option
    const createTagByOptionType = (datalabel, associatedInput) => {
        tag.dataset[`${datalabel}`] = option.textContent.toLowerCase();
        tag.dataset.tag = [`${datalabel}`];
        [`${associatedInput}`].value = "";
    }

    if (typeOfOption === applianceLabel) {
        createTagByOptionType(applianceLabel, appliancesInput);
    }

    if (typeOfOption === ingredientLabel) {
        createTagByOptionType(ingredientLabel, ingredientsInput);
    }

    if (typeOfOption === utensilLabel) {
        createTagByOptionType(utensilLabel, utensilsInput);
    }
    
    //Set the text content of the tag to the text content of the selected option
    const tagText = document.createElement("span");
    tagText.textContent = option.textContent;

    //Append the tag's child elements to it, and append the tag to the tagMenu
    tag.append(tagText, closeTagButton);
    tagMenu.append(tag);

    //When a tag's close button is clicked
    //...remove the tag from the DOM
    //...allow the tag to be created again
    closeTagButton.addEventListener("click", () => {
        tag.remove(); //console.log("deleting a tag");
        option.classList.replace("hidden", "notHidden");
        option.classList.remove("tagged");
        option.addEventListener("click", createTag);
        option.addEventListener("keydown", selectedOption);
    });
    
    //Remove the createTag click and enter key event listeners from the dropdown menu option
    //...so that no duplicate tags can be created
    option.classList.replace("notHidden", "hidden");
    option.classList.add("tagged");
    inputField.value = "";
    option.removeEventListener("click", createTag);
    option.removeEventListener("keydown", selectedOption);
}
