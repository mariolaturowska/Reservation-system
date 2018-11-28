import React from 'react';
import ReactDOM from 'react-dom';
import {classes} from './seats.css';
import {db} from '../../../../config/firebase.js';
import OneSeat from '../oneSeat/oneSeat.js';
import Legend from '../legend/legend.js';
import CounterSeats from '../counterSeats/counterSeats.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import './seats.css';
// import {v4} from 'uuid';
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

// import {withStyles} from '@material-ui/core/styles';


class Seats extends React.Component {
    constructor() {

        super();

        this.state = {
            seatsData: [],
            listSeats: {
                columns: 14,
                rows: 12
            },
            array: [],
            arrayClick: [],
        }
    }

    findIndex = (array, arg2) => {//function to find index of element
        return array.findIndex(arg1 => JSON.stringify(arg1.rows) === JSON.stringify(arg2))
    };

    bookHandler = (e, rows) => { // event to book seats

        e.preventDefault();
        let element = {rows: rows, surname: 'ja'};
        let elIndex = this.findIndex(this.state.arrayClick, element.rows);
        let tempArray = [...this.state.arrayClick];

        if (elIndex > -1) {

            tempArray.splice(elIndex, 1);
            this.setState({
                arrayClick: tempArray,
            });

        } else {
            this.setState({
                arrayClick: [...this.state.arrayClick, element],
            })
        }


    };

    handleSubmit = (e) => { // submit number of booked seats to firebase
        e.preventDefault();

        let tempArray = [];


        this.state.arrayClick.forEach(e => {

            tempArray.push(e);
            db.collection('seats').add(e);
        });

        this.setState({
            seatsData: [...this.state.seatsData, ...tempArray],
            arrayClick: []
        });

    };

    render() {

        if (!this.state.seatsData.length) {// case firebase is not uploaded timely
            return <CircularProgress className='circleStyles'/>;
        }

        let array = this.state.array;

        for (let i = 1; i <= this.state.listSeats.columns; i++) {//definition of rows and columns structure
            array[i] = [];
            for (let j = 1; j <= this.state.listSeats.rows; j++) {
                array[i].push(j)
            }
        }


        let elements = array.map((e, columnIndex) => {// create seats
            return e.map((el, rowIndex) => {

                let isClicked = this.findIndex(this.state.arrayClick, [columnIndex, rowIndex]);

                let isInBase = this.findIndex(this.state.seatsData, [columnIndex, rowIndex]);

                return <OneSeat rows={[columnIndex, rowIndex]} clicked={isClicked > -1} database={this.state.seatsData}
                                bookMethod={this.bookHandler} key={uuidv1()} inBase={isInBase > -1}/>
            });
        });

        return (
            <div className='background'>
                <div className='cinemaRoom'>
                    <ul className='seatsAllStyles grid-container'>
                        {elements}
                    </ul>
                    <Legend/>
                </div>
                <CounterSeats submitHandler={this.handleSubmit} seatsChoosen={this.state.arrayClick}/>
            </div>
        );
    }

    componentDidMount() {//take data from firebase

        this._isMounted = true; //prevent memory leak
        if (this._isMounted) {
        db.collection('seats').get().then((el) => {
            el.docs.forEach((e) => {
                let post = e.data();

                    this.setState({
                        seatsData: [...this.state.seatsData, post]
                    })

            })

        })};

    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}

export default Seats;