import React, { useState, useEffect } from "react";
import { cloneDeep } from 'lodash';
import axios from "axios";

export const useMapFacade = (searchParams, openSidebar, setTripExtraData, restParams, fullTrip, setFullTrip, hotelParams) => {
    const [data, setData] = useState([]);
    const [restData, setRestData] = useState([]);
    const [hotelData, setHotelData] = useState([]);
    const [tripToShow, setTripToShow] = useState(undefined);
    const [restToShow, setRestToShow] = useState(undefined);
    const [hotelToShow, setHotelToShow] = useState(undefined);
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
           if (selectedTrip !== undefined) {
               console.log(selectedTrip);
               const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}}
                  axios.post('http://localhost:5000/trip', {type: 'rest', data: dataTrip}).then(response => {
                  // setSelectedTrip(undefined);
                  setRestData(response.data);
                }).catch((error) => {
            console.log(error);
           })
           }
       }, [restParams] );

       useEffect (() => {
           console.log(hotelParams);
           if (selectedTrip !== undefined) {
               console.log('getting hotel');
               const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}}
                  axios.post('http://localhost:5000/trip', {type: 'hotel', data: dataTrip}).then(response => {
                  //setSelectedTrip(undefined);
                      console.log(response.data);
                  setHotelData(response.data);
                }).catch((error) => {
            console.log(error);
           })
           }
       }, [hotelParams] );

      return {
          data,
          setData,
          hotelData,
          setHotelData,
          addRest,
          addHotel,
          tripToShow,
          setTripToShow,
          restToShow,
          setRestToShow,
          hotelToShow,
          setHotelToShow,
          restData,
          setRestData,
          selectedTrip,
          setSelectedTrip,
          setShowPopUp,
          showPopUp,
      }
}