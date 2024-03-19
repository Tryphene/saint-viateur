import React, { useContext, useEffect, useState } from 'react'
// import Echeancier from '../../components/Echeancier';
import { AdminContext } from '../../context/AdminContext';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Status from '../../components/Status';
import { instance } from '../../axios';
import { PiCheckFatFill } from 'react-icons/pi';
import paie from '../../img/paie.png'
import { formatDateToYYYYMMDD } from '../../date';

const EcheancierPageAdmin = () => {
    const { coursId } = useParams();   
    const { admin } = useContext(AdminContext)
    const [echeance, setEcheance] = useState([])
    const [datePaiement, setDatePaiement] = useState([])
    const [acompte, setAcompte] = useState(0)
    const [loading, setLoading] = useState(true)
    const [formDataError, setFormDataError] = useState({});
    
    const apprenantInfoString= localStorage.getItem('apprenantInfo');
    const apprenantInfos = JSON.parse(apprenantInfoString);

    const idCoursString= localStorage.getItem('idCours');
    const idCours = JSON.parse(idCoursString);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Payer
        </Tooltip>
      );

    const [formPaiement, setFormPaiement] = useState({
        // moyenPaiement: 'Orange money',
        // numero: "",
        datePaiement: "",
        dateEcheance: "",
        montant: "",
        admin: admin.email, 
        jour: new Date(),
    });

    const reset = () => {
        const intialiseForm = {
            // moyenPaiement: 'Orange money',
            // numero: "",
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

    const activeDesactiveCours = (validation, idCours) => {
        instance.put(`cours/update/is-actif/${idCours}`, {
            isActif: validation
        })
            .then(response => {
                console.log('Cours', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour des données:', error);
            });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};
        
        // if (!formPaiement.moyenPaiement) {
        //     errors.moyenPaiement = 'Le moyen de paiement est requis.';
        // }
  
        if (!formPaiement.montant) {
            errors.montant = 'Le montant est requis.';
        }

        // if (!formPaiement.numero) {
        //     errors.numero = 'Le numéro mobile money est requis.';
        // } else if (formPaiement.numero.length !== 10) {
        //     errors.numero = 'Veuilez saisir les 10 chiffres de votre numero Svp !';
        // }
        // else {
        //     if (formPaiement.moyenPaiement === 'Orange money') {
        //         if (!formPaiement.numero.startsWith("07")) {
        //             errors.numero = 'Le numéro saisi n\'est pas orange';
        //         } 
                
        //     } else if (formPaiement.moyenPaiement === 'Moov money') {
        //         if (!formPaiement.numero.startsWith("01")) {
        //             errors.numero = 'Le numéro saisi n\'est pas moov';
        //         } 
                
        //     } else if (formPaiement.moyenPaiement === 'Mtn money') {
        //         if (!formPaiement.numero.startsWith("05")) {
        //             errors.numero = 'Le numéro saisi n\'est pas mtn,';
        //         } 
                
        //     }
        // }
        
        
        if (!formPaiement.datePaiement) {
            errors.datePaiement = 'La date est requise.';
        }

        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
          } else {
            setFormDataError({});
            // console.log(formPaiement.numero.length);
            // console.log(typeof(formPaiement.numero.length));
            console.log('Données valides :', formPaiement);
            console.log(formPaiement);
            instance.post(`paiement/create/${apprenantInfos.id}/${coursId}`, formPaiement)
                .then(response => {
                    console.log('Enregistrement réussi :', response.data);
                    
                    instance.put(`echeancier/update-status-echeancier/${coursId}`, null, {
                        params: {
                            date: formatDateToYYYYMMDD(new Date(formPaiement.dateEcheance)),
                            datePaie: new Date(),
                            status: 'Payé'
                        }
                    })
                        .then(response => {
                            console.log('Compte activée avec succes', response.data);
                        })
                        .catch(error => {
                          console.error('Erreur lors de la mise à jour des données:', error);
                        });
                    
                        activeDesactiveCours(true, coursId)
                    
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement :', error);
                });
              reset()
          }
    }

    useEffect(() => {
        const fetchData = () => {
            instance.get(`echeancier/find-by-cours/${coursId}`)
                .then(response => {
                    setEcheance(response.data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
    }, [coursId, echeance]);
    
    useEffect(() => {
        const fetchData = () => {
            instance.get(`echeancier/read-dte-paiement-status-by-apprenant/${apprenantInfos.id}`)
                .then(response => {
                    setDatePaiement(response.data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
    }, [apprenantInfos.id, datePaiement]);
    
    useEffect(() => {
        const fetchData = () => {
            instance.get(`echeancier/sum-montant/Payé/${coursId}`)
                .then(response => {
                    setAcompte(response.data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
    }, [coursId, acompte]);
    
    useEffect(() => {
        // console.log(echeance);
        // console.log(coursId);
    }, [echeance, coursId]);
    
    const [nomCours, setNomCours] = useState("")

    useEffect(() => {
        async function fetchPereNames() {
          const pereNames = {};
            try {
              const response = await fetch(`http://localhost:8081/domaine-categorie/domaine-categorie-for-cours/${idCours.id}`);
              const data = await response.json();
              pereNames[idCours.id] = data.libelle; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
            } catch (error) {
              console.error("Erreur lors de la récupération du nom du père :", error);
              pereNames[idCours.id] = "Nom Inconnu";
            }
          setNomCours(pereNames);
        }
        
        fetchPereNames();
    }, [idCours]);

      const list = (item) => {
        formPaiement.datePaiement = formatDateToYYYYMMDD(new Date())
        formPaiement.montant = item.montant
        formPaiement.dateEcheance = item.dateEcheance
    }
    
    return (
        <>
            {/* boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)" */}
            <div className="d-flex justify-content-between p-3 rounded-3 mt-5" style={{with: "auto", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderLeft: '5px solid #198553'}}>
                <p className='mt-2' style={{ fontSize: 17, fontWeight: 400, letterSpacing: 0 }}>Echeancier de paiement du cours {nomCours[idCours.id]} du {moment(idCours.dteDteDebutCours).format("DD MMMM YYYY")} au {moment(idCours.dteDteFinCours).format("DD MMMM YYYY")} </p>
                <p className='fw-semibold mt-2' style={{ fontSize: 17, fontWeight: 500 }}>{apprenantInfos.prenom} {apprenantInfos.nom}</p> 
            </div>
            <Row>
                <Col xs={12} sm={12} md={12} lg={8}>
                    <div className="p-3 rounded-3 mt-5" style={{ with: "100%", backgroundColor: "white" }}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Cours en cours</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Liste des cours en deroulement de l'apprenant</p>
                            </div>
                        </div>
                        <div className="table-responsive w-100">
                            <table className="table table-bordered w-100">
                                <thead className='table-success'>
                                    <tr>
                                        <th className='align-middle'>Cours</th>
                                        <th className='align-middle'>Frais de scolarité</th>
                                        <th className='align-middle'>Montant de paiement de l'écheance</th>
                                        <th className='align-middle'>Acompte</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{nomCours[idCours.id]}</td>
                                        <td>{idCours.montant}</td>
                                        <td>{datePaiement[0]?.montant ? datePaiement[0]?.montant : 0}</td>
                                        <td>{acompte === '' ? 0 : acompte}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="p-3 rounded-3 mt-5" style={{ with: "100%", backgroundColor: "white" }}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Cours en cours</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Liste des cours en deroulement de l'apprenant</p>
                            </div>
                        </div>
                        <div class="table-responsive mt-4 w-100">
                            <table class="table">
                              <thead>
                                  <tr>
                                      <th scope="col">Date de l'échéance</th>
                                      <th scope="col">Montant de paiement de l'échéance</th>
                                      <th scope="col">Montant Payé</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Action</th>
                                  </tr>
                              </thead>
                                <tbody>
                                    {echeance.map((item) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className='align-middle' style={{}}>{moment(item.dateEcheance).format('DD MMMM YYYY')}</td>
                                                        <td className='align-middle'>{item.montant}</td>
                                                        <td className='align-middle' style={{}}>{item.montant}</td>
                                                        <td className='align-middle'>
                                                            {item.status === "Payé" ? <Status titre={item.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={item.status} bgColor="linear-gradient(to right, #ED213A, #93291E)" />}
                                                        </td>
                                                        <td>
                                                            {item.status === 'Payé' ? (
                                                                <div className="">
                                                                    <PiCheckFatFill color='green' size={23} />
                                                                </div>
                                                            ) : (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        delay={{ show: 250, hide: 400 }}
                                                                        overlay={renderTooltip}
                                                                    >
                                                                        <div onClick={() => list(item)}>
                                                                            <img src={paie} width={23} alt="" />
                                                                            {/* <AiOutlineCreditCard size={23} /> */}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                    <div className="p-3 rounded-3 mt-5" style={{ with: "auto", backgroundColor: "white" }}>
                    <div className="d-flex justify-content-between mb-3 p-2 rounded-2" style={{ alignItems: "center", justifyItems: "center", backgroundColor: '#DCFCE7' }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Formulaire de Paiement</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Paiement de la scolarité via mobile money</p>
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit} className='w-100 p-3'>
                            {/* <Row className='mb-3'>
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
                            </Row> */}
                            <Row className='mb-3'>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        readOnly
                                        type="date"
                                        name="datePaiement"
                                        onChange={handleChange}
                                        value={formPaiement.datePaiement}
                                        isInvalid={!!formDataError.datePaiement}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.datePaiement}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom02">
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
                            <Button variant='success' className='me-3' type="submit">Payer</Button>
                            <Button onClick={() => {reset()}} variant='danger'>Effacer le formulaire</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default EcheancierPageAdmin
