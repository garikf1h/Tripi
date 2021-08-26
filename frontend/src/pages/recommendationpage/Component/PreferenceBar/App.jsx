import React, { useState, useEffect} from "react";
import {Form, Segment, TextArea, Dropdown, Divider,Checkbox, Button, Header, Card, Feed } from "semantic-ui-react";
import '../../../../styles/button.css'
import {Switch, FormControlLabel} from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';
import axios from "axios";
import logo from '../../../../styles/logo.PNG';
import Loader from 'react-loader-spinner';
import TheMap from "../../../Main/Component/Map/App";
import PopUp from '../mapPopUp/App'

const PrettoSlider = withStyles({
  root: {
    color: '#3240ff',
    height: 8,
      width:80,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
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
const options = [{Key:'north',value:'צפון', text:"צפון"},
            {Key:'center',value:'תל אביב והמרכז', text:"תל אביב והמרכז"},
            {Key:'jerusalem',value:'ירושלים והסביבה', text:"ירושלים והסביבה"},
            {Key:'shomron',value:'יהודה והשומרון', text:"יהודה והשומרון"},
            {Key:'deadSea',value:'ים המלח', text:"ים המלח"},
            {Key:'south',value:'דרום', text:"דרום"},
            {Key:'eilat',value:'אילת', text:"אילת"},
            {Key:'all',value:'הכל', text:"הכל"}];

//TODO: update correct fields
const tripLevel = [
            {Key:'1',value:'1', text:"עד יום"},
            {Key:'2',value:'2', text:"יותר מיום(כולל לינה)"},
];

let res = {rest:'',region:'הכל', access:"לא" , with_water:'לא', length:'הכל', child:'לא', level:'1', price:'1'}

const handleDropDownSelect = (event, data) => {
   res.region = data.value;
};

const handleChangeSwitchChild=(event, data)=>{
       if(data) {
        res.child='כן'
    }
    else {
        res.child='לא'
    }

};
const handleDropDownSelectTrip = (event, data) => {
  res.length = data.value;
};
const handleChangeSwitchWater = (event, data) => {
    if(data) {
        res.with_water='כן'
    }
    else {
        res.with_water='לא'
    }
};
const handleChangeSwitchAccess = (event, data) => {
     if(data) {
        res.access='כן'
    }
    else {
        res.access='לא'
    }
};
const handleSliderLevelChange= (event, data) => {
  res.level= data;
};

const handleSliderPriceChange= (event, data) => {
  res.price= data;
};

export const FormTrip = () => {
    const [visible, setVisible]= useState(false);
    const [save_results, setResults]= useState([]);
    const [is_loading_data, setLoadingData] = useState(false);
    const [show_pop_up, setShowPopUp] = useState(false);
    const [current_trip, setCurrentTrip] = useState({});
    const [no_results, setNoResults] = useState(false);


    const map_colors = (score) =>
    {
        if (score >= 90)
            return "lightblue";
        if (score >= 65)
            return "Yellow"
        return "Red";

    }
    const onSubmit = () => {
        //this.sendData();
        setLoadingData(true);
        console.log(res);
        axios.post('http://localhost:5000/recommend', {type: 'aa', data:res}).then(response => {

          console.log(response);
          if (response.data.length == 0)
              setNoResults(true);
          let timer = setTimeout(()=>{setNoResults(false);},2000);
          setResults(response.data);
          setResults((response)=>{
              return response;
          });

          setLoadingData(false);

          setVisible(true);
        }).catch(error => {
           console.log("ERROR");
          console.log(error);
        })

    }
    const onClickTrip = (trip) => {
       console.log(save_results);
    }
    const togglePopUp = (trip) =>{
        setShowPopUp(!show_pop_up);
        setCurrentTrip(save_results[trip]);

    }
    const hideResults = () =>{
        setResults([]);
    }
    const calcTopOfBack = () =>{
        if(res.length == '2')
        {
            return 600;
        }
        return 500;
    }
    return (
          <div style={{position:"relative"}}>

             <div>
                 <img src={logo} className="logo"/></div>
              {save_results.length == 0 &&(
                  <Form className="search_area">
                <Header as='h3' className="form_header">:העדפות מסלול</Header>
                      <div className="area">
                <Dropdown
                    placeholder='בחר אזור בארץ'
                    fluid
                    onChange={handleDropDownSelect}
                    selection

                    options={options}
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
                  <FormControlLabel className="water"
                      control={
                   <Switch
                // checked={state.checkedB}
                  onChange={handleChangeSwitchWater}
                  name="checkedWater"
                  color="primary"
                  style ={{position:"absolute"}}
                    />
                }
                 label="מסלול מים"
                />
                </Form.Field>
                 <Form.Field>
                   <FormControlLabel className="access"
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
                    placeholder='אורך טיול כולל'
                    fluid
                    onChange={handleDropDownSelectTrip}
                    selection
                    options={tripLevel}

                />
           </div>

                <label className="level_label">:רמת פעילות</label>
                <div className="level">
                 <PrettoSlider
                     min={1} max = {4}
                     onChange={handleSliderLevelChange}
                     valueLabelDisplay="auto"
                     aria-label="pretto slider"
                     defaultValue={1}

                 />
                      </div>
                 <Header as='h3' className="title_rest">:העדפות ארוחה</Header>
                      <div className="input_rest" >
                          <input type = "text"   placeholder='סוג מסעדה'  onChange={(e,data) => res.rest = e.target.value}/>
                      </div>
                 <label className="price_range_title">:טווח מחירים</label>
                <div className="price_slider">
                    <PrettoSlider
                              className="price_slider"
                              min={1} max = {5}
                              valueLabelDisplay="auto"
                              onChange={handleSliderPriceChange}
                              aria-label="pretto slider"
                              defaultValue={1}
                />
                </div>
                 {is_loading_data &&(
                                <Loader type="Circles" color="#00BFFF" className="loader" height={80} width={80}/>)
              }
                <a className="BUTTON_SZM" type='submit' onClick={onSubmit} >חפש</a>
                               {no_results &&
                               (<div className="no_results">אין תוצאות לחיפוש</div>)
                                }
                </Form>


              )}




{save_results.map( (full_trip, a) => (

        <div className="card_trips"> <Card className="card_trips" key ={full_trip.trip.name}>
            <Card.Content>
                <Card.Header>:המלצה מספר {a + 1}
                <div key = {a} className="circle" style={{backgroundColor:map_colors(full_trip.score)}}>
                  <div className="text_of_circle">{full_trip.score.toFixed(1)}</div>
              </div></Card.Header>
            </Card.Content>

            <Card.Content>
                <Feed>
                    <Feed.Event>

                        <Feed.Content style={{textAlign: "right"}} >
                            <Feed.Date content=' :מסלול טיול'/>
                            <div ><b > {full_trip.trip.name}</b> </div>

                             <div ><b > תיאור כללי   </b>:  {full_trip.trip.shortDescription}</div>
                            {/* <Feed.Summary style={{textAlign: "right"}}>*/}
                            {/*    {full_trip.trip.Product_url} קישור לצפייה במסלול :*/}
                            {/*</Feed.Summary>*/}
                         <div> <a href={full_trip.trip.Product_url} >  לצפייה במסלול   </a></div>

                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Content style={{textAlign: "right"}}>
                            <Feed.Date  content=':מסעדה'/>
                            <div> <b>{full_trip.rest.name}</b> </div>
                            <div> {full_trip.rest.rating} <b>:ציון המסעדה</b>  </div>
                        </Feed.Content>
                    </Feed.Event>
                    {
                        Object.keys(full_trip.accom).length !== 0 && (<Feed.Event key={{a}}>
                                <Feed.Content >
                                    <Feed.Date content=':לינה'/>
                                    <div> <b>{full_trip.accom.name} </b>    </div>
                                    <div> {full_trip.accom.rating}  <b>:ציון המלון</b> </div>
                                </Feed.Content>
                            </Feed.Event>
                        )
                    }
                </Feed>
                <div className="map_button" ><button onClick={
                ()=>{
                    togglePopUp(a);
                    console.log(a);
                }
            } key={a}>הראה במפה</button></div>
            </Card.Content>





        </Card>

        </div>


    ))}

              { save_results.length != 0 &&
              <div className="back_button"> <Button onClick={hideResults}>חזור חזרה</Button></div>
              }

{ show_pop_up &&(
                <PopUp handleClose = {togglePopUp} places = {current_trip}>

                </PopUp>
            )
            }

 </div>

    );

}

export default {FormTrip};