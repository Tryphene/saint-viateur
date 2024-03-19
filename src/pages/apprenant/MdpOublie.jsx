import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import illustration6 from "../../img/illustration6.png"
import { instance } from '../../axios';
import axios from "axios"
import back from '../../img/back.png'
import { Link } from 'react-router-dom';

const MdpOublie = () => {
    const [formData, setFormData] = useState({
        email: "",
    });

    const [formDataError, setFormDataError] = useState({});
    const [success, setSuccess] = useState(false);
    // const [error, setError] = useState('')

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const [emailExist, setEmailExist] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const existMail = () => {
            instance.get('apprenant/exist-mail', {
                params: {
                    mail: formData.email
                }
            })
                .then(response => {
                    setEmailExist(response.data)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };
        
        existMail()

    }, [formData.email])

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};

        
        if (!formData.email) {
            errors.email = 'Le mail est requis.';
        } else {
            if (!isValidEmail(formData.email)) {
                errors.email = "L'email n'est pas valide.";
              } else {
                  if (!emailExist) {
                      errors.email = "Aucun apprenant enregistré avec cette adresse e-mail"
                  }
              }
        }

        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
        } else {
            setFormDataError({});
            // console.log('Données valides :', formData);
            setLoading(true)
  
            instance.post("apprenant/request-reset", formData)
                .then(response => {
                    console.log('Email envoyé avec succès :', response.data);
                    setSuccess(true)
                    setLoading(false)

                    instance.get('apprenant/get-passwordResetTokenByMail', {
                        params: {
                            mail: formData.email
                        }
                    })
                        .then(response => {
                            // console.log(response.data)
                            console.log("Yes");
                        })
                        .catch(error => {
                            console.error('Erreur lors de la récupération des données :', error);
                        });
                })
                .catch(error => {
                    console.error('Erreur d\'envoi :', error);
                    setSuccess(false)
                    // setError(error.response.data);
                    // errors.email = error.response.data;
                });
        }
        
    }
  return (
      <>
          <div className="body bg-body p-3">
              <div className="container d-flex justify-content-center align-items-center min-vh-100">
                  <div className="row border rounded-5 py-3 px-2 bg-white  box-area">
                      <div className="col-md-6 rounded-5 d-flex justify-content-center  flex-column left-box" >
                          <div className="featured-image rounded-5">
                              <img src={illustration6} alt='' className="img-fluid rounded-5" style={{ width: 390, }} />
                          </div>
                      </div> 
        
                      <div className="col-md-6 right-box">
                          <div className="row align-items-center">
                              <div className="header-text mb-4">
                                  <Link to={`/login`} className='i' >
                                      <img src={back} width={18} alt='' />
                                  </Link>
                                  <h2 className='text-center py-3 mb-5' style={{color: '#B60520', fontSize: 25}}> Mot de passe oublié</h2>
                                  {/* <p className='text-center'>Nous sommes heureux de vous retrouver.</p> */}
                              </div>
                              {success ? <div className="alert alert-success alert-dismissible fade show" role="alert" style={{fontSize: 15}}>
                                  Nous vous avons envoyé par email le lien de réinitialisation du mot de passe !
                                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{width: 10}}></button>
                              </div> : ""}
                              {/* <img src={profil} width={10} alt="" /> */}
                              
                              <Form onSubmit={handleSubmit}>
                                  <Row className="mb-3">
                                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                          {/* <Form.Label>Adresse E-mail</Form.Label> */}
                                          <Form.Control
                                              type='mail'
                                              name="email"
                                              onChange={handleChange}
                                              value={formData.email}
                                              isInvalid={!!formDataError.email}
                                              placeholder='Adresse e-email'
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {formDataError.email}
                                          </Form.Control.Feedback>
                                      </Form.Group>
                                  </Row>
                                  <Row className="mb-3">
                                      <div className="input-group mb-3">
                                          <button style={{background: "#B60520", color: "white"}} className="btn btn-lg w-100 fs-6" type='submit'>{loading ? <Spinner size='sm' animation="border" /> : 'Envoyer'}</button>
                                      </div>
                                  </Row>
                              </Form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default MdpOublie