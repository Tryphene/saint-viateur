import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SimpleSnackbar from './SimpleSnackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({ setAlert, open, handleClickOpen, handleClose, text, titre, submit, response, button }) => {
    const [openn, setOpenn] = React.useState(false);

  const handleClick = () => {
    setOpenn(true);
  };

  const handleClosee = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenn(false);
  };
  return (
      <div>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button> */}
      <Dialog
        style={{fontFamily: "poppins"}}
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
          >
              <DialogTitle style={{fontFamily: "poppins"}}>{titre}</DialogTitle>
              <DialogContent style={{fontFamily: "poppins"}}>
                  <DialogContentText id="alert-dialog-slide-description" style={{fontFamily: "poppins"}}>
                      {text}
                  </DialogContentText>
              </DialogContent>
        <DialogActions style={{fontFamily: "poppins"}}>
          {button === true ?
            <Button onClick={() => { handleClose() }}>Ok</Button>
            :
            <>
              <Button onClick={() => { handleClose(); setAlert(); setOpenn(response) }}>Non</Button>
              <Button onClick={() => { handleClose(); setAlert(); submit() }}>Oui</Button>
            </>
          }
                  
              </DialogActions>
          </Dialog>
          <SimpleSnackbar handleClick={handleClick} handleClose={handleClosee} open={openn} text={`Alors choississez donc une autre heure ou un aute professeur`} />
    </div>
  );
}

export default AlertDialogSlide