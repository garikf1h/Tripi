import React, { useState, useEffect } from "react";
import axios from "axios";

export const useMapFacade = (res) => {
    const [data, setData] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(undefined);
    const [showPopUp, setShowPopUp] = useState(false);

      useEffect(()=>{
          axios.post('http://localhost:5000/map', {type: 'aa', data:res.res}).then(response => {
          console.log(response);
          setData(response.data.data);
        }).catch(error => {
          console.log(error);
        })

      }, [res]);

       const getTrip = () => {
           console.log(selectedTrip);
           const dataTrip = {coridnates: {x : selectedTrip.Starting_point_x, y: selectedTrip.Starting_point_y}}
          axios.post('http://localhost:5000/trip', {type: 'aa', data: dataTrip}).then(response => {
          console.log(response);
          console.log(selectedTrip);
          setSelectedTrip(undefined);
        }).catch(error => {
            console.log(selectedTrip);
            console.log(error);
        })
      };

      return {
          data,
          selectedTrip,
          setSelectedTrip,
          setShowPopUp,
          showPopUp,
          getTrip,
      }
}