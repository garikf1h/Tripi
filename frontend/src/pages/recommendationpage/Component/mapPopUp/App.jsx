import React, { useState, useEffect} from "react";
import '../../../../styles/Tripi_page_2.css'
import TheMap from "../Map/App";


const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose} >x</span>
          <TheMap places = {props.places} >

          </TheMap>

      </div>
    </div>
  );
};

export default Popup;