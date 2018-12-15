import React from 'react';
import {db} from '../../config/firebase.js'; //firebase connection
import OneSeat from './oneSeat.js';
import Legend from './legend.js';
import CounterSeats from './counterSeats.js';
import OpenComponent from './openComponent.js';
import ChoosenDay from './choosenDay.js';
import Alert from './dialog.js';
const uuidv1 = require('uuid/v1'); // key generator
import DayPicker from 'react-day-picker'; //dayPicker calendar
import 'react-day-picker/lib/style.css';//style dayPicker calendar
import MomentLocaleUtils from 'react-day-picker/moment'; // moment to have local time to DayPicker
import 'moment/locale/pl';
let moment = require('moment');
require('moment/locale/pl');

class Seats extends React.Component {
    constructor() {
        super();
        this.state = {
            seatsData: [],
            arrayToSeats: [],
            arrayClick: [],
            listRowsColumns: {
                columns: 12,
                rows: 12
            },
            startDate: new Date(),
            endDate: new Date(),
            name: '',
            canBeSubmitted: true,
            dateChoosen: false,
            clicked: false,
            orderAccepted: false,
            circle: false,
            openAlert: false
        }
    }
    //event to close alert
    handleClose = () => {
        this.setState({openAlert: false});
    };
    //function to find index of element
    findIndex = (array, arg2) => {
        return array.findIndex(arg1 => JSON.stringify(arg1.rows) === JSON.stringify(arg2))
    };
    //event to click day from calendar and take data from firebase
    handleDayClick = (day, {selected}, disabled) => {
        const startDate = moment().subtract(1, "days");
        this.setState({
            dateChoosen: disabled.target.getAttribute('aria-disabled') === 'true' ? false : true
        });
        this.setState({
            startDate: new Date(day.getTime()),
            endDate: new Date(day.getTime()),
            seatsData: [],
            orderAccepted: false,
            circle: true,
            arrayClick: [],
        }, () => {
            let start = this.state.startDate;
            start.setHours(0, 0, 0, 0);
            let end = this.state.endDate;
            end.setHours(23, 59, 59, 999);
            //take date from firebase for clicked dates
            db.collection('seats').where('date', '>=', start).where('date', '<=', end).get().then((el) => {
                el.docs.forEach((e) => {
                    let post = e.data();
                    this.setState({
                        seatsData: [...this.state.seatsData, post]
                    })
                });
                this.setState({
                    circle: false
                })
            })
        });
        //alert to pop up if date clicked before current day
        if (day < startDate) {
            this.setState({
                openAlert: true
            })
        }
    };
    //function to disable the dates before current day
    disablePrevDates = (startDate) => {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    };
    //event to book seats
    bookHandler = (e, rows, id) => {
        e.preventDefault();
        //creating object to be sent to firebase
        let element = {id: id, rows: rows, date: this.state.startDate,surname:""};
        let elIndex = this.findIndex(this.state.arrayClick, element.rows);
        //temp array to keep clicks
        let tempArray = [...this.state.arrayClick];
        //click deleted from arrayClick if clicked second time
        if (elIndex > -1) {
            tempArray.splice(elIndex, 1);
            this.setState({
                arrayClick: tempArray,
            });
        } else {
            this.setState({
                arrayClick: [...this.state.arrayClick, element],
                clicked: true,
                orderAccepted: false
            })
        }
    };
    //event to remove seat by clicking in the list
    deleteSeat = (e) => {
        let element = e.currentTarget.parentElement.id;
        //delete click object from arrayClick
        let items = this.state.arrayClick.filter(el => {
            return el.id !== element;
        });
        this.setState({
            arrayClick: items
        });
    };
    //event allowing to change value in input
    handleName = (e) => {
        this.setState({
            name: e.currentTarget.value,
        })
    };
    //submit number of booked seats to firebase
    handleSubmit = (e) => {
        e.preventDefault();
        let tempArray = [];
        //add seats to firebase database
        if (this.state.name.length > 0) {
            this.state.arrayClick.forEach(e => {
                e.surname=this.state.name;
                tempArray.push(e);
                db.collection('seats').add(e);
            });
            //state updated and clearing temporary array keeping clicked seats & clearing input
            this.setState({
                seatsData: [...this.state.seatsData, ...tempArray],
                arrayClick: [],
                name: "",
            });
        }
        //check if form can be submitted and order accepted
        this.setState({
            canBeSubmitted: this.state.name.length === 0 ? false : true,
            orderAccepted: (this.state.name.length === 0 ? false : true) ? true : false
        });
    };
    render() {
        const startDate = moment().subtract(1, "days");
        const modifiers = {
            today: new Date(),
            weekends: {daysOfWeek: [0, 6]},
        };
        //styles overwriting day picker calendar
        const modifiersStyles = {
            today: {
                fontWeight: 'bold',
                color: 'deeppink',
            },
            disabled: {
                color: 'grey'
            },
            selected: {
                backgroundColor: 'white',
                color: 'black'
            },
            weekends: {
                fontWeight: 'bold',
            }
        };
        let arrayToSeats = this.state.arrayToSeats;
        for (let i = 1; i <= this.state.listRowsColumns.columns; i++) {//definition of rows and columns structure
            arrayToSeats[i] = [];
            for (let j = 1; j <= this.state.listRowsColumns.rows; j++) {
                arrayToSeats[i].push(j)
            }
        }
        //function to create seats
        let elements = arrayToSeats.map((e, columnIndex) => {
            return e.map((el, rowIndex) => {
                //check if element is clicked
                let isClicked = this.findIndex(this.state.arrayClick, [columnIndex, rowIndex]);
                //check if element is in database
                let isInBase = this.findIndex(this.state.seatsData, [columnIndex, rowIndex]);
                return <OneSeat rows={[columnIndex, rowIndex]}
                                clicked={isClicked > -1}
                                database={this.state.seatsData}
                                bookMethod={this.bookHandler}
                                key={uuidv1()}
                                id={uuidv1()}
                                inBase={isInBase > -1}/>
            });
        });
        //case firebase is not uploaded timely
        return (
            <div className={this.state.dateChoosen ? 'background container' : 'background container-open-container'}>
                <Alert open={this.state.openAlert} handleAlert={this.handleClose}/>
                <div className='calendar'>
                    {this.state.dateChoosen ? <ChoosenDay dateChoosen={this.state.startDate}/> : null}
                    <DayPicker className='dayPicker'
                               onDayClick={this.handleDayClick}
                               selectedDays={this.state.startDate}
                               firstDayOfWeek={1}
                               disabledDays={[this.disablePrevDates(startDate)]}
                               modifiers={modifiers}
                               modifiersStyles={modifiersStyles}
                               localeUtils={MomentLocaleUtils}
                               locale='pl'/>
                </div>
                {this.state.dateChoosen ? <div className='cinemaRoom'>
                    {!this.state.seatsData.length && this.state.circle ? <div className='circleStyles'></div> : null}
                    <ul className='seatsAllStyles grid-container'>
                        {elements}
                    </ul>
                    <Legend/>
                </div> : <OpenComponent/>}
                {this.state.dateChoosen ? <CounterSeats date={this.state.startDate}
                                                        submitHandler={this.handleSubmit}
                                                        seatsChoosen={this.state.arrayClick}
                                                        changeName={this.handleName}
                                                        canBeSubmitted={this.state.canBeSubmitted}
                                                        name={this.state.name}
                                                        deleteSeat={this.deleteSeat}
                                                        orderAccepted={this.state.orderAccepted}/> : null}
            </div>
        );
    }
}

export default Seats;