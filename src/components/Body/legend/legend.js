import React from 'react';
import imageRed from '../../../images/cinema-seat-red.png';
import imageGrey from '../../../images/cinema-seat-grey.png';
import imageYellow from '../../../images/cinema-seat-yellow.png';
import './legend.css';

class Legend extends React.Component {
   constructor() {
   super();

   }
   render(){
     return (
         <ul className='list'>
             <li style={{backgroundImage:'url(' + imageRed + ')'}} className='legendElement'>Miejsce wolne</li>
             <li style={{backgroundImage:'url(' + imageYellow + ')'}} className='legendElement'>Miejsce wybrane</li>
             <li style={{backgroundImage:'url(' + imageGrey + ')'}} className='legendElement'>Miejsce zajęte</li>
         </ul>

     )
   }
 }

 export default Legend;