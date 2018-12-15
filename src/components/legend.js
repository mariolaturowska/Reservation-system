import React from 'react';

class Legend extends React.Component {
   constructor() {
   super();

   }
   render(){
     return (
         <!-- list of seats legend under sets to be booked -->
         <ul className='list'>
             <li className='legendElement element-red'>Miejsce wolne</li>
             <li className='legendElement element-yellow'>Miejsce wybrane</li>
             <li className='legendElement element-grey'>Miejsce zajęte</li>
         </ul>

     )
   }
 }

 export default Legend;