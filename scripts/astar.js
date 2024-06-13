function haversine(lat1, lon1, lat2, lon2) {
  // Haversine formula implementation
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

// A* Algorithm implementation
function aStar(start, goal, intersections) {
  function heuristic(a, b) {
    return Math.hypot(a.lat - b.lat, a.lng - b.lng);
  }

  const openSet = [];
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  gScore.set(start, 0);
  fScore.set(start, heuristic(start, goal));

  openSet.push(start);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore.get(a) - fScore.get(b));
    const current = openSet.shift();

    if (heuristic(current, goal) < 0.0001) {
      const path = [];
      let temp = current;
      while (temp) {
        path.push(temp);
        temp = cameFrom.get(temp);
      }
      return path.reverse();
    }

    for (const neighbor of intersections) {
      const tentative_gScore = gScore.get(current) + heuristic(current, neighbor);
      if (tentative_gScore < (gScore.get(neighbor) || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentative_gScore);
        fScore.set(neighbor, tentative_gScore + heuristic(neighbor, goal));

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return [];
}
