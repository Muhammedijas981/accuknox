import React from "react";
import AppLayout from "./components/Layout/AppLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import "./styles/global.css";

function App() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}

export default App;
