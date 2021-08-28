import React, { useState, useEffect } from "react";
import {Form, Segment, TextArea, Dropdown, Divider,Checkbox, Button } from "semantic-ui-react";
import '../../../../styles/button.css';
import { cloneDeep } from 'lodash';
import {tripLevel, options } from './const';
import axios from "axios";


let res = {free_text:"",region:'הכל', access:"לא" , with_water:'לא', length:'הכל'}

const handleDropDownSelect = (event, data) => {
   res.region = data.value;
};


const handleDropDownSelectTrip = (event, data) => {
  res.length = data.value;
};


export const TripForm = (props) => {
    const sendData = () => {
        const clone = cloneDeep(res);
        props.callBack(clone)
    }
    const onSubmit = () => {
        sendData();
    }

    return (
          <div style={{textAlign:"right", position:"relative"}}>
          <label>חפש מסלול</label>
            <Form>
                <Form.Field>
                    <div className="txt">
                  <input type = "text" placeholder='הכנס טקסט חופשי'  onChange={(e,data) => res.free_text = e.target.value}/>
                  </div>
                </Form.Field>
                <div className="txt">
                <Dropdown
                    placeholder='בחר אזור בארץ'
                    fluid
                    onChange={handleDropDownSelect}
                    selection
                    options={options}

                /></div>
                <Form.Field>
                    <div className="checkbox">
                  <Checkbox label='מסלול מים' onChange={(e,data) => res.with_water = data.checked ?'כן' : 'לא'}/></div>
                </Form.Field>
                 <Form.Field>
                  <Checkbox label='מסלול נגיש'  style={{textAlign:"left"}} onChange={(e,data) => res.access = data.checked ?'כן' : 'לא'}/>
                </Form.Field>
                <div className="txt">
                <Dropdown
                    placeholder='בחר אורך מסלול'
                    fluid
                    onChange={handleDropDownSelectTrip}
                    selection
                    options={tripLevel}
                /></div>
                <Button primary circular={true} className="all_button" onClick={()=> props.sidebarShow(true)}> הצג רשימה</Button>
                <Button primary circular={true} className="all_button" onClick={onSubmit}>חפש</Button>
          </Form>
          </div>
    );
  };

export default {TripForm};

