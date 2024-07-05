let markers = [];
let deliveryPins = [];

function clearMarkers() {
	for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}

	markers = [];
}

async function displayDeliveryPins(deliveriesData) {
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	for (let i = 0; i < deliveryPins.length; i++) {
		deliveryPins[i].map = null;
		deliveryPins[i] = null;
	}

	deliveryPins = [];

	for (const delivery of deliveriesData) {
		const container = document.createElement("div");
		container.style.position = "relative";
		container.style.width = "70px"; // Adjust based on your image size
		container.style.height = "70px"; // Adjust based on your image size
		container.style.top = "10px"; // Adjust vertically based on pin image size


		const beachFlagImg = document.createElement("img");
		beachFlagImg.src = "https://i.postimg.cc/Zndyyfbs/pin.png";
		beachFlagImg.style.width = "100%";
		beachFlagImg.style.height = "100%";
		beachFlagImg.style.display = "block";

		const p = document.createElement("p");
		p.textContent = delivery["order_id"];
		p.classList.add("pin-text");
		p.style.textAlign = "center"; // Center the text horizontally
        p.style.position = "absolute";
        p.style.bottom = "60px"; // Adjust vertical position relative to the container

		container.appendChild(beachFlagImg);
		container.appendChild(p);

		const pin = new AdvancedMarkerElement({
			map,
			position: {
				lat: delivery["coordinates"]["latitude"],
				lng: delivery["coordinates"]["longitude"]
			},
			content: container,
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

let polylines = [];

function clearPolylines() {
	for (const line of polylines) {
		line.setMap(null);
	}

	polylines = [];
}

async function displayRoute(source, isOptimized) {
	const intersections = getIntersections();
	const deliveriesData = Object.values(deliveries.getDeliveries());
	let stops = [
		{
			node: str(source),
			fScore: 0
		}
	];

	addDeliveriesToIntersections(deliveriesData, intersections);
	addSourceToIntersections(source, intersections);
	await displayDeliveryPins(deliveriesData);
	clearPolylines();
	clearMarkers();

	markers.push(new google.maps.Marker({ map, position: source }));

	const bounds = new google.maps.LatLngBounds();
	bounds.extend(source);

	for (const delivery of deliveriesData) {
		const dest = {
			lat: delivery["coordinates"]["latitude"],
			lng: delivery["coordinates"]["longitude"]
		};

		bounds.extend(dest); // Extend bounds to include delivery coordinates

		if (isOptimized) {
			const [paths, winner, fScore] = aStar(source, dest, intersections);
			stops.push({
				node: str(dest),
				fScore: fScore
			});
		}
	}

	stops = stops.sort((a, b) => a.fScore - b.fScore);

	for (let i = 1; i < stops.length; i++) {
		const stop = stops[i];
		const lastStop = stops[i - 1];

		const [paths, winner, fScore] = aStar(
			json(lastStop.node),
			json(stop.node),
			intersections
		);

		const polylineOptions = {
			map: map,
			geodesic: true,
			strokeColor: i === 1 ? "#de0707" : "#100356",
			strokeOpacity: 0.6,
			strokeWeight: 4,
			zIndex: i === 1 ? 2 : 1
		};

		let prevNode = winner;

		const polylinePath = [json(prevNode), json(stop.node)];
		polylines.push(new google.maps.Polyline({
			...polylineOptions,
			path: polylinePath,
		}));

		while (paths[prevNode] !== undefined) {
			const polylineSegment = [json(prevNode), json(paths[prevNode])];
			polylines.push(new google.maps.Polyline({
				...polylineOptions,
				path: polylineSegment,
			}));
			prevNode = paths[prevNode];
		}
	}

	map.fitBounds(bounds); 
}

function haversine(lat1, lon1, lat2, lon2) {
	// Haversine formula implementation
	const r = 6371; // Radius of the Earth in kilometers
	const p = Math.PI / 180;

	// Calculate the differences in latitude and longitude, converting them to radians
	const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
					+ Math.cos(lat1 * p) * Math.cos(lat2 * p) *
					(1 - Math.cos((lon2 - lon1) * p)) / 2;

	// Return the distance in kilometers
	return 2 * r * Math.asin(Math.sqrt(a));
}
