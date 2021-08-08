import React, { useState, useEffect } from "react";
import { cloneDeep } from 'lodash';
import axios from "axios";

export const useMapFacade = (searchParams, openSidebar, setTripExtraData, restParams, fullTrip, setFullTrip) => {
    const [data, setData] = useState([]);
    const [restData, setRestData] = useState([]);
    const [hotelData, setHotelData] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(undefined);
    const [showPopUp, setShowPopUp] = useState(false);


    const addRest = (rest) => {
        console.log(rest.name);
        const clone = cloneDeep(fullTrip);
        clone.rest = rest;
        setFullTrip(clone);
    };

    const addHotel = (hotel) => {
        const clone = cloneDeep(fullTrip);
        clone.hotel = hotel;
        setFullTrip(clone);
    };

      useEffect(()=>{
          console.log('should fetch new trips');
          axios.post('http://localhost:5000/map', {type: 'aa', data:searchParams}).then(response => {
          setData(response.data.data);
          setRestData([]);
        }).catch(error => {
          console.log(error);
        })

      }, [searchParams]);

       useEffect (() => {
           console.log('try rest');
           if (selectedTrip !== undefined) {
               console.log('in use eefect');
               const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}}
                  axios.post('http://localhost:5000/trip', {type: 'aa', data: dataTrip}).then(response => {
                  // setSelectedTrip(undefined);
                      console.log(response.data);
                  setRestData(response.data);
                }).catch((error) => {
            console.log(error);
           })
           }
       }, [restParams] );

       useEffect (() => {
           if (selectedTrip !== undefined) {
               const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}}
                  axios.post('http://localhost:5000/trip', {type: 'aa', data: dataTrip}).then(response => {
                  setSelectedTrip(undefined);
                  //setHotelData(response.data);
                }).catch((error) => {
            console.log(error);
           })
           }
       }, [] );

      return {
          data,
          setData,
          hotelData,
          setHotelData,
          addRest,
          addHotel,
          restData,
          setRestData,
          selectedTrip,
          setSelectedTrip,
          setShowPopUp,
          showPopUp,
      }
}