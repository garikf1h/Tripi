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
import {Divider} from "@material-ui/core";
import {forEach} from "react-bootstrap/ElementChildren";
import Trip from './Markers/Trip.svg';
import Res from './Markers/Res.svg';
import Hotel from './Markers/Hotel.svg';



export const NewMap = (props) => {
    return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: Number(props.places['trip'].Starting_point_y) , lng: Number(props.places['trip'].Starting_point_x) }}>

        <Marker
          key={props.places['trip'].name}
          position={{
            lat: Number(props.places['trip'].Starting_point_y),
            lng: Number(props.places['trip'].Starting_point_x)
          }}
          style
          name={props.places['trip'].name}
          onClick={() => {
            console.log(`clicked ${props.places['trip'].name}`)
          }}
          icon={{
              url: Trip,
              scaledSize: new window.google.maps.Size(45, 45)
      }}
        />
        {  Object.keys(props.places['rest']).length !== 0 &&
        (
            <Marker
                key={props.places['rest'].name}
                position={{
                    lat: Number(props.places.rest.geometry.location.lat),
                    lng: Number(props.places.rest.geometry.location.lng)
                }}
                style
                name={props.places['rest'].name}
                onClick={() => {
                    console.log(`clicked ${props.places['rest'].name}`)
                }}
                icon={{
              url: Res,
              scaledSize: new window.google.maps.Size(45, 45)
      }}
            />)
        }


        {  Object.keys(props.places['accom']).length !== 0 &&
        (
            <Marker
                key={props.places['accom'].name}
                position={{
                    lat: Number(props.places.accom.geometry.location.lat),
                    lng: Number(props.places.accom.geometry.location.lng)
                }}
                style
                name={props.places['accom'].name}
                onClick={() => {
                    console.log(`clicked ${props.places['accom'].name}`)
                }}
                icon={{
              url: Hotel,
              scaledSize: new window.google.maps.Size(45, 45)
      }}
            />)
        }



      {/*  {selectedTrip !== undefined && (*/}
      {/*  <InfoWindow*/}
      {/*      position={{*/}
      {/*      lat: Number(selectedTrip.Starting_point_y),*/}
      {/*      lng: Number(selectedTrip.Starting_point_x)*/}
      {/*    }}*/}
      {/*      onCloseClick={() => setSelectedTrip(undefined)}*/}
      {/*  >*/}
      {/*      <h1>{data[0].name}</h1>*/}

      {/*      <div>*/}

      {/*          <p>{selectedTrip.name}</p>*/}
      {/*          <Divider />*/}
      {/*          <p>{`${selectedTrip.shortDescription}`}</p>*/}
      {/*          <Divider />*/}
      {/*          <p>{selectedTrip.Product_url}</p>*/}
      {/*          <Divider />*/}
      {/*          <Divider />*/}
      {/*      </div>*/}
      {/*  </InfoWindow>*/}
      {/*)}*/}
    </GoogleMap>
  );
}


export const TheMap = (props) => {
    const MapWrapped = withScriptjs(withGoogleMap(NewMap));
    return (
        <div style={{position: "relative", height: '60vh', width: '80vh', top: "0px", right: "-220px"}}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVA4A4vIJ2dOrqQtcx69tMdKBDZWE0l4I`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`, width:'100%'}}/>}
                places={props.places}
            />
        </div>
    );
}

export default TheMap;