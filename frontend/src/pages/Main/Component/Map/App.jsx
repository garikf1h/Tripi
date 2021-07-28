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
import {useMapFacade} from "./facade";
import mapStyles from "./mapStyles";
import axios from "axios";

// let res = {free_text:"",region:'', access:"" , with_water:'', length:''}


const NewMap = (res) => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    console.log(res);
    if (Object(res.res) === undefined) {
        console.log('aaa');
    } else {
      axios.post('http://localhost:5000/map', {type: 'aa', data:res}).then(response => {
      console.log(response);
      setData(response.data.data);
    }).catch(error => {
      console.log(error);
    })
    }

  }, [res])

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
            console.log(trip.name);
          }}
        />
      ))}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(NewMap));

export default class TheMap extends React.Component {

  res = this.props.searchParams

  render()
  {
    return (
          <div textAlign='center' style={{ height: '150vh', width: '50vh' ,paddingTop:"20px"}} verticalAlign='middle'>
              <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVA4A4vIJ2dOrqQtcx69tMdKBDZWE0l4I`}
                  loadingElement={<div style={{height: `100%`}}/>}
                  containerElement={<div style={{height: `100%`}}/>}
                  mapElement={<div style={{height: `50%`}}/>}
                  res={this.res}
              />
          </div>
    );
  }
}