import React from 'react';
import ReactDOM from 'react-dom';
import imageRed from '../../../images/cinema-seat-red.png';
import imageGrey from '../../../images/cinema-seat-grey.png';
import imageYellow from '../../../images/cinema-seat-yellow.png';
import './oneSeat.css';

class OneSeat extends React.Component {
    constructor() {
        super();
    }

    bookSeat = (e) => {

        if (typeof this.props.bookMethod === 'function') {
            this.props.bookMethod(e, this.props.rows);
        }


    };

    render() {


        const seatFree = {
            backgroundImage: this.props.inBase ? 'url(' + imageGrey + ')' : this.props.clicked ? 'url(' + imageYellow + ')' : 'url(' + imageRed + ')',
        };

        if (this.props.rows[0] === 14) {
            return <div className='columns'>
                <button style={seatFree} className='oneSeat' id={this.props.id} onClick={this.bookSeat}
                        disabled={this.props.inBase}></button>
                <p>{this.props.rows[1]+1}</p></div>
        } else {
            return <div>
                <button style={seatFree} className='oneSeat' id={this.props.id} onClick={this.bookSeat}
                        disabled={this.props.inBase}></button>
            </div>
        }


    }
}


export default OneSeat;