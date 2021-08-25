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
        return 530;
    }
    return (
          <div >
              <img src={logo} style={{position:"absolute", right:"620px", width:"300px", height:"100px", top:"10px"}}/>
              {save_results.length == 0 &&(
                           <Form className="search_area">
                <Header as='h3' style={{textAlign:"center", position:"absolute", top:"10px", left:"210px"}}>:העדפות מסלול</Header>
                <Dropdown
                    placeholder='בחר אזור בארץ'
                    fluid
                    onChange={handleDropDownSelect}
                    selection
                    style ={{position:"absolute", top:"40px",  width:"200px", left:"70px", textAlign:"right"}}
                    options={options}
                />

                <Form.Field>
                    {/*// TODO: need to active this field*/}
               <FormControlLabel  style ={{position:"absolute", top:"90px", left:"100px" }}
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
                <Form.Field>
                  <FormControlLabel style ={{position:"absolute", top:"130px", left:"100px" }}
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
                   <FormControlLabel style ={{position:"absolute", top:"170px", left:"100px" }}
                      control={
                   <Switch
                // checked={state.checkedB}
                  onChange={handleChangeSwitchAccess}
                  name="checkedB"
                  color="primary"

                    />
                }
                 label=":נגישות"
                />
                 </Form.Field>
                <Dropdown
                    placeholder='אורך טיול כולל'
                    fluid
                    onChange={handleDropDownSelectTrip}
                    selection
                    options={tripLevel}
                    style ={{position:"absolute", top:"220px",  width:"200px", left:"70px", textAlign:"right"}}
                />

                <label style={{position:"absolute", textAlign:"right", left:"250px", top:"280px"   }}>:רמת פעילות</label>
                 <PrettoSlider
                     style={{left:"-80px", top:"-25px", position: "relative"}}
                     min={1} max = {4}
                     onChange={handleSliderLevelChange}
                     valueLabelDisplay="auto"
                     aria-label="pretto slider"
                     defaultValue={1}
                     style ={{position:"absolute", top:"273px", left:"70px", width:"150px"  }}
                 />
                 <Header as='h3' style={{position: "absolute", top:"300px", left:"210px", textAlign:"right"}}>:העדפות ארוחה</Header>
                 <input type = "text"  style={{textAlign:"right", position:"absolute", top:"360px",  width:"200px", left:"70px"}} placeholder='סוג מסעדה'  onChange={(e,data) => res.rest = e.target.value}/>
                 <label style={{position:"absolute", top:"420px", left:"250px"}}>:טווח מחירים</label>
                <PrettoSlider
                              style={{left:"70px", top:"415px", position: "absolute", width:"150px" }}
                              min={1} max = {5}
                              valueLabelDisplay="auto"
                              onChange={handleSliderPriceChange}
                              aria-label="pretto slider"
                              defaultValue={1}
                />
                <a className="BUTTON_SZM" type='submit' onClick={onSubmit} style ={{position:"absolute", right:"110px", top:"470px" }}>חפש</a>
                               {no_results &&
                               (<div style ={{position:"absolute", top:"515px", left:"120px", color:"RED"}}>אין תוצאות לחיפוש</div>)
                                }
                </Form>


              )}


              {is_loading_data &&(
                                <Loader type="Circles" color="#00BFFF" style = {{position:"absolute", top:"370px", left:"730px"}}height={80} width={80}/>)
              }

    {/*              {visible && (*/}
    {/*    <div>*/}
    {/*        {*/}
    {/*            save_results.length >= 1 &&(*/}
    {/*                <Button  style ={{position:"absolute", top:"0px" }} onClick={()=>onClickTrip(0)}>טיול 1</Button>*/}
    {/*            )*/}

    {/*        }*/}
    {/*        {*/}
    {/*            save_results.length >= 2 && (*/}
    {/*                <Button style={{position:"absolute"}}*/}
    {/*                        onClick={() => onClickTrip(1)}>טיול 2</Button>*/}
    {/*            )*/}
    {/*        }*/}
    {/*    {*/}
    {/*            save_results.length >= 3 &&(*/}
    {/*                 <Button  style ={{position:"absolute"}}onClick={()=>onClickTrip(2)}>טיול 3</Button>*/}
    {/*            )*/}

    {/*        }*/}
    {/*    </div>*/}
    {/*)}*/}



{save_results.map( (full_trip, a) => (

        <Card style={{position: "absolute", textAlign: "right", top: "250px", right: a * 400 + 210}} key ={full_trip.trip.name}>
            <Card.Content style={{position:"relative"}}>
                <Card.Header textAlign={"center"}>:המלצה מספר {a + 1}
                <div key = {a} className="circle" style={{backgroundColor:map_colors(full_trip.score)}}>
                  <div className="text_of_circle">{full_trip.score.toFixed(1)}</div>
              </div></Card.Header>
            </Card.Content>

            <Card.Content style={{textAlign: "right"}}>
                <Feed>
                    <Feed.Event>

                        <Feed.Content>
                            <Feed.Date style={{textAlign: "right"}} content=' :מסלול טיול'/>
                            <div style={{textAlign:"right"}}><b > {full_trip.trip.name}</b> </div>

                             <div style={{textAlign:"right"}}><b > תיאור כללי   </b>:  {full_trip.trip.shortDescription}</div>
                            {/* <Feed.Summary style={{textAlign: "right"}}>*/}
                            {/*    {full_trip.trip.Product_url} קישור לצפייה במסלול :*/}
                            {/*</Feed.Summary>*/}
                         <div style ={{textAlign:"right"}}> <a href={full_trip.trip.Product_url} >  לצפייה במסלול   </a></div>

                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Date style={{textAlign: "right"}} content=':מסעדה'/>
                            <div style ={{textAlign:"right"}}> <b>{full_trip.rest.name}</b> </div>
                            <div style ={{textAlign:"right"}}> {full_trip.rest.rating} <b>:ציון המסעדה</b>  </div>
                        </Feed.Content>
                    </Feed.Event>
                    {
                        Object.keys(full_trip.accom).length !== 0 && (<Feed.Event key={{a}}>
                                <Feed.Content>
                                    <Feed.Date style={{textAlign: "right"}} content=':לינה'/>
                                    <div style ={{textAlign:"right"}}> <b>{full_trip.accom.name} </b>    </div>
                                    <div style ={{textAlign:"right"}}> {full_trip.accom.rating}  <b>:ציון המלון</b> </div>
                                </Feed.Content>
                            </Feed.Event>
                        )
                    }
                </Feed>
            </Card.Content>
            <button style={{position:"absolute", top:"200px", left:"10px"}} onClick={
                ()=>{
                    togglePopUp(a);
                    console.log(a);
                }
            } key={a}>הראה במפה</button>




        </Card>


    ))}
}
              { save_results.length != 0 &&
                  <Button style={{position:"absolute", top:calcTopOfBack(), left:"720px"}} onClick={hideResults}>חזור חזרה</Button>
              }
{ show_pop_up &&(
                <PopUp style = {{position:"absolute"}} handleClose = {togglePopUp} places = {current_trip}>

                </PopUp>
            )
            }

 </div>

    );

}

export default {FormTrip};