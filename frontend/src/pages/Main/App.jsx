import React, {useState} from 'react';
import {Segment} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import FormTrip from "./Component/PreferenceBar/App"
import '../../styles/Tripi_page_2.css'


export default class MainPage extends React.Component {
    state = {free_text:"",region:'', access:"" , with_water:'', length:''};
    handleChange = (e) => this.setState(this.state);

  render()
  {
    return (
        <div className="body">
            <div>
                <FormTrip props={{props: this.handleChange}}/>
            </div>
            <div key="map" className="article">
                <TheMap props={this.state}/>
            </div>
        </div>
    );
  }
}
