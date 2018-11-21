import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route, NavLink} from "react-router-dom";
import {classes} from './seats.css';
import {db} from '../../../../config/firebase.js';
import OneSeat from '../oneSeat/oneSeat.js';
import CounterSeats from '../counterSeats/counterSeats.js';
import CircularProgress from '@material-ui/core/CircularProgress';
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
                columns: 4,
                rows: 4
            },
            array: [],
            surname: "",
            isFree: true,
            date: "",
            arrayClick: [],
        }
    }

    bookHandler = (e, rows) => {
        e.preventDefault();
        let element = {rows: rows, isFree: !this.state.isFree, surname: 'ja'};
        let elIndex = this.state.arrayClick.findIndex(el => JSON.stringify(el) === JSON.stringify(element));
        let tempArray = [...this.state.arrayClick];

        if (elIndex > -1) {

            tempArray.splice(elIndex, 1);
            this.setState({
                arrayClick: tempArray,
            });

        } else {
            this.setState({
                arrayClick: [...this.state.array, element]
            })
        }


        // db.collection('seats').add(element);
    }


    render() {

        const styles = {
            color: "#696969",
            width: "300px",
            height: "300px"
        };

        if (!this.state.seatsData.length) {
            return <CircularProgress style={styles}/>;
        }

        let array = this.state.array;

        for (let i = 1; i <= this.state.listSeats.columns; i++) {
            array[i] = [];
            for (let j = 1; j <= this.state.listSeats.rows; j++) {
                array[i].push(this.state.isFree)
            }
        }

        let elements = array.map((e, columnIndex) => {
            return e.map((el, rowIndex) => {
                return <OneSeat rows={[columnIndex, rowIndex]} database={this.state.seatsData}
                                bookMethod={this.bookHandler} key={uuidv1()} id={uuidv1()} isFree={this.state.isFree}/>
            });
        });


        return (
            <div>
                <ul>
                    {elements}
                </ul>
                <CounterSeats bookHandlerCounter={this.bookHandler}/>
            </div>
        );
    }

    componentDidMount() {
        db.collection('seats').get().then((el) => {
            el.docs.forEach((e) => {
                let post = e.data();

                this.setState({
                    seatsData: [...this.state.seatsData, post]
                })
            })

        })


    }
}

export default Seats;