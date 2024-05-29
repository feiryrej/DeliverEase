let map;

const pins = [
	[14.60025964945535, 121.01280499614454],
];

// initialize and add the map
async function initMap() {
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	// display a map on the webpage
	map = new Map(document.getElementById("map"), {
		center: { lat: 14.600155451725184, lng: 121.01288018643108 },
		zoom: 19,
		mapId: '26050be015b4cb2d'
	});

	for (const coords of pins) {
		new AdvancedMarkerElement({
			map,
			position: { lat: coords[0], lng: coords[1] },
			content: new PinElement({glyph: "Test"}).element,
		});
	}
}
