import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import GovHeader from "../components/GovHeader";
import { userIcon, hospitalIcon } from "../utils/mapIcons";
import offlineHospitals from "../data/offlineHospitals";

/* Distance calculation (Haversine) */
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return (2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

/* Facility type badge */
function getFacilityType(name = "") {
  const n = name.toLowerCase();
  if (n.includes("phc")) return "PHC";
  if (n.includes("chc")) return "CHC";
  return "Hospital";
}

export default function Hospitals() {
  const [userPos, setUserPos] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setUserPos([lat, lon]);

        /* BROAD Overpass query (reliable for India) */
        const query = `
          [out:json];
          (
            node["amenity"="hospital"](around:8000,${lat},${lon});
            node["amenity"="clinic"](around:8000,${lat},${lon});
            node["amenity"="doctors"](around:8000,${lat},${lon});
            way["amenity"="hospital"](around:8000,${lat},${lon});
          );
          out center;
        `;

        fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.elements || data.elements.length === 0) {
              setError("No health facilities found nearby.");
            } else {
              setPlaces(data.elements);
            }
          })
          .catch(() => {
            setError("Unable to fetch hospital data. Offline mode enabled.");
          });
      },
      () => {
        setError("Location permission denied. Offline mode enabled.");
      }
    );
  }, []);

  return (
    <>
      <GovHeader />

      <div className="app-container">
        <div className="card">
          <h1>Nearby Government Health Facilities</h1>

          {/* ERROR / OFFLINE MODE */}
          {error && (
            <>
              <p style={{ color: "red" }}>{error}</p>

              <h3>Offline Government Health Facilities</h3>
              <ul>
                {offlineHospitals.map((h, i) => (
                  <li key={i} style={{ marginBottom: "10px" }}>
                    <b>{h.name}</b>
                    <br />
                    <span
                      style={{
                        background: "#dcfce7",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    >
                      {h.type}
                    </span>
                    <br />
                    Approx. distance: {h.distance}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* LOADING */}
          {!userPos && !error && <p>Fetching your location…</p>}

          {/* MAP + LIST */}
          {userPos && places.length > 0 && (
            <>
              {/* MAP */}
              <MapContainer
                center={userPos}
                zoom={13}
                style={{ height: "400px", width: "100%", marginTop: "15px" }}
              >
                <TileLayer
                  attribution="© OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* USER */}
                <Marker position={userPos} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>

                {/* HOSPITALS */}
                {places.map((p, i) => {
                  const lat = p.lat || p.center?.lat;
                  const lon = p.lon || p.center?.lon;
                  if (!lat || !lon) return null;

                  const type = getFacilityType(p.tags?.name);

                  return (
                    <Marker
                      key={i}
                      position={[lat, lon]}
                      icon={hospitalIcon}
                    >
                      <Popup>
                        <b>{p.tags?.name || "Health Facility"}</b>
                        <br />
                        <span
                          style={{
                            background: "#e0f2fe",
                            padding: "2px 6px",
                            borderRadius: "6px",
                            fontSize: "12px",
                          }}
                        >
                          {type}
                        </span>
                        <br />
                        {getDistance(
                          userPos[0],
                          userPos[1],
                          lat,
                          lon
                        )}{" "}
                        km away
                        <br />
                        <a
                          href={`https://www.google.com/maps?q=${lat},${lon}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open in Google Maps
                        </a>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>

              {/* LIST */}
              <h3 style={{ marginTop: "20px" }}>
                Nearby Health Facilities
              </h3>

              <ul>
                {places.map((p, i) => {
                  const lat = p.lat || p.center?.lat;
                  const lon = p.lon || p.center?.lon;
                  if (!lat || !lon) return null;

                  const type = getFacilityType(p.tags?.name);

                  return (
                    <li key={i} style={{ marginBottom: "10px" }}>
                      <b>{p.tags?.name || "Health Facility"}</b>{" "}
                      <span
                        style={{
                          background: "#dcfce7",
                          padding: "2px 6px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          marginLeft: "6px",
                        }}
                      >
                        {type}
                      </span>
                      <br />
                      {getDistance(
                        userPos[0],
                        userPos[1],
                        lat,
                        lon
                      )}{" "}
                      km away
                      <br />
                      <a
                        href={`https://www.google.com/maps?q=${lat},${lon}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Directions
                      </a>
                    </li>
                  );
                })}
              </ul>

              <p style={{ color: "#065f46" }}>
                📍 Data source: OpenStreetMap (free & open public data)
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
