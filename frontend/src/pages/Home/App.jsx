import React, { useState } from "react";
import { MainComp } from "./Component/MainComp/App";
import "./styles/home.css";

export const HomePage = () => {
  return (
    <div className="body" style={{ overflow: "auto" }}>
      <MainComp />
    </div>
  );
};

export default { HomePage };
