import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { MdOutlineClose } from 'react-icons/md';
// import CloseIcon from '@mui/icons-material/Close';

const SimpleSnackbar = ({ open, handleClick, handleClose, text}) => {

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        ANNULER
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <MdOutlineClose />
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={text}
        action={action}
      />
    </div>
  );
}

export default SimpleSnackbar