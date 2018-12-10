import React from 'react';
import imageRed from '../images/red.png';
import imageGrey from '../images/grey.png';
import imageYellow from '../images/yellow.png';


class OneSeat extends React.Component {
    constructor() {
        super();
    }

    bookSeat = (e) => {

        if (typeof this.props.bookMethod === 'function') {
            this.props.bookMethod(e, this.props.rows,this.props.id);
        }


    };

    render() {


        const seatFree = {
            backgroundImage: this.props.inBase ? 'url(' + imageGrey + ')' : this.props.clicked ? 'url(' + imageYellow + ')' : 'url(' + imageRed + ')',
        };
            return <div>
                <div className="tooltip">
                    <span className="tooltiptext">rząd: {this.props.rows[0]} miejsce: {this.props.rows[1]+1}</span>
                <button style={seatFree} className='oneSeat' id={this.props.id} onClick={this.bookSeat}
                        disabled={this.props.inBase}>
                </button>
                </div>
            </div>
    }
}


export default OneSeat;