import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route,NavLink} from "react-router-dom";

document.addEventListener('DOMContentLoaded', function () {
    class Header extends React.Component {
       constructor() {
       super();

       }
       render(){
         return (
    <h1>Rezerwacja</h1>

         )
       }
     }
    ReactDOM.render(
        <Header/>,
        document.getElementById('app')
    );
});
