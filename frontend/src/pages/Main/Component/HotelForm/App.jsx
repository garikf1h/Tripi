import React, { useState, useEffect } from "react";
import {Form, Segment, TextArea, Dropdown, Divider,Checkbox, Button } from "semantic-ui-react";
import '../../../../styles/button.css';
import { cloneDeep } from 'lodash';
import {options } from './const';


let hotel = {foodType: '', priceRange: 1};

const handleDropDownSelect = (event, data) => {
   hotel.price = data.value;
};


export const HotelForm = (props) => {
    const sendData = async () => {
        const clone = cloneDeep(hotel);
        await props.callBack(clone);
    }
    const onSubmit = () => {
        sendData();
    }

    return (
          <div style={{textAlign:"right"}}>
            <Form>
                <Form.Field>
                  <input type = "text" placeholder='מלון ספציפי'  onChange={(e,data) => hotel.foodType = e.target.value}/>
                </Form.Field>
                <Dropdown
                    placeholder='רמת מחיר'
                    fluid
                    onChange={handleDropDownSelect}
                    selection
                    options={options}
                />
                <Button primary circular={true} onClick={()=> props.sidebarShow(true)}> הצג רשימה</Button>
                <Button primary circular={true} onClick={onSubmit}>חפש</Button>
          </Form>
          </div>
    );
  };

export default {HotelForm};

