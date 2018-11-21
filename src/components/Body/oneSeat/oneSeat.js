import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route, NavLink} from "react-router-dom";

class OneSeat extends React.Component {
    constructor() {
        super();

    }

    bookSeat = (e) => {

        if (typeof this.props.bookMethod === 'function') {
            this.props.bookMethod(e,this.props.rows);
        }

    };

    render() {

        return <button id={this.props.id} onClick={this.bookSeat}>1</button>
    }


}


export default OneSeat;