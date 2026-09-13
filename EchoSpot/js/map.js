// Map integration: built on Leaflet + OpenStreetMap tiles
let map = null;
let userMarker = null;
let rangeCircle = null;
let echoMarkers = new Map(); // id -> marker
let onEchoClickCb = null;
let onMapClickCb = null;

export function initMap(containerId, center) {
  map = L.map(containerId, { zoomControl: false }).setView([center.lat, center.lng], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  map.on('click', (e) => {
    if (onMapClickCb) onMapClickCb({ lat: e.latlng.lat, lng: e.latlng.lng });
  });

  return map;
}

export function onEchoClick(cb) {
  onEchoClickCb = cb;
}

export function onMapClick(cb) {
  onMapClickCb = cb;
}

// radiusMeters is only used to draw the "search radius" reference circle; it never affects playback
export function setUserPosition(pos, radiusMeters) {
  const latlng = [pos.lat, pos.lng];
  if (!userMarker) {
    const icon = L.divIcon({
      className: 'user-marker',
      html: '<div class="user-dot"><span class="user-dot-pulse"></span></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    userMarker = L.marker(latlng, { icon, zIndexOffset: 1000 }).addTo(map);
  } else {
    userMarker.setLatLng(latlng);
  }

  if (!rangeCircle) {
    rangeCircle = L.circle(latlng, {
      radius: radiusMeters,
      color: '#a78bfa',
      weight: 1.2,
      dashArray: '4 6',
      fillColor: '#a78bfa',
      fillOpacity: 0.05,
    }).addTo(map);
  } else {
    rangeCircle.setLatLng(latlng);
    rangeCircle.setRadius(radiusMeters);
  }
}

export function panTo(pos) {
  if (map) map.setView([pos.lat, pos.lng]);
}

// echoes: list already filtered by radius; playingId: id of the echo currently playing (highlighted)
export function renderEchoes(echoes, playingId) {
  const seen = new Set();
  echoes.forEach((echo) => {
    seen.add(echo.id);
    const isPlaying = echo.id === playingId;
    const existing = echoMarkers.get(echo.id);
    const icon = L.divIcon({
      className: 'echo-marker',
      html: `<div class="echo-pin ${isPlaying ? 'playing' : ''}"><span class="echo-emoji">${echo.mood}</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -30],
    });
    if (existing) {
      existing.setIcon(icon);
    } else {
      const marker = L.marker([echo.lat, echo.lng], { icon }).addTo(map);
      marker.on('click', () => onEchoClickCb && onEchoClickCb(echo.id));
      echoMarkers.set(echo.id, marker);
    }
  });
  // Remove markers that are no longer in range / have been deleted
  for (const [id, marker] of echoMarkers.entries()) {
    if (!seen.has(id)) {
      map.removeLayer(marker);
      echoMarkers.delete(id);
    }
  }
}

export function flyToEcho(echo) {
  if (map) map.flyTo([echo.lat, echo.lng], Math.max(map.getZoom(), 17), { duration: 0.6 });
}
