// import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Toast } from 'bootstrap';

const CustomDialog = (props) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const toastRef = React.useRef(null);

  React.useEffect(() => {
    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      if (alertVisible) {
        toast.show();
      } else {
        toast.hide();
      }
    }
  }, [alertVisible]);
    
    const handleConfirm = () => {
        // props.onCancel()
        setAlertVisible(true)
  };
    
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
          <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton onClick={props.onCancel}>
          <Modal.Title>{props.titre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onCancel}>
            Non
          </Button>
          <div>
            <Button type="button" className="icon-button" variant="primary" onClick={(event) => {
              handleConfirm(event);
              props.setStatus(event);
              props.createApprenant(event);
              props.sendMail(event);
              props.onCancel(event)

              // props.list(props.item);
              // props.onCancel()
            }}>
              Oui
            </Button>
            {alertVisible && (
              <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
                  <div className="toast-header">
                    <img width={20} src="https://cdn-icons-png.flaticon.com/128/3388/3388617.png" className="rounded me-2" alt="..." />
                    <strong className="me-auto">Confirmation d'inscription</strong>
                    {/* <small>11 mins ago</small> */}
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setAlertVisible(false)}></button>
                  </div>
                  <div className="toast-body">
                    Inscription confirmée avec succès
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomDialog
