import React, {useState} from 'react';
import {MainComp} from "./Component/MainComp/App";
import './styles/home.css';

export const HomePage  = () => {
    return (

        <div className="body">
               <MainComp />
        </div>

    );
};

export default {HomePage};