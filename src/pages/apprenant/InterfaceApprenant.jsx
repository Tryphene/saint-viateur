import React, { useContext, useEffect, useState } from 'react'
import { ApprenantContext } from '../../context/ApprenantContext';
import { Col, Row } from 'react-bootstrap';
// import sourire from "../../img/sourire.png";
import cour from "../../img/cours.png";
import scolarite from "../../img/scolarite.png";
import examen from "../../img/examen.png";
import { Link } from 'react-router-dom';
// import Carroussel from '../../components/Carroussel';
import WeeklySchedule from '../../components/WeeklySchedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrin } from '@fortawesome/free-solid-svg-icons'
import { instance } from '../../axios';


const InterfaceApprenant = () => {
    const { apprenant} = useContext(ApprenantContext);
    const [loading, setLoading] = useState(true);
    const [allCours, setAllCours] = useState([])

    const [cours, setCours] = useState([])
    
    // useEffect(() => {
    //     const fetchData = () => {
    //         instance.get(`cours/cours-is-actif-apprenant/${apprenant.id}`, {
    //             params: {
    //                 status: 'En cours',
    //                 isActif: true
    //           }
    //       })
    //           .then(response => {
    //               setCours(response.data);
    //               setLoading(false)
    //         })
    //         .catch(error => {
    //             console.error('Erreur lors de la récupération des données :', error);
    //             setLoading(false)
    //         });
    //     };
    
    //     if (apprenant.id !== undefined) {
    //         fetchData();
    //     }
    // }, [apprenant]);
    
    // useEffect(() => {
    //     const fetchData = () => {
    //       instance.get(`cours/cours/${apprenant.id}`)
    //       .then(response => {
    //           console.log(response.data);
    //           setCours(response.data);
    //           setLoading(false);
    //       })
    //       .catch(error => {
    //           console.error('Erreur lors de l\'enregistrement :', error);
    //           setLoading(false);
    //       });
    //     };
    //     fetchData();
    //   }, [apprenant.id, setCours]);
    
    const [nomCours, setNomCours] = useState("")
    const [nomProfesseur, setNomProfesseur] = useState("")

    useEffect(() => {
        async function fetchPereNames() {
          const pereNames = {};
          for (const fils of allCours) {
            try {
              const response = await fetch(`http://localhost:8081/domaine-categorie/read/${fils.libelle}`);
              const data = await response.json();
              pereNames[fils.libelle] = data.libelle; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
            } catch (error) {
              console.error("Erreur lors de la récupération du nom du père :", error);
              pereNames[fils.libelle] = "Nom Inconnu";
            }
          }
          setNomCours(pereNames);
        }
        
        async function fetchProfesseurName() {
          const professeurNames = {};
          for (const fils of cours) {
            try {
              const response = await fetch(`http://localhost:8081/professeur/professeur-for-cours/${fils.id}`);
              const data = await response.json();
              professeurNames[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
            } catch (error) {
              console.error("Erreur lors de la récupération du nom du père :", error);
              professeurNames[fils.id] = {nom: "Professeur Inconnu"};
            }
          }
          setNomProfesseur(professeurNames);
        }
        
        fetchProfesseurName()
        fetchPereNames();
      }, [cours, allCours]);

      useEffect(() => {
        const fetchCours = () => {
            instance.get(`cours/read-cours-apprenant-actif-status/${apprenant.id}`, {
                params: {
                    isActif: true,
                    status: 'En cours'
                }
            })
                .then(response => {
                    console.log(response.data)
                    setCours(response.data)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };

        fetchCours()

    }, [apprenant.id])
    
    
        useEffect(() => {
            const fetchDataAllCours = () => {
                instance.get(`cours/all-cours/${apprenant.id}`)
                .then(response => {
                    setAllCours(response.data);
                      //   console.log(response.data);
                      setLoading(false)
                      //   console.log("yes");
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des données :', error);
                        setLoading(false)
                    });
            };

            fetchDataAllCours();
            
        }, [apprenant.id]);

  return (
      <>
          {/* <p className='mt-4' style={{ fontSize: 35 }}>
              Bienvenue {apprenant.prenom} {apprenant.nom} <img src={sourire} className='p-1' alt="" />
          </p> */}
          {/* <div style={{ borderBottom: "1px solid #ccc" }}></div> */}
          <div className="mt-5">
              <p className='my-5' style={{ fontSize: 28, fontWeight: 300, letterSpacing: 2 }}>
                  Bienvenue {apprenant.prenom} {apprenant.nom} <FontAwesomeIcon color='#FFCA28' icon={faFaceGrin} />
              </p>
              <Row>
                  <Col xs={12} sm={12} md={12} lg={9} >
                      <Row>
                          <Col xs={12} sm={12} md={12} lg={4} className='mb-2'>
                              <Link className={`${allCours.length > 0 ? "" : "non-cliquable"}`} to={`/apprenant/mes-cours`}>
                                  <button style={{}} className={`buttonn w-100 ${allCours.length > 0 ? "" : "non-cliquable"}`}><img src={cour} width={35} className={`me-3 mb-2`} alt="" /> Mes cours</button>
                              </Link>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={4} className='mb-2'>
                              <Link className={`${allCours.length > 0 ? "" : "non-cliquable"}`} to={`/apprenant/ma-scolarite`}>
                                  <button style={{}} className={`buttonn w-100 ${allCours.length > 0 ? "" : "non-cliquable"}`}><img src={scolarite} width={35} className={`me-3 mb-2`} alt="" />Ma scolarité</button>
                              </Link>
                          </Col>
                          {apprenant.testIsChecked && <Col xs={12} sm={12} md={12} lg={4} className='mb-2'>
                              <Link className={`${allCours.length > 0 ? "" : "non-cliquable"}`} to={`/apprenant/mes-examens`}>
                                  <button style={{}} className={`buttonn w-100 ${allCours.length > 0 ? "" : "non-cliquable"}`}><img src={examen} width={35} className={`me-3 mb-2`} alt="" />Mes Examens</button>
                              </Link>
                          </Col>}
                      </Row>
                      {/* <Row className='mt-3'> */}
                    <Col xs={12} sm={12} md={12} lg={12} className='mt-5'>
                        {/* <div className="mb-5 rounded-4 p-2" style={{ background: "white", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)" }} > */}
                        <div className="mb-5 rounded-4 p-2" style={{ background: "white", border: "1px solid #E5E5E5" }} >
                            <div className="my-3 px-3" style={{}} >
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Emploi du temps</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Mon emploi du temps</p>
                            </div>
                            {loading ? (<p>Chargement en cours...</p>) : (
                                <div className="py-2 px-4">
                                    {allCours.length > 0 ? 
                                        (
                                            cours.length > 0 ?
                                                (
                                                    <WeeklySchedule heure={cours} nomCours={nomCours} />
                                                )
                                                :
                                                (
                                                    <>
                                                        <div className="d-flex me-3">
                                                            <p className="me-2" style={{ fontSize: 16, fontWeight: 300 }}>Vous avez terminé tous vos cours. </p>
                                                            <Link className="" style={{ fontWeight: 400, fontSize: 16, color: '#437EFD' }} to={`/apprenant/choix-formation`}><i>Ajouter un nouveau cours</i></Link>
                                                        </div>
                                                    </>
                                                )
                                        )
                                        :
                                        (
                                            <>
                                                <div className="d-flex me-3">
                                                    <p className="me-2" style={{ fontSize: 16, fontWeight: 300 }}>Vous n'avez souscrit à aucun cours pour le moment. </p>
                                                    <Link className="" style={{ fontWeight: 400, fontSize: 16, color: '#437EFD' }} to={`/apprenant/choix-formation`}><i>Ajouter un cours</i></Link>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                    </Col>
                {/* </Row> */}
                      
                      {/* {allCours.length > 0 ? (
                          cours.length > 0 ? (
                              <Row>
                                  <Col xs={12} sm={12} md={12} lg={12} >
                                      <div className="my-5">
                                          <div className="o px-4" style={{ padding: 20, background: "white" }}>
                                              <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: 1, }}>Emploi du temps</p>
                                              {loading ? (
                                                  <p>Chargement en cours...</p>
                                              ) : (
                                                  <WeeklySchedule heure={cours} nomCours={nomCours} />
                                              )}
                                          </div>
                                      </div>
                                  </Col>
                              </Row>
                          ) : (
                                  <>
                                      <div className="d-flex me-3 mt-5">
                                          <p className="me-2" style={{ fontSize: 18, fontWeight: 300 }}>Vous n'avez aucun cours en cours pour le moment. </p>
                                          <Link className="" style={{ fontWeight: 400, fontSize: 16, color: '#437EFD' }} to={`/apprenant/choix-formation`}><i>Ajouter un cours</i></Link>
                                      </div>
                                  </>
                          )
                      ) : (
                              <>
                                  <div className="d-flex me-3 mt-5">
                                      <p className="me-2" style={{ fontSize: 18, fontWeight: 300 }}>Vous n'avez souscrit à aucun à cours pour le moment. </p>
                                      <Link className="" style={{ fontWeight: 400, fontSize: 16, color: '#437EFD' }} to={`/apprenant/choix-formation`}><i>Ajouter un cours</i></Link>
                                  </div>
                              </>
                      )} */}
                  </Col>
                  <Col xs={0} sm={0} md={0} lg={3}>
                      <div className='o' style={{ backgroundColor: 'white', border: "1px solid #E5E5E5" }}>
                          {/* <Carroussel key={0} /> */}
                          <div className="d-flex justify-content-center align-items-center" style={{ background: "#ECE9FB", height: 50, fontSize: 16, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                              <p className='fw-semibold '>INFORMATION</p>
                          </div>
                          <div className="" style={{ padding: 15, textAlign: "justify" }}>
                              <p>Aucune information pour le moment...</p>
                          </div>
                      </div>
                  </Col>
              </Row>
          </div>
      </>
  )
}

export default InterfaceApprenant
