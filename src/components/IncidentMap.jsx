import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './map.css'

const IncidentMap = ({ incidents, center = [20, 77], zoom = 5 }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {incidents.map((incident) => (
        <Marker key={incident._id} position={[incident.latitude, incident.longitude]}>
          <Popup>
            <strong>{incident.type}</strong><br />
            {incident.description.length > 50 ? incident.description.slice(0,50) + "..." : incident.description}<br />
            Status: {incident.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IncidentMap;
