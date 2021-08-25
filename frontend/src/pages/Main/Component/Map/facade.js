import React, { useState, useEffect } from "react";
import { cloneDeep } from 'lodash';
import axios from "axios";
import {Divider} from "@material-ui/core";
import {Button} from "semantic-ui-react";
import {Marker} from "react-google-maps";
import Res from "./Markers/Res.svg";

export const useMapFacade = (props) => {
    const {searchParams, openSidebar, setTripExtraData, restParams, fullTrip, setFullTrip, hotelParams, setSidebarData, sidebarData} = props
    const [data, setData] = useState([]);
    const [restData, setRestData] = useState([]);
    const [hotelData, setHotelData] = useState([]);
    const [tripToShow, setTripToShow] = useState(undefined);
    const [restToShow, setRestToShow] = useState(undefined);
    const [hotelToShow, setHotelToShow] = useState(undefined);
    const [selectedTrip, setSelectedTrip] = useState(undefined);
    const [showPopUp, setShowPopUp] = useState(false);


    const addRest = (rest) => {
        const clone = cloneDeep(fullTrip);
        clone.rest = rest;
        setFullTrip(clone);
    };

    const addHotel = (hotel) => {
        const clone = cloneDeep(fullTrip);
        clone.hotel = hotel;
        setFullTrip(clone);
    };

    useEffect(() => {
        const newSideData = {
            hotelData:[],
            restData:[],
            tripData:data,
        };
        setSidebarData(newSideData);
    }, [data]);

    useEffect(() => {
        if (restData !== []) {
            const newSideData = {
            hotelData:[],
            restData,
            tripData:[],
        };
        setSidebarData(newSideData);
        }

    }, [restData]);

    useEffect(() => {
        if(hotelData !== []) {
            const newSideData = {
            hotelData:hotelData,
            restData:[],
            tripData:[],
        };
        setSidebarData(newSideData);
        }
    }, [hotelData]);

    useEffect(() => {
        setHotelData([]);
        setRestData([]);
        setHotelToShow(undefined);
        setRestToShow(undefined);
    }, [data])

      useEffect(()=>{
          axios.post('http://localhost:5000/map', {type: 'Trip', data:searchParams}).then(response => {
          setData(response.data.data);
        }).catch(error => {
            
          console.log(error);
        })

      }, [searchParams]);

       useEffect (() => {
           if (selectedTrip !== undefined) {
               const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}, restInfo: restParams}
                  axios.post('http://localhost:5000/trip', {type: 'rest', data: dataTrip}).then(response => {
                  // setSelectedTrip(undefined);
                  setRestData(response.data);
                }).catch((error) => {
            console.log(error);
           })
           }
       }, [restParams] );

       useEffect (() => {
           if (selectedTrip !== undefined) {
               const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}, hotelInfo: hotelParams}
                  axios.post('http://localhost:5000/trip', {type: 'hotel', data: dataTrip}).then(response => {
                  //setSelectedTrip(undefined);
                      setSidebarData(response.data);
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