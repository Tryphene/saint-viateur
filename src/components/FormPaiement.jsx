import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';

const FormPaiement = ({formPaiement, setFormPaiement, formDataError, setFormDataError}) => {
    // const [formDataError, setFormDataError] = useState({});

    // const [formPaiement, setFormPaiement] = useState({
    //     moyenPaiement: 'Orange money',
    //     numero: "",
    //     date: "",
    //     montant: "",
    // });

    const reset = () => {
        const intialiseForm = {
            moyenPaiement: 'Orange money',
            numero: "",
            date: "",
            montant: "",
        };
        setFormDataError({});
        setFormPaiement(intialiseForm)
    }

    const handleChange = (event) => {
          setFormPaiement({
            ...formPaiement,
            [event.target.name]: event.target.value,
          });
    };
    
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const errors = {};
        
    //     if (!formPaiement.moyenPaiement) {
    //         errors.moyenPaiement = 'Le moyen de paiement est requis.';
    //     }
  
    //     if (!formPaiement.montant) {
    //         errors.montant = 'Le montant est requis.';
    //     }

    //     if (!formPaiement.numero) {
    //         errors.numero = 'Le numéro mobile money est requis.';
    //     } else if (formPaiement.numero.length !== 10) {
    //         errors.numero = 'Veuilez saisir les 10 chiffres de votre numero Svp !';
    //     }
    //     else {
    //         if (formPaiement.moyenPaiement === 'Orange money') {
    //             if (!formPaiement.numero.startsWith("07")) {
    //                 errors.numero = 'Le numéro saisi n\'est pas orange';
    //             } 
                
    //         } else if (formPaiement.moyenPaiement === 'Moov money') {
    //             if (!formPaiement.numero.startsWith("01")) {
    //                 errors.numero = 'Le numéro saisi n\'est pas moov';
    //             } 
                
    //         } else if (formPaiement.moyenPaiement === 'Mtn money') {
    //             if (!formPaiement.numero.startsWith("05")) {
    //                 errors.numero = 'Le numéro saisi n\'est pas mtn,';
    //             } 
                
    //         }
    //     }
        
        
    //     if (!formPaiement.date) {
    //         errors.date = 'La date est requise.';
    //     }

    //     if (Object.keys(errors).length > 0) {
    //         setFormDataError(errors);
    //       } else {
    //         setFormDataError({});
    //         console.log(formPaiement.numero.length);
    //         console.log(typeof(formPaiement.numero.length));
    //         console.log('Données valides :', formPaiement);
    //         console.log(formPaiement);
    //         // instance.post("categorie-cours/create", formPaiement)
    //         //     .then(response => {
    //         //         console.log('Enregistrement réussi :', response.data);
    //         //         // window.location.reload();
    //         //     })
    //         //     .catch(error => {
    //         //         console.error('Erreur lors de l\'enregistrement :', error);
    //         //     });
    //           reset()
    //       }
    // }
    return (
        <>
            <Row >
                <Col xs={12} sm={12} md={12} lg={12}>
                    {/* <div className="d-flex justify-content-between mb-3 p-2 rounded-2" style={{ alignItems: "center", justifyItems: "center", backgroundColor: '#DCFCE7' }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Formulaire de Paiement</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Paiement de la scolarité via mobile money</p>
                            </div>
                        </div> */}
                        {/* <Form onSubmit={handleSubmit} className='w-100 p-3'> */}
                        <Form className='w-100 p-3'>
                            <Row className='mb-3'>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Moyen Paiement</Form.Label>
                                    <Form.Select isInvalid={!!formDataError.moyenPaiement} aria-label="Default select example" id="status" value={formPaiement.moyenPaiement} name="moyenPaiement" onChange={handleChange}>
                                        <option value="Orange money">Orange money</option>
                                        <option value="Moov money">Moov money</option>
                                        <option value="Mtn money">Mtn money</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.moyenPaiement}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Numéro</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numero"
                                        onChange={handleChange}
                                        value={formPaiement.numero}
                                        isInvalid={!!formDataError.numero}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.numero}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        readOnly
                                        type="date"
                                        name="date"
                                        onChange={handleChange}
                                        value={formPaiement.date}
                                        isInvalid={!!formDataError.date}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.date}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Montant</Form.Label>
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        name="montant"
                                        onChange={handleChange}
                                        value={formPaiement.montant}
                                        isInvalid={!!formDataError.montant}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.montant}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            {/* <Button variant='success' className='me-3' type="submit">Payer</Button> */}
                            <Button onClick={() => {reset()}} variant='danger'>Effacer le formulaire</Button>
                        </Form>
                </Col>
            </Row>
        </>
    )
}

export default FormPaiement
