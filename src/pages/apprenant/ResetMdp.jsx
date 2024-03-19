import React, { useState } from 'react'
import { Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import illustration6 from "../../img/illustration6.png"
import { instance } from '../../axios';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ResetMdp = () => {
    const currentUrl = window.location.href;
    
    const url = new URL(currentUrl);
    const token = url.searchParams.get('token');

    const [formData, setFormData] = useState({
        newPassword: "",
        token
    });

    const [formDataError, setFormDataError] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [msgSuccess, setMsgSuccess] = useState('');
    const [vue, setVue] = useState("password")
    const [vue2, setVue2] = useState("password")
    
    const [mdp2, setMdp2] = useState("")
    const [loading, setLoading] = useState(false)


    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
    
    const handleChangeMdp = (event) => {
        setMdp2(event.target.value)
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};

        
        if (!formData.newPassword || !mdp2) {
            errors.newPassword = 'Les mots de passe sont requis.';
        } else {
            if (formData.newPassword !== mdp2) {
              errors.newPassword = 'Les mots de passe ne correspondent pas!';
            }
        }

        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
        } else {
            setFormDataError({});
            console.log('Données valides :', formData);
            setLoading(true)
  
            instance.post("apprenant/reset-password", formData)
                .then(response => {
                    console.log('Email envoyé avec succès :', response.data);
                    setMsgSuccess(response.data)
                    setSuccess(true)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur d\'envoi :', error);
                    setSuccess(false)
                    setError(error.response.data.message);
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
                                  <h2 className='text-center py-3 mb-5' style={{color: '#B60520', fontSize: 25}}>Nouveau mot de passe !</h2>
                                  {/* <p className='text-center'>Nous sommes heureux de vous retrouver.</p> */}
                              </div>
                              {success ? <div className="alert alert-success alert-dismissible fade show" role="alert" style={{fontSize: 15}}>
                                  {msgSuccess} <Link to={`/login`} className="alert-link">Se connecter</Link>
                                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{width: 10}}></button>
                              </div> : ''}
                              {/* <img src={profil} width={10} alt="" /> */}
                              <Form onSubmit={handleSubmit}>
                                  <Row className="mb-3">
                                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                          <Form.Label>Mot de passe</Form.Label>
                                          <InputGroup hasValidation>
                                              <Form.Control
                                                  type={vue}
                                                  name="newPassword"
                                                  onChange={handleChange}
                                                  value={formData.newPassword}
                                                  isInvalid={!!formDataError.newPassword}
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
                                                  {formDataError.newPassword}
                                              </Form.Control.Feedback>
                                          </InputGroup>
                                      </Form.Group>
                                  </Row>
                                  <Row className="mb-3">
                                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                          <Form.Label>Confirmation du mot de passe</Form.Label>
                                          <InputGroup hasValidation>
                                              <Form.Control
                                                  type={vue2}
                                                  name="mdp2"
                                                  onChange={handleChangeMdp}
                                                  value={mdp2}
                                                  isInvalid={!!formDataError.newPassword}
                                              />
                                              {
                                                  vue2 === "password" ?
                                                      <button
                                                          className="btn btn-outline-secondary"
                                                          onClick={() => setVue2('text')}
                                                          type="button" id="button-addon2">
                                                          <BsEyeFill />
                                                      </button> :
                                                      <button
                                                          className="btn btn-outline-secondary"
                                                          onClick={() => setVue2('password')}
                                                          type="button" id="button-addon2">
                                                          <BsEyeSlashFill />
                                                      </button>
                                              }
                                          </InputGroup>
                                      </Form.Group>
                                  </Row>
                                  {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ fontSize: 15 }}>
                                      {error}
                                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                                  </div> : ''}
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

export default ResetMdp