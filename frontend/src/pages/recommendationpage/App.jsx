import React, {useState} from 'react';
import {Segment} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import FormTrip from "./Component/PreferenceBar/App"
import '../../styles/Tripi_page_2.css'




export default class RecommendPage extends React.Component {

        searchParams = {rest:'',region:'הכל', access:"לא" , with_water:'לא', length:'הכל', child:'לא', level:'1', price:'1'};
        updateSearchParams = (inputParams) => {
        this.setState( {},() => {
            this.searchParams = inputParams;
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
