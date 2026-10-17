// Geolocation-related utility functions
const EARTH_RADIUS_M = 6371000;

export function distanceMeters(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

// Scatter a random point around a center (used to place demo "nearby" content)
export function randomPointNear(center, minMeters, maxMeters) {
  const r = minMeters + Math.random() * (maxMeters - minMeters);
  const angle = Math.random() * Math.PI * 2;
  const dLat = (r * Math.cos(angle)) / EARTH_RADIUS_M;
  const dLng =
    (r * Math.sin(angle)) /
    (EARTH_RADIUS_M * Math.cos((center.lat * Math.PI) / 180));
  return {
    lat: center.lat + (dLat * 180) / Math.PI,
    lng: center.lng + (dLng * 180) / Math.PI,
  };
}

export function formatDistance(m) {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(2)} km`;
}

export function formatTimeAgo(ts) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} h ago`;
  const day = Math.floor(hr / 24);
  return `${day} d ago`;
}

// Wraps geolocation: prefers watchPosition, falls back to a default coordinate on failure
export function watchLocation({ onUpdate, onError, fallback }) {
  if (!('geolocation' in navigator)) {
    onError && onError(new Error('Geolocation is not supported by this browser'));
    onUpdate(fallback, { fallback: true });
    return null;
  }
  const id = navigator.geolocation.watchPosition(
    (pos) => {
      onUpdate(
        { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy },
        { fallback: false }
      );
    },
    (err) => {
      onError && onError(err);
      onUpdate(fallback, { fallback: true });
    },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
  );
  return id;
}

export function clearWatch(id) {
  if (id != null && 'geolocation' in navigator) {
    navigator.geolocation.clearWatch(id);
  }
}
