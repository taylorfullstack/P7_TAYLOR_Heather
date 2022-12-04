import { menuAppliancesMutant, menuIngredientsMutant, menuUtensilsMutant } from "./dropdown_observer.js";

//Observe the dropdown menus for border box size changes
//Aria expanded is set to true or false depending on whether the dropdown menu options are visible
const dropdownResizeObserver = new ResizeObserver(entries => {
	entries.forEach(entry => {
		const dropdownMenuSize = entry.borderBoxSize[0].blockSize;
		const dropdownMenu = entry.target;
		const dropdownCombobox = dropdownMenu.parentElement;
		const arrowButton = dropdownMenu.previousElementSibling;
		const arrowImg = arrowButton.firstElementChild;
		if(dropdownMenuSize === 0){
			dropdownMenu.dataset.state = "closed";
			arrowImg.dataset.state = "down";
			dropdownMenu.setAttribute("aria-expanded", "false");
			dropdownCombobox.setAttribute("aria-expanded", "false");
		} else {
			dropdownMenu.dataset.state = "open";
			arrowImg.dataset.state = "up";
			dropdownMenu.setAttribute("aria-expanded", "true");
			dropdownCombobox.setAttribute("aria-expanded", "true");
		}
	});
});

dropdownResizeObserver.observe(menuAppliancesMutant);
dropdownResizeObserver.observe(menuUtensilsMutant);
dropdownResizeObserver.observe(menuIngredientsMutant);