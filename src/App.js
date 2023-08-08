import React, { useState } from "react";
import "./App.css";
import ThreeScene from "./ThreeScene";
import Popup from "./popup";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleModelClick = () => {
    setIsPopupOpen(true);
    console.log(isPopupOpen);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="App">
      <ThreeScene onModelClick={handleModelClick} />{" "}
      <Popup visible={isPopupOpen} onHide={handleClosePopup} />
    </div>
  );
}

export default App;
