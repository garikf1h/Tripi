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


// let res = {free_text:"",region:'', access:"" , with_water:'', length:''}


export const NewMap = (res) => {
    const {data, selectedTrip, setSelectedTrip, getTrip} = useMapFacade(res);

    return (
    <GoogleMap
      defaultZoom={10}
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
                <Button primary onClick={() => getTrip()}>בחר את המסלול והתקדם</Button>
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
          <div style={{ position:"relative", height: '120vh', width: '100vh' , top:"-90px", right:"-100px"}} >
              <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVA4A4vIJ2dOrqQtcx69tMdKBDZWE0l4I`}
                  loadingElement={<div style={{height: `100%`}}/>}
                  containerElement={<div style={{height: `100%`}}/>}
                  mapElement={<div style={{height: `50%`}}/>}
                  res={this.props.searchParams}
              />
          </div>
    );
  }
}