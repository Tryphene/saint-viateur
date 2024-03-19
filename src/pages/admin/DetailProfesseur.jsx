import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { instance } from '../../axios';
import QRGenerator from '../../components/QRGenerator';
import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import WeeklySchedule from '../../components/WeeklySchedule';
import CahierPresence from '../../components/CahierPresence';
import { FaRightLong } from 'react-icons/fa6';
// import { MdEdit } from 'react-icons/md';
// import livre from "../../img/livre.png"
import moment from "moment"
import absence from '../../img/absenceProf.png'
import horaire from '../../img/horaire.png'
import presence from '../../img/presence.png'
import diplome from "../../img/diplome.png"
// import Tooltipp from '../../components/Tooltipp';
import { BsCalendarDateFill } from 'react-icons/bs';
import { BiSolidBook } from 'react-icons/bi';

const DetailProfesseur = ({props}) => {
    const { id } = useParams();  
    const [professeur, setProfesseur] = useState([]);
    const [loading, setLoading] = useState([]);
    const [cours, setCours] = useState([]);
    const [allCours, setAllCours] = useState([]);
    const [nomCours, setNomCours] = useState("")
    const [nomApprenant, setNomApprenant] = useState("")
    const [nombrePresenceProfesseur, setNombrePresenceProfesseur] = useState(0)
    const [nombreAbsenceProfesseur, setNombreAbsenceProfesseur] = useState(0)

    useEffect(() => {
        const fetchData = () => {
          instance.get(`professeur/read/${id}`)
            .then(response => {
                setProfesseur(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };
      
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = () => {
            instance.get(`cours/cours-is-actif-professeur/${id}`, {
                params: {
                    status: 'En cours',
                    isActif: true
              }
          })
              .then(response => {
                  setCours(response.data);
                  setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };
        
        const fetchDataAllCours = () => {
          instance.get(`cours/all-cours-by-professeur/${id}`)
              .then(response => {
                  setAllCours(response.data);
                  setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };

        fetchData();
        fetchDataAllCours()
    }, [id, cours]);

    const [horaireMensuel, setHoraireMensuel] = useState('')
    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    useEffect(() => {
        const horaire = () => {
            instance.get(`marque-de-presence-professeur/count-heure-mensuel-by-month`, {
                params: {
                    month: new Date().getMonth() + 1, 
                    id: id
                }
            })
                  .then(response => {
                      setHoraireMensuel(response.data);
                      setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
        }
        
        horaire()
     }, [id])
    
    useEffect(() => {
        const fetchPresence = (presence, set) => {
            instance.get(`/marque-de-presence-professeur/nombre-marque-de-presence-professeur`, {
                params: {
                    presence: presence,
                    professeurId: id
                }
            })
                  .then(response => {
                      set(response.data.totalElements);
                      console.log(response.data)
                      setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
        }
        
            fetchPresence("Présent", setNombrePresenceProfesseur)
            fetchPresence("Absent", setNombreAbsenceProfesseur)
     }, [id])
    
    useEffect(() => {
        async function fetchCoursNames() {
          const coursNames = {};
          for (const fils of cours) {
            try {
              const response = await fetch(`http://localhost:8081/domaine-categorie/read/${fils.libelle}`);
              const data = await response.json();
              coursNames[fils.libelle] = data.libelle; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
            } catch (error) {
              console.error("Erreur lors de la récupération du nom du père :", error);
              coursNames[fils.libelle] = "Nom Inconnu";
            }
          }
          setNomCours(coursNames);
        }

        async function fetchApprenantNames() {
          const apprenantNames = {};
          for (const fils of cours) {
            try {
              const response = await fetch(`http://localhost:8081/apprenant/apprenant-for-cours/${fils.id}`);
              const data = await response.json();
              apprenantNames[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
            } catch (error) {
              console.error("Erreur lors de la récupération du nom du père :", error);
              apprenantNames[fils.id] = "Nom Inconnu";
            }
          }
          setNomApprenant(apprenantNames);
        }

        fetchCoursNames();
        fetchApprenantNames();
    }, [cours]);

    const [salaire, setSalaire] = useState(0)
    const [mois, setMois] = useState(new Date().getMonth() + 1)

    const afficheSalaire = () => {
        instance.get(`professeur/find-salaire/${id}`)
              .then(response => {
                setSalaire(response.data);
                  setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
    }

    useEffect(() => {
        const afficheSalaire = () => {
            instance.get(`professeur/find-salaire/${id}`)
                  .then(response => {
                    setSalaire(response.data);
                      setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
        }

        if (id !== undefined) {
            afficheSalaire()
            console.log(new Date().getMonth() + 1);
        }
        
    }, [id])

    const month = [
        { mois: "Janvier", value: 1 },
        { mois: "Février", value: 2 },
        { mois: "Mars", value: 3 },
        { mois: "Avril", value: 4 },
        { mois: "Mai", value: 5 },
        { mois: "Juin", value: 6 },
        { mois: "Juillet", value: 7 },
        { mois: "Août", value: 8 },
        { mois: "Septembre", value: 9 },
        { mois: "Octobre", value: 10 },
        { mois: "Novembre", value: 11 },
        { mois: "Decembre", value: 12 },
    ]

    const[horaireParMois, setHoraireParMois] = useState(0)

    useEffect(() => {
        const horaire = () => {
            instance.get(`marque-de-presence-professeur/count-heure-mensuel-by-month`, {
                params: {
                    month: mois, 
                    id: id
                }
            })
                  .then(response => {
                      setHoraireParMois(response.data);
                      setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
        }

        horaire()
    }, [mois, id])


    const handleSubmit = (event) => {
        event.preventDefault();

        instance.put(`professeur/update/salaire-prof/${id}`, {
            salaire: salaire
        })
            .then(response => {
                console.log(response.data.salaire);
                setLoading(false)
                afficheSalaire()
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        

    }

    const handleChange = (event) => {
        setSalaire(event.target.value)
      }

    const handleChangeMois = (event) => {
        setMois(event.target.value)
      }
      

    return (
        <>
            <p className='mb-5 fw-semibold' style={{ color: '#464255', fontSize: 20, letterSpacing: 1 }}>Professeur {professeur.prenom} {professeur.nom}</p>
                        <Row className="mt-5">
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <div className="d-flex justify-content-evenly p-2 rounded-3" style={{ color: "black", with: "auto", backgroundColor: "#E9F3E8" }}>
                                    <div className="p-3" style={{ with: "auto", borderRadius: "100%", backgroundColor: "white" }}>
                                        <img src={presence} width={55} alt="" />
                                    </div>
                                    <div className="m">
                                        <p className="mt-1 mb-0" style={{ fontSize: 16 }}>Total Présence</p>
                                        <p className="fw-bolder mt-0" style={{ fontSize: 37 }}>{nombrePresenceProfesseur}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4}>
                                <div className="d-flex justify-content-evenly p-2 rounded-3" style={{ color: "black", with: "auto", backgroundColor: "#E3E7EF" }}>
                                    <div className="p-3" style={{ with: "auto", borderRadius: "100%", backgroundColor: "white" }}>
                                        <img src={absence} width={55} alt="" />
                                    </div>
                                    <div className="m">
                                        <p className="mt-1 mb-0" style={{ fontSize: 16 }}>Total Absence</p>
                                        <p className="fw-bolder mt-0" style={{ fontSize: 37 }}>{nombreAbsenceProfesseur}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={4}>
                  <div className="d-flex justify-content-evenly p-2 rounded-3" style={{ color: "black", with: "auto", backgroundColor: "#F7EDE4" }}>
                      <div className="p-3" style={{ with: "auto", borderRadius: "100%", backgroundColor: "white" }}>
                          <img src={horaire} width={55} alt="" />
                      </div>
                      <div className="m">
                          <p className="mt-1 mb-0" style={{ fontSize: 16 }}>Horaire {monthNames[new Date().getMonth()]} {new Date().getFullYear()}</p>
                          <p className="fw-bolder mt-0" style={{ fontSize: 37 }}>{horaireMensuel ? horaireMensuel : 0}</p>
                      </div>
                  </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="mt-4 rounded-4 p-3" style={{ background: "white" }}>
                        <Row>
                            <Col xs={12} sm={12} md={7} lg={7}>
                                <div className="">
                                    <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Affichage de l'horaire mensuel</p>
                                     <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Affichage de l'horaire mensuel en fonction du mois</p>
                                </div>
                                <div className="">
                                <Row className="mt-4">
                                  <Form.Group as={Col} xs={12} sm={12} md={5} lg={5} controlId="validationCustom01">
                                            <Form.Select aria-label="Default select example" id="mois" value={mois} name="mois" onChange={handleChangeMois}>
                                                {month.map((mois) => {
                                                    return (
                                                        <option value={mois.value}>{mois.mois}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <p style={{ fontSize: 19, fontWeight: 500 }} className="mt-3 ms-5">
                                        {horaireParMois}
                                    </p>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={5} lg={5}>
                                <div className="">
                                    <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Salaire</p>
                                     <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Assignement du salaire</p>
                                </div>
                                <div className="">
                                <Form onSubmit={handleSubmit} className='w-100 p-3'>
                                        <Row className='mb-3'>
                                            <Form.Group as={Col} xs={12} sm={12} md={4} lg={4} controlId="validationCustom01">
                                                {/* <Form.Label>Salaire</Form.Label> */}
                                                <Form.Control
                                                    type="text"
                                                    name="salaire"
                                                    onChange={handleChange}
                                                    value={salaire}
                                                    // isInvalid={!!formDataError.salaire}
                                                />
                                            </Form.Group>        
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} xs={12} sm={12} md={3} lg={3} >
                                                <Button variant='success' className='me-3' type="submit">Enregistrer</Button>
                                            </Form.Group>
                                            <Form.Group as={Col} xs={12} sm={12} md={9} lg={9} >
                                                <Button variant='danger' className='me-3'>Réinitialiser le salaire</Button>
                                            </Form.Group>
                                        </Row>
                                        {/* <Button onClick={() => {reset()}} variant='danger'>Effacer le formulaire</Button> */}
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
          <Row>
              <Col xs={12} sm={12} md={9} lg={9}>
                  {/* <div className="mt-4 rounded-4 p-3" style={{ boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", background: "white" }}> */}
                  <div className="mt-4 rounded-4 p-3" style={{ background: "white" }}>
                      <div className="d-flex justify-content-between" style={{ alignItems: "center", justifyItems: "center" }}>
                          <div className="">
                              <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Cours en cours</p>
                              <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Liste des cours en deroulement du professeur {professeur.prenom}</p>
                          </div>
                          {(allCours.length > 0) && <Link className="" style={{ fontSize: 15, letterSpacing: 0, fontWeight: 300 }}>Voir tout <FaRightLong /> </Link>}
                      </div>
                      {loading ? <p>Chargement en cours</p> : (
                          <Container className='mt-2'>
                              <Row className='p-4'>
                                  {cours.length > 0 ?
                                      (
                                        <div className="table-responsive">
                                        <table className="table rounded-2">
                                        <thead className=''>
                                            <tr>
                                                <th scope="col">Cours</th>
                                                <th scope="col">Date Cours</th>
                                                <th scope="col">Apprenant</th>
                                            </tr>
                                        </thead>
                                            <tbody>
                                                  {cours.map((cour, index) => {
                                                      return (
                                                          <>
                                                              <tr>
                                                                    <td className='align-middle'>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#F7931A', borderRadius: 50, width: 30, height: 30 }}>
                                                                                <BiSolidBook size={15} className='' color="white" />
                                                                            </div>
                                                                            <div className="pt-3 ps-2">
                                                                                <p style={{ color: "#6F7A92" }} className="">{nomCours[cour.libelle]}</p>
                                                                            </div>
                                                                        </div>
                                                                        </td>
                                                                        <td className='align-middle'>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#77C454', borderRadius: 50, width: 30, height: 30 }}>
                                                                            <BsCalendarDateFill size={15} className='' color="white" />
                                                                        </div>
                                                                        <div className="pt-3 ps-2">
                                                                            <p style={{ color: "#6F7A92" }} className="">{moment(cour.dteDteDebutCours).format('D MMMM YYYY')} au {moment(cour.dteDteFinCours).format('D MMMM YYYY')}</p>
                                                                        </div>
                                                                    </div>
                                                                        </td>
                                                                        <td className='align-middle'>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#FF788E', borderRadius: 50, width: 30, height: 30 }}>
                                                                                    {/* <GiTeacher size={15} className='' color="white" /> */}
                                                                                    <img src={diplome} width={15} className='' alt="" />
                                                                        </div>
                                                                        <div className="pt-3 ps-2">
                                                                            <p style={{ color: "#6F7A92" }} className="">{nomApprenant[cour.id]?.prenom} {nomApprenant[cour.id]?.nom}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                         </tr>
                                                          </>
                                                      )
                                                  })}
                                              </tbody>
                                          </table>
                                          </div>
                                      )
                                      :
                                      (
                                          <p style={{fontWeight: 300}}>Aucun cours en cours pour le moment</p>
                                      )
                                  }
                              </Row>
                          </Container>
                      )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={3} lg={3}>
                    <div className="mt-4 rounded-4 p-3" style={{ background: "white" }}>
                        <div className="d-flex justify-content-between mb-3" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Code QR</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Télécharger le code QR de {professeur.prenom}</p>
                            </div>
                        </div>
                        <QRGenerator professeur={professeur} />
                    </div>
                </Col>
          </Row>
          <div className="my-5 rounded-4 p-3" style={{ background: "white" }}>
              <div className="mb-5" style={{}} >
                  <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Présence au cours</p>
                  <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Marquer la présence aux cours  </p>
              </div>
              <div className="pb-3 px-4">
                  {cours.length > 0 ?
                      (
                          <CahierPresence profInterface={false} heureProf={true} app={false} entite={`professeur`} id={professeur.id} nomCours={nomCours} proffid={professeur.id} />
                      )
                      :
                      (
                          <p style={{fontWeight: 300}}>Aucun cours en cours pour le moment</p>
                      )
                  }
              </div>
          </div>
          <div className="my-5 rounded-4 p-2" style={{ background: "white"}}>
              <div className="my-3 px-3" style={{}} >
                  <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Emploi du temps</p>
                  <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Liste des cours en deroulement du professeur {professeur.prenom} {professeur.nom}</p>
              </div>
              {loading ? (<p>Chargement en cours...</p>) : (
                  <div className="py-2 px-4">
                      {cours.length > 0 ?
                      (
                        <WeeklySchedule heure={cours} nomCours={nomCours} />
                      )
                      :
                      (
                          <p style={{fontWeight: 300}}>Aucun cours en cours pour le moment</p>
                      )
                      }
                      
                  </div>
              )}
          </div>
        </>
    )
}

export default DetailProfesseur
