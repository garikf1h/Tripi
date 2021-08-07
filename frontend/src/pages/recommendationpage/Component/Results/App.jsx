import React, { useState, useEffect } from "react";
import '../../../../styles/button.css'
import axios from "axios";



 const useResultsFacade = (res) => {
    const [data, setData] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(undefined);
    const [showPopUp, setShowPopUp] = useState(false);

      useEffect(()=>{
          console.log("Hello");
          console.log(data);
          axios.post('http://localhost:5000/recommend', {type: 'aa', data:res.res}).then(response => {
          console.log(response);
          //setData(response.data.data);
        }).catch(error => {
           console.log("ERROR");
          console.log(error);
        })

      }, [res]);

      //  const getTrip = () => {
      //      console.log(selectedTrip);
      //      const dataTrip = {coordinates: {y : selectedTrip.Starting_point_y, x: selectedTrip.Starting_point_x}}
      //     axios.post('http://localhost:5000/trip', {type: 'aa', data: dataTrip}).then(response => {
      //     console.log(response);
      //     console.log(selectedTrip);
      //     setSelectedTrip(undefined);
      //   }).catch(error => {
      //       console.log(selectedTrip);
      //       console.log(error);
      //   })
      // };

      return {
          data,
      }
}

export const NewMap = (res) => {

    const data = useResultsFacade(res);
    return (
      <div>
          <h5>Hey</h5>
      </div>
    );
}

// const Map = (res) => {
//     const data = useResultsFacade(res);
//
//     return (
//       <div>
//                     <ol>
//                     {
//                         data.map(trip => (
//                             <li key={trip.name()} align="start">
//                                 <div>
//                                     <p>{trip.name}</p>
//                                 </div>
//                             </li>
//                         ))
//                     }
//                     </ol>
//                 </div>
//             );
// }
//
