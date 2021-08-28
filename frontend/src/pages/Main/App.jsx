import React, { useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import { TripForm } from "./Component/TripForm/App";
import { RestaurantForm } from "./Component/RestaurantForm/App";
import { HotelForm } from "./Component/HotelForm/App";
import { TripCard } from "../recommendationpage/Component/Cards/TripCards";
import { RestCard } from "../recommendationpage/Component/Cards/RestCard";
import { HotelCard } from "../recommendationpage/Component/Cards/HotelCards";
import MainMenu from "../MainMenuBar/App";
import './styles.css'

export const BuildTrip = () => {
  const [searchParams, updateSearchParams] = useState({
    free_text: "",
    region: "הכל",
    access: "לא",
    with_water: "לא",
    length: "הכל",
  });
  const [restParams, setRestParams] = useState();
  const [hotelParams, setHotelParams] = useState(undefined);
  const [showSidebar, setShowSideBar] = useState(false);
  const [fullTrip, setFullTrip] = useState({
    trip: undefined,
    rest: undefined,
    hotel: undefined,
  });
  const [sidebarData, setSidebarData] = useState({
    tripData: [],
    hotelData: [],
    restData: [],
  });


  return (
    <>  <MainMenu active_page={"First"}/>
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
{/*           <SidebarComponent sidebarData={sidebarData}/> */}
      </Sidebar>
      <Sidebar.Pusher dimmed={showSidebar}>
        <div
          className="body2"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div key="map" className="map">
            <TheMap
              props={{
                searchParams,
                setSidebarData,
                restParams,
                fullTrip,
                setFullTrip,
                hotelParams,
                sidebarData,
              }}
            />
          </div>
          {fullTrip.trip && <div className="new_search_form">
            {!fullTrip.hotel && <HotelForm
              key="hotelForm"
              callBack={setHotelParams}
              sidebarShow={setShowSideBar}
            />}
            {fullTrip.hotel && <HotelCard props={fullTrip} />}
          </div>}
          {fullTrip.trip && <div className="new_search_form">
            {!fullTrip.rest && <RestaurantForm
              key="hotelForm"
              callBack={setRestParams}
              sidebarShow={setShowSideBar}
            />}
            {fullTrip.rest && <RestCard props={fullTrip} />}
          </div>}
          <div className="new_search_form">
            {!fullTrip.trip && <TripForm
              key="trip"
              callBack={updateSearchParams}
              sidebarShow={setShowSideBar}
            />}
            {fullTrip.trip && <TripCard props={fullTrip} />}
          </div>
          <article>
</article>
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable></>
  );
};
