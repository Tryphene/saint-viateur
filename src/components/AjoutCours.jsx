import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button, } from 'react-bootstrap';
import { IoAddOutline } from 'react-icons/io5';
import CoursApprenant from './CoursApprenant';
import FormMulti from './FormMulti';

const AjoutCours = ({apprenant}) => {
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
   
    return (
        <>
            {/* <Button className="pt-0 px-1 m-0" style={{backgroundColor: "#F7F7FF", color: "#0D6EFD", border: "none", fontWeight: "200", fontSize: 17}} variant="primary" onClick={() => setShow(true)}></Button> */}
            {/* <p className="pt-1" style={{ color: "#0D6EFD", fontWeight: "200", fontSize: 17}} variant="primary" onClick={() => setShow(true)}> */}
            {/* <Button className="mb-2" style={{ border: "none", fontWeight: 400, fontSize: 17}} variant="primary" onClick={() => setShow(true)}>
                       <IoAddOutline size={25} /> Ajouter un cours
            </Button> */}

            <Button className='bouton w-100' onClick={() => setShow(true)}>
                <IoAddOutline size={25} /> Ajouter un cours
            </Button>
            
            <Modal
                show={show}
                onHide={() => setShow(false)}
                fullscreen={fullscreen}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Ajouter un cours
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div key={0} className="modalCours">
                        {/* <CoursApprenant apprenant={apprenant} key={1} /> */}
                        <FormMulti apprenant={apprenant} key={1} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AjoutCours
