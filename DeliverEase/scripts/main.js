let deliveries;

async function main() {
	const defaultLocation = "PUP, Anonas, Santa Mesa, Manila, Metro Manila, Philippines";
	const deliveriesDisplay = document.querySelector(".delivery-list");
	deliveries = new Deliveries(deliveriesDisplay);

	await initMap(defaultLocation);
	deliveries.display();

	document.querySelector("#preloader").remove();
}

main();