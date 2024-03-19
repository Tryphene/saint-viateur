import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import img from "../../img/imgFond6.png"
import img from "../../img/imgFond9.png"
// import { BiCheckCircle } from 'react-icons/bi'
import { FaLocationPin } from 'react-icons/fa6'
import { instance } from '../../axios';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';

const PageContact = () => {
    const [formDataError, setFormDataError] = useState({})

    const [formContact, setFormContact] = useState({
        nomPrenom: "",
        sujet: "",
        email: "",
        message: "",
    })

    const handleChange = (event) => {
          setFormContact({
            ...formContact,
            [event.target.name]: event.target.value,
          });
    };

    const post = (url, form) => {
        instance.post(url, form)
            .then(response => {
            // setSuccess(true)
            console.log(response.data);
        })
        .catch(error => {
            // setSuccess(false)
          console.error('Erreur lors de l\'enregistrement :', error);
        });
      }

    const mailAcceptation = {
        from: formContact.email,
        subject: formContact.sujet,
        text: formContact.message
    }

    const reset = () => {
        const intialiseForm = {
            nomPrenom: "",
            sujet: "",
            email: "",
            message: ""
        };
    
        setFormContact(intialiseForm)
    }

const handleSubmit = (event) => {
    event.preventDefault()
    const errors = {}
    
    if (!formContact.nomPrenom) {
        errors.nomPrenom = 'Veuillez saisir vos nom et prénom(s) SVP!';
    }
    
    if (!formContact.sujet) {
        errors.sujet = 'Veuillez saisir votre sujet SVP!';
    }
    
    if (!formContact.email) {
        errors.email = 'Veuillez saisir une email SVP!';
    }

    if (Object.keys(errors).length > 0) {
        console.log(formContact)
        setFormDataError(errors);
    } else {
        setFormDataError({});
        console.log('Données valides :', formContact);
        post('envoie-email-contact', mailAcceptation)
        reset()
    }
}

    

    return (
        <>
            <div className="containerr" >
                <img className="image" style={{ height: 250 }} src={img} alt="" />
                {/* <div className="text-overlay" style={{ fontWeight: 700, fontSize: 35, background: "rgba(182, 5, 31, 0.889)" }}> */}
                <div className="text-overlay" style={{ fontWeight: 700, fontSize: 35}}>
                    Contact
                </div>
            </div>
            {/* <div className="" style={{background: "red", height: 250}}></div> */}
            <div className="container-page-contact">
                <Container className='py-5 conteneur-ins'>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={4}>
                            <p className="mb-1" style={{ fontSize: 20, fontWeight: 600 }}>Contact info</p>
                            <p  className="mb-5 text-muted" style={{ fontSize: 14, fontWeight: 400 }}>Des informations qui vous sauront utils</p>
                            {/* <div className="line mb-5"></div> */}
                            <Row className='mb-5'>
                                <Col xs={3} sm={3} md={3} lg={3} className="d-flex justify-content-center align-items-center" style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.5)", width: 60, height: 60, borderRadius: 50 }}>
                                    <FaLocationPin color="#B60520" size={20} />
                                </Col>
                                <Col xs={9} sm={9} md={9} lg={9} className="d-flex justify-content-start align-items-center">
                                    <p className='px-3' style={{fontSize: 15}}>Rivera palmeraie, à 100m du rond point saint viateur en allant sur la voie de la PSV</p>
                                </Col>
                            </Row>
                            <Row className='mb-5'>
                                <Col xs={3} sm={3} md={3} lg={3} className="d-flex justify-content-center align-items-center" style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.5)", width: 60, height: 60, borderRadius: 50 }}>
                                    <HiMail color="#B60520" size={24} />
                                </Col>
                                <Col xs={9} sm={9} md={9} lg={9} className="d-flex justify-content-start align-items-center">
                                    <p className='px-3' style={{fontSize: 15}}>contact@viateur-ci.site</p>
                                </Col>
                            </Row>
                            <Row className='mb-5'>
                                <Col xs={3} sm={3} md={3} lg={3} className="d-flex justify-content-center align-items-center" style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.5)", width: 60, height: 60, borderRadius: 50 }}>
                                    <BsFillTelephoneFill color="#B60520" size={20} />
                                </Col>
                                <Col xs={9} sm={9} md={9} lg={9} className="d-flex justify-content-start align-items-center">
                                    <p className='px-3' style={{fontSize: 15}}>+225 07 00 15 63 09</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={8} className='ps-5' style={{ borderLeft: "1px solid #EEEEEE", }}>
                            <p  className="mb-1" style={{ fontSize: 20, fontWeight: 600 }}>Laissez Votre Message</p>
                            {/* <div className="line mt-0"></div> */}
                            <p  className="mb-5 text-muted" style={{ fontSize: 14, fontWeight: 400 }}>N'hésitez pas à nous contacter en utilisant le formulaire ci-dessous</p>
                            <Form>
                                <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                                    <Form.Label>Nom & Prénom(s)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nomPrenom"
                                        onChange={handleChange}
                                        value={formContact.nomPrenom}
                                        isInvalid={!!formDataError.nomPrenom}
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        {formDataError.nomPrenom}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={formContact.email}
                                        isInvalid={!!formDataError.email}
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        {formDataError.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Sujet</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sujet"
                                        onChange={handleChange}
                                        value={formContact.sujet}
                                        isInvalid={!!formDataError.sujet}
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        {formDataError.sujet}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            // placeholder="Leave a comment here"
                                            style={{ height: '400px' }}
                                            name="message"
                                            onChange={handleChange}
                                            value={formContact.message}
                                            isInvalid={!!formDataError.message}
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                            {formDataError.message}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} xs={12} sm={12} md={12} lg={4} controlId="validationCustom01">
                                        <button style={{ backgroundColor: "#B60520" }} onclick={handleSubmit}>Envoyer message</button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default PageContact
