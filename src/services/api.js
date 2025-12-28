import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Change to your backend URL

export const createIncident = async (data) => {
  const response = await axios.post(`${API_URL}/incidents`, data);
  return response.data;
};

export const getIncidents = async () => {
  const response = await axios.get(`${API_URL}/incidents`);
  return response.data;
};

export const getIncidentById = async (id) => {
  const response = await axios.get(`${API_URL}/incidents/${id}`);
  return response.data;
};

export const confirmIncident = async (id) => {
  const response = await axios.post(`${API_URL}/incidents/${id}/confirm`);
  return response.data;
};

export const updateIncidentStatus = async (id, status, notes) => {
  const response = await axios.patch(`${API_URL}/incidents/${id}/status`, {
    status,
    notes,
  });
  return response.data;
};
export const createContact = async (data) => {
  const response = await axios.post(`${API_URL}/contacts`, data);
  return response.data;
};
