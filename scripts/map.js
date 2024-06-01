let map, directionsService, directionsRenderer;

const pins = [
	["1", 14.60053, 121.0161062],
	["2", 14.6024859, 121.0144928],
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
		.then(intersections => {
			intersections.forEach(intersection => {
				const p = document.createElement("p");
				p.textContent = `Intersection at (${intersection.lat}, ${intersection.lon})`;
				p.classList.add("pin-text");

				new AdvancedMarkerElement({
					map,
					position: { lat: intersection.lat, lng: intersection.lon },
				});
			});
		})
		.catch(error => {
			console.error("Error fetching intersections:", error);
		});

	// Initialize Google Maps API's Directions Service and Renderer
	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);
	displayRoute();
}

// Fetch the data from Overpass API
async function fetchIntersections() {
	const overpassUrl = "http://overpass-api.de/api/interpreter";
	const overpassQuery = `
		[out:json];
		(
			way["highway"~"^(residential)$"](14.60073,121.01498,14.60181,121.01652);
		);
		node(w)->.nodes;
		node.nodes;
		out qt;
	`;

	const response = await fetch(overpassUrl, {
		method: 'POST',
		body: new URLSearchParams({
			data: overpassQuery
		})
	});

	const data = await response.json();

	return data.elements.filter(element => element.type === 'node');
}

// Diplay route on map
async function displayRoute() {
	var source = new google.maps.LatLng(14.602234475186766, 121.01607080985588);
	var dest = new google.maps.LatLng(14.600990762215977, 121.01645509123978);
	
	let request = {
		origin: source,
		destination: dest,
		travelMode: "DRIVING",
	}
	
	directionsService.route(request, function(result, status) {
		if (status == "OK") {
			directionsRenderer.setDirections(result);
		}
	})
}
