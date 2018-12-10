require('./scss/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route,NavLink} from "react-router-dom";
import Seats from './components/seats.js';

document.addEventListener('DOMContentLoaded', function () {
    class App extends React.Component {
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
        <App/>,
        document.getElementById('app')
    );
});

