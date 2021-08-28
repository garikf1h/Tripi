import { Card, Feed } from "semantic-ui-react";
import React from "react";

export const TripCard = (props) => {
  console.log(props);
  const { trip } = props.props;
  return (
    <Card
      style={{
        position: "absolute",
        textAlign: "right",
        top: "250px",
      }}
      key={trip.name}
    >
      <Card.Content style={{ textAlign: "right" }}>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Feed.Date
                style={{ textAlign: "right" }}
                content=" :מסלול טיול"
              />
              <div style={{ textAlign: "right" }}>
                <b> {trip.name}</b>{" "}
              </div>

              <div style={{ textAlign: "right" }}>
                <b> תיאור כללי </b>: {trip.shortDescription}
              </div>
              <div style={{ textAlign: "right" }}>
                {" "}
                <a href={trip.Product_url}> לצפייה במסלול </a>
              </div>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default { TripCard };
