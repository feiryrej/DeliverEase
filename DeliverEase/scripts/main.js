let deliveries;

async function main() {
	const defaultLocation = "LAZADA (LEX) / SHOPEE (SPX) / FLASH / NINJA VAN DROP OFF A3M3 Express Partners, T Pinpin, Sampaloc, Quezon City, Metro Manila, Philippines";
	const deliveriesDisplay = document.querySelector(".delivery-list");
	deliveries = new Deliveries(deliveriesDisplay);

	await initMap(defaultLocation);
	deliveries.display();

	document.querySelector("#preloader").remove();
}

main();
