import React, { useContext, useEffect, useState } from 'react'
// import Echeancier from '../../components/Echeancier';
import { ApprenantContext } from '../../context/ApprenantContext';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Col,OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Status from '../../components/Status';
import { instance } from '../../axios';
import { PiCheckFatFill } from 'react-icons/pi';
import { ImCross } from 'react-icons/im';

const EcheancierApprenant = () => {
    const { coursId } = useParams();   
    const { apprenant } = useContext(ApprenantContext)
    const [echeance, setEcheance] = useState([])
    const [paiement, setPaiement] = useState([])
    const [datePaiement, setDatePaiement] = useState([])
    const [acompte, setAcompte] = useState(0)
    const [montantPaiement, setMontantPaiement] = useState(0)
    const [loading, setLoading] = useState(true)

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Non payé
        </Tooltip>
    );
    
    const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Payé
        </Tooltip>
      );

      const idCoursString= localStorage.getItem('cours');
      const idCours = JSON.parse(idCoursString);

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
            instance.get(`paiement/read-par-cours/${coursId}`)
                .then(response => {
                    setPaiement(response.data[0].datePaiement)
                    // console.log(response.data[0].datePaiement)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
    }, [coursId, paiement]);
    
    useEffect(() => {
        const fetchData = () => {
            instance.get(`echeancier/read-dte-paiement-status-by-apprenant/${apprenant.id}`)
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
    }, [apprenant.id, datePaiement]);
    
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
    
    const fetchData = (url, set) => {
        instance.get(url)
            .then(response => {
                set(response.data);
                console.log(response.data);
                    setMontantPaiement(response.data)
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des données :', error);
              setLoading(false)
          });
    };
    useEffect(() => {
        fetchData(`paiement/count-montant-by-apprenant-cours/${apprenant.id}/${coursId}`, setMontantPaiement)
    }, [apprenant.id, coursId])
    
    
    return (
        <>
            {/* <div className="d-flex justify-content-between p-3 rounded-3 mt-5" style={{with: "auto", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderLeft: '5px solid #D1E7DD',  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",}}> */}
            <div className="d-flex justify-content-between p-3 rounded-3 mt-5" style={{with: "auto", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderLeft: '5px solid #D1E7DD',  border: "1px solid #E5E5E5",}}>
                <p className='mt-2' style={{ fontSize: 17, fontWeight: 400, letterSpacing: 0 }}>Echeancier de paiement du cours {idCours.nomCours} du {moment(idCours.dateebutCours).format("DD MMMM YYYY")} au {moment(idCours.dateFinCours).format("DD MMMM YYYY")} </p>
            </div>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="p-3 rounded-3 mt-5" style={{ with: "100%", backgroundColor: "white", border: "1px solid #E5E5E5" }}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Modalité de paiement</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Énumération des informations à savoir sur le paiement</p>
                            </div>
                        </div>
                        <div className="table-responsive w-100">
                            <table className="table table-bordered w-100">
                                <thead className='table-success'>
                                    <tr>
                                        <th className='align-middle'>Cours</th>
                                        <th className='align-middle'>Frais de scolarité</th>
                                        {idCours.echeancierUsed === true && <th className='align-middle'>Montant de paiement de l'écheance</th>}
                                        <th className='align-middle'>Acompte</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{idCours.nomCours}</td>
                                        <td>{idCours.montant}</td>
                                        {idCours.echeancierUsed === true && <td>{datePaiement[0]?.montant ? datePaiement[0]?.montant : 0}</td>}
                                        <td>{idCours.echeancierUsed === true ? (acompte === '' ? 0 : acompte) : (montantPaiement) }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="p-3 rounded-3 mt-5" style={{ with: "100%", backgroundColor: "white",  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", }}> */}
                    <div className="p-3 rounded-3 mt-5" style={{ with: "100%", backgroundColor: "white", border: "1px solid #E5E5E5"}}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center", }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Détails du paiement</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Liste des cours en deroulement de l'apprenant</p>
                            </div>
                        </div>
                        <div className="table-responsive mt-4 w-100">
                            <table className="table">
                              <thead>
                                  <tr>
                                      <th scope="col">{idCours.echeancierUsed === true ? 'Date de l\'échéance' : 'Date de paiement'}</th>
                                        {idCours.echeancierUsed === true && <th scope="col">Montant de paiement de l'échéance</th>}
                                      <th scope="col">Montant Payé</th>
                                      <th scope="col">Status</th>
                                      <th scope="col"></th>
                                  </tr>
                              </thead>
                                <tbody>
                                    {idCours.echeancierUsed === true ? 
                                        echeance.map((item) => {
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
                                                            {item.status === 'Payé' ?
                                                                (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        delay={{ show: 250, hide: 400 }}
                                                                        overlay={renderTooltip2}
                                                                    >
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ width: 'auto' }}>
                                                                            <PiCheckFatFill color='green' size={23} />
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )
                                                                :
                                                                (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        delay={{ show: 250, hide: 400 }}
                                                                        overlay={renderTooltip}
                                                                    >
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ width: 'auto' }}>
                                                                            <ImCross color='red' size={21} />
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                        :
                                        (
                                            <>
                                                <tr>
                                                        <td className='align-middle' style={{}}>{moment(paiement).format('DD MMMM YYYY')}</td>
                                                        <td className='align-middle'>{idCours.montant}</td>
                                                        <td className='align-middle'>
                                                            {montantPaiement > 0 ? <Status titre={`Payé`} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={`Non payé`} bgColor="linear-gradient(to right, #ED213A, #93291E)" /> }
                                                        </td>
                                                        <td>
                                                            {montantPaiement > 0 ?
                                                                (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        delay={{ show: 250, hide: 400 }}
                                                                        overlay={renderTooltip2}
                                                                    >
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ width: 'auto' }}>
                                                                            <PiCheckFatFill color='green' size={23} />
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )
                                                                :
                                                                (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        delay={{ show: 250, hide: 400 }}
                                                                        overlay={renderTooltip}
                                                                    >
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ width: 'auto' }}>
                                                                            <ImCross color='red' size={21} />
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                            </>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                 </Col>
                {/*<Col xs={12} sm={12} md={12} lg={4}>
                    <div className="p-3 rounded-3 mt-5" style={{ boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", with: "auto", backgroundColor: "white" }}>
                    <div className="d-flex justify-content-between mb-3 p-2 rounded-2" style={{ alignItems: "center", justifyItems: "center", backgroundColor: '#DCFCE7' }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Formulaire de Paiement</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Paiement de la scolarité via mobile money</p>
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit} className='w-100 p-3'>
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
                </Col> */}
            </Row>
        </>
    )
}

export default EcheancierApprenant
