import React from 'react';
import TheMap from "./Component/Map/App";
export default class MainPage extends React.Component {
  render()
  {
    return (
        <div style={{width: "100vw", height: "100vh"}}>
          <TheMap/>
        </div>
    );
  }
}
