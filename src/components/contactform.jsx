import React, { useState } from "react";
import { createContact } from "../services/api";
import './contactform.css'
const ContactForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!name || !mobile) {
      alert("Please fill all fields");
      return;
    }

   try {
    // Send contact info to backend
    await createContact({ name, mobile });

    // Success: mark user as valid
    onSuccess();
  } catch (error) {
    console.error("Error saving contact:", error);
    alert("Failed to save contact. Try again.");
  }
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 1: Your Details</h2>

      <div>
        <label>Name</label><br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <br />

      <div>
        <label>Mobile Number</label><br />
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </div>

      <br />

      <button type="submit">Continue</button>
    </form>
  );
};

export default ContactForm;
