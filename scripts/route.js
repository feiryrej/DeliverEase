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

function addDeliveriesToIntersections(deliveriesData, intersections) {
	for (const delivery of deliveriesData) {
		const distances = {};

		for (const node of Object.keys(intersections)) {
			const nodeJSON = JSON.parse(node);
			const distance = haversine(
				delivery["coordinates"]["latitude"],
				delivery["coordinates"]["longitude"],
				nodeJSON["lat"],
				nodeJSON["lng"],
			);
			distances[distance] = nodeJSON;
		}

		const lowestDistance = Math.min(...Object.keys(distances));
		const node = JSON.stringify({
			lat: delivery["coordinates"]["latitude"],
			lng: delivery["coordinates"]["longitude"]
		});

		intersections[node] = [];
		connectNodes(intersections, node, JSON.stringify(distances[lowestDistance]));
	}
}

function addSourceToIntersections(source, intersections) {
	const distances = {};

	for (const node of Object.keys(intersections)) {
		const nodeJSON = JSON.parse(node);
		const distance = haversine(
			source["lat"],
			source["lng"],
			nodeJSON["lat"],
			nodeJSON["lng"],
		);
		distances[distance] = nodeJSON;
	}

	const lowestDistance = Math.min(...Object.keys(distances));
	const node = JSON.stringify(source);

	intersections[node] = [];
	connectNodes(intersections, node, JSON.stringify(distances[lowestDistance]));
}

// Display route on map
async function displayRoute(source) {
	const intersections = getIntersections();
	const deliveriesData = Object.values(deliveries.getDeliveries());

	addDeliveriesToIntersections(deliveriesData, intersections);
	addSourceToIntersections(source, intersections);

	const lastDeliveryData = deliveriesData[deliveriesData.length - 1];
	const dest = {
		lat: lastDeliveryData["coordinates"]["latitude"],
		lng: lastDeliveryData["coordinates"]["longitude"]
	};
	const [paths, winner] = aStar(source, dest, intersections);

	const polylineOptions = {
		geodesic: true,
		strokeColor: "#FF0000",
		strokeOpacity: 0.6,
		strokeWeight: 4
	};
	let prevNode = winner;

	new google.maps.Polyline({
		...polylineOptions,
		path: [dest, json(prevNode)],
	}).setMap(map);

	while (paths[prevNode] !== undefined) {
		new google.maps.Polyline({
			...polylineOptions,
			path: [json(prevNode), json(paths[prevNode])],
		}).setMap(map);
		prevNode = paths[prevNode];
	}

	displayDeliveryPins(deliveriesData);

	const request = {
		origin: source,
		destination: dest,
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
