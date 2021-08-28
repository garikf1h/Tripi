import { Card, Feed } from "semantic-ui-react";
import React from "react";

export const HotelCard = (props) => {
  console.log(props);
  const { hotel } = props.props;
  return (
    <Card
      style={{
        position: "absolute",
        textAlign: "right",
        top: "250px",
      }}
      key={hotel.name}
    >
      <Card.Content style={{ textAlign: "right" }}>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date style={{ textAlign: "right" }} content=":לינה" />
            <div style={{ textAlign: "right" }}>
              {" "}
              <b>{hotel.name} </b>{" "}
            </div>
            <div style={{ textAlign: "right" }}>
              {" "}
              {hotel.rating} <b>:ציון המלון</b>{" "}
            </div>
            <div style={{ textAlign: "right" }}>
              {" "}
              {hotel.vicinity} <b>כתובת</b>{" "}
            </div>
          </Feed.Content>
        </Feed.Event>
      </Card.Content>
    </Card>
  );
};

export default { HotelCard };
