let deliveryPins = [];

async function displayDeliveryPins(deliveriesData) {
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	for (let i = 0; i < deliveryPins.length; i++) {
		deliveryPins[i].map = null;
		deliveryPins[i] = null;
	}

	deliveryPins = [];

	for (const delivery of deliveriesData) {
		const p = document.createElement("p");
		p.textContent = delivery["order_id"];
		p.classList.add("pin-text");

		const pin = new AdvancedMarkerElement({
			map,
			position: {
				lat: delivery["coordinates"]["latitude"],
				lng: delivery["coordinates"]["longitude"]
			},
			content: new PinElement({glyph: p}).element,
		});
		deliveryPins.push(pin);
	}
}

// Display route on map
async function displayRoute(source) {
	const intersections = getIntersections();
	const deliveriesData = Object.values(deliveries.getDeliveries());
	const lastDeliveryData = deliveriesData[deliveriesData.length - 1];
	const dest = {
		lat: lastDeliveryData["coordinates"]["latitude"],
		lng: lastDeliveryData["coordinates"]["longitude"]
	};
	const path = aStar(source, dest, intersections);

	displayDeliveryPins(deliveriesData);

	const waypoints = path.map(intersection => ({
		location: { lat: intersection.lat, lng: intersection.lon }
	}));

	const request = {
		origin: source,
		destination: dest,
		waypoints: waypoints,
		travelMode: "DRIVING",
	};

	directionsService.route(request, function (result, status) {
		if (status == "OK") {
			directionsRenderer.setDirections(result);
		}
	});
}

function haversine(lat1, lon1, lat2, lon2) {
	// Haversine formula implementation
	const r = 6371; // km
	const p = Math.PI / 180;

	const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
					+ Math.cos(lat1 * p) * Math.cos(lat2 * p) *
					(1 - Math.cos((lon2 - lon1) * p)) / 2;

	return 2 * r * Math.asin(Math.sqrt(a));
}
