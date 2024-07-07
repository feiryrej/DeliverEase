// Class for a default dictionary using Proxy to provide default values
class DefaultDict {
    constructor(defaultVal) {
        return new Proxy({}, {
            get: (target, name) => name in target ? target[name] : defaultVal
        })
    }
}

// Function to stringify a node object
function str(node) {
    return JSON.stringify(node);
}

// Function to parse a JSON string into an object
function json(node) {
    return JSON.parse(node);
}

// Function to get the node with the lowest fScore from the openList
function getNodeWithLowestFScore(openList, fScore) {
    const fScores = {};

    // Populate fScores with fScore values for each node in openList
    for (const node of openList) {
        fScores[fScore[node]] = node;
    }

    // Find the lowest fScore value and return the corresponding node
    const lowestFScore = Math.min(...Object.keys(fScores));
    return fScores[lowestFScore];
}

// Function to calculate the weight between current and neighbor nodes using haversine formula
function weight(current, neighbor) {
    // Convert nodes to JSON objects and calculate distance using haversine formula
    current = json(current);
    neighbor = json(neighbor);
    return haversine(current.lat, current.lng, neighbor.lat, neighbor.lng);
}

// A* search algorithm function
function aStar(start, goal, graph) {
    // Heuristic function using haversine distance
    const heuristic = (lat, lng) => {
        return haversine(lat, lng, goal.lat, goal.lng);
    };

    // Initialize openList with the starting node, and initialize dictionaries
    const openList = [str(start)];
    const cameFrom = {};

    const gScore = new DefaultDict(Infinity);
    gScore[str(start)] = 0;

    const fScore = new DefaultDict(Infinity);
    fScore[str(start)] = heuristic(start.lat, start.lng);

    // Main loop for the A* algorithm
    while (openList.length > 0) {
        // Get node with lowest fScore from openList
        const current = getNodeWithLowestFScore(openList, fScore);
        console.log("Current node:", current);

        // If goal node is found, return the path and fScore
        if (current === str(goal)) {
            console.log("Found goal node:", current);
            return [cameFrom, cameFrom[str(goal)], fScore[current]];
        }

        openList.splice(openList.indexOf(current), 1);

        // Explore neighbors of current node
        for (let neighbor of graph[current]) {
            neighbor = str(neighbor);
            const tentative_gScore = gScore[current] + weight(current, neighbor);

            // Update gScore, cameFrom, and fScore if a better path is found
            if (tentative_gScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentative_gScore;
                fScore[neighbor] = tentative_gScore + heuristic(
                    json(neighbor).lat,
                    json(neighbor).lng
                );

                 // Add neighbor to openList if it's not already there
                if (!openList.includes(neighbor)) {
                    openList.push(neighbor);
                    console.log("Added to open list:", neighbor);
                }
            }
        }
    }

    return [];
}