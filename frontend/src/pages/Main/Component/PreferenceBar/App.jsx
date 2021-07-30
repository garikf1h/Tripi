import React, { useState, useEffect } from "react";
import {Form, Segment, TextArea, Dropdown, Divider,Checkbox, Button } from "semantic-ui-react";
import '../../../../styles/button.css'
import axios from "axios";

const options = [{Key:'north',value:'צפון', text:"צפון"},
            {Key:'south',value:'דרום', text:"דרום"},
            {Key:'shomron',value:'שומרון', text:"שומרון"},
            {Key:'center',value:'מרכז', text:"מרכז"},
            {Key:'all',value:'הכל', text:"הכל"}];

//TODO: update correct fields
const tripLevel = [{Key:'0',value:'0', text:"חצי יום"},
            {Key:'1',value:'1', text:"יום מלא"},
            {Key:'2',value:'2', text:"מעל יום"}];

let res = {free_text:"",region:'', access:"" , with_water:'', length:''}

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
//           <Checkbox label='מסלול מים' onChange={(e,data) => res.with_water = data.checked ?'כן' : 'לא'}/>
//         </Form.Field>
//          <Form.Field>
//             {/*// TODO: need to active this field*/}
//           <Checkbox label='מסלול נגיש' onChange={(e,data) => res.access = data.checked ?'כן' : 'לא'}/>
//         </Form.Field>
//         <Dropdown
//             placeholder='Select Friend'
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
          <div style={{textAlign:"right"}}>
            <Form>
                <Form.Field>
                  <label>מצא את המסלול שלך</label>
                  <input  placeholder='מילות חיפוש' style={{textAlign:"right"}} />
                </Form.Field>
                <Dropdown
                    placeholder='איזור בארץ'
                    style={{textAlign:"right"}}
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
                  <Checkbox label='מסלול נגיש'  style={{textAlign:"left"}} onChange={(e,data) => res.access = data.checked ?'כן' : 'לא'}/>
                </Form.Field>
                <Dropdown
                    style={{textAlign:"right"}}
                    placeholder='אורך מסלול'
                    fluid
                    onChange={handleDropDownSelectTrip}
                    selection
                    options={tripLevel}
                />
                <a className="BUTTON_SZM" type='submit' onClick={this.onSubmit}>חפש</a>
          </Form>
          </div>
    );
  }
}