// Fetch the data from Overpass API
async function fetchIntersections() {
	const overpassUrl = "http://overpass-api.de/api/interpreter";
	const overpassQuery = `
		[out:json];
		(
			way["highway"~"^(residential)$"](14.6035, 121.0011, 14.6154, 121.0144);
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
