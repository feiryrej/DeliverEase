let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 14.600155451725184, lng: 121.01288018643108 },
    zoom: 19,
  });
}

initMap();
