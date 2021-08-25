import React, { useState, useEffect } from "react";
import axios from "axios";

export const useMapFacade = (res) => {
    const [data, setData] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(undefined);
    const [showPopUp, setShowPopUp] = useState(false);

      useEffect(()=>{
          axios.post('http://localhost:5000/recommend', {type: 'aa', data:res.res}).then(response => {
          console.log(response.data[0].trip);
          //setData(response.data.data);
        }).catch(error => {
          console.log(error);
        })

      }, [res]);

       const getTrip = () => {
           console.log(selectedTrip);
           const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}}
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