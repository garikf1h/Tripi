import React, { useState, useEffect } from "react";
import "../../styles/recommend_page.css";
import { Card, Feed } from "semantic-ui-react";
import PopUp from "../MapPopUp/App";
const RecommResults = ({ save_results }) => {
  const [show_pop_up, setShowPopUp] = useState(false);
  const [current_trip, setCurrentTrip] = useState({});

  const togglePopUp = (trip) => {
    setShowPopUp(!show_pop_up);
    setCurrentTrip(save_results[trip]);
  };
  const map_colors = (score) => {
    if (score >= 90) return "lightblue";
    if (score >= 65) return "Yellow";
    return "Red";
  };

  return (
    <div>
      {save_results.map((full_trip, a) => (
        <div className="card_trips">
          {" "}
          <Card className="card_trips" key={full_trip.trip.name}>
            <Card.Content>
              <Card.Header>
                :המלצה מספר {a + 1}
                <div
                  key={a}
                  className="circle"
                  style={{ backgroundColor: map_colors(full_trip.score) }}
                >
                  <div className="text_of_circle">
                    {full_trip.score.toFixed(1)}
                  </div>
                </div>
              </Card.Header>
            </Card.Content>

            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Content style={{ textAlign: "right" }}>
                    <Feed.Date content=" :מסלול טיול" />
                    <div>
                      <b> {full_trip.trip.name}</b>{" "}
                    </div>

                    <div>
                      <b> תיאור כללי </b>: {full_trip.trip.shortDescription}
                    </div>
                    <div>
                      {" "}
                      <a href={full_trip.trip.Product_url}> לצפייה במסלול </a>
                    </div>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content style={{ textAlign: "right" }}>
                    <Feed.Date content=":מסעדה" />
                    <div>
                      {" "}
                      <b>{full_trip.rest.name}</b>{" "}
                    </div>
                    <div>
                      {" "}
                      {full_trip.rest.rating} <b>:ציון המסעדה</b>{" "}
                    </div>
                  </Feed.Content>
                </Feed.Event>
                {Object.keys(full_trip.accom).length !== 0 && (
                  <Feed.Event key={{ a }}>
                    <Feed.Content style={{ textAlign: "right" }}>
                      <Feed.Date content=":לינה" />
                      <div>
                        {" "}
                        <b>{full_trip.accom.name} </b>{" "}
                      </div>
                      <div>
                        {" "}
                        {full_trip.accom.rating} <b>:ציון המלון</b>{" "}
                      </div>
                    </Feed.Content>
                  </Feed.Event>
                )}
              </Feed>
              <div className="map_button">
                <button
                  onClick={() => {
                    togglePopUp(a);
                  }}
                  key={a}
                >
                  הראה במפה
                </button>
              </div>
            </Card.Content>
          </Card>
          {show_pop_up && (
            <PopUp
              style={{ position: "absolute" }}
              handleClose={togglePopUp}
              places={current_trip}
            ></PopUp>
          )}
        </div>
      ))}{" "}
    </div>
  );
};

export default RecommResults;
