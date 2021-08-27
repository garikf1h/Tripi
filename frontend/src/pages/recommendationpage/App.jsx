import React, {useState} from 'react';
import {MainComp} from "./Component/MainComp/App";
import './styles/recommend_page.css';

export const RecommendPage  = () => {
    return (

        <div className="body">
                <MainComp />
        </div>

    );
};

export default {RecommendPage};