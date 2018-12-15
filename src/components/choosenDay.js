import React from "react";
let moment = require('moment');
require('moment/locale/pl');

// component only with date
class ChoosenDay extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className='dateChoosen'>
                <h2>{moment(this.props.dateChoosen).format('D')}<br/>
                    <span>{moment(this.props.dateChoosen).format('MMMM YYYY')}</span>
                </h2>
            </div>
        )
    }
}

export default ChoosenDay;