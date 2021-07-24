import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Segment, Header ,Button} from "semantic-ui-react";


const data = {
    'resultStatus': 'SUCCESS',
    'message':
        {
            1: {'name': 'Test'},
            2: {'name': '2'}
        }
};
function App() {
  const [getMessage, setGetMessage] = useState({
    data: {
      message: {}
    }})
  const [values, setValues] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

   useEffect (() => {
     const newVal = [];
     Object.values(getMessage.data.message).map((val) => {
       newVal.push(val.name);
     });

    setValues(newVal);
   },[getMessage]);

  const sendData = () => {
      axios.post('http://localhost:5000/flask/hello', data).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React + Flask Tutorial</p>
        <Segment>
        {(getMessage.status === 200 ?? false) && (
            <Segment key="App">
              {values.map((name) => {
                return <Button color="yellow" onClick={()=> sendData('clicked')}>{name}</Button>;
              })
              }
              <Button onClick={()=>console.log('clicked')}>LOADING</Button>
            </Segment>
        )
        }
      </Segment>
      </header>
    </div>
  );
}

export default App;