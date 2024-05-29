let map;

const pins = [
	["1", 14.60025964945535, 121.01280499614454],
	["2", 14.600173936954763, 121.01194246820016],
];

// initialize and add the map
async function initMap() {
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	// display a map on the webpage
	map = new Map(document.getElementById("map"), {
		center: { lat: 14.600155451725184, lng: 121.01288018643108 },
		zoom: 19,
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
}
