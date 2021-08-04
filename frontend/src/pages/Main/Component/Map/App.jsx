import React, { useState, useEffect } from "react";
import {Button, Checkbox} from "semantic-ui-react";
import render from 'react-dom';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import {useMapFacade} from "./facade";
import {Divider} from "@material-ui/core";
import Trip from './Markers/Trip.svg';
import hotel from "./Markers/hotel.svg";
import Res from "./Markers/Res.svg";


// let res = {free_text:"",region:'', access:"" , with_water:'', length:''}


export const NewMap = (props) => {
    const {searchParams, openSidebar, setTripExtraData, restParams, fullTrip, setFullTrip} = props.props.props;
    const {data,setData, selectedTrip, setSelectedTrip, restData, addRest, addHotel, hotelData, setHotelData} = useMapFacade(searchParams, openSidebar, setTripExtraData, restParams, fullTrip, setFullTrip);

    return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 32.085300, lng: 34.781769 }}
    >
      {data.map(trip => (
        <Marker
            key={trip.name}
          position={{
            lat: Number(trip.Starting_point_y),
            lng: Number(trip.Starting_point_x)
          }}
          style
          name={trip.name}
          onClick={() => {
            setSelectedTrip(trip);
          }}
          icon={{
              url: Trip,
              scaledSize: new window.google.maps.Size(45, 45)
      }}
        />
      ))}
        {restData.map(rest => (
        <Marker
          position={{
            lat: rest.geometry.location.lat,
            lng: rest.geometry.location.lng
          }}
          style
          name={rest.name}
          onClick={() => {
            addRest(rest);
          }}
          icon={{
              url: Res,
              scaledSize: new window.google.maps.Size(45, 45)
      }}
        />
      ))}
          {hotelData.map(hotel => (
        <Marker
          position={{
            lat: Number(hotel.Starting_point_y),
            lng: Number(hotel.Starting_point_x)
          }}
          style
          name={hotel.name}
          onClick={() => {
            addHotel(hotel);
          }}
          icon={{
              url: hotel,
              scaledSize: new window.google.maps.Size(45, 45)
      }}
        />
      ))}
        {selectedTrip !== undefined && (
        <InfoWindow
            position={{
            lat: Number(selectedTrip.Starting_point_y),
            lng: Number(selectedTrip.Starting_point_x)
          }}
            onCloseClick={() => setSelectedTrip(undefined)}
        >
            <div>
                <p>{selectedTrip.name}</p>
                <Divider />
                <p>{`${selectedTrip.shortDescription}`}</p>
                <Divider />
                <p>{selectedTrip.Product_url}</p>
                <Divider />
                <Button primary onClick={() => {
                    setData([selectedTrip]);
                    //setSelectedTrip(undefined);
                }}>בחר את המסלול והתקדם</Button>
                <Divider />
            </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(NewMap));

export default class TheMap extends React.Component {

  render()
  {
    return (
          <div style={{ position:"relative", height: '120vh', width: '70vh' , top:"100px", right:"-10px"}} >
              <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVA4A4vIJ2dOrqQtcx69tMdKBDZWE0l4I`}
                  loadingElement={<div style={{height: `100%`}}/>}
                  containerElement={<div style={{height: `100%`}}/>}
                  mapElement={<div style={{height: `50%`}}/>}
                  props = {this.props}
              />
          </div>
    );
  }
}