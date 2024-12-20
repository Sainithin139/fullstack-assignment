const express = require("express");
const Complaint = require("../models/Complaint");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Get all complaints (with optional filters)
router.get("/", async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;

    const complaints = await Complaint.find(filters);
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComplaint) return res.status(404).json({ error: "Complaint not found" });
    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!deletedComplaint) return res.status(404).json({ error: "Complaint not found" });
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
