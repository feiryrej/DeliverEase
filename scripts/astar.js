class DefaultDict {
    constructor(defaultVal) {
        return new Proxy({}, {
            get: (target, name) => name in target ? target[name] : defaultVal
        })
    }
}

function str(node) {
    return JSON.stringify(node);
}

function json(node) {
    return JSON.parse(node);
}

function getNodeWithLowestFScore(openList, fScore) {
    const fScores = {};

    for (const node of openList) {
        fScores[fScore[node]] = node;
    }

    const lowestFScore = Math.min(...Object.keys(fScores));
    return fScores[lowestFScore];
}

function weight(current, neighbor) {
    return 1;
}

function aStar(start, goal, graph) {
    const heuristic = (lat, lng) => {
        return haversine(lat, lng, goal.lat, goal.lng);
    };
    const openList = [str(start)];
    const cameFrom = {};

    const gScore = new DefaultDict(Infinity);
    gScore[str(start)] = 0;

    const fScore = new DefaultDict(Infinity);
    fScore[str(start)] = heuristic(start.lat, start.lng);

    while (openList.length > 0) {
        const current = getNodeWithLowestFScore(openList, fScore);

        if (current === str(goal)) {
            return [cameFrom, cameFrom[str(goal)]];
        }

        openList.splice(openList.indexOf(current), 1);

        for (let neighbor of graph[current]) {
            neighbor = str(neighbor);
            const tentative_gScore = gScore[current] + weight(current, neighbor);

            if (tentative_gScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentative_gScore;
                fScore[neighbor] = tentative_gScore + heuristic(
                    json(neighbor).lat,
                    json(neighbor).lng
                );

                if (!openList.includes(neighbor)) {
                    openList.push(neighbor);
                }
            }
        }
    }

    return [];
}
