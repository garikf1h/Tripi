import React, { useState} from "react";
import {Button} from 'semantic-ui-react';
import MainMenu from "../../../MainMenuBar/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/about_us.css'


export const MainComp = () => {
    return (

        <div style={{position: "relative"}}>
            <MainMenu active_page= "AboutUs" />
            <div className="about-section">
                <h1 id="title-page">About Us</h1>
                <p>We are last-year students from The Academic College of Tel Aviv-Yaffo who love to develop web apps</p>
            </div>
             <br/>

            <div id="team">
                 <div>
                 <h2 id="team-title">
                    Meet Our Team
                 </h2>
                     <br/>
             </div>
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">

                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="text-center">


                                 <div className="img-hover-zoom img-hover-zoom--colorize">
                                <img className="shadow" src="https://media-exp1.licdn.com/dms/image/C4D03AQGchld0Rg8ziQ/profile-displayphoto-shrink_800_800/0/1606982884967?e=1635379200&v=beta&t=FyD_Z1I5reAnvHhNhNY0Qw3A1bBf1gkQ9vZav_mYiKs"
                                     alt="Another Image zoom-on-hover effect">
                                </img>
                            </div>
                             <div className="card-body">
                            <div className="clearfix mb-3">


                            </div>

                            <div className="my-2 text-center">

                                <h1>Yarden Goor</h1>

                            </div>
                            <div className="mb-3">

                                <h2 className="text-uppercase text-center role">Backend Developer</h2>

                            </div>
                            <div>
                                <div>
                                    <ul className="list-inline text-center" >
                                        <li className="list-inline-item"><i className="fab fa-github"></i></li>
                                        <li className="list-inline-item"><i className="fab fa-linkedin-in"></i></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        </div>

                    </div>

                </div>
                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="text-center">


                                 <div className="img-hover-zoom img-hover-zoom--colorize">
                                <img className="shadow" src="https://media-exp1.licdn.com/dms/image/C5603AQFwUyka4pX2GQ/profile-displayphoto-shrink_800_800/0/1607854153076?e=1635379200&v=beta&t=-KIV7xVqth03csYOxP9jHd4SeZdw40tdrxs1YQilZMc"
                                     alt="Another Image zoom-on-hover effect">
                                </img>
                            </div>
                             <div className="card-body">
                            <div className="clearfix mb-3">


                            </div>

                            <div className="my-2 text-center">

                                <h1>Ido Uziely</h1>

                            </div>
                            <div className="mb-3">

                                <h2 className="text-uppercase text-center role">Fullstack Developer</h2>

                            </div>
                            <div>
                                <div>
                                    <ul className="list-inline text-center" >
                                        <li className="list-inline-item"><i className="fab fa-github"></i></li>
                                        <li className="list-inline-item"><i className="fab fa-linkedin-in"></i></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        </div>

                    </div>

                </div>
                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="text-center">


                                 <div className="img-hover-zoom img-hover-zoom--colorize">
                                <img className="shadow" src="https://media-exp1.licdn.com/dms/image/C4E03AQEfGHCmqS4T0A/profile-displayphoto-shrink_800_800/0/1599822150382?e=1635379200&v=beta&t=b4Zmks_pC_UpxLt2fcPGPEIbeWdI-IxW2eo84xxuU_g"
                                     alt="Another Image zoom-on-hover effect">
                                </img>
                            </div>
                             <div className="card-body">
                            <div className="clearfix mb-3">


                            </div>

                            <div className="my-2 text-center">

                                <h1>Michel Mitskevsky Weizmann</h1>

                            </div>
                            <div className="mb-3">

                                <h2 className="text-uppercase text-center role">Frontend Developer</h2>

                            </div>
                            <div>
                                <div>
                                    <ul className="list-inline text-center" >
                                        <li className="list-inline-item"><i className="fab fa-github"></i></li>
                                        <li className="list-inline-item"><i className="fab fa-linkedin-in"></i></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        </div>

                    </div>

                </div>
                <div className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="text-center">


                                 <div className="img-hover-zoom img-hover-zoom--colorize">
                                <img className="shadow" src="https://media-exp1.licdn.com/dms/image/C4D03AQFMTaSViXafaQ/profile-displayphoto-shrink_800_800/0/1582035541163?e=1635379200&v=beta&t=GfMDxPpjOucAJ5tLhqmc4wABhqVlIYQWUjDXmge1Iu8"
                                     alt="Another Image zoom-on-hover effect">
                                </img>
                            </div>
                             <div className="card-body">
                            <div className="clearfix mb-3">


                            </div>

                            <div className="my-2 text-center">

                                <h1>Gari Kogan</h1>

                            </div>
                            <div className="mb-3">

                                <h2 className="text-uppercase text-center role">Fullstack Developer</h2>

                            </div>
                            <div>
                                <div>
                                    <ul className="list-inline text-center" >
                                        <li className="list-inline-item"><i className="fab fa-github"></i></li>
                                        <li className="list-inline-item"><i className="fab fa-linkedin-in"></i></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        </div>

                    </div>

                </div>
            </div>
            </div>


        </div>)
}



export default MainComp;