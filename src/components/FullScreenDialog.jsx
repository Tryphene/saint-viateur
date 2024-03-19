import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FormMulti from './FormMulti';
import { FiDelete } from 'react-icons/fi';
import { styled } from '@mui/material';
import { RiAddFill } from 'react-icons/ri';
import { MdOutlineClose } from 'react-icons/md';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({apprenant, proff, width}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    };
    
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });
  
  return (
      <div>
          {/* <BootstrapButton variant="contained" disableElevation onClick={handleClickOpen} startIcon={<CgAdd size={22} color='white' />}>
              Ajouter un cours
          </BootstrapButton> */}
          <Button style={{width: width, fontFamily: "Poppins, sans-serif",}} variant="contained" disableElevation onClick={handleClickOpen} startIcon={<RiAddFill size={25} color='white' />}>
              Ajouter un cours
          </Button>
          <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
          >
              <AppBar sx={{ position: 'relative' }}>
                  <Toolbar>
                      <div className="d-flex justify-content-between">
                          <div className="me-5" style={{right: 0}}>
                              <Typography variant="h6">
                                    Ajouter un cours
                              </Typography>
                          </div>
                          <div className="ms-5" style={{left: 0}}>
                          <IconButton
                              edge="start"
                              color="inherit"
                              onClick={handleClose}
                              aria-label="close"
                >
                  <MdOutlineClose />
                              {/* <CloseIcon /> */}
                          </IconButton>
                              
                          </div>
                      </div>
                  </Toolbar>
              </AppBar>
              <div key={0} className="modalCours">
                  <FormMulti apprenant={apprenant} proff={proff} key={1} />
              </div>
          </Dialog>
    </div>
  );
}

export default FullScreenDialog