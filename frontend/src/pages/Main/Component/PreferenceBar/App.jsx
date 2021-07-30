import React, { useState, useEffect } from "react";
import {Form, Segment, TextArea, Dropdown, Divider,Checkbox, Button } from "semantic-ui-react";
import axios from "axios";

const options = [{Key:'north',value:'צפון', text:"צפון"},
            {Key:'center',value:'תל אביב והמרכז', text:"תל אביב והמרכז"},
            {Key:'jerusalem',value:'ירושלים והסביבה', text:"ירושלים והסביבה"},
            {Key:'shomron',value:'יהודה והשומרון', text:"יהודה והשומרון"},
            {Key:'deadSea',value:'ים המלח', text:"ים המלח"},
            {Key:'south',value:'דרום', text:"דרום"},
            {Key:'eilat',value:'אילת', text:"אילת"},
            {Key:'all',value:'הכל', text:"הכל"}];

//TODO: update correct fields
const tripLevel = [{Key:'0',value:'0', text:"חצי יום"},
            {Key:'1',value:'1', text:"יום"},
            {Key:'2',value:'2', text:"יותר מיום"},
            {Key:'3',value:'הכל', text:"הכל"}];

let res = {free_text:"",region:'הכל', access:"לא" , with_water:'לא', length:'הכל'}

const handleDropDownSelect = (event, data) => {
   res.region = data.value;
};


const handleDropDownSelectTrip = (event, data) => {
  res.length = data.value;
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

export default class FormTrip extends React.Component {
    sendData = () => {
        console.log(res);
        this.props.callBack(res)
    }
    onSubmit = () => {
        this.sendData();
    }

  render()
  {
    return (
          <div>
            <Form>
                <Form.Field>
                  <input type = "text" placeholder='הכנס טקסט חופשי'  onChange={(e,data) => res.free_text = e.target.value}/>
                </Form.Field>
                <Dropdown
                    placeholder='בחר אזור בארץ'
                    fluid
                    onChange={handleDropDownSelect}
                    selection
                    options={options}
                />
                <Form.Field>
                    {/*// TODO: need to active this field*/}
                  <Checkbox label='מסלול מים' onChange={(e,data) => res.with_water = data.checked ?'כן' : 'לא'}/>
                </Form.Field>
                 <Form.Field>
                    {/*// TODO: need to active this field*/}
                  <Checkbox label='מסלול נגיש' onChange={(e,data) => res.access = data.checked ?'כן' : 'לא'}/>
                </Form.Field>
                <Dropdown
                    placeholder='בחר אורך מסלול'
                    fluid
                    onChange={handleDropDownSelectTrip}
                    selection
                    options={tripLevel}
                />
                <Button type='submit' onClick={this.onSubmit}>Submit</Button>
          </Form>
          </div>
    );
  }
}
