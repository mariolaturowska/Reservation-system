import ReactDOM from "react-dom";
import React from "react";
import Seats from "../seats/seats";

document.addEventListener('DOMContentLoaded', function () {

    class CinemaRooms extends React.Component {
       constructor() {
       super();

       }
       render(){
         return (
    <Seats/>
         )
       }
     }

    ReactDOM.render(
        <Seats/>,
        document.getElementById('app')
    );
});

export default CinemaRooms;