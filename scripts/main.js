let deliveries;

function animatePreloaderText() {
	let counter = 1;

	for (const elem of document.querySelectorAll("#preloader > .loading > span")) {
		elem.style.animationDelay = `${counter * 0.05}s`;
		counter++;
	}
}

async function main() {
	animatePreloaderText();

	const defaultLocation = "PUP, Anonas, Santa Mesa, Manila, Metro Manila, Philippines";
	const deliveriesDisplay = document.querySelector(".delivery-list");
	deliveries = new Deliveries(deliveriesDisplay);

	await initMap(defaultLocation);
	deliveries.display();
}

main();
