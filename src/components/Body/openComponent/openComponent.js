import React from 'react';
import './openComponent.css';
import noFilm from "../../../images/film3.jpeg";




class OpenComponent extends React.Component {
   constructor() {
   super();

   }
   render(){
     return (<div className='openComponent'>
         <div style={{backgroundImage:'url(' + noFilm + ')'}} className='image'>
             <h2 className='header'>Wybierz dzień</h2>
         </div>
         </div>)
   }
 }

export default OpenComponent;