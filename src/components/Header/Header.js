import React from "react";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header-container">
      <span className="title-tagline-container">
        <span className="app-title">{"TaskTrack"}</span>
        <span className="app-tagline">{"Stay organised, stay ahead"}</span>
      </span>
    </div>
  );
}
