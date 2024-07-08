let map, source;

// Bounds for Metro Manila area
const METRO_MANILA_BOUNDS = {
    north: 14.7,
    south: 14.5,
    west: 120.95,
    east: 121.1
}

// Function to parse place data and extract coordinates
function parsePlaceData(data) {
	const geometry = data["geometry"]["location"];
	const lat = geometry["lat"]();
	const lng = geometry["lng"]();
	return { lat: lat, lng: lng };
}

// Function to get coordinates from address using Geocoding API
async function getCoordinates(address) {
	const geocoder = new google.maps.Geocoder();
	const res = await geocoder.geocode({ "address": address });
	return parsePlaceData(res["results"][0]);
}

// Initialize and add the map
async function initMap(address) {
	const { Map } = await google.maps.importLibrary("maps");
	source = await getCoordinates(address);

	// Display a map on the webpage
	map = new Map(document.getElementById("map"), {
		restriction: {
			latLngBounds: METRO_MANILA_BOUNDS,
			strictBounds: false
		},
		center: source,
		zoom: 18,
		mapId: "26050be015b4cb2d"
	});

	setupSearchBox(map, address);

	// Display route using A* algorithm
	await displayRoute(source, false);
}

// Function to set up the search box for place searching
function setupSearchBox(map, initialValue) {
	// Create the search box and link it to the UI element.
	const input = document.getElementById("source-input");
	const searchBox = new google.maps.places.SearchBox(input);

	input.value = initialValue;

	// Bias the SearchBox results towards current map's viewport.
	map.addListener("bounds_changed", () => {
		searchBox.setBounds(map.getBounds());
	});

	let markers = [];

	// Listen for the event fired when the user selects a prediction and retrieve more details for that place.
	searchBox.addListener("places_changed", async () => {
		const places = searchBox.getPlaces();
		if (places.length == 0) return;

		// Update route when the place is changed
		source = parsePlaceData(places[0]);
		await displayRoute(source, false);

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

			// Create marker icon
			const icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25),
			};

			// Create a marker for each place.
			markers.push(
				new google.maps.marker.AdvancedMarkerElement({
					map,
					title: place.name,
					position: place.geometry.location,
				})
			);
			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});

		// Fit map bounds to include all markers
		map.fitBounds(bounds);
	});
}
