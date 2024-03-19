import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Sidebar.css'
import { PiCheckFatFill } from 'react-icons/pi';
import Confirmation from './Confirmation';

function ModalAjout(props) {
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const style = {
    fontFamily: "Poppins, sans-serif",
    // Ajoutez d'autres styles CSS au besoin
  };

  return (
    <>
      <Button style={style} className='bouton w-100' onClick={handleShow}>
        {props.icon}{props.titre}
      </Button>

      <Modal size={props.size} show={show} style={style} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.titre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Confirmation showw={showw} img={<PiCheckFatFill className="rounded me-2" color='green' size={23} />} setShoww={setShoww} titre="Confirmation d'enregistrement" message="Professeur créé avec succès" button={<Button variant="primary" onClick={(event) => { props.handleSubmit(event); setShow(true) }}>Enregistrer </Button>} /> */}
          <Button variant="primary" onClick={props.handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAjout;