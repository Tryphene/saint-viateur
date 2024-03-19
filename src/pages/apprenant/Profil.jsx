import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { ApprenantContext } from '../../context/ApprenantContext'
import user from "../../img/user.png";
import moment from 'moment';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { instance } from '../../axios';

const Profil = () => {
    const { apprenant } = useContext(ApprenantContext)
    const [formDataError, setFormDataError] = useState({});

    const [vue, setVue] = useState("password")
    const [vue2, setVue2] = useState("password")
    // const [error, setError] = useState("password")
    const [emailMdpExist, setEmailMdpExist] = useState(false)
    
    const [mdp2, setMdp2] = useState("")

    const [formData, setFormData] = useState({
        nom: apprenant.nom,
        prenom: apprenant.prenom,
        dteNaissance: apprenant.dteNaissance,
        dteInscription: apprenant.dteInscription,
        lieuNaissance: apprenant.lieuNaissance,
        profession: apprenant.profession,
        nvScolaire: apprenant.nvScolaire,
        mail: apprenant.mail,
        mdp: "",
        status: apprenant.status,
        telephoneDomicile: apprenant.telephoneDomicile,
        telephoneMobile: apprenant.telephoneMobile,
        testIsChecked: apprenant.testIsChecked,
        scolarite: apprenant.scolarite,
        scolaritePayé: apprenant.scolaritePayé,
    });

    const reset = () => {
        const intialiseForm = {
            nom: apprenant.nom,
            prenom: apprenant.prenom,
            dteNaissance: apprenant.dteNaissance,
            dteInscription: apprenant.dteInscription,
            lieuNaissance: apprenant.lieuNaissance,
            profession: apprenant.profession,
            nvScolaire: apprenant.nvScolaire,
            mail: apprenant.mail,
            mdp: "",
            status: apprenant.status,
            telephoneDomicile: apprenant.telephoneDomicile,
            telephoneMobile: apprenant.telephoneMobile,
            testIsChecked: apprenant.testIsChecked,
            scolarite: apprenant.scolarite,
            scolaritePayé: apprenant.scolaritePayé,
        };
        setMdp2("")

        setFormData(intialiseForm)
    }

    const handleChange = (event) => {
        if (event.target.type === "checkbox") {
          setFormData({
            ...formData,
            [event.target.name]: event.target.checked,
          });
        } else {
          setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
        }
      };

    const verifMdp = () => {
        instance.get('apprenant/exist-mail-mdp', {
                params: {
                mail: formData.mail,
                mdp: mdp2
                },
            })
                .then(response => {
                    setEmailMdpExist(response.data)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
    }
    
    useEffect(() => {
        verifMdp()
    }, [mdp2, formData.mail])

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};
        
        if (!formData.nom) {
            errors.nom = 'Le nom est requis.';
        }
  
        if (!formData.prenom) {
            errors.prenom = 'Le prénom est requis.';
        }
  
        if (!formData.dteNaissance) {
            errors.dteNaissance = 'Le date de naisance est requise.';
        }
  
        if (!formData.lieuNaissance) {
            errors.lieuNaissance = 'Le lieu de naissance est requis.';
        }
  
        if (!formData.profession && !formData.nvScolaire) {
            errors.profession = 'Veuillez rentrer votre profession ou niveau scolaire SVP!';
        }

        if (!formData.mdp && mdp2) {
            errors.mdp = 'L\'ancien mot de passe est requis.';

            if (emailMdpExist === false) {
                errors.mdp2 = "Le mot de passe saisi n'est pas correcte !";
            }
        } else if (formData.mdp && !mdp2) {
            errors.mdp = 'Le nouveau mot de passe est requis.';

            if (emailMdpExist === false) {
                errors.mdp2 = "Le mot de passe saisi n'est pas correcte !";
            }
        }

        if (mdp2 && formData.mdp) {
            if (emailMdpExist === false) {
                errors.mdp2 = "Le mot de passe saisi n'est pas correcte !";
            }
        }

        
  
    //     if (!formData.telephoneMobile) {
    //       errors.telephoneMobile = 'Le numéro mobile est requis!';
    //   }
  
        if (!formData.mail) {
            errors.mail = 'Le mail est requis.';
        } 
        
        const post = (url, form) => {
          instance.put(url, form)
          .then(response => {
            console.log('Données mises à jour avec succès:', response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour des données:', error);
          });
        }
  
  
      if (Object.keys(errors).length > 0) {
        setFormDataError(errors);
      } else {
          setFormDataError({});
          console.log('Données valides :', formData);
          if (formData.mdp) {
              post(`apprenant/update-all/${apprenant.id}`, formData)
            } else {
              post(`apprenant/update/${apprenant.id}`, formData)
          }
        reset()
      }
    };
      
      const handleChangeMdp = (event) => {
          setMdp2(event.target.value)
      }
  return (
      <>
          {apprenant.fraisInscription === 0 ? "" :
              (
                <Row>
                <Col xs={12} sm={12} md={3} lg={3}>
                    <div className="contt m-3 p-3" style={{boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)"}}>
                        <div className="px-5 pt-3 pb-5">
                            <p style={{fontSize: 20, fontWeigth: 500}} className="text-center pb-2"><b>{apprenant.prenom} {apprenant.nom}</b></p>
                            <center>
                                <img src={user} width={130} alt="" />
                            </center>
                        </div>
                        <hr />
                        <p style={{ fontSize: 15, fontWeigth: 200 }} className="text-center px-2">
                            Membre depuis le <b>{moment(apprenant.dteInscription).format('D MMMM YYYY')} </b>
                        </p>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={8} lg={8}>
                    <div className="contt m-3" style={{boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)"}}>
                        <div className="px-5 pt-3 pb-5">
                        <p className="fw-bolder pb-2" style={{ fontSize: 22, color: "black" }}>Modifier mon profil</p>
                        <Form onSubmit={handleSubmit}>
                              <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                      <Form.Label>Nom</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="nom"
                                          onChange={handleChange}
                                          value={formData.nom}
                                          isInvalid={!!formDataError.nom}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                          {formDataError.nom}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                      <Form.Label>Prénom(s)</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="prenom"
                                          onChange={handleChange}
                                          value={formData.prenom}
                                          isInvalid={!!formDataError.prenom}
                                      />
                                      <Form.Control.Feedback type="invalid"> 
                                          {formDataError.prenom}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={4} lg={4} controlId="validationCustomUsername">
                                      <Form.Label>Date de Naissance</Form.Label>
                                      <InputGroup hasValidation>
                                          <Form.Control
                                              type="date"
                                              name="dteNaissance"
                                              onChange={handleChange}
                                              value={formData.dteNaissance}
                                               aria-describedby="inputGroupPrepend"
                                               isInvalid={!!formDataError.dteNaissance}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {formDataError.dteNaissance}
                                          </Form.Control.Feedback>
                                      </InputGroup>
                                  </Form.Group>
                                  <Form.Group as={Col} xs={12} sm={12} md={8} lg={8} controlId="validationCustomUsername">
                                      <Form.Label>Lieu</Form.Label>
                                      <InputGroup hasValidation>
                                          <Form.Control
                                              type="text"
                                              name="lieuNaissance"
                                              onChange={handleChange}
                                              value={formData.lieuNaissance}
                                              aria-describedby="inputGroupPrepend"
                                              isInvalid={!!formDataError.lieuNaissance}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {formDataError.lieuNaissance}
                                          </Form.Control.Feedback>
                                      </InputGroup>
                                  </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                      <Form.Label>Profession</Form.Label>
                                      <Form.Control
                                          placeholder='Pour les travailleurs'
                                          type="text"
                                          name="profession"
                                          onChange={handleChange}
                                          value={formData.profession}
                                          isInvalid={!!formDataError.profession}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                          {formDataError.profession}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="">
                                      <Form.Label>Niveau scolaire</Form.Label>
                                      <Form.Control
                                          placeholder='Pour les etudiants, élèves, ...'
                                          type="text"
                                          name="nvScolaire"
                                          onChange={handleChange}
                                          value={formData.nvScolaire}
                                          isInvalid={!!formDataError.profession}
                                      />
                                  </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                      <Form.Label>Adresse E-mail</Form.Label>
                                      <Form.Control
                                        type='mail'
                                        readOnly
                                          name="mail"
                                          onChange={handleChange}
                                          value={formData.mail}
                                          isInvalid={!!formDataError.mail}
                                      />
                                      <Form.Control.Feedback type="invalid"> 
                                          {formDataError.mail}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                      <Form.Label>Ancien mot de passe</Form.Label>
                                      <InputGroup hasValidation>
                                          <Form.Control
                                              type={vue2}
                                              name="mdp2"
                                              onChange={handleChangeMdp}
                                              value={mdp2}
                                              isInvalid={!!formDataError.mdp2}
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
                                            <Form.Control.Feedback type="invalid"> 
                                              {formDataError.mdp2}
                                          </Form.Control.Feedback>
                                      </InputGroup>
                                  </Form.Group>
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                        <Form.Label>Nouveau mot de passe</Form.Label>
                                        <InputGroup hasValidation>
                                          <Form.Control
                                              type={vue}
                                              name="mdp"
                                              onChange={handleChange}
                                              value={formData.mdp}
                                              isInvalid={!!formDataError.mdp}
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
                              </Row>
                              <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                      <Form.Label>Télephone Domicile</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="telephoneDomicile"
                                          onChange={handleChange}
                                          value={formData.telephoneDomicile}
                                          placeholder='Facultatif'
                                      />
                                  </Form.Group>
                                  <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                      <Form.Label>Télephone Mobile</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="telephoneMobile"
                                          onChange={handleChange}
                                          value={formData.telephoneMobile}
                                          isInvalid={!!formDataError.telephoneMobile}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                          {formDataError.telephoneMobile}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                              </Row>
                              <Button type="submit">Submit form</Button>
                          </Form>
                        </div>
                    </div>
                </Col>
            </Row>
          )}
      </>
  )
}

export default Profil
