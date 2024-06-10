let deliveries;

async function main() {
	await initMap();

	const deliveriesDisplay = document.querySelector(".delivery-list");
	deliveries = new Deliveries(deliveriesDisplay);
	deliveries.display();
}

main();
