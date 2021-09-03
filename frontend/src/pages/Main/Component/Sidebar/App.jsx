import { Icon, Segment, Accordion } from "semantic-ui-react";
import { Button, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../../styles.css";

export const SidebarComponent = (props) => {
  const { sidebarData, setFullTrip, setShowSideBar, index, fullTrip } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(index);
  }, [index]);

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

  const updateRest = (rest) => {
    setFullTrip({
      trip: fullTrip.trip,
      hotel: fullTrip.hotel,
      rest,
    });
    setShowSideBar(false);
  };

  const updateHotel = (hotel) => {
    setFullTrip({
      trip: fullTrip.trip,
      hotel,
      rest: fullTrip.rest,
    });
    setShowSideBar(false);
  };

  return (
    <div>
      <Accordion>
        <Accordion.Title
          style={{ textAlign: "right", fontSize: "1.5em" }}
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
              <p style={{ textAlign: "right" }}>{trip.name}</p>
              <Divider />
              <p style={{ textAlign: "right" }}>{`${trip.shortDescription}`}</p>
              <Divider />
              <p style={{ textAlign: "right" }}>{trip.Product_url}</p>
              <Divider />

              <Button
                style={{
                  background: "#2185d0",
                  color: "#fff",
                  position: "inherit",
                  borderRadius: "12px",
                }}
                circular={true}
                className="all_button"
                onClick={() => updateTrip(trip)}
              >
                בחר מסלול והתקדם
              </Button>
            </Segment>
          ))}
        </Accordion.Content>

        <Accordion.Title
          style={{ textAlign: "right", fontSize: "1.5em" }}
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
              <p style={{ textAlign: "right" }}>{rest.name}</p>
              <Divider />
              <p style={{ textAlign: "right" }}>{`${rest.rating}`}</p>
              <Divider />
              <p style={{ textAlign: "right" }}>{rest.vicinity}</p>
              <Divider />
              <Button
                style={{
                  background: "#2185d0",
                  color: "#fff",
                  position: "inherit",
                  borderRadius: "12px",
                }}
                circular={true}
                className="all_button"
                onClick={() => updateRest(rest)}
              >
                בחר מסעדה
              </Button>
            </Segment>
          ))}
        </Accordion.Content>

        <Accordion.Title
          style={{ textAlign: "right", fontSize: "1.5em" }}
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
              <p style={{ textAlign: "right" }}>{hotel.name}</p>
              <Divider />
              <p style={{ textAlign: "right" }}>{`${hotel.rating}`}</p>
              <Divider />
              <p style={{ textAlign: "right" }}>{hotel.vicinity}</p>
              <Divider />
              <Button
                style={{
                  background: "#2185d0",
                  color: "#fff",
                  position: "inherit",
                  borderRadius: "12px",
                }}
                circular={true}
                className="all_button"
                onClick={() => updateHotel(hotel)}
              >
                בחר מלון
              </Button>
            </Segment>
          ))}
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default { SidebarComponent };
