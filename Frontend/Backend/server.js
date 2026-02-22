const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ================= LOAD DATA FROM JSON FILE =================

// Read data.json file
let data = JSON.parse(fs.readFileSync("data.json"));

// Store data in variables
let rooms = data.rooms;
let tenants = data.tenants;
let complaints = data.complaints;

// Function to save data back to JSON file
function saveData() {
  fs.writeFileSync(
    "data.json",
    JSON.stringify({ rooms, tenants, complaints }, null, 2)
  );
}

// Get all rooms
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

// Add new room
app.post("/rooms", (req, res) => {
  rooms.push(req.body);
  saveData();
  res.send("Room added successfully");
});

// ================= TENANTS APIs =================

// Get all tenants
app.get("/tenants", (req, res) => {
  res.json(tenants);
});

// Add new tenant
app.post("/tenants", (req, res) => {
  tenants.push(req.body);
  saveData();
  res.send("Tenant added successfully");
});

// ================= COMPLAINTS APIs =================

// Get all complaints
app.get("/complaints", (req, res) => {
  res.json(complaints);
});

// Add new complaint
app.post("/complaints", (req, res) => {
  complaints.push(req.body);
  saveData();
  res.send("Complaint submitted successfully");
});

// ================= START SERVER =================

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
