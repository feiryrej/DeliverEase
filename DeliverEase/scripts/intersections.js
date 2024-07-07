// Function to find intersections between nodes in overpass API data
function getIntersections() {
	const nodes = {};
	const intersections = {};

	// Iterate through each element in overpassAPIData
	for (const item of overpassAPIData["elements"]) {
		if (item["type"] === "node") {
			// If the element is a node, store its coordinates in nodes object
			nodes[item["id"]] = {
				"lat": item["lat"],
				"lng": item["lon"]
			};
		}

		else if (item["type"] === "way") {
			 // If the element is a way (a path or road)
			for (let i = 0; i < item["nodes"].length; i++) {
				const node = item["nodes"][i];
				const n1 = item["nodes"][i - 1];
				const n2 = item["nodes"][i + 1];

				// Connect adjacent nodes (intersections) in intersections object
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

	// Convert node IDs to node coordinates and update intersections object
	for (const [key, value] of Object.entries(intersections)) {
		intersections[JSON.stringify(nodes[key])] = value.map(nodeID => nodes[nodeID]);
		delete intersections[key];
	}

	return intersections;
}

// Function to connect two nodes in a graph representatio
function connectNodes(graph, node1, node2) {
	const node1Neighbors = graph[node1];
	const node2Neighbors = graph[node2];
	node1Neighbors.push(JSON.parse(node2));
	node2Neighbors.push(JSON.parse(node1));
}