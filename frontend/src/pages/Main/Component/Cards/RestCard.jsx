import { Card, Feed, Segment } from "semantic-ui-react";
import React from "react";

export const RestCard = (props) => {
  console.log(props);
  const { rest } = props.props;
  return (
    <Card
      style={{
        position: "relative",
        textAlign: "right",
        top: "100px",
      }}
      key={rest.name}
    >
      <Card.Content style={{ textAlign: "right" }}>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date style={{ textAlign: "right" }} content=":מסעדה" />
            <div style={{ textAlign: "right" }}>
              {" "}
              <b>{rest.name}</b>{" "}
            </div>
            <div style={{ textAlign: "right" }}>
              {" "}
              {rest.rating} <b>:ציון המסעדה</b>{" "}
            </div>
            <div style={{ textAlign: "right" }}>
              {" "}
              {rest.vicinity} <b>כתובת</b>{" "}
            </div>
          </Feed.Content>
        </Feed.Event>
      </Card.Content>
    </Card>
  );
};

export default { RestCard };