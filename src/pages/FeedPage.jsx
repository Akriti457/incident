import React, { useEffect, useState } from "react";
import IncidentCard from "../components/IncidentCard";
import FilterPanel from "../components/FilterPanel";
import IncidentMap from "../components/IncidentMap";
import { getIncidents } from "../services/api";

const FeedPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);

  // Fetch all incidents from backend
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

    // Optional: real-time updates every 10 seconds
    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle filter changes from FilterPanel
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

  return (
    <div>
      <h1>Live Incident Feed</h1>

      <FilterPanel onFilter={handleFilter} />

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          {filteredIncidents.map((incident) => (
            <IncidentCard key={incident._id} incident={incident} />
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <IncidentMap incidents={filteredIncidents} />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
