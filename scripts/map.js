let map, directionsService, directionsRenderer;

const pins = [
	["1", 14.602415996238568, 121.01339990672079],
	["2", 14.602535392412314, 121.01306194839161],
];

// Initialize and add the map
async function initMap() {
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	// Display a map on the webpage
	map = new Map(document.getElementById("map"), {
		center: { lat: 14.6018052, lng: 121.0173145 },
		zoom: 18,
		mapId: "26050be015b4cb2d"
	});

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
