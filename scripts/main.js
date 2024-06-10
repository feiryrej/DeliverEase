let deliveries;

async function main() {
	const defaultLocation = "PUP, Anonas, Santa Mesa, Manila, Metro Manila, Philippines";

	await initMap(defaultLocation);

	const deliveriesDisplay = document.querySelector(".delivery-list");
	deliveries = new Deliveries(deliveriesDisplay);
	deliveries.display();
}

main();
