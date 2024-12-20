import React, { useState } from "react";
import axios from "axios";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/complaints", formData);
      alert("Complaint submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <select name="category" onChange={handleChange}>
        <option value="Product">Product</option>
        <option value="Service">Service</option>
        <option value="Support">Support</option>
      </select>
      <div>
        <label><input type="radio" name="priority" value="Low" checked={formData.priority === "Low"} onChange={handleChange} /> Low</label>
        <label><input type="radio" name="priority" value="Medium" onChange={handleChange} /> Medium</label>
        <label><input type="radio" name="priority" value="High" onChange={handleChange} /> High</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
