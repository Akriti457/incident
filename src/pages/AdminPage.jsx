import React, { useEffect, useState } from "react";
import { getIncidents, updateIncidentStatus } from "../services/api";
import FilterPanel from "../components/FilterPanel";
import StatusBadge from "../components/StatusBadge";

const AdminPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [notes, setNotes] = useState({});

  // Fetch all incidents
  const fetchIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
      setFilteredIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  useEffect(() => {
    fetchIncidents();
    // Optional real-time updates every 10 sec
    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle filter changes
  const handleFilter = (filters) => {
    const { type, severity, time } = filters;

    const filtered = incidents.filter((incident) => {
      let typeMatch = type ? incident.type === type : true;
      let severityMatch = severity ? incident.severity === severity : true;

      let timeMatch = true;
      if (time) {
        const hoursAgo = (new Date() - new Date(incident.timestamp)) / 3600000;
        timeMatch = hoursAgo <= parseInt(time);
      }

      return typeMatch && severityMatch && timeMatch;
    });

    setFilteredIncidents(filtered);
  };

  // Handle status change
  const handleStatusUpdate = async (id) => {
    const newStatus = statusUpdates[id];
    const internalNote = notes[id] || "";
    if (!newStatus) return;

    try {
      await updateIncidentStatus(id, newStatus, internalNote);
      setStatusUpdates({ ...statusUpdates, [id]: "" });
      setNotes({ ...notes, [id]: "" });
      fetchIncidents(); // Refresh data
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <FilterPanel onFilter={handleFilter} />

      {filteredIncidents.map((incident) => (
        <div key={incident._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
          <h3>{incident.type}</h3>
          <p>{incident.description.length > 100 ? incident.description.slice(0, 100) + "..." : incident.description}</p>
          <p>Severity: {incident.severity}</p>
          <p>Reported at: {new Date(incident.timestamp).toLocaleString()}</p>
          <StatusBadge status={incident.status} />

          <div style={{ marginTop: "10px" }}>
            <label>Status:</label>
            <select value={statusUpdates[incident._id] || ""} onChange={(e) => setStatusUpdates({ ...statusUpdates, [incident._id]: e.target.value })}>
              <option value="">Select</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="verified">Verified</option>
            </select>
          </div>

          <div>
            <label>Internal Notes:</label>
            <textarea value={notes[incident._id] || ""} onChange={(e) => setNotes({ ...notes, [incident._id]: e.target.value })} />
          </div>

          <button onClick={() => handleStatusUpdate(incident._id)} style={{ marginTop: "10px" }}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
