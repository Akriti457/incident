import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReportPage from "./pages/ReportPage";
import FeedPage from "./pages/FeedPage";
import IncidentPage from "./pages/IncidentPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/home";
import Navbar from "./Navbar";
import AdminLogin from "./pages/adminlogin";
import './index.css'

const App = () => {
  // State to track if admin is logged in
  const [adminLogin, setAdminLogin] = useState(false);

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/incident/:id" element={<IncidentPage />} />

          {/* Admin route: show AdminPage if logged in, otherwise AdminLogin */}
          <Route
            path="/admin"
            element={
              adminLogin ? (
                <AdminPage />
              ) : (
                <AdminLogin onSubmit={() => setAdminLogin(true)} />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
