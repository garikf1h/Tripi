import React, { useState, useEffect } from "react";
import "../../styles/recommend_page.css";
import { Dropdown, Header, Form } from "semantic-ui-react";
import { FormControlLabel, Switch } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import axios from "axios";

const RecommForm = ({ save_results, setResults }) => {
  let user_input = {
    rest: "",
    region: "הכל",
    access: "לא",
    with_water: "לא",
    length: "הכל",
    child: "לא",
    level: "1",
    price: "1",
  };
  const [visible, setVisible] = useState(false);
  const [is_loading_data, setLoadingData] = useState(false);
  const [no_results, setNoResults] = useState(false);

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
  const options = [
    { Key: "north", value: "צפון", text: "צפון" },
    { Key: "center", value: "תל אביב והמרכז", text: "תל אביב והמרכז" },
    { Key: "jerusalem", value: "ירושלים והסביבה", text: "ירושלים והסביבה" },
    { Key: "shomron", value: "יהודה והשומרון", text: "יהודה והשומרון" },
    { Key: "deadSea", value: "ים המלח", text: "ים המלח" },
    { Key: "south", value: "דרום", text: "דרום" },
    { Key: "eilat", value: "אילת", text: "אילת" },
    { Key: "all", value: "הכל", text: "הכל" },
  ];

  const tripLevel = [
    { Key: "1", value: "1", text: "עד יום" },
    { Key: "2", value: "2", text: "יותר מיום(כולל לינה)" },
  ];

  const handleDropDownSelect = (event, data) => {
    user_input.region = data.value;
  };

  const handleChangeSwitchChild = (event, data) => {
    if (data) {
      user_input.child = "כן";
    } else {
      user_input.child = "לא";
    }
  };
  const handleDropDownSelectTrip = (event, data) => {
    user_input.length = data.value;
  };
  const handleChangeSwitchWater = (event, data) => {
    if (data) {
      user_input.with_water = "כן";
    } else {
      user_input.with_water = "לא";
    }
  };
  const handleChangeSwitchAccess = (event, data) => {
    if (data) {
      user_input.access = "כן";
    } else {
      user_input.access = "לא";
    }
  };
  const handleSliderLevelChange = (event, data) => {
    user_input.level = data;
  };

  const handleSliderPriceChange = (event, data) => {
    user_input.price = data;
  };
  const onSubmit = () => {
    //this.sendData();
    setLoadingData(true);
    axios
      .post("http://localhost:5000/recommend", { type: "aa", data: user_input })
      .then((response) => {
        if (response.data.length == 0) setNoResults(true);
        let timer = setTimeout(() => {
          setNoResults(false);
        }, 2000);
        setResults(response.data);
        setResults((response) => {
          return response;
        });

        setLoadingData(false);

        setVisible(true);
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error);
      });
  };
  return (
    <Form className="search_area">
      <Header as="h3" className="form_header">
        :העדפות מסלול
      </Header>
      <div className="area">
        <Dropdown
          placeholder="בחר אזור בארץ"
          fluid
          onChange={handleDropDownSelect}
          selection
          options={options}
          style={{ textAlign: "right" }}
        />
      </div>

      <div className="child">
        <Form.Field>
          <FormControlLabel
            control={
              <Switch
                onChange={handleChangeSwitchChild}
                name="checkedChild"
                color="primary"
              />
            }
            label="עם ילדים"
          />
        </Form.Field>
      </div>
      <Form.Field>
        <FormControlLabel
          className="water"
          control={
            <Switch
              // checked={state.checkedB}
              onChange={handleChangeSwitchWater}
              name="checkedWater"
              color="primary"
              style={{ position: "absolute" }}
            />
          }
          label="מסלול מים"
        />
      </Form.Field>
      <Form.Field>
        <FormControlLabel
          className="access"
          control={
            <Switch
              onChange={handleChangeSwitchAccess}
              name="checkedB"
              color="primary"
            />
          }
          label=":נגישות"
        />
      </Form.Field>

      <div className="length">
        <Dropdown
          placeholder="אורך טיול כולל"
          fluid
          onChange={handleDropDownSelectTrip}
          selection
          options={tripLevel}
          style={{ textAlign: "right" }}
        />
      </div>

      <label className="level_label">:רמת פעילות</label>
      <div className="level">
        <PrettoSlider
          min={1}
          max={4}
          onChange={handleSliderLevelChange}
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={1}
        />
      </div>
      <Header as="h3" className="title_rest">
        :העדפות ארוחה
      </Header>
      <div className="input_rest">
        <input
          type="text"
          style={{ textAlign: "right" }}
          placeholder="סוג מסעדה"
          onChange={(e, data) => (user_input.rest = e.target.value)}
        />
      </div>
      <label className="price_range_title">:טווח מחירים</label>
      <div className="price_slider">
        <PrettoSlider
          className="price_slider"
          min={1}
          max={5}
          valueLabelDisplay="auto"
          onChange={handleSliderPriceChange}
          aria-label="pretto slider"
          defaultValue={1}
        />
      </div>
      {is_loading_data && (
        <Loader
          type="Circles"
          color="#00BFFF"
          className="loader"
          height={80}
          width={80}
        />
      )}
      <a className="BUTTON_SZM" type="submit" onClick={onSubmit}>
        חפש
      </a>
      {no_results && <div className="no_results">אין תוצאות לחיפוש</div>}
    </Form>
  );
};

export default RecommForm;
