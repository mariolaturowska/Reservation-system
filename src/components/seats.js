import React from 'react';
import {db} from '../../config/firebase.js';
import OneSeat from './oneSeat.js';
import Legend from './legend.js';
import CounterSeats from './counterSeats.js';
const uuidv1 = require('uuid/v1');
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import OpenComponent from './openComponent.js';
import ChoosenDay from './choosenDay.js';
import MomentLocaleUtils from 'react-day-picker/moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import 'moment/locale/pl';
let moment = require('moment');
require('moment/locale/pl');

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
            clicked: false,
            orderAccepted: false,
            circle: false,
            open: false
        }
    }

    //event to close alert
    handleClose = () => {
        this.setState({open: false});
    };

    //function to find index of element
    findIndex = (array, arg2) => {
        return array.findIndex(arg1 => JSON.stringify(arg1.rows) === JSON.stringify(arg2))
    };

    //click day from calendar and take data from firebase
    handleDayClick = (day, {selected}, disabled) => {

        const startDate = moment().subtract(1, "days");
        this.setState({
            dateChoosen: disabled.target.getAttribute('aria-disabled') === 'true' ? false : true
        });

        this.setState({
            date: new Date(day.getTime()),
            endDate: new Date(day.getTime()),
            seatsData: [],
            orderAccepted: false,
            circle: true,
            arrayClick: [],

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
                this.setState({
                    circle: false
                })
            })
        });

        if (day < startDate) {
            this.setState({
                open: true
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
        let element = {id: id, rows: rows, date: this.state.date,surname:""};
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
                clicked: true,
                orderAccepted: false
            })
        }
    };

    //event to remove seat by clicking in the list
    deleteSeat = (e) => {
        let element = e.currentTarget.parentElement.id;
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

        if (this.state.name.length > 0) {
            this.state.arrayClick.forEach(e => {
                e.surname=this.state.name;
                tempArray.push(e);
                db.collection('seats').add(e);
            });

            this.setState({
                seatsData: [...this.state.seatsData, ...tempArray],
                arrayClick: [],
                name: "",
            });
        }

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

        let array = this.state.array;

        for (let i = 1; i <= this.state.listSeats.columns; i++) {//definition of rows and columns structure
            array[i] = [];
            for (let j = 1; j <= this.state.listSeats.rows; j++) {
                array[i].push(j)
            }
        }

        //function to create seats
        let elements = array.map((e, columnIndex) => {
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
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Nie można wybrać daty wcześniejszej niż dzisiaj.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className='calendar'>
                    {this.state.dateChoosen ? <ChoosenDay dateChoosen={this.state.date}/> : null}
                    <DayPicker className='dayPicker'
                               onDayClick={this.handleDayClick}
                               selectedDays={this.state.date}
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
                {this.state.dateChoosen ? <CounterSeats date={this.state.date}
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