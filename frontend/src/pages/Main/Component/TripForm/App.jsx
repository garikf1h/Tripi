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
          <div style={{textAlign:"right"}}>
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
                  <Checkbox label='מסלול נגיש'  style={{textAlign:"left"}} onChange={(e,data) => res.access = data.checked ?'כן' : 'לא'}/>
                </Form.Field>
                <Dropdown
                    placeholder='בחר אורך מסלול'
                    fluid
                    onChange={handleDropDownSelectTrip}
                    selection
                    options={tripLevel}
                />
                <Button primary circular={true} onClick={()=> props.sidebarShow(true)}> הצג רשימה</Button>
                <Button primary circular={true} onClick={onSubmit}>חפש</Button>
          </Form>
          </div>
    );
  };

export default {TripForm};

