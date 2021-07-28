// import React, { useState, useEffect } from "react";
//
//
//
// export const useMapFacade = () => {
//
//     useEffect(() => {
//     const listener = e => {
//       if (e.key === "Escape") {
//         setSelectedPark(null);
//       }
//     };
//     window.addEventListener("keydown", listener);
//
//     return () => {
//       window.removeEventListener("keydown", listener);
//     };
//   }, []);
//
//     return {
//         selectedPark,
//         setSelectedPark,
//     }
// }