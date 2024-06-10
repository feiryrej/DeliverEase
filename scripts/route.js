// Display route on map
async function displayRoute(source, intersections) {
	const dest = {lat: 14.610968633422495, lng: 121.00945973918806};
	const path = aStar(source, dest, intersections);

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
