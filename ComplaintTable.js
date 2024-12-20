import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "" });

  const fetchComplaints = async () => {
    const { data } = await axios.get("http://localhost:5000/api/complaints", { params: filters });
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, [filters]);

  const handleUpdateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/complaints/${id}`, { status });
    fetchComplaints();
  };

  return (
    <div>
      <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
      <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.title}</td>
              <td>{complaint.category}</td>
              <td>{complaint.priority}</td>
              <td>{complaint.status}</td>
              <td>{new Date(complaint.dateSubmitted).toLocaleDateString()}</td>
              <td>
                <select onChange={(e) => handleUpdateStatus(complaint._id, e.target.value)} value={complaint.status}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
