import React, { useState } from 'react'
import { Alert, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import illustration6 from "../../img/illustration6.png"
import design from "../../img/design.png"
import "../../styles/Login.css"
import { CgProfile } from 'react-icons/cg';
import { instance } from '../../axios';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';

const LoginAdmin = () => {
    const [formDataError, setFormDataError] = useState({});

    const [vue, setVue] = useState("password")

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const history = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        mdp: ""
    });

    const handleChange = (event) => {
          setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }

      setOpen(false);
  };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = {};
        setLoading(true)

        
        if (!formData.mdp) {
            errors.mdp = 'Le mots de passe edt requis.';
            setLoading(false)
        } 
        
        if (!formData.email) {
            errors.email = 'Le mail est requis.';
            setLoading(false)
        } 

  
      if (Object.keys(errors).length > 0) {
        setFormDataError(errors);
      } else {
          setFormDataError({});
          console.log('Données valides :', formData);
          try {
            const response = await instance.post('api/auth/login-admin', {
              email: formData.email,
              mdp: formData.mdp,
            });
              
            setLoading(false)
            
            if (response.status === 200) {
              const token = response.data.accessToken;
              localStorage.setItem("tokken", token);
              history('/administration'); // Utilisez 'push' au lieu de 'history' pour rediriger
                  console.log('Token reçu :', token);
                  
            //   Autres traitements avec le token
            } else {
              console.log('Réponse d\'erreur :', response.data);
              // Traitez le message d'erreur ou l'échec de la connexion ici
            }
        } catch (error) {
            //   console.error('Erreur lors de la connexion', error);
            console.log('Réponse d\'erreur :', error.message);
            if (error.message === "Network Error") {
                setLoading(false)
                setOpen(true)
            } else {
                setError(error.response.data)
                setLoading(false)
            }
            // Traitez les erreurs de requête ici (par exemple, problème de connexion, serveur hors ligne, etc.)
          }
          
      }
    };

    return (
      <>
          <div className="body bg-body">
              <div className="container d-flex justify-content-center align-items-center min-vh-100">
                  <div className="row border rounded-5 p-3 bg-white  box-area">
                      {/* <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ backgroundImage: `url(${design})`, backgroundSize: 'cover' }}> */}
                      <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
                          <small className="text-wrap text-center" style={{ width: 30, fontFamily: 'Courier New, Courier, monospace' }}>Administration</small>
                      {/* <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"> */}
                          <div className="featured-image">
                              <img src={design} alt='' className="img-fluid" style={{ width: 500 }} />
                          </div>
                        {/* <p className="fs-2" style={{ fontFamily: 'Courier New, Courier, monospace', fontWeight: 600 }}>Administration</p> */}
                        </div> 
                      <div className="col-md-6 right-box">
                          <div className="row align-items-center">
                              <div className="header-text mt-5 mb-4">
                                  <h4>Connexion</h4>
                                </div>
                              
                              <Form onSubmit={handleSubmit}>
                                  <Row className="mb-3">
                                      <Form.Group className='rounded-3' as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                          {/* <Form.Label>Adresse E-mail</Form.Label> */}
                                            <Form.Control
                                              type='mail'
                                              name="email"
                                              onChange={handleChange}
                                              value={formData.email}
                                              isInvalid={!!formDataError.email}
                                              placeholder='Adresse e-mail'
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {formDataError.email}
                                          </Form.Control.Feedback>
                                      </Form.Group>
                                  </Row>
                                  <Row className="mb-3">
                                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom02">
                                          {/* <Form.Label>Mot de passe</Form.Label> */}
                                          <InputGroup hasValidation>
                                              <Form.Control
                                                  type={vue}
                                                  name="mdp"
                                                  onChange={handleChange}
                                                  value={formData.mdp}
                                                  isInvalid={!!formDataError.mdp}
                                                  placeholder='Mot de passe'
                                              />
                                              {
                                                  vue === "password" ?
                                                      <button
                                                          className="btn btn-outline-secondary"
                                                          onClick={() => setVue('text')}
                                                          type="button" id="button-addon2">
                                                          <BsEyeFill />
                                                      </button> :
                                                      <button
                                                          className="btn btn-outline-secondary"
                                                          onClick={() => setVue('password')}
                                                          type="button" id="button-addon2">
                                                          <BsEyeSlashFill />
                                                      </button>
                                              }
                                              <Form.Control.Feedback type="invalid"> 
                                                  {formDataError.mdp}
                                              </Form.Control.Feedback>
                                          </InputGroup>
                                      </Form.Group>
                                      <div className="input-group mb-2 mt-4 d-flex justify-content-between">
                                          <div className="form-check">
                                              <input type="checkbox" className="form-check-input" id="formCheck" />
                                              <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Se souvenir de moi</small></label>
                                          </div>
                                      </div>
                                      {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ fontSize: 15 }}>
                                          {error}
                                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                                      </div> : ''}
                                      <div className="input-group my-5">
                                          <button style={{background: "#6995DB", color: "white"}} className="btn btn-lg w-100 fs-6" type='submit'>{loading ? <Spinner size='sm' animation="border" /> : 'Connexion'}</button>
                                      </div>
                                  </Row>
                              </Form>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <CustomizedSnackbars status={`error`} open={open} handleClose={handleClose} text='Erreur réseau' />
      </>
  )
}

export default LoginAdmin
