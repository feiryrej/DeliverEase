/**
 * A class that creates a dictionary with a default value for missing keys.
 * This class uses a Proxy to return a default value when accessing keys that do not exist.
 */
class DefaultDict {
    constructor(defaultVal) {
        // The constructor takes a default value and returns a Proxy
        return new Proxy({}, {
            // The get trap intercepts property access on the target object
            get: (target, name) => name in target ? target[name] : defaultVal
        });
    }
}

/**
 * Converts a JavaScript object to a JSON string.
 * @param {Object} node - The object to be stringified.
 * @returns {String} - The JSON string representation of the object.
 */
function str(node) {
    return JSON.stringify(node);
}

/**
 * Parses a JSON string to a JavaScript object.
 * @param {String} node - The JSON string to be parsed.
 * @returns {Object} - The resulting JavaScript object.
 */
function json(node) {
    return JSON.parse(node);
}

/**
 * Returns the node with the lowest fScore from the open list.
 * @param {Array} openList - List of nodes to be evaluated.
 * @param {Object} fScore - Object containing fScores for nodes.
 * @returns {String} - The node with the lowest fScore.
 */
function getNodeWithLowestFScore(openList, fScore) {
    const fScores = {};

    // Map fScores to nodes for easier access
    for (const node of openList) {
        fScores[fScore[node]] = node;
    }

    // Find the minimum fScore and return the corresponding node
    const lowestFScore = Math.min(...Object.keys(fScores));
    return fScores[lowestFScore];
}

/**
 * Calculates the distance (weight) between two nodes using the Haversine formula.
 * @param {String} current - The current node in JSON string format.
 * @param {String} neighbor - The neighboring node in JSON string format.
 * @returns {Number} - The distance between the current node and the neighbor.
 */
function weight(current, neighbor) {
    // Convert nodes to JSON objects and calculate distance using haversine formula
    current = json(current);
    neighbor = json(neighbor);
    return haversine(current.lat, current.lng, neighbor.lat, neighbor.lng);
}

/**
 * Implements the A* pathfinding algorithm to find the shortest path from start to goal.
 *
 * Pseudocode from Wikipedia
 * https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
 *
 * @param {Object} start - The starting node.
 * @param {Object} goal - The goal node.
 * @param {Object} graph - The graph representing the network of nodes.
 * @returns {Array} - An array containing the cameFrom dictionary, the last node in the path, and the fScore of the goal node.
 */
function aStar(start, goal, graph) {
    // Heuristic function to estimate distance from a node to the goal
    const heuristic = (lat, lng) => {
        return haversine(lat, lng, goal.lat, goal.lng);
    };

    const openList = [str(start)]; // List of nodes to be evaluated
    const cameFrom = {}; // Dictionary to track the most efficient previous step

    // Initialize gScore with default value of Infinity
    const gScore = new DefaultDict(Infinity);
    gScore[str(start)] = 0;

    // Initialize fScore with default value of Infinity
    const fScore = new DefaultDict(Infinity);
    fScore[str(start)] = heuristic(start.lat, start.lng);

    // Main loop to process nodes in the open list
    while (openList.length > 0) {
        // Get the node with the lowest fScore
        const current = getNodeWithLowestFScore(openList, fScore);
        console.log("Current node:", current);

        // If the current node is the goal, reconstruct and return the path
        if (current === str(goal)) {
            console.log("Found goal node:", current);
            return [cameFrom, cameFrom[str(goal)], fScore[current]];
        }

        // Remove the current node from the open list
        openList.splice(openList.indexOf(current), 1);

        // Evaluate each neighbor of the current node
        for (let neighbor of graph[current]) {
            neighbor = str(neighbor);
            // Calculate the tentative gScore for the neighbor
            const tentative_gScore = gScore[current] + weight(current, neighbor);

            // If the tentative gScore is lower, update gScore and fScore, and track the path
            if (tentative_gScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentative_gScore;
                fScore[neighbor] = tentative_gScore + heuristic(
                    json(neighbor).lat,
                    json(neighbor).lng
                );

                // Add the neighbor to the open list if not already present
                if (!openList.includes(neighbor)) {
                    openList.push(neighbor);
                    console.log("Added to open list:", neighbor);
                }
            }
        }
    }

    // Return an empty array if no path is found
    return [];
}


