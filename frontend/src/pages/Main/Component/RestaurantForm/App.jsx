import React, { useState, useEffect } from "react";
import {
  Form,
  Segment,
  TextArea,
  Dropdown,
  Divider,
  Checkbox,
  Button,
} from "semantic-ui-react";
import "../../../../styles/button.css";
import { cloneDeep } from "lodash";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
let res = { foodType: "", price: 1, distance: 10 };

const handlePriceSliderChange = (event, data) => {
  res.price = data;
};

const handleSliderDistanceChange = (event, data) => {
  res.distance = data;
};

export const RestaurantForm = (props) => {
  const PrettoSlider = withStyles({
    root: {
      color: "#3240ff",
      height: 8,
      width: 80,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },

    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const sendData = async () => {
    const clone = cloneDeep(res);
    await props.callBack(clone);
    res = { foodType: "", price: 1, distance: 10 };
  };
  const onSubmit = () => {
    sendData();
  };

  return (
    <div style={{ textAlign: "right", position: "relative" }}>
      <label>חפש מסעדה</label>
      <Form>
        <Form.Field>
          <div className="txt">
            <input
              type="text"
              placeholder="הכנס סגנון מסעדה"
              onChange={(e, data) => (res.foodType = e.target.value)}
            />
          </div>
        </Form.Field>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="price">:רמת מחיר</label>
          <div className="priceslid">
            <PrettoSlider
              min={1}
              max={5}
              onChange={handlePriceSliderChange}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={1}
            />
          </div>
          <label className="price">מרחק מהמסלול (בק"מ):</label>
          <div className="priceslid">
            <PrettoSlider
              min={1}
              max={15}
              onChange={handleSliderDistanceChange}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={10}
            />
          </div>
        </div>
        <Button
          primary
          circular={true}
          className="all_button"
          onClick={() => {
            props.setIndex(1);
            props.sidebarShow(true);
          }}
        >
          {" "}
          הצג רשימה
        </Button>
        <Button
          primary
          circular={true}
          className="all_button"
          onClick={onSubmit}
        >
          חפש
        </Button>
      </Form>
    </div>
  );
};

export default { RestaurantForm };
