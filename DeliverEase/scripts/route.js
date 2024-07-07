let markers = [];
let deliveryPins = [];

// Function to clear all markers from the map
function clearMarkers() {
	for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}

	markers = [];
}

// Function to display delivery pins on the map
async function displayDeliveryPins(deliveriesData) {
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	// Remove existing delivery pins
	for (let i = 0; i < deliveryPins.length; i++) {
		deliveryPins[i].map = null;
		deliveryPins[i] = null;
	}

	deliveryPins = [];

	// Create a custom pin
	for (const delivery of deliveriesData) {
		const container = document.createElement("div");
		container.style.position = "relative";
		container.style.width = "70px"; 
		container.style.height = "70px"; 
		container.style.top = "10px"; 

		// Create an image element for the pin
		const beachFlagImg = document.createElement("img");
		beachFlagImg.src = "https://i.postimg.cc/Zndyyfbs/pin.png";
		beachFlagImg.style.width = "100%";
		beachFlagImg.style.height = "100%";
		beachFlagImg.style.display = "block";

		// Create a text element for the order ID
		const p = document.createElement("p");
		p.textContent = delivery["order_id"];
		p.classList.add("pin-text");
		p.style.textAlign = "center"; 
        p.style.position = "absolute";
        p.style.bottom = "60px";

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

// Function to add delivery coordinates to intersections
function addDeliveriesToIntersections(deliveriesData, intersections) {
	for (const delivery of deliveriesData) {
		const distances = {};

		// Calculate distances from delivery to each intersection node
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

		// Find the intersection node with the shortest distance
		const lowestDistance = Math.min(...Object.keys(distances));
		const node = JSON.stringify({
			lat: delivery["coordinates"]["latitude"],
			lng: delivery["coordinates"]["longitude"]
		});

		// Connect delivery node to the nearest intersection node
		intersections[node] = [];
		connectNodes(intersections, node, JSON.stringify(distances[lowestDistance]));
	}
}

// Function to add source coordinates to intersections
function addSourceToIntersections(source, intersections) {
	const distances = {};

	// Calculate distances from source to each intersection node
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

	// Find the intersection node with the shortest distance
	const lowestDistance = Math.min(...Object.keys(distances));
	const node = JSON.stringify(source);

	// Connect source node to the nearest intersection node
	intersections[node] = [];
	connectNodes(intersections, node, JSON.stringify(distances[lowestDistance]));
}

let polylines = [];

// Function to clear all polylines from the map
function clearPolylines() {
	for (const line of polylines) {
		line.setMap(null);
	}

	polylines = [];
}

// Function to display the route on the map using A* algorithm
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

	// Iterate through each delivery and calculate optimized route if required
	for (const delivery of deliveriesData) {
		const dest = {
			lat: delivery["coordinates"]["latitude"],
			lng: delivery["coordinates"]["longitude"]
		};

		bounds.extend(dest); // Extend bounds to include delivery coordinates

		if (isOptimized) {
			// Perform A* algorithm to find optimized route
			const [paths, winner, fScore] = aStar(source, dest, intersections);
			stops.push({
				node: str(dest),
				fScore: fScore
			});
		}
	}

	// Sort stops by fScore for optimized route planning
	stops = stops.sort((a, b) => a.fScore - b.fScore);

	// Draw polylines for each leg of the route
	for (let i = 1; i < stops.length; i++) {
		const stop = stops[i];
		const lastStop = stops[i - 1];

		// Perform A* algorithm for each leg of the route
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

		// Draw polyline for the current route segment
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

// Haversine formula to calculate distance between two coordinates
function haversine(lat1, lon1, lat2, lon2) {
	// Haversine formula implementation
	const r = 6371; // Earth's radius in km
	const p = Math.PI / 180; // Convert degrees to radians

	// Calculate Haversine formula
	const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
					+ Math.cos(lat1 * p) * Math.cos(lat2 * p) *
					(1 - Math.cos((lon2 - lon1) * p)) / 2;

	return 2 * r * Math.asin(Math.sqrt(a));
}
