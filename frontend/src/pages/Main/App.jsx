import React, {useState} from 'react';
import {Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import TheMap from "./Component/Map/App";
import FormTrip from "./Component/PreferenceBar/App";
import '../../styles/Tripi_page_2.css'

const NewMainPage = () => {

}
export default class MainPage extends React.Component {

        searchParams = {free_text:"",region:'הכל', access:"לא" , with_water:'לא', length:'הכל'};
        updateSearchParams = (inputParams) => {
        this.setState( {},() => {
            this.searchParams = inputParams;
            console.log(inputParams);
            console.log(this.searchParams);
        })
    };

    showSidebar = true;
    updateShowSideBar = (newState) => {
        this.setState( {},() => {
            console.log('update show bar');
            this.showSidebar = newState;
            console.log(this.showSidebar);
        })
    };

    render()
  {
    return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="overlay"
        vertical
        onHide={() => this.updateShowSideBar(false)}
        visible={this.showSidebar}
        direction="left"
        width="wide"
      >
          <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
        <Sidebar.Pusher dimmed={this.showSidebar}>
          <div className="body">
            <div className="search_area" >
                <FormTrip callBack={this.updateSearchParams}/>
            </div>
            <article>
                <div key="map">
                    <TheMap props={{res: this.searchParams, openSidebar: this.updateShowSideBar}}/>
                </div>
            </article>
        </div>
           </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
  }
}
