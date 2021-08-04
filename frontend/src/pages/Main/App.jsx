import React, {useEffect, useState} from 'react';
import {Icon, Menu, Segment, Sidebar, Grid, Image} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import {TripForm} from "./Component/PreferenceBar/App";
import {RestaurantForm} from "./Component/RestaurantForm/App";
import '../../styles/Tripi_page_2.css'
import {SidebarComponent} from "./Component/Sidebar/App";
import {Divider} from "@material-ui/core";

export const MainPage = () => {
    const [searchParams,updateSearchParams] = useState({free_text:"",region:'הכל', access:"לא" , with_water:'לא', length:'הכל'});
    const [restParams, setRestParams] = useState();
    const [hotelParams, setHotelParams] = useState(undefined);
    const [showSidebar, updateShowSideBar] = useState(false);
    const [fullTrip, setFullTrip] = useState({trip: undefined, rest: undefined, hotel: undefined});
    const [tripExtraData, setTripExtraData] = useState([]);

    useEffect(() => {
        ;
    }, [searchParams]);

    return (

        <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="overlay"
        vertical
        onHide={() => updateShowSideBar(false)}
        visible={showSidebar}
        direction="left"
        width="very wide"
      >
          <SidebarComponent props={{tripExtraData}}/>
          </Sidebar>
        <Sidebar.Pusher dimmed={showSidebar}>
                <div className="body" style={{display:"flex", flexDirection:"row"}}>
                    <div key="map">
                    <TheMap props={{searchParams, openSidebar: updateShowSideBar, setTripExtraData, restParams, fullTrip, setFullTrip}}/>
                </div>
                    <div className="search_area">
                          <TripForm key="hotelForm" callBack={setHotelParams}/>
                      </div>
                    <div className="search_area">
                      <RestaurantForm callBack={setRestParams}/>
                  </div>
                  <div className="search_area">
                      <TripForm key="trip" callBack={updateSearchParams}/>
                  </div>
            <article>

            </article>
        </div>
           </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

}