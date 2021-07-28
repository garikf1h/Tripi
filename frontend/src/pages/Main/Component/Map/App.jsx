import React, { useState, useEffect } from "react";
import {Grid} from "semantic-ui-react";
import render from 'react-dom';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "./data/skateboard-parks.json";
import {useMapFacade} from "./facade";
import mapStyles from "./mapStyles";
import axios from "axios";

const NewMap = (props) => {
  const {selectedPark, setSelectedPark} = useMapFacade();
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/map').then(response => {
      setData(response.data.data[1])
    }).catch(error => {
      console.log(error)
    })

  }, [])

    return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 32.085300, lng: 34.781769 }}
      defaultOptions={{ styles: mapStyles }}
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
            console.log(trip.name);
          }}
        />
      ))}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(NewMap));

export default class TheMap extends React.Component {
  render()
  {
    return (
          <div textAlign='center' style={{ height: '200vh', width: '200vh' }} verticalAlign='middle'>
              <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVA4A4vIJ2dOrqQtcx69tMdKBDZWE0l4I`}
                  loadingElement={<div style={{height: `100%`}}/>}
                  containerElement={<div style={{height: `100%`}}/>}
                  mapElement={<div style={{height: `50%`}}/>}
              />
          </div>
    );
  }
}
