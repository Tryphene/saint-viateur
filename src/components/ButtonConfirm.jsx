import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPersonSlash } from 'react-icons/bs';
import MyComponent from './MyComponent';
import CustomDialog from './CustomDialog';
import { TiDelete } from 'react-icons/ti';
// import { TiDelete } from 'react-icons/ti';

const ButtonConfirm = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDialog, setShowDialog] = useState(false);

  /*const handleConfirm = () => {
    // Perform actions when confirmed
    setShowDialog(false);
  };

  const handleCancel = () => {
    // Handle cancel or close
    setShowDialog(false);
  };*/

  // const remove = () => {
  //   setAlertVisible(true)
  // };

  return (
    <>
      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group me-2" role="group" aria-label="First group">
          <button className="icon-button bg-success" onClick={(event) => [setShowDialog(true)]}>
            {props.icon}
          </button>
          {showDialog && (
            <CustomDialog
              show={showDialog}
              handleClose={handleClose}
              titre="Confirmation"
              message={props.message}
              setStatus={props.setStatus}
              sendMail={props.sendMail}
              createApprenant={props.createApprenant}
              // onConfirm={handleConfirm}
              // onCancel={handleCancel}
            />
      )}
        </div>
        <div className="btn-group me-2" role="group" aria-label="Second group">
          {/* <Button type="button" className='icon-button' onClick={handleShow}> */}
          <button type="button" className="icon-button bg-danger" onClick={(event) => { handleShow(event); props.handleChange(event)}}>
            <BsPersonSlash size={20} />
          </button>
          <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Motif de rejet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form method='post'>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder">Adresse e-mail</label>
                  <input readOnly type="email" value={props.mailValue} name="to" onChange={props.handleChange} className="form-control" id="exampleFormControlInput1" placeholder="" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder">Message</label>
                  <textarea rows={5} value={props.messageValue} name="text" onChange={props.handleChange} className="form-control" id="exampleFormControlInput1" placeholder="" />
                
                </div>
                {props.error && (
                <>
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <TiDelete size={25} color='red' />
                    <div style={{marginLeft: 15}}>
                      {props.error}
                    </div>
                  </div>
                </>
                  )}
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <MyComponent
                submit={props.submit}
                image={props.error ? "https://cdn-icons-png.flaticon.com/128/3541/3541902.png" : "https://cdn-icons-png.flaticon.com/128/3388/3388617.png"}
                titre={props.error ? "Error" : "Confirmation d'envoie du message" }
                message={props.error ? props.error : "Message envoyé avec succès !" }
              />
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>

  )
}

export default ButtonConfirm
