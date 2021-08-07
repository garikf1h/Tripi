import React, {useState} from 'react';
import {Segment} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import FormTrip from "./Component/PreferenceBar/App"
import {NewMap} from "./Component/Results/App";




export default class RecommendPage extends React.Component {
        searchParams = {rest:'',region:'הכל', access:"לא" , with_water:'לא', length:'הכל', child:'לא', level:'1', price:'1'};
        updateSearchParams = (inputParams) => {
        this.setState( {},() => {
            this.searchParams = inputParams;
            console.log(inputParams);
            //console.log(this.searchParams);
        })
    };


  render()
  {
    return (

        <div className="body">

            <div >
                <FormTrip callBack={this.updateSearchParams}/>
            </div>

            {/*<article>*/}
            {/*    /!*<div key="map">*!/*/}
            {/*    /!*<TheMap searchParams={this.searchParams}/>*!/*/}
            {/*</div>*/}

            {/*</article>*/}
            <div >
                <NewMap searchParams={this.searchParams}/>
            </div>
        </div>

    );
  }
}
