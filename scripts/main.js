let deliveries;

async function main() {
	await initMap();
	deliveries = new Deliveries();

	const deliveriesDisplay = document.querySelector(".delivery-list");
	deliveries.display(deliveriesDisplay);
}

main();
