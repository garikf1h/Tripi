import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import axios from "axios";

export const useMapFacade = (props) => {
  const {
    searchParams,
    restParams,
    fullTrip,
    setFullTrip,
    hotelParams,
    setSidebarData,
  } = props;
  const [data, setData] = useState([]);
  const [restData, setRestData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [tripToShow, setTripToShow] = useState(undefined);
  const [restToShow, setRestToShow] = useState(undefined);
  const [hotelToShow, setHotelToShow] = useState(undefined);
  const [selectedTrip, setSelectedTrip] = useState(undefined);
  const [showPopUp, setShowPopUp] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 32.062016,
    lng: 34.824769,
  });

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
    if (selectedTrip !== undefined) {
      setMapCenter({
        lat: Number(selectedTrip.Starting_point_y),
        lng: Number(selectedTrip.Starting_point_x),
      });
    } else {
      setMapCenter({
        lat: 32.062016,
        lng: 34.824769,
      });
    }
  }, [selectedTrip]);

  useEffect(() => {
    const clone = cloneDeep(fullTrip);
    clone.trip = selectedTrip;
    setFullTrip(clone);
  }, [selectedTrip]);

  useEffect(() => {
    if (fullTrip.trip === undefined && data.length === 1) {
      setData([]);
    }
  }, [fullTrip.trip]);

  useEffect(() => {
    if (fullTrip.rest === undefined && restData.length === 1) {
      setRestData([]);
    }
  }, [fullTrip.rest]);

  useEffect(() => {
    if (fullTrip.hotel === undefined && hotelData.length === 1) {
      setHotelData([]);
    }
  }, [fullTrip.hotel]);

  useEffect(() => {
    if (fullTrip.hotel) {
      setHotelData([fullTrip.hotel]);
      setSidebarData({
        tripData: [],
        hotelData: [],
        restData: restData.length > 1 ? restData : [],
      });
    }
  }, [fullTrip.hotel]);

  useEffect(() => {
    if (fullTrip.rest) {
      setRestData([fullTrip.rest]);
      setSidebarData({
        tripData: [],
        hotelData: hotelData.length > 1 ? hotelData : [],
        restData: [],
      });
    }
  }, [fullTrip.rest]);

  useEffect(() => {
    if (
      fullTrip.trip &&
      (selectedTrip === undefined || fullTrip.trip.name !== selectedTrip.name)
    ) {
      setSelectedTrip(fullTrip.trip);
      setData([fullTrip.trip]);
      setSidebarData({
        tripData: [],
        hotelData: [],
        restData: [],
      });
    }
  }, [fullTrip.trip]);

  useEffect(() => {
    setHotelData([]);
    setRestData([]);
    setHotelToShow(undefined);
    setRestToShow(undefined);
  }, [data]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/map", { type: "Trip", data: searchParams })
      .then((response) => {
        setData(response.data.data);
        setSidebarData({
          tripData: response.data.data,
          hotelData: [],
          restData: [],
        });
        setSelectedTrip(undefined);
        setFullTrip({
          trip: undefined,
          rest: undefined,
          hotel: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  useEffect(() => {
    console.log(`in rest`);
    console.log(selectedTrip);
    if (selectedTrip !== undefined) {
      const dataTrip = {
        coordinates: {
          y: selectedTrip.Starting_point_y,
          x: selectedTrip.Starting_point_x,
        },
        restInfo: restParams,
      };
      axios
        .post("http://localhost:5000/trip", { type: "rest", data: dataTrip })
        .then((response) => {
          setRestData(response.data);
          setSidebarData({
            tripData: [],
            hotelData,
            restData: response.data,
          });
          addRest(undefined);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [restParams]);

  useEffect(() => {
    if (selectedTrip !== undefined) {
      const dataTrip = {
        coordinates: {
          y: selectedTrip.Starting_point_y,
          x: selectedTrip.Starting_point_x,
        },
        hotelInfo: hotelParams,
      };
      axios
        .post("http://localhost:5000/trip", { type: "hotel", data: dataTrip })
        .then((response) => {
          setHotelData(response.data);
          setSidebarData({
            tripData: [],
            hotelData: response.data,
            restData,
          });
          addHotel(undefined);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [hotelParams]);

  return {
    data,
    setData,
    hotelData,
    setHotelData,
    addRest,
    addHotel,
    mapCenter,
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
    fullTrip
  };
};
