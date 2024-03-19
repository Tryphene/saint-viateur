import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomDialog from './CustomDialog';

const ActionButton = ({ titre, handleChangeM, formDataM, reset, children, id, icon, message, handleSubmit, item, setStatut, list , del}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    // Perform actions when confirmed
    setShowDialog(false);
  };

  const handleCancel = () => {
    // Handle cancel or close
    setShowDialog(false);
  };
  
  const nulle = () => {
    console.log("*");
  };

  const modifier = (event, id) => {
    event.preventDefault();
    console.log("ID:", id);
  };

  const style = {
    fontFamily: "Poppins, sans-serif",
    // Ajoutez d'autres styles CSS au besoin
  };
  
  // const list = (item) => {
  //   formDataM.id = id
  //   formDataM.nom = item.nom
  //   formDataM.prenom = item.prenom
  //   formDataM.dteNaissance = item.dteNaissance
  //   formDataM.mail = item.mail
  //   formDataM.mdp = item.mdp
  //   formDataM.telephone = item.telephone
  //   formDataM.role = item.role
  //   formDataM.status = item.status

  //   console.log(formDataM);
  // }
    
  return (
      <>
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group me-2" role="group" aria-label="First group">
          <button style={{ marginBottom: 2, marginTop: 2 }} className="icon-button" onClick={(event) => {handleShow(event); modifier(event, id); list(item, event);  handleChangeM(event)}}>
                      <MdModeEdit />
                  </button>
                  <Modal style={style} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{titre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{children}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={reset}>
                        Effacer
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Modifier
                    </Button>
                    </Modal.Footer>
                </Modal>
              </div>
        <div className="btn-group" role="group" aria-label="Second group">
          {del && <button style={{ marginBottom: 2, marginTop: 2 }} className="icon-button bg-danger" onClick={(event) => { setShowDialog(true); list(item, event); modifier(event, id)}}>
                  {icon}
                </button>}
          
                  {showDialog && (
                      <CustomDialog
                      show={showDialog}
                      handleClose={handleClose}
                      titre="Confirmation"
                      list={list}
                      item={item}
                      setStatus={() => setStatut()}
                      sendMail={() => nulle()}
                      createApprenant={() => nulle()}
                      message={message}
                      onConfirm={handleConfirm}
                      onCancel={handleCancel}
                    />
                  )}
              </div>
          </div> 
    </>
  )
}

export default ActionButton
