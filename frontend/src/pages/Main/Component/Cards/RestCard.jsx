import { Card, Feed, Segment } from "semantic-ui-react";
import React from "react";

export const RestCard = (props) => {
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
              {rest.rating && <>
              {rest.rating} <b>:ציון המסעדה</b>{" "}</>}
            </div>
            <div style={{ textAlign: "right" }}>
              {" "}
              <b>:כתובת</b>
              <p> {rest.vicinity}</p>
            </div>
          </Feed.Content>
        </Feed.Event>
      </Card.Content>
    </Card>
  );
};

export default { RestCard };
