import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import axios from 'axios';
import { addMonthsToDate, formatDateToYYYYMMDD } from '../date';
import Calendrier from './Calendrier';
import Echeancier from './Echeancier';
import AlertDialogSlide from './AlertDialogSlide';
import { instance } from '../axios';
import moment from 'moment';

const CoursApprenant = ({ apprenant, formCours, setFormCours, formDataError, setFormDataError, echeance, setEcheance, proff, setDateHeure}) => {
    const [cours, setCours] = useState();
    // const [echeance, setEcheance] = useState([]);
    // const { apprenant } = useContext(ApprenantContext)
    const [coursActive, setCoursActive] = useState([]);
    const [domaine, setDomaine] = useState([]);
    const [professeurs, setProfesseurs] = useState([]);
    const [professeur, setProfesseur] = useState();
    const [loading, setLoading] = useState(true);
    // const [formDataError, setFormDataError] = useState({});
    const [sommeMontants, setSommeMontants] = useState(0);
    const [nombreApprenants, setNombreApprenants] = useState(0);
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [openn, setOpenn] = useState(false);
    const [nomProfesseur, setNomProfesseur] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        console.log(nombreApprenants);
        if (cours === 1) {
            if (nombreApprenants === 1) {
                console.log('ouui');
                handleClickOpen()
            }
        }
    }, [nombreApprenants, cours])


    // const [formCours, setFormCours] = useState({
    //     // id: 
    //     libelle: 1,
    //     montant: 0,
    //     professeur: "",
    //     dteDteDebutCours: moment(new Date()).format("YYYY-MM-DD"),
    //     dteDteFinCours: "", 
    //     heureCours: "", 
    //     forfait: "",
    //     status: "En cours",
    //     echeancierUsed: false
    // });
    
    if (proff === false) {
        formCours.professeur = ""
    }
    
    const handleChangeCours = (event) => {setFormCours((prevFormCours) => ({
            ...prevFormCours,
            [event.target.name]: event.target.value,
          }));
    };
    
    const handleCoursChange = (event) => {
        setCours(event.target.value);
    }

    
    const handleForfaitChange = (event) => {
        setFormCours((prevFormCours) => ({
          ...prevFormCours,
          forfait: event.target.value,
        }));
    };
    // const updateEcheance = useCallback((value) => {
    //     // You can perform any necessary logic here before updating the state
    //     // For example, you might want to validate the 'value' or apply some transformations
    
    //     // Update the state with the new value
    //     setEcheance(value);
    //   }, []);

      const handleEcheancierChange = (event) => {
          setFormCours((prevFormCours) => ({
            ...prevFormCours,
            echeancierUsed: event.target.value === 'true',
          }));
          console.log(formCours.echeancierUsed);
    };
    
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
    
        // setDates(dates);
    };

    // const dateAfterFourWeeks = moment('2023-09-15').add(3, 'weeks').format('YYYY-MM-DD')
    // console.log(dateAfterFourWeeks);
    
    useEffect(() => { 
        const dateFin = () => {
            if (formCours.dteDteDebutCours && formCours.forfait !== "") {
                const nbre = formCours.forfait
                const tab = nbre.split(" ")
                // const resultDate = addMonthsToDate(new Date(formCours.dteDteDebutCours), parseInt(tab[0]));
                // setFormCours((prevFormCours) => ({
                //     ...prevFormCours,
                //     dteDteFinCours: formatDateToYYYYMMDD(resultDate)
                // }));
                if (parseInt(tab[0]) === 1) {
                    setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                            dteDteFinCours: moment(formCours.dteDteDebutCours).add(3, 'weeks').format('YYYY-MM-DD')
                        }));
                } else if (parseInt(tab[0]) === 3) {
                    setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                            dteDteFinCours: moment(formCours.dteDteDebutCours).add(11, 'weeks').format('YYYY-MM-DD')
                        }));
                } else if (parseInt(tab[0]) === 9) {
                    setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                            dteDteFinCours: moment(formCours.dteDteDebutCours).add(35, 'weeks').format('YYYY-MM-DD')
                        }));
                }
            }
        }
        dateFin()
    }, [formCours.dteDteDebutCours, formCours.forfait, formCours.dteDteFinCours])


    useEffect(() => {
        const fetchData = () => {
            instance.get('categorie-cours/cours-active')
                .then(response => {
                    setCoursActive(response.data)
                    setCours(response.data[0].id)
                    
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
    }, []);
    
    
    useEffect(() => {
        const fetchDataD = () => {
            instance.get(`domaine-categorie/categorie/${cours}`)
                .then(response => {
                    setDomaine(response.data)
                    if (response.data.length > 0) {
                        setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                            libelle: response.data[0].id,
                          }));
                    }
                    console.log(response.data);
                    setLoading(false)
                    
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
        };
        if (cours) {
            fetchDataD()
        }
    }, [cours])

    useEffect(() => {
        const updateMontant = () => {
            if (parseInt(cours) === 1) {
                switch (formCours.forfait) {
                    case '1 mois':
                        setFormCours((prevFormCours) => ({
                        ...prevFormCours,
                        montant: 35000,
                    }));
                        break;
                    case '3 mois':
                        setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                            montant: 100000,
                        }));
                    break;
                case '9 mois':
                      setFormCours((prevFormCours) => ({
                        ...prevFormCours,
                          montant: 300000,
                      }));
                    break;
                default:
                    setFormCours((prevFormCours) => ({
                        ...prevFormCours,
                        montant: 0,
                    }));
            }
        } else {
            switch (formCours.forfait) {
                case '1 mois':
                    setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                        montant: 25000,
                    }));
                    break;
                case '3 mois':
                    setFormCours((prevFormCours) => ({
                        ...prevFormCours,
                        montant: 60000,
                    }));
                    break;
                case '9 mois':
                    setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                        montant: 200000,
                    }));
                    break;
                    default:
                          setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                              montant: 0,
                          }));
                      }
                }
              };
    
        updateMontant()
    }, [cours, formCours.forfait])

    // const [dates, setDates] = useState([]);
  

    // useEffect(() => {
    //     const generateAttendanceDates = (startDate, duration, heure) => {
    //         if (!startDate) return [];
    //         const dates = [];
        
    //         const startMoment = moment(startDate, 'YYYY-MM-DD');
        
    //         for (let i = 0; i < duration * 4; i++) {
    //             const currentDate = startMoment.clone().add(i * 7, 'days');
                
    //             dates.push({
    //                 dateMarqueDePresence: currentDate.format('YYYY-MM-DD'),
    //                 heure: heure
    //             });
    //         }
        
    //         setDates(dates);
    //     };
    
    //     if (formCours.dteDteDebutCours && formCours.forfait && formCours.heureCours) {
    //         generateAttendanceDates(formCours.dteDteDebutCours, parseInt(formCours.forfait.split(" ")[0]), formCours.heureCours);
    //     }
    // }, [formCours.dteDteDebutCours, formCours.forfait, formCours.heureCours]);
    
  
    
    useEffect(() => {
        // instance.put(`apprenant/update/scolarite/${apprenant.id}`, apprenant.scolarite + formCours.forfait)
        // .then(response => {
        //   console.log('Données mises à jour avec succès:', response.data);
        //   // window.location.reload();
        // })
        // .catch(error => {
        //   console.error('Erreur lors de la mise à jour des données:', error);
        // });
    }, [apprenant.scolarite, apprenant.id, formCours.forfait])
    // const [domainePlaceDisponible, setDomainePlaceDisponible] = useState([])

    // useEffect(() => {
    //     instance.get(`domaine-categorie/read/${formCours.libelle}`)
    //     .then(response => {
    //       setDomainePlaceDisponible(response.data.placeDisponible);
    //         console.log(response.data.placeDisponible);
    //     })
    //     .catch(error => {
    //       console.error('Erreur lors de la récupération des données :', error);
    //     });
          
    //   }, [formCours.libelle]);
      
      
      const handleSubmit = (event) => {
    //       console.log(cours);
    //       console.log(formCours);
    //       console.log(sommeMontants );
    //     event.preventDefault();
    //     setOk(false)

    //     const errors = {};
        
    //   if (!cours) {
    //       errors.cours = 'Le cours est requis.';
    //   }
      
    //     if (!formCours.libelle) {
    //       errors.libelle = 'Le domaine est requis.';
    //   }

    // //   if (!formCours.dteDteDebutCours ) {
    // //     errors.dteDteDebutCours = 'La date de début est requise';
    // //   } else {
    // //       if (dateExist) {
    // //         errors.dteDteDebutCours = "Cette date n'est plus disponible";
    // //       }
    // //   }
    
    //     if (!formCours.dteDteFinCours) {
    //       errors.dteDteFinCours = 'La date de fin est requise.';
    //   }

    //   if (!formCours.forfait) {
    //       errors.forfait = 'Le type de forfait est requis.';
    //   }

    //   if (!formCours.heureCours  || !formCours.dteDteDebutCours) {
    //       errors.heureCours = 'L\'heure de et la date de début du cours sont requis.';
    //   }
      
    //     if (!formCours.montant) {
    //       errors.montant = 'Le montant de la scolarité est requise.';
    //       }
          
    //       if (formCours.echeancierUsed) {
    //           if (formCours.montant !== sommeMontants) {
    //             errors.montantEcheance = 'La somme de l\'echeancier n\'est pas équivalant a la totalité de la scolarité';
    //           }
    //       }

    //     if (Object.keys(errors).length > 0) {
    //         setFormDataError(errors);
    //     } else {
    //         setFormDataError({});
    //         console.log("yu");
    //         setOk(true)
    //         // instance.post(`cours/create-with-schedule/${apprenant.id}/${formCours.professeur}/${formCours.libelle}`, {
    //         //     cours: formCours, 
    //         //     marqueDePresence: dates,
    //         //     echeancier: echeance
    //         // })
    //         //     .then(response => {
    //         //         console.log('Enregistrement réussi :', response.data);
    //         //     })
    //         //     .catch(error => {
    //         //         console.error('Erreur lors de l\'enregistrement :', error);
    //         //     });
            
    //         // instance.put(`apprenant/update/scolarite/${apprenant.id}`, {
    //         //     scolarite: parseInt(apprenant.scolarite) + parseInt(formCours.montant)
    //         // })
    //         //     .then(response => {
    //         //         console.log('Données mises à jour avec succès:', response.data);
    //         //     })
    //         //     .catch(error => {
    //         //       console.error('Erreur lors de la mise à jour des données:', error);
    //         //     });
    //         console.log(apprenant);
    //     }

    //     console.log(echeance);
    //     console.log(dates);
    //     console.log(formCours);

    //     async function updateNombrePlace() {
    //         try {
    //           await axios.put(`http://localhost:8081/domaine-categorie/update-nombre-place/${formCours.libelle}`, {
    //             placeDisponible: parseInt(domainePlaceDisponible) - 1
    //           });
    //           console.log('Champ mis à jour avec succès');
    //           // fetchApprenant()
    //         } catch (error) {
    //           console.error('Erreur lors de la mise à jour du champ:', error);
    //         }
    //     }
    //     updateNombrePlace()
    //     console.log(formCours);
    }

    // const [dateHeure, setDateHeure] = useState([])

    useEffect(() => {
        console.log(sommeMontants);
        console.log(formCours.professeur);
    }, [sommeMontants, formCours.professeur])

//   useEffect(() => {
//     const fetchData = () => {
//         instance.get('cours/read-dte-debut-cours')
//             .then(response => {
//               setDateHeure(response.data)
//               setLoading(false)
              
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la récupération des données :', error);
//                 setLoading(false)
//             });
//         };
  
//     fetchData();
//   }, [dateHeure]);

    useEffect(() => {
    const fetchData = () => {
        instance.get(`professeur/by-domaine/${formCours.libelle}/status/Actif/disponibilite/Disponible`)
            .then(response => {
              setProfesseurs(response.data)
                setLoading(false)
                if (response.data.length > 0) {
                    if (proff) {
                        setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                            professeur: response.data[0].id,
                          }));
                    } else {
                        setFormCours((prevFormCours) => ({
                            ...prevFormCours,
                            professeur: null,
                          }));
                    }
                    
                }
              
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };
  
    fetchData();
  }, [formCours.libelle]);
    
    const disabledDates = []; 
  
    const handleSelectDate = (date) => {
        setFormCours((prevFormCours) => ({
            ...prevFormCours,
            dteDteDebutCours: date}))
    };

    const handleSelectHour = (heure) => {
        setFormCours((prevFormCours) => ({
            ...prevFormCours,
            heureCours: heure,
        }));
    };
    
    useEffect(() => {
        const fetchData = () => {
            instance.get(`professeur/read/${formCours.professeur}`)
                .then(response => {
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

    const style = {
        fontFamily: "Poppins, sans-serif",
        // Ajoutez d'autres styles CSS au besoin
      };

    return (
        <>
            <div className="" style={style}>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-5">
                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                            <Form.Label className="fw-bolder">Cours</Form.Label>
                            <Form.Select aria-label="Default select example"
                                // onClick={fetchDataD}
                                id="cours"
                                value={cours}
                                name="cours"
                                onChange={handleCoursChange}>
                                {loading ? <option>Chargement en cours...</option> : (
                                    coursActive.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.libelle}</option>
                                        )
                                    })
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {formDataError.cours}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                            <Form.Label className="fw-bolder">Domaine</Form.Label>
                            {proff ?
                                (
                                    <Form.Select
                                    isInvalid={!!formDataError.libelle}
                                    aria-label="Default select example" id="libelle" value={formCours.libelle} name="libelle" onChange={(event) => { handleChangeCours(event); setProfesseur(event.target.value) }}>
                                    {loading ? <option>Chargement en cours...</option> : (
                                        domaine.map((item) => {
                                            return (
                                                <option value={item.id}>{item.libelle}</option>
                                            )
                                        })
                                    )}
                                </Form.Select>
                                )
                                    :
                                (
                                    <Form.Select
                                isInvalid={!!formDataError.libelle}
                                aria-label="Default select example" id="libelle" value={formCours.libelle} name="libelle" onChange={(event) => { handleChangeCours(event)}}>
                                {loading ? <option>Chargement en cours...</option> : (
                                    domaine.map((item) => {
                                        return (
                                            <option value={item.id}>{item.libelle}</option>
                                        )
                                    })
                                )}
                            </Form.Select>
                                    )
                            }
                            
                            <Form.Control.Feedback type="invalid">
                                {formDataError.libelle}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {proff && <Row>
                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                            <Form.Label className="fw-bolder">Professeurs</Form.Label>
                            {proff  === true ?
                                (
                                    <Form.Select
                                isInvalid={!!formDataError.professeur}
                                aria-label="Default select example" id="professeur" value={formCours.professeur} name="professeur" onChange={(event) => { handleChangeCours(event); setProfesseur(event.target.value) }}>
                                {loading ? <option>Chargement en cours...</option> : (
                                    professeurs.map((item) => {
                                        return ( 
                                            professeurs.length > 0 ? <option value={item.id}>{item.prenom} {item.nom}</option> : <option>Aucun professeur disponible</option>
                                        )
                                    })
                                )}
                            </Form.Select>
                                )
                                    :
                                (
                                    <Form.Select
                                isInvalid={!!formDataError.professeur}
                                aria-label="Default select example" id="professeur" value={formCours.professeur} name="professeur" onChange={(event) => { handleChangeCours(event); setProfesseur(event.target.value) }}>
                                {loading ? <option>Chargement en cours...</option> : (
                                    professeurs.map((item) => {
                                        return (
                                            <option value=" "></option>
                                        )
                                    })
                                )}
                            </Form.Select>
                                    )
                            }
                            
                            <Form.Control.Feedback type="invalid">
                                {formDataError.professeur}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>}
                    <Row className="my-5">
                        <Form.Label className="fw-bolder">Choisissez votre date de cours suivant les disponibilités:</Form.Label>
                        <Calendrier onSelectHour={handleSelectHour} setDateHeure={setDateHeure} setNombreApprenants={setNombreApprenants} prof={formCours.professeur} cours={cours} forfait={parseInt(formCours.forfait.split(" ")[0])} hr={formCours.heureCours} domaine={formCours.libelle} disabledDates={disabledDates} heureCours={formCours.heureCours} onSelectDate={handleSelectDate} />
                        {formDataError.heureCours && (
                            <p style={{ color: "#DC3545", paddingTop: 5, fontSize: 15 }}>
                                {formDataError.heureCours}
                            </p>
                        )}
                    </Row>
                    <Row className="my-5">
                        <Form.Group as={Col} xs={12} sm={12} md={5} lg={5} controlId="validationCustom01">
                            <Form.Label className="fw-bolder">Forfait</Form.Label> <br />
                            <Form.Check
                                inline
                                label="1 mois"
                                value="1 mois"
                                name="forfait"
                                type="radio"
                                id="inline-radio-1"
                                isInvalid={!!formDataError.forfait}
                                checked={formCours.forfait === '1 mois'}
                                onChange={handleForfaitChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                name="forfait"
                                label="3 mois"
                                value="3 mois"
                                isInvalid={!!formDataError.forfait}
                                checked={formCours.forfait === '3 mois'}
                                onChange={handleForfaitChange}
                            />
                            <Form.Check
                                inline
                                onClick={(e) => console.log(e.target.value)}
                                label="9 mois"
                                value="9 mois"
                                name="forfait"
                                type="radio"
                                isInvalid={!!formDataError.forfait}
                                id="inline-radio-3"
                                checked={formCours.forfait === '9 mois'}
                                onChange={handleForfaitChange}
                            />
                            {formDataError.forfait && (
                            <p style={{ color: "#DC3545", paddingTop: 5, fontSize: 15 }}>
                                {formDataError.forfait}
                            </p>
                        )}
                        </Form.Group>
                    </Row>
                    <Row className="my-5">
                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                            <Form.Label className="fw-bolder">Date Fin</Form.Label>
                            <Form.Control
                                isInvalid={!!formDataError.dteDteFinCours}
                                type="date"
                                name="dteDteFinCours"
                                onChange={handleChangeCours}
                                value={formCours.dteDteFinCours}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formDataError.dteDteFinCours}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                            <Form.Label className="fw-bolder">Montant</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                name="montant"
                                onChange={handleChangeCours}
                                value={formCours.montant}
                                isInvalid={!!formDataError.montant}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formDataError.montant}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {formCours.forfait === "1 mois" || formCours.forfait === "" || formCours.forfait === "3 mois"  ? "" : (
                        <>
                            <Row className="my-5">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom03">
                                    <Form.Label className="fw-bolder">Désirez-vous un écheancier pour le paiement ?</Form.Label> <br />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        name="echeancierUsed"
                                        label="Oui"
                                        value="true"
                                        isInvalid={!!formDataError.echeancierUsed}
                                        checked={formCours.echeancierUsed === true}
                                        onChange={handleEcheancierChange}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        name="echeancierUsed"
                                        label="Non"
                                        value="false"
                                        isInvalid={!!formDataError.echeancierUsed}
                                        checked={formCours.echeancierUsed === false}
                                        onChange={handleEcheancierChange}
                                    />
                                    
                                    {formDataError.echeancierUsed && (
                                        <p style={{ color: "#DC3545", paddingTop: 5, fontSize: 15 }}>
                                            {formDataError.echeancierUsed}
                                        </p>
                                    )}
                                </Form.Group>
                            </Row>
                            {/* {formCours.echeancierUsed} */}
                            {formCours.echeancierUsed ? (
                                <Row className="mb-3">
                                    <div className="App">
                                        <h1>Échéancier</h1>
                                        <Echeancier setEcheance={setEcheance} echeancierUsed={formCours.echeancierUsed} setSommeMontants={setSommeMontants} cours={cours} />
                                        {formDataError.montantEcheance && (
                                            <p style={{ color: "#DC3545", paddingTop: 5, fontSize: 15, marginTop: 0 }}>
                                                {formDataError.montantEcheance}
                                            </p>
                                        )}
                                    </div>
                                </Row>
                            ) : ""}
                        </>
                    )}
                    {/* <Button type="submit">Soumettre</Button> */}
                </Form>
            </div>
            {/* {alert ? <AlertDialogSlide /> : ''} */}
            <AlertDialogSlide
                setAlert={() => setAlert(false)}
                response={true}
                titre="Confirmation heure double"
                text={`Le professeur ${nomProfesseur?.prenom} ${nomProfesseur?.nom} à déjà un cours à la date et l'heure sélectionné. Voulez-vous faire un cours double ?`}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                submit={() => console.log('Oui')}
            />
        </>
    )
}

export default CoursApprenant
