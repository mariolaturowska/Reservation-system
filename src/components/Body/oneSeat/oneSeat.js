import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route, NavLink} from "react-router-dom";
import imageRed from '../../../images/cinema-seat-red.png';
import imageGrey from '../../../images/cinema-seat-grey.png';
import imageYellow from '../../../images/cinema-seat-yellow.png';

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


        const seatFree={
            backgroundImage:this.props.inBase?'url('+imageGrey+')':this.props.clicked?'url('+imageYellow+')':'url('+imageRed+')',
            backgroundRepeat:'no-repeat',
            backgroundSize:'50px 50px',
            width:'60px',
            height:'60px',
            display:'inline-block'
        };

        return <li style={seatFree} id={this.props.id} onClick={this.bookSeat} disabled={this.props.inBase}></li>
    }
}


export default OneSeat;