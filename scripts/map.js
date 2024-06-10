let map, directionsService, directionsRenderer;

const pins = [
	["1", 14.602415996238568, 121.01339990672079],
	["2", 14.602535392412314, 121.01306194839161],
];

async function getCoordinates(address) {
	const geocoder = new google.maps.Geocoder();
	const res = await geocoder.geocode({ "address": address });
	const geometry = res["results"][0]["geometry"]["location"];
	const lat = geometry["lat"]();
	const lng = geometry["lng"]();
	return { lat: lat, lng: lng };
}

// Initialize and add the map
async function initMap(address) {
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	// Display a map on the webpage
	map = new Map(document.getElementById("map"), {
		center: await getCoordinates(address),
		zoom: 18,
		mapId: "26050be015b4cb2d"
	});

	setupSearchBox(map);

	for (const pin of pins) {
		const p = document.createElement("p");
		p.textContent = pin[0];
		p.classList.add("pin-text");

		new AdvancedMarkerElement({
			map,
			position: { lat: pin[1], lng: pin[2] },
			content: new PinElement({glyph: p}).element,
		});
	}

	// Fetch intersections and add markers
	fetchIntersections()
		.then(async intersections => {
			intersections.forEach(intersection => {
				const p = document.createElement("p");
				p.textContent = `Intersection at (${intersection.lat}, ${intersection.lon})`;
				p.classList.add("pin-text");

				new AdvancedMarkerElement({
					map,
					position: { lat: intersection.lat, lng: intersection.lon },
				});
			});

			// Display route using A* algorithm
			await displayRoute(intersections);
		})
		.catch(error => {
			console.error("Error fetching intersections:", error);
		});

	// Initialize Google Maps API's Directions Service and Renderer
	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);
}

function setupSearchBox(map) {
	// Create the search box and link it to the UI element.
	const input = document.getElementById("source-input");
	const searchBox = new google.maps.places.SearchBox(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener("bounds_changed", () => {
		searchBox.setBounds(map.getBounds());
	});

	let markers = [];

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener("places_changed", () => {
		const places = searchBox.getPlaces();

		if (places.length == 0) {
		return;
		}

		// Clear out the old markers.
		markers.forEach((marker) => {
		marker.setMap(null);
		});
		markers = [];

		// For each place, get the icon, name and location.
		const bounds = new google.maps.LatLngBounds();

		places.forEach((place) => {
		if (!place.geometry || !place.geometry.location) {
			console.log("Returned place contains no geometry");
			return;
		}

		const icon = {
			url: place.icon,
			size: new google.maps.Size(71, 71),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(25, 25),
		};

		// Create a marker for each place.
		markers.push(
			new google.maps.Marker({
			map,
			icon,
			title: place.name,
			position: place.geometry.location,
			}),
		);
		if (place.geometry.viewport) {
			// Only geocodes have viewport.
			bounds.union(place.geometry.viewport);
		} else {
			bounds.extend(place.geometry.location);
		}
		});
		map.fitBounds(bounds);
	});
}
