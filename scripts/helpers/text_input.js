
//Function to convert strings to the NFD normalized Unicode format
//Then, replace accents with empty strings
export const removeAccents = (string) => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

//Test user input against Regex
export const lettersSpacesApostrophesOnly = (userTextInput) => {
	let lettersSpacesApostrophes = /^[A-Za-z\s']+$/g;
	if(userTextInput.match(lettersSpacesApostrophes)){
		return true;
	} else { 
		return false;
	}
}

const searchError = document.getElementById("searchError");
export function validateInput(userInput){
	userInput = removeAccents((userInput).toLowerCase().trim());
	if(lettersSpacesApostrophesOnly(userInput) === false && (userInput !== "")){
		searchError.dataset.searchErrorVisible = "true";
		return;
	}
	searchError.dataset.searchErrorVisible = "false";
}
