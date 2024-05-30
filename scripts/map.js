let map;

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

  // Fetch intersections and add markers
  fetchIntersections()
    .then(intersections => {
      intersections.forEach(intersection => {
        const p = document.createElement("p");
        p.textContent = `Intersection at (${intersection.lat}, ${intersection.lon})`;
        p.classList.add("pin-text");

        new AdvancedMarkerElement({
          map,
          position: { lat: intersection.lat, lng: intersection.lon },
        });
      });
    })
    .catch(error => {
      console.error("Error fetching intersections:", error);
    });
}

// Fetch the data from Overpass API
async function fetchIntersections() {
  const overpassUrl = "http://overpass-api.de/api/interpreter";
  const overpassQuery = `
    [out:json];
    (
      way["highway"~"^(residential)$"](14.60029,121.01405,14.60245,121.01939);
    );
    node(w)->.nodes;
    node.nodes;
    out qt;
  `;

  const response = await fetch(overpassUrl, {
    method: 'POST',
    body: new URLSearchParams({ data: overpassQuery })
  });
  const data = await response.json();
  return data.elements.filter(element => element.type === 'node');
}
