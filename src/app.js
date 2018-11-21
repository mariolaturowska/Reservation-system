require('./scss/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route,NavLink} from "react-router-dom";
import Header from '../src/components/Header/header.js';
import Seats from './components/Body/seats/seats.js';

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

