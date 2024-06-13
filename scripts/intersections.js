function getIntersections() {
	const nodes = {};
	const intersections = {};

	for (const item of overpassAPIData["elements"]) {
		if (item["type"] === "node") {
			nodes[item["id"]] = {
				"lat": item["lat"],
				"lon": item["lon"]
			};
		}

		else if (item["type"] === "way") {
			for (let i = 0; i < item["nodes"].length; i++) {
				const node = item["nodes"][i];
				const n1 = item["nodes"][i - 1];
				const n2 = item["nodes"][i + 1];

				for (const n of [n1, n2]) {
					if (n !== undefined) {
						if (intersections[node] === undefined) {
							intersections[node] = [];
						}

						intersections[node].push(n);
					}
				}
			}
		}
	}

	for (const [key, value] of Object.entries(intersections)) {
		intersections[JSON.stringify(nodes[key])] = value.map(nodeID => nodes[nodeID]);
		delete intersections[key];
	}

	return intersections;
}
