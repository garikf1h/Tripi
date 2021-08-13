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

// const TripForm = (props) => {
//     console.log(props);
//     const {sendData} = props;
//     const onSubmit = () => {
//         props.props();
//     }
//
//     return (
//     <Form>
//         <Form.Field>
//           <label>חיפוש חופשי</label>
//           <input placeholder='free text' />
//         </Form.Field>
//         <Dropdown
//             placeholder='Select Friend'
//             fluid
//             onChange={handleDropDownSelect}
//             selection
//             options={options}
//         />
//         <Form.Field>
//             {/*// TODO: need to active this field*/}
//           <Checkbox label='מסלול מים' onChange={(e,data) => res.with_water = data.checked ?'לא' : 'כן'}/>
//         </Form.Field>
//          <Form.Field>
//             {/*// TODO: need to active this field*/}
//           <Checkbox label='מסלול נגיש' onChange={(e,data) => res.access = data.checked ?'לא' : 'כן'}/>
//         </Form.Field>
//         <Dropdown
//             placeholder='בחר אורך טיול'
//             fluid
//             onChange={handleDropDownSelectTrip}
//             selection
//             options={tripLevel}
//         />
//         <Button type='submit' onClick={onSubmit}>Submit</Button>
//   </Form>
//     )
// }
    let save_results =0;
export const FormTrip = () => {
    const [visible, setVisible]= useState(false);
    const [save_results, setResults]= useState([]);
    // const [visible_card, setVisibleCard]= useState(false);
    // const [current_trip, setCurrentTrip] = useState({});
    const [is_loading_data, setLoadingData] = useState(false);
   // const [data, setData] = useState("");




    const onSubmit = () => {
        //this.sendData();
        setLoadingData(true);
        console.log(res);
        axios.post('http://localhost:5000/recommend', {type: 'aa', data:res}).then(response => {

          console.log(response);
          setResults(response.data);
          setResults((response)=>{

              setLoadingData(false);
              return response;
          });
          setVisible(true);
          //setData(response.data.data);
        }).catch(error => {
           console.log("ERROR");
          console.log(error);
        })

    }
    const onClickTrip = (trip) => {
       console.log(save_results);
    }
    
    
    return (
          <div >
              <img src={logo} style={{position:"absolute", right:"570px", width:"300px", height:"100px", top:"10px"}}/>

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
                </Form>

              {is_loading_data &&(
                                <Loader type="Circles" color="#00BFFF" style = {{position:"absolute", top:"370px", left:"650px"}}height={80} width={80}/>)
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

        <Card style={{position: "absolute", textAlign: "right", top: "5px", left: a * 300 + 150}} key ={full_trip.name}>

            <Card.Content>
                <Card.Header textAlign={"center"}>:המלצה</Card.Header>
            </Card.Content>
            <Card.Content>{full_trip.score} :ציון הטיול </Card.Content>
            <Card.Content style={{textAlign: "right"}}>
                <Feed>
                    <Feed.Event>

                        <Feed.Content>
                            <Feed.Date style={{textAlign: "right"}} content=' :מסלול טיול'/>
                            <Feed.Summary style={{textAlign: "right"}}>
                                {full_trip.trip.shortDescription}

                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Date style={{textAlign: "right"}} content=':מסעדה'/>
                            <Feed.Summary>
                                {full_trip.rest.name}.
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>
                    {
                        Object.keys(full_trip.accom).length !== 0 && (<Feed.Event>
                                <Feed.Content>
                                    <Feed.Date style={{textAlign: "right"}} content=':לינה'/>
                                    <Feed.Summary>
                                        {full_trip.accom.name}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        )
                    }
                </Feed>
            </Card.Content>
        </Card>
    ))}
}




 </div>

    );

}

export default {FormTrip};

