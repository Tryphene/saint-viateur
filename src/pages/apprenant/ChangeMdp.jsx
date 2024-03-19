import React, { useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import logo from "../../img/logo.png"
import { instance } from '../../axios'
import { useNavigate } from 'react-router-dom'

const ChangeMdp = () => {
    const [email, setEmail] = useState('');
    const [selectt, setSelectt] = useState(0);
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const [ apprenant, setApprenant] = useState([])


    if (!localStorage.getItem('selectt')) {
        localStorage.setItem("selectt", selectt)
    }

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        if (token) {
          return { 'Authorization': 'Bearer ' + token };
        }
        return {};
    };
    
    useEffect(() => {
        const fetchData = () => {
          instance.get('api/auth/user', {headers: getAuthHeaders()})
              .then(response => {
                  setEmail(response.data.username);
                  setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                    setApprenant([])
                    history('/login');
            });
        };
        
        fetchData();
    }, [history, setApprenant]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await instance.get('apprenant/by-mail', {
              params: {
                mail: email,
              },
            });
              setApprenant(response.data);
              console.log(response.data);
            setLoading(false)
            
          } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
            setApprenant([]);
            history('/login'); // Utilisez "push" au lieu de "history" pour rediriger l'utilisateur
          }
        };
    
        if (email) {
            fetchData();
        }
    }, [email, history, setApprenant]);
    
    const [formDataError, setFormDataError] = useState({})
    const [form, setForm] = useState({
        mdp: "",
        mdp2: "",
    })

    const [vue, setVue] = useState("password")
    const [vue2, setVue2] = useState("password")

    const handleChange = (event) => {
          setForm({
            ...form,
            [event.target.name]: event.target.value,
          });
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        const errors = {}

        if (!form.mdp ) {
            errors.mdp = 'Le mots de passe sont requis.';
        } 
       
        if (!form.mdp2) {
            errors.mdp2 = 'Le mot de confirmation est requis de passe sont requis.';
        } 
        
        if (form.mdp !== form.mdp2) {
            errors.mdp2 = 'Les mots de passe ne correspondent pas!';
          }

        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
            // setSuccess(false)
        } else {
            setFormDataError({});
            console.log('Données valides :', form);
            
            instance.put(`apprenant/update/mdp/${apprenant.id}`, {
                mdp: form.mdp,
                changeMdp: true
            })
                .then(response => {
                    console.log('Compte activée avec succes', response.data);

                    history("/apprenant/moncompte")
                })
                .catch(error => {
                  console.error('Erreur lors de la mise à jour des données:', error);
                });
          }
        };
    
    return (
        <>
            <div className="body p-3" style={{backgroundColor: "#B60520"}}>
                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                    <div className="p-5 rounded-2" style={{ backgroundColor: "white", width: 450 }}>
                    {/* <div className="container d-flex justify-content-center align-items-center" style={{}}>
                    <img className='pb-4' src={logo} width={140} alt="" />
                </div> */}
                        <p className="text-center" style={{color: "#B60520", fontWeight: 500, fontSize: 20}}>Réinitialiser mon mot de passe</p>
                        <Form className='mt-5'>
                            <Row className="mb-3">
                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                <Form.Label>Mot de passe</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type={vue}
                                        name="mdp"
                                        onChange={handleChange}
                                        value={form.mdp}
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
                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                <Form.Label>Confirmation du mot de passe</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type={vue2}
                                        name="mdp2"
                                        onChange={handleChange}
                                        value={form.mdp2}
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
                        </Row>
                        <Row>
                            <button className="bg-danger" onClick={handleSubmit}>Modifier mon mot de passe</button>
                            </Row>
                        </Form>
                    </div>
                </div>
                </div>
        {/* <div classsName="" style={{ backgroundColor: "red" }}>
            <Row>
                <Col xs={12} sm={12} md={5} lg={5}>
                    <div className="p-5" style={{ backgroundColor: "white" }}>
                        <Form className='mt-5'>
                            <Row className="mb-3">
                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                <Form.Label>Mot de passe</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type={vue}
                                        name="mdp"
                                        onChange={handleChange}
                                        value={form.mdp}
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
                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                <Form.Label>Confirmation du mot de passe</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type={vue2}
                                        name="mdp2"
                                        onChange={handleChange}
                                        value={form.mdp2}
                                        isInvalid={!!formDataError.mdp}
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
                        <Row>
                            <button className="bg-danger">Modifier mon mot de passe</button>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div> */}
        </>
    )
}

export default ChangeMdp
