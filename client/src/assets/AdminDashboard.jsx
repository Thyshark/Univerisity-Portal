//import ListGroup from "./ListGroup";
import React, { useState, useEffect } from "react";
//import axios from "axios";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* <ListGroup /> */}
      <div class="card" style="width: 18rem;">
        <div class="card-header">Featured</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
