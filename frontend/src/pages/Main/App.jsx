import React, {useState} from 'react';
import {Segment} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import FormTrip from "./Component/PreferenceBar/App"
import '../../styles/Tripi_page_2.css'


export default class MainPage extends React.Component {

    searchParams = {free_text:"",region:'', access:"" , with_water:'', length:''};

    updateSearchParams = (inputParams) => {
        console.log('Im in main');
        this.searchParams = inputParams;
        console.log(this.searchParams);
    };

  render()
  {
    return (
        <div className="body">
            <div>
                <FormTrip callBack={this.updateSearchParams}/>
            </div>
            <div key="map" className="article">
                <TheMap searchParams={this.searchParams}/>
            </div>
        </div>
    );
  }
}
