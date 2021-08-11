import React, {useEffect, useState} from 'react';
import {Icon, Menu, Segment, Sidebar, Grid, Image} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import {TripForm} from "./Component/TripForm/App";
import {RestaurantForm} from "./Component/RestaurantForm/App";
import {HotelForm} from "./Component/HotelForm/App";

import '../../styles/Tripi_page_2.css'
import {SidebarComponent} from "./Component/Sidebar/App";
import {Divider} from "@material-ui/core";

export const MainPage = () => {
    const [searchParams,updateSearchParams] = useState({free_text:"",region:'הכל', access:"לא" , with_water:'לא', length:'הכל'});
    const [restParams, setRestParams] = useState();
    const [hotelParams, setHotelParams] = useState(undefined);
    const [showSidebar, setShowSideBar] = useState(false);
    const [fullTrip, setFullTrip] = useState({trip: undefined, rest: undefined, hotel: undefined});
    const [sidebarData, setSidebarData] = useState({tripData:[], hotelData:[], restData:[]});


    return (

        <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="scale down"
        vertical
        onHide={() => setShowSideBar(false)}
        visible={showSidebar}

        direction="left"
        width="very wide"
      >
          <SidebarComponent sidebarData={sidebarData}/>
          </Sidebar>
        <Sidebar.Pusher dimmed={showSidebar}>
                <div className="body" style={{display:"flex", flexDirection:"row"}}>
                    <div key="map">
                    <TheMap props={{searchParams, setSidebarData, restParams, fullTrip, setFullTrip, hotelParams, sidebarData}}/>
                </div>
                    <div className="search_area">
                          <HotelForm key="hotelForm" callBack={setHotelParams} sidebarShow={setShowSideBar}/>
                      </div>
                    <div className="search_area">
                      <RestaurantForm key="hotelForm" callBack={setRestParams} sidebarShow={setShowSideBar}/>
                  </div>
                  <div className="search_area">
                      <TripForm key="trip" callBack={updateSearchParams} sidebarShow={setShowSideBar}/>
                  </div>
            <article>

            </article>
        </div>
           </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

}