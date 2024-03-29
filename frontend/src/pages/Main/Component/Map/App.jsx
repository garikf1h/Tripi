import React from "react";
import { Button } from "semantic-ui-react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { useMapFacade } from "./facade";
import { Divider } from "@material-ui/core";
import Trip from "./Markers/Trip.svg";
import Hotel from "./Markers/Hotel.svg";
import Res from "./Markers/Res.svg";

export const NewMap = (props) => {
  const {
    data,
    setData,
    setSelectedTrip,
    restData,
    addRest,
    addHotel,
    hotelData,
    setHotelData,
    setRestData,
    hotelToShow,
    mapCenter,
    restToShow,
    setRestToShow,
    setHotelToShow,
    setTripToShow,
    tripToShow,
    selectedTrip,
    fullTrip
  } = useMapFacade(props.props.props);

  return (
    <GoogleMap defaultZoom={9} defaultCenter={mapCenter} center={mapCenter}>
      {data.map((trip) => (
        <Marker
          key={trip.name}
          position={{
            lat: Number(trip.Starting_point_y),
            lng: Number(trip.Starting_point_x),
          }}
          style
          name={trip.name}
          onClick={() => {
            setTripToShow(trip);
          }}
          icon={{
            url: Trip,
            scaledSize: new window.google.maps.Size(45, 45),
          }}
        />
      ))}
      {restData.map((rest) => (
        <Marker
          position={{
            lat: rest.geometry.location.lat,
            lng: rest.geometry.location.lng,
          }}
          style
          name={rest.name}
          onClick={() => {
            setRestToShow(rest);
          }}
          icon={{
            url: Res,
            scaledSize: new window.google.maps.Size(45, 45),
          }}
        />
      ))}
      {hotelData.map((hotel) => (
        <Marker
          position={{
            lat: hotel.geometry.location.lat,
            lng: hotel.geometry.location.lng,
          }}
          style
          name={hotel.name}
          onClick={() => {
            setHotelToShow(hotel);
          }}
          icon={{
            url: Hotel,
            scaledSize: new window.google.maps.Size(45, 45),
          }}
        />
      ))}
      {tripToShow !== undefined && (
        <InfoWindow
          key={tripToShow.name}
          position={{
            lat: Number(tripToShow.Starting_point_y),
            lng: Number(tripToShow.Starting_point_x),
          }}
          onCloseClick={() => setTripToShow(undefined)}
        >
          <div style={{textAlign:"right"}}>
            <p>{tripToShow.name}</p>
            <Divider />
            <p>{`${tripToShow.shortDescription}`}</p>
            <Divider />
            <p>{tripToShow.Product_url}</p>
            <Divider />
            {!fullTrip.trip && <><Button
              primary
              onClick={() => {
                setSelectedTrip(tripToShow);
                setData([tripToShow]);
                setTripToShow(undefined);
              }}
            >
              בחר את המסלול והתקדם
            </Button>
            <Divider /></>}
          </div>
        </InfoWindow>
      )}
      {restToShow !== undefined && (
        <InfoWindow
          key={restToShow.name}
          position={{
            lat: Number(restToShow.geometry.location.lat),
            lng: Number(restToShow.geometry.location.lan),
          }}
          onCloseClick={() => setRestToShow(undefined)}
        >
          <div style={{textAlign:"right"}}>
            <p>{restToShow.name}</p>
            <Divider />
            {restToShow.rating!==undefined && <><p>{`${restToShow.rating} :ציון`}</p>
            <Divider /></>}
            <p>{restToShow.vicinity}</p>
            <Divider />

              {!fullTrip.rest&& <><Button
              primary
              onClick={() => {
                setRestData([restToShow]);
                addRest(restToShow);
                setRestToShow(undefined);
              }}
            >
              בחר את המסעדה
            </Button>
            <Divider /></>}
          </div>
        </InfoWindow>
      )}
      {hotelToShow !== undefined && (
        <InfoWindow
          key={hotelToShow.name}
          position={{
            lat: Number(hotelToShow.geometry.location.lat),
            lng: Number(hotelToShow.geometry.location.lan),
          }}
          onCloseClick={() => setHotelToShow(undefined)}
        >
          <div style={{textAlign:"right"}}>
            <p>{hotelToShow.name}</p>
            <Divider />
            {hotelToShow.rating!==undefined && <><p>{`${hotelToShow.rating} :ציון `}</p>
            <Divider /></>}
            <p>{hotelToShow.vicinity}</p>
            <Divider />
             {!fullTrip.hotel&&
            <><Button
              primary
              onClick={() => {
                setHotelData([hotelToShow]);
                addHotel(hotelToShow);
                setHotelToShow(undefined);
              }}
            >
              בחר את המסלול והתקדם
            </Button>
            <Divider /></>}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const MapWrapped = withScriptjs(withGoogleMap(NewMap));

export default class TheMap extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "relative",
          height: "120vh",
          width: "70vh",
          top: "100px",
          right: "-10px",
        }}
      >
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVA4A4vIJ2dOrqQtcx69tMdKBDZWE0l4I`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `50%` }} />}
          props={this.props}
        />
      </div>
    );
  }
}
