import ReactDOM from "react-dom";
import React from "react";
import './counterSeats.css';


class CounterSeats extends React.Component {
    constructor() {
        super();

        this.state={
            name:""
        }

    }

    changeName = (e) => {
        this.setState({
            name: e.currentTarget.value,
        })
    };

    submitSeats = (e) => {
        if (typeof this.props.submitHandler === 'function') {
            this.props.submitHandler(e);
        }

    };


    render() {

        const display = {
            display: this.props.seatsChoosen.length > 0 ? "block" : "none",
            fontSize: '2rem',
            fontStyle: 'italic',
            fontFamily: 'Arial, Helvetica, sans-serif',
        };

        let elements = this.props.seatsChoosen.map((e, i) => {
            return <li key={i}>Bilet wybrany: {e.rows}</li>
        });

        return (
            <div className='counterSeats'>
                <h2 style={display}>Podsumowanie zamówienia</h2>
                <h3 style={display}>Wybrane przez Ciebie miejsca {this.props.seatsChoosen.length}</h3>
                <ul>
                    {elements}
                </ul>
                <form onSubmit={this.submitSeats}>
                    Podaj imię i nazwisko:<br/>
                    <input type='text' value={this.state.name} onChange={this.changeName}/><br/>
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}


export default CounterSeats;
