import React, { useState } from "react";
import ReportIncidentForm from "../components/ReportIncidentForm";
import ContactForm from "../components/contactform";
import './Reportp.css'
const ReportPage = () => {
  const [valid,setvalid] = useState(false)
  return (
    <div className="report-page">
  <h1>Report an Emergency</h1>
  {valid ? <ReportIncidentForm /> : <ContactForm onSuccess={() => setvalid(true)} />}
</div>

  );
};

export default ReportPage;
