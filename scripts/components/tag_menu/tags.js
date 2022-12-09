import { dropdownReset } from "../dropdown/dropdown_reset.js";

export const tagMenu = document.getElementById("tagMenu");
export const closeIconSource = "assets/close_icon.svg";

//Allow keyboard users to create tags with "Enter" key
export const selectedOption = (event) => {
	if(event.key !== "Enter") return;
	createTag(event);
}

//Create a tag when a dropdown menu list item is clicked on
export const createTag = (event) => {
	let option = event.target;
	const typeOfOption = Object.keys(option.dataset)[0]; //read the first key of the option's dataset to see which type of option it is
	const tag = document.createElement("li");
	const tagText = document.createElement("span"); //set the text content of the tag to the text content of the selected option
	tagText.textContent = option.textContent;
	tagText.style.textShadow = "0px 0.5px 3px black";
	
	const closeTagButton = document.createElement("button");
	const closeButtonImg = document.createElement("img");
	closeButtonImg.src = closeIconSource;
	closeButtonImg.alt = "effacer cette option";
	closeButtonImg.width = 20;
	closeButtonImg.height = 20;

	createTagDataAndClearInput(option, typeOfOption, tag);
	closeTagButton.append(closeButtonImg);
	tag.append(tagText, closeTagButton);
	tagMenu.append(tag);

	closeTagButton.addEventListener("click", () => {
		tag.remove(); //remove the tag from the DOM
		option.classList.replace("hidden", "notHidden");
		option.classList.remove("tagged");
		dropdownReset(); //reset the dropdown menus
		option.addEventListener("click", createTag); //allow the tag to be created again
		option.addEventListener("keydown", selectedOption);
	});
    
	option.classList.replace("notHidden", "hidden"); //hide the dropdown menu option that was tagged
	option.classList.add("tagged");
	dropdownReset(); //reset the dropdown menus
	option.removeEventListener("click", createTag); //prevent duplicate tags
	option.removeEventListener("keydown", selectedOption);
}

//Create tag dataset and clear the input field relative to the selected option
const createTagDataAndClearInput = (option, typeOfOption, tag) => {
	tag.dataset[`${typeOfOption}`] = option.textContent.toLowerCase();
	tag.dataset.tag = [`${typeOfOption}`];

	const associatedInput = document.querySelector("[data-dropdown-input=\"" +typeOfOption+ "\"]");
	[`${associatedInput}`].value = "";
	associatedInput.focus();
	option.parentElement.dataset.state = "closed";
}