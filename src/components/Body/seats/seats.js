import React from 'react';
import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';
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
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import OpenComponent from '../openComponent/openComponent.js';
import ChoosenDay from '../choosenDay/choosenDay.js';
let moment = require('moment');
require('moment/locale/pl');

// import {withStyles} from '@material-ui/core/styles';


class Seats extends React.Component {
    constructor() {

        super();

        this.state = {
            seatsData: [],
            listSeats: {
                columns: 12,
                rows: 12
            },
            array: [],
            arrayClick: [],
            date: new Date(),
            endDate: new Date(),
            name: '',
            canBeSubmitted: true,
            dateChoosen: false,
            clicked:false,
            orderAccepted:false
        }
    }

    findIndex = (array, arg2) => {//function to find index of element
        return array.findIndex(arg1 => JSON.stringify(arg1.rows) === JSON.stringify(arg2))
    };

    handleDayClick = (day, {selected}, disabled) => { //click day from calendar and take data from firebase

        this.setState({
            dateChoosen:disabled.target.getAttribute('aria-disabled')==='true'?false:true
        });

        // console.log(disabled.target.getAttribute('aria-disabled'));

        this.setState({
            date: new Date(day.getTime()),
            endDate: new Date(day.getTime()),
            seatsData: [],
            orderAccepted:false,

        }, () => {

            let start = this.state.date;
            start.setHours(0, 0, 0, 0);
            let end = this.state.endDate;
            end.setHours(23, 59, 59, 999);

            db.collection('seats').where('date', '>=', start).where('date', '<=', end).get().then((el) => {

                el.docs.forEach((e) => {
                    let post = e.data();
                    this.setState({
                        seatsData: [...this.state.seatsData, post]
                    })

                });

            })
        });

    };


    disablePrevDates = (startDate) => {
        const startSeconds =Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    };


    bookHandler = (e, rows,id) => { // event to book seats

        e.preventDefault();
        let element = {id:id, rows: rows, date: this.state.date, surname: this.state.name};
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
                clicked:true,
                orderAccepted:false
            })
        }
    };

    deleteSeat=(e)=>{
        let element=e.currentTarget.parentElement.id;
        let items=this.state.arrayClick.filter(el => {
            return el.id !== element;
        });

        this.setState({
            arrayClick:items
        });
    };



    handleName = (e) => {//allow to change input
        this.setState({
            name: e.currentTarget.value,
        })
    };

    handleSubmit = (e) => { // submit number of booked seats to firebase
        e.preventDefault();
        let tempArray = [];

        if (this.state.name.length > 0) {
            this.state.arrayClick.forEach(e => {
                tempArray.push(e);
                db.collection('seats').add(e);


            });


            this.setState({
                seatsData: [...this.state.seatsData, ...tempArray],
                arrayClick: [],
                name:"",
            });
        }

        this.setState({
            canBeSubmitted: this.state.name.length === 0 ? false : true,
            orderAccepted:  (this.state.name.length === 0 ? false : true) ? true : false
        });

    };

    render() {

        const startDate = moment().subtract(1,"days");
        const MONTHS=['Styczeń', 'Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
        const WEEKDAYS_SHORT =['Niedz','Pon','Wt','Śr','Czw','Pt','Sob'];

        // if (!this.state.seatsData.length) {// case firebase is not uploaded timely
        //     return <CircularProgress className='circleStyles'/>;
        // }

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
                                bookMethod={this.bookHandler} key={uuidv1()} id ={uuidv1()} inBase={isInBase > -1}/>
            });
        });

        return (
            <div className='background container'>
                <div className='calendar'>
                    {this.state.dateChoosen?<ChoosenDay dateChoosen={this.state.date}/>:null}
                <DayPicker className='dayPicker' onDayClick={this.handleDayClick} selectedDays={this.state.date} months={MONTHS} weekdaysShort={WEEKDAYS_SHORT} firstDayOfWeek={0}
                           disabledDays={[this.disablePrevDates(startDate)]}/>
                </div>
                {this.state.dateChoosen ? <div className='cinemaRoom'>
                    <ul className='seatsAllStyles grid-container'>
                        {elements}
                    </ul>
                    <Legend/>
                </div> : <OpenComponent/>}
                    <CounterSeats date={this.state.date} submitHandler={this.handleSubmit} seatsChoosen={this.state.arrayClick}
                                  changeName={this.handleName} canBeSubmitted={this.state.canBeSubmitted} name={this.state.name} deleteSeat={this.deleteSeat} orderAccepted={this.state.orderAccepted}/>
            </div>
        );
    }
}

export default Seats;