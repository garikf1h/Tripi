import React, { useState} from "react";
import {Button} from 'semantic-ui-react';
import MainMenu from "../../../MainMenuBar/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/home.css'
import logo1 from "./logo1.jpg"
import build from "./build.png"
import custom from "./customized.png"
import team from "./team.png"


export const MainComp = () => {
    return (
        <div>
            <MainMenu active_page= "Home" />
                <div className="container">
                    <div class="row" className="home-section">
                        <img src={logo1}/>
                    </div>
                    <div class="row">
                        <div className="home-section">
                            <h1 id="description-paragraph">
                                Tripi is your go-to tool in order to plan a perfect trip in the beautiful country of Israel!<br/>
                                choose an attraction that will let you explore the history and nature of israel<br/>
                                find a near by restaurant according to your preferences<br/>
                                & if you want to do an over-night trip, find a cool lodging place in the area.<br/>
                                and the best part?
                            </h1>
                            <h2> We can do it all for you!</h2>
                        </div>
                    <div class="row">
                       <div className="col">
                            <div className="text-center">
                                <a href="\recommend">
                                     <div className="img-hover-zoom img-hover-zoom--colorize">
                                        <img className="shadow" src={custom}/>
                                     </div>
                                </a>
                            </div>
                       </div>
                        <div className="col">
                            <div className="text-center">
                                <a href="\build">
                                     <div className="img-hover-zoom img-hover-zoom--colorize">
                                        <img className="shadow" src={build}/>
                                     </div>
                                </a>
                            </div>
                        </div>
                        <div className="col">
                            <div className="text-center">
                                <a href="\about-us">
                                     <div className="img-hover-zoom img-hover-zoom--colorize">
                                        <img className="shadow" src={team}/>
                                     </div>
                                </a>
                            </div>
                       </div>
                    </div>
                </div>
             </div>
         </div>)
}



export default MainComp;