import React, { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

    
const Confirmation = ({ img, message, titre, button, show, setShow }) => {
    // const [show, setShow] = useState(false)
    return (
        <>
            {/* <Row>
                <Col xs={6}> */}
                    <ToastContainer
                        className="p-3"
                        position={'top-center'}
                        style={{ zIndex: 1 }}
                    >
                        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                            <Toast.Header>
                                {img}
                                <strong className="me-auto">{titre}</strong>
                                {/* <small>Maintenant</small> */}
                            </Toast.Header>
                            <Toast.Body>{message}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                {/* </Col> */}
                {/* <Col xs={6}> */}
                    {button}
                {/* </Col> */}
            {/* </Row> */}
      </>
    )
}

export default Confirmation


