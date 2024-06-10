// Fetch the data from Overpass API
async function fetchIntersections() {
	const overpassUrl = "http://overpass-api.de/api/interpreter";
	const overpassQuery = `
		[out:json];
		(
			way["highway"~"^(residential)$"](14.5128, 120.9713, 14.6218, 121.1749);
		);
		node(w)->.nodes;
		node.nodes;
		out qt;
	`;

	// const response = await fetch(overpassUrl, {
	// 	method: 'POST',
	// 	body: new URLSearchParams({
	// 		data: overpassQuery
	// 	})
	// });
	// const data = await response.json();

	data = intersectionsData;
	return data.elements.filter(element => element.type === 'node');
}
