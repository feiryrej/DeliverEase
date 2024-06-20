function animatePreloaderText() {
	let counter = 1;

	for (const elem of document.querySelectorAll("#preloader > .loading > span")) {
		elem.style.animationDelay = `${counter * 0.03}s`;
		counter++;
	}
}

animatePreloaderText();