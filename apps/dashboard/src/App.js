import React from "react";

const DashboardApp = () => (
  <div style={{ padding: '20px', border: '2px solid #28a745', margin: '10px' }}>
    <h2>Dashboard Module</h2>
    <p>Dashboard functionality goes here</p>
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>Widget 1</div>
      <div style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>Widget 2</div>
      <div style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>Widget 3</div>
    </div>
  </div>
);

export default DashboardApp;