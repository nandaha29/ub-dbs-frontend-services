import React from "react";
import Navbar from "../elements/navbar";
import Sidebar from "../elements/sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Sidebar />

      {children}
    </div>
  );
}
