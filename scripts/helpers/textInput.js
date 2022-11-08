
//Function to convert strings to the NFD normalized Unicode format
//Then, replace accents with empty strings
export const removeAccents = (string) =>
string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');