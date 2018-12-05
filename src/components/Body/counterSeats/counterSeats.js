import React from "react";

class CounterSeats extends React.Component {
    constructor() {
        super();

    }

    handleName = (e) => {
        if (typeof this.props.changeName === 'function') {
            this.props.changeName(e);
        }


    };

    submitSeats = (e) => {
        if (typeof this.props.submitHandler === 'function') {
            this.props.submitHandler(e);
        }
    };

    removeSeat = (e) => {
        if (typeof this.props.deleteSeat === 'function') {
            this.props.deleteSeat(e);
        }
    };

    render() {

        let elements = this.props.seatsChoosen.map((e, i) => {
            return <tr key={i} id={e.id}>
                <td>{this.props.date.toLocaleDateString()}</td>
                <td>rząd: {e.rows[0]}</td>
                <td>miejsce:{e.rows[1] + 1}</td>
                <td onClick={this.removeSeat} className='trash'></td>
            </tr>
        });

        return (
            <div className='counterSeats'>
                <h2 className='summary'>
                    Podsumowanie zamówienia<br/>
                    <span>Wybrane miejsca: {this.props.seatsChoosen.length}</span>
                </h2>

                {this.props.seatsChoosen.length > 0 ?
                    <div className='wrapper'>
                        <div className='table'>
                            <table>
                                <tbody>
                                {elements}
                                </tbody>
                            </table>
                            <div className='sum'>SUMA: {this.props.seatsChoosen.length * 20} zł</div>
                        </div>
                        <form onSubmit={this.submitSeats}>
                            <p className='paragraf'>Podaj imię i nazwisko:</p>
                            {!this.props.canBeSubmitted ?
                                <p className='paragrafRed'>Pole nie może zostać puste</p> : null}
                            <input className='name' type='text' value={this.props.name} onChange={this.handleName}
                                   placeholder='Twoje imię...'/><br/>
                            <input type='submit' className='buttonSend' value='Wyślij'/>

                        </form>
                    </div> : null}
                {this.props.orderAccepted ? <h2 className='acceptedOrder'>Zamówienie zostało przyjęte</h2> : null}
            </div>
        )
    }
}


export default CounterSeats;
