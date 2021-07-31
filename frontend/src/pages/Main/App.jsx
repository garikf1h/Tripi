import React, {useState} from 'react';
import {Icon, Menu, Segment, Sidebar, Grid} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import FormTrip from "./Component/PreferenceBar/App";
import '../../styles/Tripi_page_2.css'
import {SidebarComponent} from "./Component/Sidebar/App";

export const MainPage = () => {
    const [searchParams,updateSearchParams] = useState({free_text:"",region:'הכל', access:"לא" , with_water:'לא', length:'הכל'});
    const [showSidebar, updateShowSideBar] = useState(false);
    const [tripExtraData, setTripExtraData] = useState({});

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
                <div className="body">
            <div className="search_area" >
                <FormTrip callBack={updateSearchParams}/>
            </div>
            <article>
                <div key="map">
                    <TheMap props={{res: searchParams, openSidebar: updateShowSideBar, setTripExtraData}}/>
                </div>
            </article>
        </div>
           </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

}