import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class Alert extends React.Component {
   constructor() {
   super();
   }
    //event handling alert if date clicked before current day
    handleAlert = (e) => {
        if (typeof this.props.handleAlert === 'function') {
            this.props.handleAlert(e);
        }
    };
   render(){
     return (
         <Dialog
             open={this.props.open}
             onClose={this.handleAlert}
             aria-describedby="alert-dialog-description">
             <DialogContent>
                 <DialogContentText id="alert-dialog-description">
                     Nie można wybrać daty wcześniejszej niż dzisiaj.
                 </DialogContentText>
             </DialogContent>
             <DialogActions>
                 <Button onClick={this.handleAlert} color="primary">
                     OK
                 </Button>
             </DialogActions>
         </Dialog>
     )
   }
 }
 export default Alert;