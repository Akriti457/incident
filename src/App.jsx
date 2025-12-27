import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ReportPage from "./pages/ReportPage";
import FeedPage from "./pages/FeedPage";
import IncidentPage from "./pages/IncidentPage";
import AdminPage from "./pages/AdminPage";
import './index.css'
import HomePage from "./pages/home";
import Navbar from "./Navbar";
const App = () => {
  return (
    <div>
      <Navbar/>
       <main>
        <Routes>
           <Route path="/" element={<HomePage/>} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/incident/:id" element={<IncidentPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
