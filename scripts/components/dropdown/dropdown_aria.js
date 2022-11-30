import { menuAppliancesMutant, menuIngredientsMutant, menuUtensilsMutant } from "./dropdown_observer.js";

//Observe the dropdown menus for border box size changes
//Aria expanded is set to true or false depending on whether the dropdown menu options are visible
const dropdownResizeObserver = new ResizeObserver(entries => {

	entries.forEach(entry => {
		const dropdownMenuSize = entry.borderBoxSize[0].blockSize;
		const dropdownMenu = entry.target;
		const dropdownInput = dropdownMenu.parentElement.firstElementChild;

		if(dropdownMenuSize === 0){
			dropdownMenu.setAttribute("aria-expanded", "false");
			dropdownInput.setAttribute("aria-expanded", "false");
		} else {
			dropdownMenu.setAttribute("aria-expanded", "true");
			dropdownInput.setAttribute("aria-expanded", "true");
		}
	});
});

dropdownResizeObserver.observe(menuAppliancesMutant);
dropdownResizeObserver.observe(menuUtensilsMutant);
dropdownResizeObserver.observe(menuIngredientsMutant);