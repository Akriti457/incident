import React, { useState } from "react";
import { createIncident } from "../services/api";
import './report.css'
const ReportIncidentForm = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [media, setMedia] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createIncident({ type, description, latitude, longitude, media });
      setSuccess("Incident reported successfully!");
      setType("");
      setDescription("");
      setLatitude("");
      setLongitude("");
      setMedia(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Report an Incident</h2>

      <label>Type:</label>
      <select  className = "select"value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select Type</option>
        <option value="Accident">Accident</option>
        <option value="Medical">Medical</option>
        <option value="Fire">Fire</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Crime">Crime</option>
        <option value="Other">Other</option>
      </select>

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Latitude:</label>
      <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />

      <label>Longitude:</label>
      <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />

      <label>Media (optional):</label>
      <input type="file" onChange={(e) => setMedia(e.target.files[0])} />

      <button type="submit">Submit</button>

      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default ReportIncidentForm;
