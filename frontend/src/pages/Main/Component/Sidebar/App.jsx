import { Icon, Segment, Accordion } from "semantic-ui-react";
import { Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import "../../styles.css";

export const SidebarComponent = (props) => {
  const { sidebarData, setFullTrip, fullTrip, setShowSideBar } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const updateTrip = (trip) => {
    setFullTrip({
      trip,
      hotel: undefined,
      rest: undefined,
    });
    setShowSideBar(false);
  };

  return (
    <div>
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          מסלולי טיול
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {sidebarData.tripData.map((trip) => (
            <Segment>
              <p>{trip.name}</p>
              <Divider />
              <p>{`${trip.shortDescription}`}</p>
              <Divider />
              <p>{trip.Product_url}</p>
              <Divider />
              <Button onClick={() => updateTrip(trip)}>בחר מסלול והתקדם</Button>
            </Segment>
          ))}
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          מסעדות
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          {sidebarData.restData.map((rest) => (
            <Segment>
              <p>{rest.name}</p>
              <Divider />
              <p>{`${rest.rating}`}</p>
              <Divider />
              <p>{rest.vicinity}</p>
              <Divider />
            </Segment>
          ))}
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          מלונות
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          {sidebarData.hotelData.map((hotel) => (
            <Segment>
              <p>{hotel.name}</p>
              <Divider />
              <p>{`${hotel.rating}`}</p>
              <Divider />
              <p>{hotel.vicinity}</p>
              <Divider />
            </Segment>
          ))}
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default { SidebarComponent };
