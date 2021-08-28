import React, { useState} from "react";

import '../../styles/recommend_page.css'
import RecommResults from "../RecommResults/App";
import RecommForm from '../RecommForm/App'
import {Button} from 'semantic-ui-react'
import MainMenu from "../../../MainMenuBar/App";
export const MainComp = () => {
    const [save_results, setResults] = useState([]);
    const hideResults = () => {
        setResults([]);
    }
    return (

        <div style={{position: "relative"}}>
            <MainMenu active_page= "Second" />


            {save_results.length == 0 && (
                <RecommForm save_results={save_results} setResults={setResults}/>
            )
            }


            {
                save_results.length != 0 &&
                (
                    <><RecommResults save_results={save_results}/>
                        <div className="back_button">
                         <Button onClick={hideResults}>חזור חזרה</Button></div>
                    </>
                )
            }
        </div>)
}



export default MainComp;