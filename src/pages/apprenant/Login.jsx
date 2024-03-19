import React, { useState } from 'react'
import { Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import illustration6 from "../../img/illustration6.png"
import "../../styles/Login.css"
import { CgProfile } from 'react-icons/cg';
import { instance } from '../../axios';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';

const Login = () => {
    const [formDataError, setFormDataError] = useState({});
    const [vue, setVue] = useState("password")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useNavigate();

    const [formData, setFormData] = useState({
        mail: "",
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
            errors.mdp = 'Les mots de passe sont requis.';
        } 
        
        if (!formData.mail) {
            errors.mail = 'Le mail est requis.';
        } 
        
        
        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
            setLoading(false)
        } else {
          setFormDataError({});
            console.log('Données valides :', formData);
            
          try {
            const response = await instance.post('api/auth/login-apprenant', {
              mail: formData.mail,
              mdp: formData.mdp,
            });
            // setLoading(true)
          
              if (response.status === 200) {
                const token = response.data.accessToken;
                instance.get('apprenant/by-mail', {
                    params: {
                    mail: formData.mail
                    }
                })
                    .then(response => {
                        console.log(response.data.fraisInscription)
                        console.log(response.data.abonnmentExpiryDate)
                        console.log(response.data.fraisInscription, 15000);
                        console.log(typeof (response.data.fraisInscription), typeof (15000));
                        // if (response.data.abonnmentExpiryDate < new Date()) {
                        //     console.log('oui');
                        //     localStorage.setItem("token", token);
                        //     history('/inscription/accueil-paiement');
                        // } else
                        // {
                        if (response.data.changeMdp === true) {
                            localStorage.setItem("token", token);
                            history('/apprenant/moncompte'); // Utilisez 'push' au lieu de 'history' pour rediriger
                            console.log('Token reçu :', token);
                            // Autres traitements avec le token
                        } else {
                            localStorage.setItem("token", token);
                            history('/reset/mot-de-passe'); // Utilisez 'push' au lieu de 'history' pour rediriger
                            console.log('Token reçu :', token);
                            // Autres traitements avec le token
                        }
                        // }
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des données :', error);
                        // history('/login');
                    });
            //   const token = response.data.accessToken;
            //   localStorage.setItem("token", token);
            //   history('/apprenant/moncompte'); // Utilisez 'push' au lieu de 'history' pour rediriger
            //   console.log('Token reçu :', token);
              // Autres traitements avec le token
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
          {/* <div className="conteneur-login">
              <div className="conteneur-form-login" >
                  <Row >
                      <Col xs={12} sm={12} md={6} lg={6} style={{ background: 'cyan' }}>jkjhkhkj</Col>
                      <Col xs={12} sm={12} md={6} lg={6} style={{padding: 30 }}>
                      <p className="fw-bolder" style={{fontSize: 18, color: "#B60520" }}>Connexion</p>
                      <div className="line"></div>
                        
                      </Col>
                      </Row>
                      </div>
                    </div> */}
          
          <div className="body bg-body p-3">
              <div className="container d-flex justify-content-center align-items-center min-vh-100">
                  <div className="row border rounded-5 py-3 px-2 bg-white  box-area">
                      <div className="col-md-6 rounded-5 d-flex justify-content-center  flex-column left-box" >
                          <div className="featured-image rounded-5">
                              <img src={illustration6} alt='' className="img-fluid rounded-5" style={{ width: 390, }} />
                          </div>
                          {/* <p className="text-white fs-2" style={{ fontFamily: 'Courier New, Courier, monospace', fontWeight: 600 }}>Be Verified</p>
                          <small className="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: 'Courier New, Courier, monospace' }}>Join experienced Designers on this platform.</small> */}
                      </div> 
        
                      <div className="col-md-6 right-box">
                          <div className="row align-items-center">
                              <div className="header-text mb-4">
                                  <h2 className='text-center py-3 mb-5' style={{color: '#B60520', border: '5px solid #B60520', borderRadius: 60, backgroundColor: "white", fontSize: 25}}><CgProfile size={50} /> Connexion</h2>
                                  <p className='text-center'>Nous sommes heureux de vous retrouver.</p>
                                </div>
                              {/* <img src={profil} width={10} alt="" /> */}
                              
                              <Form onSubmit={handleSubmit}>
                                  <Row className="mb-3">
                                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                          {/* <Form.Label>Adresse E-mail</Form.Label> */}
                                          <Form.Control
                                              type='mail'
                                              name="mail"
                                              onChange={handleChange}
                                              value={formData.mail}
                                              isInvalid={!!formDataError.mail}
                                              placeholder='Adresse e-mail'
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {formDataError.mail}
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
                                      <div className="input-group mb-2 mt-3 d-flex justify-content-between">
                                          <div className="form-check">
                                              <input type="checkbox" className="form-check-input" id="formCheck" />
                                              <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Se souvenir de moi</small></label>
                                          </div>
                                          <div className="forgot">
                                              <small><Link to={`/login/mot-passe-oublie`}>Mot de passe oublié??</Link></small>
                                          </div>
                                      </div>
                                      {/* {error && (
                                          <Alert className='p-2 pb-0' style={{textAlign: "justify"}} variant="danger">
                                              <p>
                                                  {error}
                                              </p>
                                          </Alert>
                                      )} */}
                                      {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ fontSize: 15 }}>
                                          {error}
                                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                                      </div> : ''}
                                      <div className="input-group mb-3">
                                          <button style={{background: "#B60520", color: "white"}} className="btn btn-lg w-100 fs-6" type='submit'>{loading ? <Spinner size='sm' animation="border" /> : 'Connexion'}</button>
                                      </div>
                                  </Row>
                              </Form>
                
                              {/* <div className="input-group mb-3">
                                  <button className="btn btn-lg btn-light w-100 fs-6">
                                      <img src={illustration3} style={{ width: 20 }} alt='' className="me-2" /><small>Sign In with Google</small>
                                  </button>
                              </div> */}
                              <div className="row">
                                  <small style={{ fontSize: 17, fontWeight: 300 }}>Vous n'avez pas de compte? <Link style={{ fontSize: 17, fontWeight: 300 }} to={`/formulaire-inscription`}>S'inscrire</Link></small>
                              </div>
                          </div>
                          <CustomizedSnackbars status={`error`} open={open} handleClose={handleClose} text='Erreur réseau' />
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Login
