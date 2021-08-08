import React, { useState, useEffect } from "react";
import {Form, Segment, TextArea, Dropdown, Divider,Checkbox, Button, Header } from "semantic-ui-react";
import '../../../../styles/button.css'
import {Switch, FormControlLabel} from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Button1 from 'react-bootstrap/Button'



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

export const FormTrip = () => {
    const [visible, setVisible]= useState(false);

    const onSubmit = () => {
        //this.sendData();
        console.log(res);
        axios.post('http://localhost:5000/recommend', {type: 'aa', data:res}).then(response => {
          console.log(response);
          setVisible(true);
          //setData(response.data.data);
        }).catch(error => {
           console.log("ERROR");
          console.log(error);
        })
    }
    
    
    return (

          <div style={{position:"relative", textAlign:"right"}} className="search_area" >
           <Header as='h3' style={{textAlign:"center"}}>:העדפות מסלול טיול</Header>
            <Form>
                <Dropdown
                    placeholder='בחר אזור בארץ'
                    fluid
                    onChange={handleDropDownSelect}
                    selection
                    options={options}
                />

                <Form.Field>
                    {/*// TODO: need to active this field*/}
               <FormControlLabel
                      control={
                   <Switch
                // checked={state.checkedB}
                  onChange={handleChangeSwitchChild}
                  name="checkedChild"
                  color="primary"
                    />
                }
                 label="עם ילדים"
                />
                </Form.Field>
                <Form.Field>
                    {/*// TODO: need to active this field*/}
                  <FormControlLabel
                      control={
                   <Switch
                // checked={state.checkedB}
                  onChange={handleChangeSwitchWater}
                  name="checkedWater"
                  color="primary"
                    />
                }
                 label="מסלול מים"
                />
                </Form.Field>
                 <Form.Field>
                   <FormControlLabel
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
                />

                <label style={{display: "block", marginTop: "10px"}}>:רמת פעילות</label>
                 <PrettoSlider
                     style={{left:"-80px", top:"-25px", position: "relative"}}
                     min={1} max = {4}
                     onChange={handleSliderLevelChange}
                     valueLabelDisplay="auto"
                     aria-label="pretto slider"
                     defaultValue={1} />
                 <Header as='h3' style={{position: "relative", top:"-28px", textAlign:"center"}}>:העדפות ארוחה</Header>
                 <input type = "text"  style={{textAlign:"right"}} placeholder='סוג מסעדה'  onChange={(e,data) => res.rest = e.target.value}/>
                 <label style={{display: "block", marginTop: "10px"}}>טווח מחירים(הכי זול 1, הכי יקר 5)</label>
                <PrettoSlider
                              style={{left:"0px", top:"-25px", position: "relative"}}
                              min={1} max = {5}
                              valueLabelDisplay="auto"
                              onChange={handleSliderPriceChange}
                              aria-label="pretto slider"
                              defaultValue={1} />
                <a className="BUTTON_SZM" type='submit' onClick={onSubmit}>חפש</a>
          </Form>
    {visible && (
        <div>
        <Button  style ={{position:"relative", left:"-200px", top:"-400px"}} >טיול 1</Button>
    <Button  style ={{position:"relative", left:"-280px", top:"-350px"}}>טיול 2</Button>
    <Button  style ={{position:"relative", left:"-360px", top:"-300px"}}>טיול 3</Button>
        </div>
    )}
          </div>



    );
}

export default {FormTrip};

