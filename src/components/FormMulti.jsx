import { useEffect, useState } from 'react';
import * as React from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box} from '@mui/material';
import CoursApprenant from './CoursApprenant';
import FormPaiement from './FormPaiement';
import moment from 'moment';
import { instance } from '../axios';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { TiWiFi } from 'react-icons/ti';
import date from "../img/dates.png"
import enseigner from "../img/enseigner.png"
import livre from "../img/livre.png"
import PageFelicitation from './PageFelicitation';
import { BiBook } from 'react-icons/bi';
import { GiDuration, GiMoneyStack } from 'react-icons/gi';
import { BsCalendar2Date } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { PiChalkboardTeacherLight } from 'react-icons/pi';

const FormMulti = ({apprenant, proff}) =>  {
    const style = {
        fontFamily: "Poppins, sans-serif",
        // Ajoutez d'autres styles CSS au besoin
      };
  const [activeStep, setActiveStep] = useState(0);
    const [formDataErrors, setFormDataErrors] = useState({});
    const [formDataErrorss, setFormDataErrorss] = useState({});
    const [echeance, setEcheance] = useState([]);
    const [dates, setDates] = useState([]);
    const [nomCours, setNomCours] = useState([]);
    const [nomProfesseur, setNomProfesseur] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [formPaiement, setFormPaiement] = useState({
        moyenPaiement: 'Orange money',
        numero: "",
        date: "",
        montant: "",
    });
    
    // const [formCours, setFormCours] = useState({})

    // if(proff){
    //     setFormCours({
    //         libelle: 1,
    //         montant: 0,
    //         {proff && professeur: "",}
    //         dteDteDebutCours: moment(new Date()).format("YYYY-MM-DD"),
    //         dteDteFinCours: "", 
    //         heureCours: "",
    //         forfait: "",
    //         status: "En cours",
    //         echeancierUsed: false,
    //         isActif: false})
    // } else {
    //     setFormCours({
    //         libelle: 1,
    //         montant: 0,
    //         // professeur: "",
    //         dteDteDebutCours: moment(new Date()).format("YYYY-MM-DD"),
    //         dteDteFinCours: "", 
    //         heureCours: "",
    //         forfait: "",
    //         status: "En cours",
    //         echeancierUsed: false,
    //         isActif: false}) 
    // }
    
    const [formCours, setFormCours] = useState({
        // id: 
        libelle: 1,
        montant: 0,
        professeur: null,
        dteDteDebutCours: moment(new Date()).format("YYYY-MM-DD"),
        dteDteFinCours: "", 
        heureCours: "",
        forfait: "",
        status: "En cours",
        echeancierUsed: false,
        isActif: false
    });

    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  const etapes = [
    { label: 'Étape 1 : Choix du cours' },
    // { label: 'Étape 2 : Formulaire de paiement' },
      { label: 'Étape 2 : Récapitulatif de la préinscription' },
    //   { label: 'Étape 3 : Confirmation de préinscription' },
  ];

    const suivantCours = () => {
        const errors = {};
        // if (cours) {
        //     errors.libelle = 'Le domaine est requis.';
        // }
        if (!formCours.libelle) {
            errors.libelle = 'Le domaine est requis.';
        }

        if (proff === true) {
            if (!formCours.professeur) {
                errors.professeur = 'Le professeur est requis.';
            }
        }

          if (!formCours.dteDteFinCours) {
            errors.dteDteFinCours = 'La date de fin est requise.';
        }
    
        if (!formCours.forfait) {
            errors.forfait = 'Le type de forfait est requis.';
        }
    
        if (!formCours.heureCours  || !formCours.dteDteDebutCours) {
            errors.heureCours = 'L\'heure de et la date de début du cours sont requis.';
        }
        
          if (!formCours.montant) {
            errors.montant = 'Le montant de la scolarité est requise.';
            }
            
            // if (formCours.echeancierUsed) {
            //     if (formCours.montant !== sommeMontants) {
            //       errors.montantEcheance = 'La somme de l\'echeancier n\'est pas équivalant a la totalité de la scolarité';
            //     }
            // }
    
        if (Object.keys(errors).length > 0) {
            setFormDataErrors(errors);
        } else {
            console.log(echeance);
            console.log(dates);
            console.log(formCours);
            // console.log(echeance[0].montant);
            // console.log(echeance[0].datePaiement);
    
            setFormDataErrors({});
            console.log("yu");
            setActiveStep((prevStep) => prevStep + 1);
        }
    };
    
    const suivantForm = () => { 
        const errors = {};
        
        if (!formPaiement.moyenPaiement) {
            errors.moyenPaiement = 'Le moyen de paiement est requis.';
        }
  
        if (!formPaiement.montant) {
            errors.montant = 'Le montant est requis.';
        }

        if (!formPaiement.numero) {
            errors.numero = 'Le numéro mobile money est requis.';
        } else if (formPaiement.numero.length !== 10) {
            errors.numero = 'Veuilez saisir les 10 chiffres de votre numero Svp !';
        }
        else {
            if (formPaiement.moyenPaiement === 'Orange money') {
                if (!formPaiement.numero.startsWith("07")) {
                    errors.numero = 'Le numéro saisi n\'est pas orange';
                } 
                
            } else if (formPaiement.moyenPaiement === 'Moov money') {
                if (!formPaiement.numero.startsWith("01")) {
                    errors.numero = 'Le numéro saisi n\'est pas moov';
                } 
                
            } else if (formPaiement.moyenPaiement === 'Mtn money') {
                if (!formPaiement.numero.startsWith("05")) {
                    errors.numero = 'Le numéro saisi n\'est pas mtn,';
                } 
                
            }
        }
        
        
        if (!formPaiement.date) {
            errors.date = 'La date est requise.';
        }

        if (Object.keys(errors).length > 0) {
            setFormDataErrorss(errors);
          } else {
            setFormDataErrorss({});
            console.log(formPaiement.numero.length);
            console.log(typeof(formPaiement.numero.length));
            console.log('Données valides :', formPaiement);
            console.log(formPaiement);
            // instance.post("categorie-cours/create", formPaiement)
            //     .then(response => {
            //         console.log('Enregistrement réussi :', response.data);
            //         // window.location.reload();
            //     })
            //     .catch(error => {
            //         console.error('Erreur lors de l\'enregistrement :', error);
            //     });
            //   reset()
            setActiveStep((prevStep) => prevStep + 1);
          }
    }

    const precedent = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
  
    useEffect(() => {
        const generateAttendanceDates = (startDate, duration, heure) => {
            if (!startDate) return [];
            const dates = [];
        
            const startMoment = moment(startDate, 'YYYY-MM-DD');
        
            for (let i = 0; i < duration * 4; i++) {
                const currentDate = startMoment.clone().add(i * 7, 'days');
                
                dates.push({
                    dateMarqueDePresence: currentDate.format('YYYY-MM-DD'),
                    heure: heure,
                    heureEffectue: 0,
                });
            }
        
            setDates(dates);
        };
    
        if (formCours.dteDteDebutCours && formCours.forfait && formCours.heureCours) {
            generateAttendanceDates(formCours.dteDteDebutCours, parseInt(formCours.forfait.split(" ")[0]), formCours.heureCours);
        }
    }, [formCours.dteDteDebutCours, formCours.forfait, formCours.heureCours]);
    
    const [domainePlaceDisponible, setDomainePlaceDisponible] = useState([])
    const [dateHeure, setDateHeure] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/domaine-categorie/read/${formCours.libelle}`)
        .then(response => {
          setDomainePlaceDisponible(response.data.placeDisponible);
            console.log(response.data.placeDisponible);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
        });
          
    }, [formCours.libelle]);
    
    const paiement = (event) => {
        
    }

    useEffect(() => {
        if (echeance.length > 0) {
            setFormPaiement((prevFormPaiement) => ({
                ...prevFormPaiement,
                montant: echeance[0].montant,
        }));
            setFormPaiement((prevFormPaiement) => ({
                ...prevFormPaiement,
                date: echeance[0].datePaiement
            }));
        } else {
            console.log('non');
            console.log(echeance);
            setFormPaiement((prevFormPaiement) => ({
                ...prevFormPaiement,
                montant: formCours.montant,
        }));
            setFormPaiement((prevFormPaiement) => ({
                ...prevFormPaiement,
                date: formCours.dteDteDebutCours
        }));
        }
    }, [echeance, formCours])

    const envoyer = () => {
        // instance.post(`cours/create-with-schedule/${apprenant.id}/${formCours.professeur}/${formCours.libelle}`, {
        instance.post(`cours/create-with-schedule/${apprenant.id}/${formCours.libelle}`, {
            cours: formCours,
            marqueDePresence: dates,
            echeancier: echeance,
            seanceProfesseurs: dates, 
            professeur: formCours.professeur
        })
            .then(response => {
                console.log('Enregistrement réussi :', response.data);
            })
            .catch(error => {
                console.error('Erreur lors de l\'enregistrement :', error);
            });
        
            // instance.put(`apprenant/update/scolarite-acompte/${apprenant.id}`, {
            //     scolarite: parseInt(apprenant.scolarite) + parseInt(formCours.montant),
            //     scolaritePayé: parseInt(apprenant.scolaritePayé) + parseInt(formPaiement.montant)
            // })
            //     .then(response => {
            //         console.log('Données mises à jour avec succès:', response.data);
            //     })
            //     .catch(error => {
            //       console.error('Erreur lors de la mise à jour des données:', error);
            //     });
        setShowEtapes(false)
        paiement()
        console.log(apprenant);
        console.log(echeance);
        console.log(dates);
        console.log(formCours);
        setActiveStep((prevStep) => prevStep + 1);
        

        // async function updateNombrePlace() {
        //     try {
        //       await axios.put(`http://localhost:8081/domaine-categorie/update-nombre-place/${formCours.libelle}`, {
        //         placeDisponible: parseInt(domainePlaceDisponible) - 1
        //       });
        //       console.log('Champ mis à jour avec succès');
        //       // fetchApprenant()
        //     } catch (error) {
        //       console.error('Erreur lors de la mise à jour du champ:', error);
        //     }
        // }
        // updateNombrePlace()
        console.log(formCours);
  };

  function datesPrisesOuNull(nouvellesSeances, anciennesSeances) {
    // Créez un ensemble (Set) pour stocker les dates et heures des anciennes séances prises
    const datesPrises = new Set();
  
    // Parcourez le tableau des anciennes séances pour ajouter les dates et heures prises à l'ensemble
    for (const ancienneSeance of anciennesSeances) {
      const ancienneDate = ancienneSeance.date;
      const ancienneHeure = ancienneSeance.heure;
      datesPrises.add(ancienneDate + ancienneHeure);
    }
  
    // Parcourez le tableau des nouvelles séances pour vérifier si les dates sont prises
    const datesDejaPrises = nouvellesSeances
      .filter(seance => datesPrises.has(seance.date + seance.heure))
      .map(seance => seance.date);
  
    // Renvoyez les dates prises s'il y en a, sinon renvoyez null
    return datesDejaPrises.length > 0 ? datesDejaPrises : null;
}

const nouvellesSeances = [
    // Remplir ce tableau avec les nouvelles séances (dates, heures, apprenants)
  ];
  
  const anciennesSeances = [
    // Remplir ce tableau avec les anciennes séances (dates, heures, apprenants)
  ];
  
  
  useEffect(() => {
      const datesPrises = datesPrisesOuNull(dates, dateHeure);
      
    if (datesPrises) {
      console.log("Dates déjà prises : ", datesPrises);
    } else {
      console.log("Aucune date déjà prise.");
    }

}, [dates, dateHeure])

  useEffect(() => {
      const fetchData = () => {
          instance.get(`domaine-categorie/read/${formCours.libelle}`)
              .then(response => {
                  setNomCours(response.data)
                  setLoading(false)
              })
              .catch(error => {
                  console.error('Erreur lors de la récupération des données :', error);
                  setLoading(false)
              });
      };

      if (formCours.libelle !== undefined) {
          fetchData(); 
      }
  }, [formCours.libelle]);
  
    useEffect(() => {
      const fetchData = () => {
          instance.get(`professeur/read/${formCours.professeur}`)
              .then(response => {
                console.log(response.data);
                  setNomProfesseur(response.data)
                  setLoading(false)
              })
              .catch(error => {
                  console.error('Erreur lors de la récupération des données :', error);
                  setLoading(false)
              });
      };

      if (formCours.professeur !== undefined) {
          fetchData(); 
      }
    }, [formCours.professeur]);
    
    const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    };
    const [showEtapes, setShowEtapes] = useState(true)
    return (
        <div style={style}>
            {showEtapes && <center>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {etapes.map((etape, index) => (
                            <Step key={index}>
                                <StepLabel style={style}>{etape.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </center>}
            <div>
                {activeStep === 0 && (
                    <div>
                        <Typography variant="h6" className='my-5 text-center'>Choix du cours</Typography>
                        <CoursApprenant
                            setDateHeure={setDateHeure}
                            proff={proff}
                            apprenant={apprenant}
                            formCours={formCours}
                            setFormCours={setFormCours}
                            formDataError={formDataErrors}
                            setFormDataError={setFormDataErrors}
                            setEcheance={setEcheance}
                        />
                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="contained" disabled>
                                Précédent
                            </Button>
                            <Button variant="contained" onClick={suivantCours} disableElevation>
                                Suivant
                            </Button>
                        </div>
                  </div>
                )}
                {/* {activeStep === 1 && (
                    <div>
                        <Typography variant="h6" className='my-5 text-center'>Formulaire de paiement</Typography>
                        <div className="formPaie">
                            <FormPaiement
                                formPaiement={formPaiement}
                                setFormPaiement={setFormPaiement}
                                formDataError={formDataErrorss}
                                setFormDataError={setFormDataErrorss}
                            />
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="contained" onClick={precedent} disableElevation>
                                Précédent
                            </Button>
                            <Button variant="contained" onClick={suivantForm} disableElevation>
                                Suivant
                            </Button>
                        </div>
                    </div>
                )} */}
                {activeStep === 1 && (
                    <div>
                        <Typography variant="h6" className='text-center mb-4' style={{ marginTop: 60 }}>Récapitulatif de la souscription</Typography>
                        <div className="recapitulatif my-5">
                            {/* <div className="ps-3 py-2" style={{ borderTop: '1px solid #BDBDBD',  }}> */}
                            <div className="ps-3 py-2" style={{  }}>
                            <Row className=''>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: '#1976D2' }}>
                                        <BiBook size={20} color='white' />
                                    </div>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} className="pt-1">Cours</Col>
                                <Col xs={6} sm={6} md={6} lg={6} className="pt-1">{nomCours?.libelle}</Col>
                            </Row>
                        </div>
                        <div className="ps-3 py-2" style={{  }}>
                            <Row className=''>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: '#1976D2' }}>
                                        <GiDuration size={20} color='white' />
                                    </div>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} className="pt-1">Forfait</Col>
                                <Col xs={6} sm={6} md={6} lg={6} className="pt-1">{formCours.forfait}</Col>
                            </Row>
                        </div>
                        <div className="ps-3 py-2" style={{   }}>
                            <Row className=''>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: '#1976D2' }}>
                                        <BsCalendar2Date size={20} color='white' />
                                    </div>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} className="pt-1">Date</Col>
                                <Col xs={6} sm={6} md={6} lg={6} className="pt-1">{daysOfWeek[new Date(formCours.dteDteDebutCours).getDay()]} {moment(formCours.dteDteDebutCours).format("DD MMMM YYYY")} au {daysOfWeek[new Date(formCours.dteDteFinCours).getDay()]} {moment(formCours.dteDteFinCours).format("DD MMMM YYYY")}</Col>
                            </Row>
                        </div>
                        <div className="ps-3 py-2" style={{   }}>
                            <Row className=''>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: '#1976D2' }}>
                                        <IoTimeOutline size={20} color='white' />
                                    </div>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} className="pt-1">Heure</Col>
                                <Col xs={6} sm={6} md={6} lg={6} className="pt-1">{formCours.heureCours}</Col>
                            </Row>
                        </div>
                            <div className="ps-3 py-2" style={{  }}>
                                <Row className=''>
                                    <Col xs={2} sm={2} md={2} lg={2}>
                                        <div className="d-flex justify-content-center align-items-center" style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: '#1976D2' }}>
                                            <GiMoneyStack size={20} color='white' />
                                        </div>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4} className="pt-1">Montant Total</Col>
                                    <Col xs={6} sm={6} md={6} lg={6} className="pt-1">{formCours.montant} FCFA</Col>
                                </Row>
                            </div>
                                {formCours.echeancierUsed && (
                                <div className="ps-3 py-2" style={{  }}>
                                    <Row className=''>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className="d-flex justify-content-center align-items-center" style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: '#1976D2' }}>
                                                <BiBook size={20} color='white' />
                                            </div>
                                        </Col>
                                        <Col xs={4} sm={4} md={4} lg={4} className="pt-1">Echeancier</Col>
                                        <Col xs={6} sm={6} md={6} lg={6} className="pt-1">
                                            <ul>
                                                {echeance.map((ec, index) => {
                                                    return (
                                                        <li>{moment(ec.dateEcheance).format("DD MMMM YYYY")}: {ec.montant} FCFA</li>
                                                    )
                                                })}
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                            {/* {nomProfesseur.length > 0 &&  */}
                                <div className="ps-3 py-2" style={{  }}>
                                    <Row className=''>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className="d-flex justify-content-center align-items-center" style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: '#1976D2' }}>
                                                <PiChalkboardTeacherLight size={20} color='white' />
                                            </div>
                                        </Col>
                                        <Col xs={4} sm={4} md={4} lg={4} className="pt-1">Professeur</Col>
                                        <Col xs={6} sm={6} md={6} lg={6} className="pt-1">{nomProfesseur?.prenom} {nomProfesseur?.nom}</Col>
                                    </Row>
                                </div>
                            {/* } */}
                        </div>
                        {/* <div className="recapitulatif rounded-4" style={{ border: "1px solid #BDBDBD", borderBottom: "8px solid #BDBDBD", color: "black", padding: 65, fontSize: 16, fontWeight: 400 }}>
                            
                        </div> */}
                        <div className="d-flex justify-content-between mt-5">
                            <Button variant="contained" onClick={precedent} disableElevation>
                                Précédent
                            </Button> 
                            <Button variant="contained" onClick={envoyer} disableElevation>
                                Envoyer
                            </Button>
                        </div>
                    </div>
                )}
                {activeStep === 2 && (
                    <>
                        <div className="">
                            <PageFelicitation cours={nomCours?.libelle} />
                            {/* <div className="d-flex justify-content-between mt-4">
                                <Button variant="contained" disabled>
                                    Précédent
                                </Button>
                                <Button variant="contained" onClick={() => console.log('Fermer')} disableElevation>
                                    Fermer
                                </Button>
                            </div> */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FormMulti;
