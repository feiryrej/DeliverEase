let map, directionsService, directionsRenderer;

const pins = [
    ["1", 14.602415996238568, 121.01339990672079],
    ["2", 14.602535392412314, 121.01306194839161],
];

// Initialize and add the map
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    // Display a map on the webpage
    map = new Map(document.getElementById("map"), {
        center: { lat: 14.6018052, lng: 121.0173145 },
        zoom: 18,
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

    // Fetch intersections and add markers
    fetchIntersections()
        .then(async intersections => {
            intersections.forEach(intersection => {
                const p = document.createElement("p");
                p.textContent = `Intersection at (${intersection.lat}, ${intersection.lon})`;
                p.classList.add("pin-text");

                new AdvancedMarkerElement({
                    map,
                    position: { lat: intersection.lat, lng: intersection.lon },
                });
            });

            // Display route using A* algorithm
            await displayRoute(intersections);
        })
        .catch(error => {
            console.error("Error fetching intersections:", error);
        });
	
	// Initialize Google Maps API's Directions Service and Renderer
	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);
}



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

// Display route on map
async function displayRoute(intersections) {
    const source = {  lat: 14.608624590296547, lng: 121.0122706094754};
    const dest = {lat: 14.610968633422495, lng: 121.00945973918806};

    const path = aStar(source, dest, intersections); 

    const waypoints = path.map(intersection => ({
        location: { lat: intersection.lat, lng: intersection.lon }
    }));

    const request = {
        origin: source,
        destination: dest,
        waypoints: waypoints,
        travelMode: "DRIVING",
    };

    directionsService.route(request, function (result, status) {
        if (status == "OK") {
            directionsRenderer.setDirections(result);
        }
    });
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

document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
