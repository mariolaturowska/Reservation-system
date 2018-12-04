import React from "react";
import './choosenDay.css';
let moment = require('moment');
require('moment/locale/pl');

class ChoosenDay extends React.Component {
   constructor() {
   super();

   }
   render(){
     return (
         <div className='date'>
             <h2>{moment(this.props.dateChoosen).format('D')}<br/>
             <span>{moment(this.props.dateChoosen).format('MMMM YYYY')}</span>
             </h2>
         </div>
     )
   }
 }

export default ChoosenDay;