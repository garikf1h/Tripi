import React, {useState} from 'react';
import {Segment} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import FormTrip, {A} from "./Component/PreferenceBar/App"
import '../../styles/Tripi_page_2.css'




export default class MainPage extends React.Component {

    searchParams = {free_text:"",region:'הכל', access:"לא" , with_water:'לא', length:'הכל'};
    updateSearchParams = (inputParams) => {
        this.setState( {},() => {
            this.searchParams = inputParams;
            console.log(inputParams);
            console.log(this.searchParams);
        })
    };


  render()
  {
    return (

        <div className="body">

            <div className="search_area" >
                <FormTrip callBack={this.updateSearchParams}/>
            </div>

            <article>
                <div key="map">
                <TheMap searchParams={this.searchParams}/>
            </div>
            </article>
        </div>

    );
  }
}
