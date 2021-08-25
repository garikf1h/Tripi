import React, { useState, useEffect } from "react";
import {Form, Segment, TextArea, Dropdown, Divider,Checkbox, Button } from "semantic-ui-react";
import '../../../../styles/button.css';
import { cloneDeep } from 'lodash';
import {options } from './const';
import axios from "axios";


let res = {foodType: '', priceRange: 1};

const handleDropDownSelect = (event, data) => {
   res.price = data.value;
};


export const RestaurantForm = (props) => {
    const sendData = async () => {
        const clone = cloneDeep(res);
        await props.callBack(clone);
    }
    const onSubmit = () => {
        sendData();
    }

    return (
          <div style={{textAlign:"right", }}>
            <Form>
                <Form.Field>
                  <input type = "text" placeholder='הכנס סגנון מסעדה'  onChange={(e,data) => res.foodType = e.target.value}/>
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

export default {RestaurantForm};

