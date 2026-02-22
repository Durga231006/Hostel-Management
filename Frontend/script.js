const API = "http://localhost:5000";

// DASHBOARD
function loadDashboard() {
  fetch(API + "/rooms").then(res => res.json())
    .then(data => document.getElementById("roomCount").innerText = data.length);

  fetch(API + "/tenants").then(res => res.json())
    .then(data => document.getElementById("tenantCount").innerText = data.length);

  fetch(API + "/complaints").then(res => res.json())
    .then(data => document.getElementById("complaintCount").innerText = data.length);
}

// ROOMS
function addRoom() {
  fetch(API + "/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      roomNo: roomNo.value,
      rent: rent.value
    })
  }).then(() => {
    alert("Room Added");
    loadRooms();
  });
}

function loadRooms() {
  fetch(API + "/rooms")
    .then(res => res.json())
    .then(data => {
      roomList.innerHTML = "";
      data.forEach(r => {
        roomList.innerHTML += `<li>Room ${r.roomNo} - ₹${r.rent}</li>`;
      });
    });
}

// TENANTS
function addTenant() {
  fetch(API + "/tenants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: tenantName.value,
      room: tenantRoom.value
    })
  }).then(() => {
    alert("Tenant Added");
    loadTenants();
  });
}

function loadTenants() {
  fetch(API + "/tenants")
    .then(res => res.json())
    .then(data => {
      tenantList.innerHTML = "";
      data.forEach(t => {
        tenantList.innerHTML += `<li>${t.name} - Room ${t.room}</li>`;
      });
    });
}

// COMPLAINTS
function addComplaint() {
  fetch(API + "/complaints", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      issue: complaintText.value
    })
  }).then(() => {
    alert("Complaint Submitted");
    loadComplaints();
  });
}

function loadComplaints() {
  fetch(API + "/complaints")
    .then(res => res.json())
    .then(data => {
      complaintList.innerHTML = "";
      data.forEach(c => {
        complaintList.innerHTML += `<li>${c.issue}</li>`;
      });
    });
}