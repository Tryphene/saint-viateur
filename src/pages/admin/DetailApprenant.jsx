import React, { useContext, useEffect, useState } from 'react'
// import ProgressBar from '../components/ProgressBar'
import moment from 'moment';
import {  Link, useParams } from 'react-router-dom';
import {Button, Col,  Form,  Row, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import WeeklySchedule from '../../components/WeeklySchedule';
import scolarite3 from "../../img/scolarite3.png"
import cours4 from "../../img/cours4.png"
import absence2 from "../../img/absence2.png"
// import AjoutCours from '../../components/AjoutCours';
import CahierPresence from '../../components/CahierPresence';
import { instance } from '../../axios';
import { MdCancel, MdOutlineRefresh, MdOutlineViewTimeline } from "react-icons/md";
import Tooltipp from '../../components/Tooltipp';
import FullScreenDialog from '../../components/FullScreenDialog';
import { GiTakeMyMoney, GiTeacher } from 'react-icons/gi';
import { PiCheckFatFill } from 'react-icons/pi';
import { BsCalendarDateFill } from 'react-icons/bs';
import { AdminContext } from '../../context/AdminContext';
import AlertDialogSlide from '../../components/AlertDialogSlide';
// import { Switch } from '@mui/material';
import { BiSolidBook } from 'react-icons/bi';
import { formatDateToYYYYMMDD } from '../../date';
import Calendrier from '../../components/Calendrier';
import Buttonn from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TiDelete } from 'react-icons/ti';
import { TfiLocationPin } from "react-icons/tfi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoSchoolOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { PiIdentificationBadgeLight } from "react-icons/pi";
import { HiOutlineIdentification, HiIdentification } from "react-icons/hi2";
import { CgWorkAlt } from "react-icons/cg";
import { AiOutlineMail } from 'react-icons/ai';
import ConvertToPDF from '../../components/ConvertToPDF';

const DetailApprenant = () => {
    const { id } = useParams();
    const { admin } = useContext(AdminContext)

    // const [scolarite, setScolarite] = useState(0)
    // const [scolariteAcompte, setScolariteAcompte] = useState(0)
    const [pourcentage, setPourcentage] = useState(0);
    const [totalMontantCours, setTotalMontantCours] = useState(0);
    const [totalMontantPaiement, setTotalMontantPaiement] = useState(0);
    const [absences, setAbsences] = useState(0);
    const [loading, setLoading] = useState(true);
    const [cours, setCours] = useState([]);
    const [coursAActive, setCoursAActive] = useState([]);
    const [allCours, setAllCours] = useState([]);
    const [apprenant, setApprenant] = useState([]);
    const [formDataError, setFormDataError] = useState({});
    const [formCoursError, setFormCoursError] = useState({});
    const [open, setOpen] = useState(false);
    const [nombreApprenants, setNombreApprenants] = useState(0);

    const disabledDates = []; 
    
    const [show, setShow] = useState(false);
    const [showProf, setShowProf] = useState(false);
    const [showw, setShoww] = useState(false);

    const handleClosse = () => setShow(false);
    const handleClos = () => setShoww(false);
    const handleShow = () => setShow(true);
    const handleShowProf = () => setShowProf(true);
    const handleShoww = () => setShoww(true);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
    };
      
    const handleCloseProf = () => {
        setShowProf(false);
    };

    const [open3, setOpen3] = React.useState(false);

  const handleCloseC = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen3(false);
  };
    
    const [formPaiement, setFormPaiement] = useState({
        // moyenPaiement: 'Orange money',
        // numero: "",
        datePaiement: new Date(),
        montant: "",
        admin: admin.email, 
        jour: new Date(),
    });
   
    const [formProf, setFormProf] = useState({
        nomCours: "",
        professeur: "",
        date: "",
        heure: "",
    });

    const handleChangeProf = (event) => {
        setFormProf({
          ...formProf,
          [event.target.name]: event.target.value,
        });
    };

    // const [domaine, setDomaine] = useState([]);
    const [professeurs, setProfesseurs] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            instance.get(`professeur/by-domaine/${formProf.idCours}/status/Actif/disponibilite/Disponible`)
                .then(response => {
                  setProfesseurs(response.data)
                    setLoading(false)
                    if (response.data.length > 0) {
                            setFormProf((prevFormProf) => ({
                                ...prevFormProf,
                                professeur: response.data[0].id,
                            }));
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
      }, [formProf.idCours]);
    
    const [dateHeure, setDateHeure] = useState([])

    // const fetchDataP = (professeur) => {
    //     // axios.get('http://localhost:8081/cours/read-dte-debut-cours')
    //     instance.get(`marque-de-presence/read-dte-heure-cours-apprenant-by-prof/${professeur}`)
    //       .then(response => {
    //         console.log(response.data);
    //           setDateHeure(response.data);
              
    //           const professeurEstDisponible = (date, heureCour, dateHeure) => {
    //             const dateRecherchee = date;
    //             const heuresPrises = dateHeure
    //                 .filter((rdv) => rdv.date === dateRecherchee && rdv.heure === heureCour)
    //                 .map((rdv) => rdv.apprenantId);
          
    //             // Vous pouvez ajuster cette valeur en fonction du nombre d'apprenants que vous souhaitez gérer
    //             const capaciteMax = 2;
          
    //             // Vérifiez si le professeur a de la capacité pour plus d'apprenants
    //             const apprenantsPourCetteDate = dateHeure
    //                 .filter((rdv) => rdv.date === dateRecherchee && rdv.heure === heureCour)
    //                 .length;
          
    //               const estDisponible = apprenantsPourCetteDate < capaciteMax;
                  
    //               if (estDisponible) {
    //                 const profId = dateHeure[0].profId;
    //                 return { profId, heureCour };
    //               } else {
    //                 return null; // Ou une autre valeur pour indiquer que le professeur n'est pas disponible
    //               }
    //           };
              
    //           // Utilisation de la fonction pour vérifier si un professeur est disponible
    //           const professeurEstDispo = professeurEstDisponible(formProf.date, formProf.heure, response.data);
    //           console.log(professeurEstDispo);
    //         setLoading(false);
    //       })
    //       .catch(error => {
    //         console.error('Erreur lors de la récupération des données :', error);
    //         setLoading(false);
    //       });
    // };

    const [nouvellesSeances, setNouvellesSeances] = useState([])
    const [datesDejaPrises, setDatesDejaPrises] = useState([])

    function datesPrisesOuNull(nouvellesSeances, anciennesSeances, nombreAttendu) {
        // Créez un objet pour stocker le nombre d'occurrences par date et heure des anciennes séances
        const occurencesAnciennesSeances = {};
      
        // Parcourez le tableau des anciennes séances pour compter les occurrences par date et heure
        for (const ancienneSeance of anciennesSeances) {
          const cleDateHeure = ancienneSeance.date + ancienneSeance.heure;
      
          if (!occurencesAnciennesSeances[cleDateHeure]) {
            occurencesAnciennesSeances[cleDateHeure] = 0;
          }
      
          occurencesAnciennesSeances[cleDateHeure]++;
        }
      
        // Parcourez le tableau des nouvelles séances pour vérifier si les dates sont prises le nombre attendu de fois
        const datesDejaPrises = nouvellesSeances
          .filter(seance => occurencesAnciennesSeances[seance.date + seance.heure] === nombreAttendu)
          .map(seance => seance.date);
      
        setDatesDejaPrises(datesDejaPrises);
        // if (datesDejaPrises.length > 0 ) {
        //     setOpen3(true)
        // }
        // Renvoyez les dates prises le nombre attendu de fois s'il y en a, sinon renvoyez null
        return datesDejaPrises.length > 0 ? datesDejaPrises : null;
      }


    const listProf = (item) => {
        formProf.id = item.id
        formProf.idCours = item.idCours
        formProf.nomCours = item.nomCours
        formProf.date = item.dateDebutCours
        formProf.heure = item.heureCours
        console.log()

        const transformedData = generateAttendanceDates(formatDateToYYYYMMDD(new Date(item.dateDebutCours)), parseInt(item.forfait.split(" ")[0]), item.heureCours).map(item => ({
            date: item.dateMarqueDePresence,
            heure: item.heure,
            heureEffectue: item.heureEffectue
        }));
    
        setNouvellesSeances(transformedData)
        console.log(transformedData);
        // console.log(datesPrisesOuNull(transformedData, dateHeure, 2));

    }

    //   useEffect(() => {
    //       const datesPrises = datesPrisesOuNull(nouvellesSeances, dateHeure, 1);
    //       console.log(nouvellesSeances);
    //       console.log(dateHeure);
    //     if (datesPrises) {
    //       console.log("Dates déjà prises : ", datesPrises);
    //     } else {
    //       console.log("Aucune date déjà prise.");
    //     }

    // }, [dateHeure, nouvellesSeances])

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
    const [coursId, setCoursId] = useState('');
    
    useEffect(() => {
        console.log(coursId);
    }, [coursId])

    const handleChange = (event) => {
          setFormPaiement({
            ...formPaiement,
            [event.target.name]: event.target.value,
          });
    };

    useEffect(() => {
    const absence = () => {
        instance.get('marque-de-presence/marques-de-presence', {
            params: {
                presence: 'Absent',
                apprenantId: id
            }
        })
            .then(response => {
                setAbsences(response.data.totalElements);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    };
    
    absence();

}, [id]);

    useEffect(() => {
        const fetchData = () => {
          instance.get(`apprenant/read/${id}`)
            .then(response => {
                // setScolarite(response.data.scolarite)
                // setScolariteAcompte(response.data.scolaritePayé)
                setApprenant(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };

        if (id !== undefined) {
            fetchData(); 
        }

    }, [id, apprenant]);

    const fetchData = (url, set) => {
        instance.get(url)
            .then(response => {
                set(response.data);
                console.log(response.data);
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des données :', error);
              setLoading(false)
          });
      };
    
    useEffect(() => {
        const fetchDataCoursActif = () => {
            instance.get(`cours/somme-montant-by-apprenant-actif/${id}`, {
                params: {
                    isActif: true
                }
            })
                .then(response => {
                    setTotalMontantCours(response.data);
                    console.log(response.data);
              })
              .catch(error => {
                  console.error('Erreur lors de la récupération des données :', error);
                  setLoading(false)
              });
          };
        fetchData(`paiement/count-montant-by-apprenant/${id}`, setTotalMontantPaiement)
        fetchDataCoursActif()
        // fetchData(`cours/somme-montant-by-apprenant/${id}`, setTotalMontantCours)
     }, [id])

    useEffect(() => {
        const fetchData = () => {
          instance.get(`domaine-categorie/read/${id}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };
      
        fetchData();
    }, [id]);

    useEffect(() => { 
        // setPourcentage(((scolariteAcompte / scolarite) * 100).toFixed(0))
            setPourcentage(((totalMontantPaiement / totalMontantCours) * 100).toFixed(0))
    }, [totalMontantCours, totalMontantPaiement, apprenant])
    
    useEffect(() => {
        const fetchDataActif = () => {
            instance.get(`cours/cours-is-actif-apprenant/${id}`, {
                params: {
                    isActif: true,
                    status: 'En cours'
              }
          })
              .then(response => {
                //   setCours(response.data);
                //   console.log(response.data);
                  setLoading(false)
                //   console.log("yes");
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };
        
        const fetchDataNonActif = () => {
            instance.get(`cours/read-cours-apprenant-actif/${id}`, {
                params: {
                    isActif: false, 
                    // status: 'En cours'
              }
          })
              .then(response => {
                  setCoursAActive(response.data);
                  setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };
        // cours-is-actif-apprenant
        const fetchDataAllCours = () => {
          instance.get(`cours/all-cours-actif/${id}?isActif=${true}`)
              .then(response => {
                  setAllCours(response.data);
                  setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
            });
        };

        if (id !== undefined || id) {
            fetchDataActif();
            fetchDataNonActif();
        }

        fetchDataAllCours()
    }, [id, cours, coursAActive]);

    const [nomCours, setNomCours] = useState("")
    const [nomProfesseur, setNomProfesseur] = useState([])

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
            instance.get(`cours/read-cours-apprenant-actif-status/${id}`, {
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

    }, [id])

    const cour = {}

      const list = (item) => {
        cour.id = item.id
        cour.nomCours = item.nomCours
        cour.dteDteDebutCours = item.dateDebutCours
        cour.dteDteFinCours = item.dateFinCours
          cour.montant = item.montant
          
    
        localStorage.setItem('idCours', JSON.stringify(cour))
    }

    const[dates, setDates] = useState([])

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
        console.log(dates);
        return dates;
    };
    
    const envoyer = (dates, echeances, professeur, libelle) => {
        instance.post(`cours/create-with-schedule/${apprenant.id}/${professeur}/${libelle}`, {
            cours: cour,
            marqueDePresence: dates,
            echeancier: echeances,
            seanceProfesseurs: dates,
        })
            .then(response => {
                console.log('Enregistrement réussi :', response.data);
            })
            .catch(error => {
                console.error('Erreur lors de l\'enregistrement :', error);
            });
    }

    const [formCours, setFormCours] = useState({
        dteDteDebutCours: formatDateToYYYYMMDD(new Date()),
        dteDteFinCours: "",
        montant: "",
        echeancierUsed: "",
        heureCours: "",
        forfait: "",
        professeur: "",
        libelle: "",
        status: "En cours",
        isActif: false
    });

    const handleChangeCours = (event) => {
        setFormCours({
          ...formCours,
          [event.target.name]: event.target.value,
        });
    };


    
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
     
    const renouveler = (item) => {
        // formCours.dteDteDebutCours = formatDateToYYYYMMDD(new Date())
        if (item.forfait === '1 mois') {
            formCours.dteDteFinCours = moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(3, 'weeks').format('YYYY-MM-DD')
        } else if (item.forfait === '3 mois') {
            formCours.dteDteFinCours = moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(11, 'weeks').format('YYYY-MM-DD')
        } else if (item.forfait === '9 mois') {
            formCours.dteDteFinCours = moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(35, 'weeks').format('YYYY-MM-DD')
        }

        // console.log(generateAttendanceDates(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours)), parseInt(item.forfait.split(" ")[0]), item.heureCours))

        const echeances = [];
        if (item.echeancierUsed) {
            if (parseInt(item.montant) === 300000) {
                console.log("3");
                echeances.push(
                    {
                        datePaiement: '',
                        dateEcheance: moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(3, 'months').format('YYYY-MM-DD'),
                        montant: 150000,
                        status: "Non Payé",
                    },
                    {
                        datePaiement: '',
                        dateEcheance: moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(6, 'months').format('YYYY-MM-DD'),
                        montant: 100000,
                        status: "Non Payé",
                    },
                    {
                        datePaiement: '',
                        dateEcheance: moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(9, 'months').format('YYYY-MM-DD'),
                        montant: 100000,
                        status: "Non Payé",
                    }
                )
            } else {
                console.log("2");
                echeances.push(
                    {
                        datePaiement: '',
                        dateEcheance: moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(3, 'months').format('YYYY-MM-DD'),
                        montant: 100000,
                        status: "Non Payé",
                    },
                    {
                        datePaiement: '',
                        dateEcheance: moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(6, 'months').format('YYYY-MM-DD'),
                        montant: 50000,
                        status: "Non Payé",
                    },
                    {
                        datePaiement: '',
                        dateEcheance: moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(9, 'months').format('YYYY-MM-DD'),
                        montant: 50000,
                        status: "Non Payé",
                    }
                )
            }
        }

        formCours.montant = item.montant
        formCours.echeancierUsed = item.echeancierUsed
        formCours.montant = item.montant
        formCours.heureCours = item.heureCours
        formCours.forfait = item.forfait
        formCours.professeur = item.professeur
        formCours.libelle = item.libelle
        formCours.status = "En cours"
        formCours.isActif = false

        console.log(formCours);
        console.log(echeances);

        // envoyer(generateAttendanceDates(formatDateToYYYYMMDD(new Date()), parseInt(item.forfait.split(" ")[0]), item.heureCours), echeances, item.professeur, item.libelle)

        
    }

    const renouvelerr = (item) => {
        if (item.forfait === '1 mois') {
            formCours.dteDteFinCours = moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(3, 'weeks').format('YYYY-MM-DD')
        } else if (item.forfait === '3 mois') {
            formCours.dteDteFinCours = moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(11, 'weeks').format('YYYY-MM-DD')
        } else if (item.forfait === '9 mois') {
            formCours.dteDteFinCours = moment(formatDateToYYYYMMDD(new Date(formCours.dteDteDebutCours))).add(35, 'weeks').format('YYYY-MM-DD')
        }

        formCours.montant = item.montant
        formCours.echeancierUsed = item.echeancierUsed
        formCours.montant = item.montant
        formCours.heureCours = item.heureCours
        formCours.forfait = item.forfait
        formCours.professeur = item.professeur
        formCours.libelle = item.libelle
        formCours.status = "En cours"
        formCours.isActif = false

        console.log(formCours);
        
    }

    useEffect(() => { 
        const dateFin = () => {
            if (formCours.dteDteDebutCours && formCours.forfait !== "") {
                const nbre = formCours.forfait
                const tab = nbre.split(" ")
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
    }, [formCours])
    
    const activeDesactiveCompte = (validation) => {
        instance.put(`apprenant/update/is-validated-registration/${apprenant.id}`, {
            isValidatedRegistration: validation,
            updated_at: new Date(),
            updated_by: admin.email
        })
            .then(response => {
                console.log('Compte activée avec succes', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour des données:', error);
            });
    }

    // console.log();

    const envoieMail = (url, form) => {
        instance.post(url, form)
            .then(response => {
            console.log(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement :', error);
        });
    }

    let mailAcceptation = {}
    
    if (!apprenant.mailParent) {
        mailAcceptation = {
            to: apprenant.mail,
            subject: "Confirmation du paiement des frais d'inscription",
            text: `<!DOCTYPE html>
            <html>
            <head>
                <title>Confirmation de Paiement des Frais d'Inscription</title>
            </head>
            <body>
            <center>
                <table width="70%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" style="background-color: #B60520; padding: 18px; text-size: 18px; text-align: center; color: white; border-radius: 10px; margin-bottom: 30px;">
                            <h1>Confirmation de Paiement des Frais d'Inscription</h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Merci d'avoir effectué le paiement de vos frais d'inscription au Conservatoire. Votre paiement a été reçu avec succès.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Récapitulatif du paiement :</p>
                            <table>
                                <tr>
                                    <td>Montant payé :</td>
                                    <td><b>${15000} FCFA</b></td>
                                </tr>
                                <tr>
                                    <td>Date du paiement :</td>
                                    <td><b>${moment(new Date()).format("DD MMMM YYYY")}</b></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Vous êtes maintenant officiellement inscrit à notre école. Vous pouvez accéder à votre espace personnel pour consulter votre emploi du temps et d'autres informations importantes.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Cordialement, <br> Conservatoire Saint Viateur d'Abidjan</p>
                        </td>
                    </tr>
                </table>
                </center>
            </body>
            </html>
            `
        }
    } else {
        mailAcceptation = {
            to: apprenant.mailParent,
            subject: "Confirmation du paiement des frais d'inscription",
            text: `<!DOCTYPE html>
            <html>
            <head>
                <title>Confirmation de Paiement des Frais d'Inscription</title>
            </head>
            <body>
            <center>
                <table width="70%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" style="background-color: #B60520; padding: 18px; text-size: 18px; text-align: center; color: white; border-radius: 10px; margin-bottom: 30px;">
                            <h1>Confirmation de Paiement des Frais d'Inscription</h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Merci d'avoir effectué le paiement des frais d'inscription pour votre enfant au Conservatoire.
                             Votre paiement a été reçu avec succès.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Récapitulatif du paiement :</p>
                            <table>
                            <tr>
                                <td>Montant payé :</td>
                                <td><b>${15000} FCFA</b></td>
                            </tr>
                            <tr>
                                <td>Date du paiement :</td>
                                <td><b>${moment(new Date()).format("DD MMMM YYYY")}</b></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Votre enfant est maintenant officiellement inscrit à notre école. Vous pouvez accéder à son espace personnel 
                            pour consulter son emploi du temps et d'autres informations importantes.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Cordialement, <br> Conservatoire Saint Viateur d'Abidjan </p>
                        </td>
                    </tr>
                </table>
                </center>
            </body>
            </html>
            `
        }
    }
    
    const activeCompte= (validation) => {
        instance.put(`apprenant/update/is-validated-registration/${apprenant.id}`, {
            isValidatedRegistration: validation,
            abonnementExpiryDate: "2024-06-15",
        })
            .then(response => {
                console.log('Compte activée avec succes', response.data);

                instance.post(`paiement-frais/create/${apprenant.id}`, {
                    datePaiement: new Date(),
                    fraisInscription: 15000,
                    admin: admin.email
                })
                    .then(response => {
                        console.log('Enregistrement réussi :', response.data);
        
                        instance.put(`apprenant/update/frais-inscription/${apprenant.id}`, {
                            fraisInscription: 15000,
                            updated_at: new Date(),
                            updated_by: admin.email,
                        })
                            .then(response => {
                                console.log('Frais payé', response.data);
        
                                envoieMail('envoie-email', mailAcceptation)
                            })
                            .catch(error => {
                                console.error('Erreur lors de la mise à jour des données:', error);
                            });
        
                        // instance.put(`apprenant/update/abonnement-expire-time/${apprenant.id}`, {
                        //     abonnementExpiryDate: "2024-06-15",
                        //     updated_at: new Date(),
                        //     updated_by: admin.email,
                        // })
                        //     .then(response => {
                        //         console.log('Abon', response.data);
        
                        //         envoieMail('envoie-email', mailAcceptation)
                        //     })
                        //     .catch(error => {
                        //         console.error('Erreur lors de la mise à jour des données:', error);
                        //     });
                            
                        })
                        .catch(error => {
                            console.error('Erreur lors de l\'enregistrement :', error);
                        });
                      reset()
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour des données:', error);
            });
    }


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

    useEffect(() => {
        instance.get(`marque-de-presence/read-dte-heure-cours-apprenant-by-prof/${formProf.professeur}`)
                .then(response => {
                    console.log(response.data);
                    setDateHeure(response.data);
                    datesPrisesOuNull(nouvellesSeances, response.data, 2);
        })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
    }, [formProf.professeur, nouvellesSeances])

    const attribuerCours = (id, professeur, item) => {
        if (datesDejaPrises.length > 0) {
            setOpen3(true)
        } else {
            instance.put(`cours/update/professeur/${id}?idProf=${professeur}`)
            .then(response => {
                console.log('Cours', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour des données:', error);
            });
        
        instance.put(`marque-de-presence/update/professeur?idProf=${professeur}&idCours=${id}`)
            .then(response => {
                console.log('Marque de presence modifié avec succes', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour des données:', error);
            });
        
        instance.post(`marque-de-presence-professeur/create-seances/${professeur}/${id}`, dates)
            .then(response => {
                console.log('Séance professeur ajouté avec succes', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de l\'enregistrement des données:', error);
            });
        }
    }



    const listt = (item) => {
        setCoursId(item.id);
        // formPaiement.datePaiement = item.dateDebutCours
        formPaiement.datePaiement = formatDateToYYYYMMDD(new Date())
        formPaiement.montant = item.montant
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};
  
        if (!formPaiement.montant) {
            errors.montant = 'Le montant est requis.';
        }
        
        if (!formPaiement.datePaiement) {
            errors.datePaiement = 'La date est requise.';
        }

        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
          } else {
            setFormDataError({});
            console.log('Données valides :', formPaiement);
            console.log(formPaiement);
            instance.post(`paiement/create/${id}/${coursId}`, formPaiement)
                .then(response => {
                    console.log('Enregistrement réussi :', response.data);
                    activeDesactiveCours(true, coursId)
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement :', error);
                });
              reset()
          }
    }

    const submitRenou = (event, item) => {
        event.preventDefault();
        const errors = {};
  
        if (!formCours.dteDteDebutCours) {
            errors.dteDteDebutCours = 'La date de début est requise.';
        }
        
        if (!formCours.dteDteFinCours) {
            errors.dteDteFinCours = 'La date de fin est requise.';
        }

        if (Object.keys(errors).length > 0) {
            setFormCoursError(errors);
        } else {
            setFormCoursError({});
            console.log('Données valides :', formCours);
            renouveler(item)
            
        }
    }

    const [openModal, setOpenModal] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const studentInfo = {
        nom: apprenant.nom,
        prenom: apprenant.prenom,
        dateNaissance: moment(apprenant.dteNaissance).format("DD MMMM YYYY"),
        lieuNaissance: apprenant.lieuNaissance,
        adresseEmail: apprenant.mail,
        telephoneMobile: apprenant.telephoneMobile,
        profession: apprenant.profession,
        nvScolaire: apprenant.nvScolaire,
        test: apprenant.testIsChecked,
        nomParent: apprenant.nomParent,
        prenomParent: apprenant.prenomParent,
        mailParent: apprenant.mailParent,
        telParent: apprenant.telParent
    }

    const [compte, setCompte] = useState(false)
    
    useEffect(() => {
        if (!apprenant.nomParent) {
            setCompte(true)
        } else {
            setCompte(false)
        }
    }, [apprenant])
    
    useEffect(() => {
        console.log(compte);
    }, [compte])

    const [professeu, setProfesseu] = useState([])
    
    useEffect(() => {
        const fetchData = () => {
            instance.get(`professeur/read/${formProf.professeur}`)
                .then(response => {
                    setProfesseu(response.data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
        };

        if (formProf.professeur !== undefined) {
            fetchData(); 
        }
    }, [formProf.professeur]);

    const style = {
        fontFamily: "Poppins, sans-serif",
    };

    return (
        <>
            <p className='mb-5 fw-semibold' style={{ color: '#464255', fontSize: 18, letterSpacing: 0 }}>L'apprenant {apprenant.prenom} {apprenant.nom}</p>
            <Row className=''>
                <Col xs={12} sm={12} md={3} lg={3} className='mb-3'>
                    {/* <AjoutCours apprenant={apprenant} /> */}
                    <FullScreenDialog width={`100%`} proff={true} apprenant={apprenant} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={3} className='mb-3'>
                    <div>
                        <Buttonn style={{width: "100%", fontFamily: "Poppins, sans-serif"}} width={`100%`} variant="contained" disableElevation onClick={() => { setOpenModal(true) }}>
                            <HiIdentification className='me-3' color='white' size={25} /> Informations Apprenant
                        </Buttonn>
                        <Dialog
                            style={style}
                            fullScreen={fullScreen}
                            open={openModal}
                            onClose={() => { setOpenModal(false) }}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title" style={style}>
                                {"Informations Apprenant"}
                            </DialogTitle>
                            <DialogContent style={style}>
                                <p className="fw-bolder" style={{ fontSize: 18, color: "#B60520" }}>Apprenant</p>
                                <div className="line"></div>
                                <div className="d-flex px-3 pt-3 pb-2 my-2" style={{backgroundColor: "#EDEDF3", borderRadius: 6}}>
                                    <PiIdentificationBadgeLight size={22} className='me-2 mt-0' color="black" />
                                    <p className='me-4'>Nom :</p>
                                    <p style={{fontWeight: 500}}>{apprenant.nom}</p>
                                </div>
                                <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{backgroundColor: "#EDEDF3", borderRadius: 6}}>
                                    <HiOutlineIdentification size={22} className='me-2 mt-0' color="black" />
                                    <p className='me-4'>Prénom(s) :</p>
                                    <p style={{fontWeight: 500}}>{apprenant.prenom}</p>
                                </div>
                                <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{ backgroundColor: "#EDEDF3", borderRadius: 6 }}>
                                    <LiaBirthdayCakeSolid size={22} className='me-2 mt-0' color="black" />
                                    <p className='me-4'>Date de naissance :</p>
                                    <p style={{fontWeight: 500}}>{moment(apprenant.dteNaissance).format("DD MMMM YYYY")}</p>
                                </div>
                                <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{ backgroundColor: "#EDEDF3", borderRadius: 6 }}>
                                    <TfiLocationPin size={22} className='me-2' color="black" />
                                    <p className='me-4'>Lieu de naissance :</p>
                                    <p style={{ fontWeight: 500 }}>{apprenant.lieuNaissance}</p>
                                </div>
                                <div className="d-flex px-3 pt-3 pb-0 mb-2" style={{backgroundColor: "#EDEDF3", borderRadius: 6}}>
                                    <CgWorkAlt size={22} className='me-2' color="black" />
                                    <p className='me-4'>Profession :</p>
                                    <p style={{fontWeight: 500}}>{apprenant.profession ? apprenant.profession : <TiDelete size={30} color='red' />}</p>
                                </div>
                                <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{backgroundColor: "#EDEDF3", borderRadius: 6}}>
                                    <IoSchoolOutline size={22} className='me-2' color="black" />
                                    <p className='me-4'>Niveau scolaire :</p>
                                    <p style={{fontWeight: 500}}>{apprenant.nvScolaire}</p>
                                </div>
                                <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{backgroundColor: "#EDEDF3", borderRadius: 6}}>
                                    <AiOutlineMail size={22} className='me-2' color="black" />
                                    <p className='me-4'>Adresse e-mail :</p>
                                    <p style={{fontWeight: 500}}>{apprenant.mail}</p>
                                </div>
                                {apprenant.telephoneMobile && (
                                    <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{ backgroundColor: "#EDEDF3", borderRadius: 6 }}>
                                        <BsTelephone size={22} className='me-2' color="black" />
                                        <p className='me-4'>Téléphone :</p>
                                        <p style={{ fontWeight: 500 }}>{apprenant.telephoneMobile}</p>
                                    </div>
                                )}
                                {apprenant.nomParent && (
                                    <>
                                        <p className="fw-bolder mt-4" style={{ fontSize: 18, color: "#B60520" }}>Représentant Légal</p>
                                        <div className="line"></div>
                                        <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{ backgroundColor: "#EDEDF3", borderRadius: 6 }}>
                                            <PiIdentificationBadgeLight size={22} className='me-2' color="black" />
                                            <p className='me-4'>Nom :</p>
                                            <p style={{ fontWeight: 500 }}>{apprenant.nomParent}</p>
                                        </div>
                                        <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{ backgroundColor: "#EDEDF3", borderRadius: 6 }}>
                                            <HiOutlineIdentification size={22} className='me-2' color="black" />
                                            <p className='me-4'>Prénom(s) :</p>
                                            <p style={{ fontWeight: 500 }}>{apprenant.prenomParent}</p>
                                        </div>
                                        <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{ backgroundColor: "#EDEDF3", borderRadius: 6 }}>
                                            <AiOutlineMail size={22} className='me-2' color="black" />
                                            <p className='me-4'>Adresse e-mail :</p>
                                            <p style={{ fontWeight: 500 }}>{apprenant.mailParent}</p>
                                        </div>
                                        <div className="d-flex px-3 pt-3 pb-2 mb-2" style={{ backgroundColor: "#EDEDF3", borderRadius: 6 }}>
                                            <BsTelephone size={22} className='me-2' color="black" />
                                            <p className='me-4'>Téléphone :</p>
                                            <p style={{ fontWeight: 500 }}>{apprenant.telParent}</p>
                                        </div>
                                    </>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { setOpenModal(false) }} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={3}>
                    <ConvertToPDF width='100%' bg="danger" titre={`Fiche d'inscription`} studentInfo={studentInfo} compte={compte} submit={() => console.log("Téléchargement")} />
                </Col>
            </Row>
            <Row>
                <Col className="mt-2" xs={12} sm={12} md={12} lg={4}>
                    <div className="d-flex justify-content-evenly rounded-2"style={{ color: "black", with: "auto", backgroundColor: "#D9D6F4" }} >
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 30, borderRadius: 40, width: 60, height: 60, backgroundColor: 'white', border: "1px solid #968EC7" }}>
                            {loading ? <Spinner size='sm' animation="border" /> : <img src={scolarite3} width={30} alt="" />}
                        </div>
                        <div className="m">
                            <p className="mt-4 mb-0" style={{ fontSize: 16 }}>Scolarité</p>
                            {totalMontantCours === totalMontantPaiement ? <p className="text-center fw-bolder mt-0 " style={{ fontSize: 37, }}>A jour</p> :
                                <p className="text-center fw-bolder mt-0 " style={{ fontSize: 37 }}>{pourcentage}% </p>}
                        </div>
                    </div>
                </Col>
                <Col className="mt-2" xs={12} sm={12} md={12} lg={4}>
                    <div className="d-flex justify-content-evenly rounded-2"style={{ color: "black", with: "auto", backgroundColor: "#D0F5F8" }} >
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 30, borderRadius: 40, width: 60, height: 60, backgroundColor: 'white', border: "1px solid #A6D3D8" }}>
                            {loading ? <Spinner size='sm' animation="border" /> : <img src={absence2} width={30} alt="" />}
                        </div>
                        <div className="m">
                            <p className="pt-4 mb-0" style={{ fontSize: 16 }}>Total Absence</p>
                            <p className="fw-bolder mt-0 text-center" style={{ fontSize: 37 }}>{absences}</p>
                        </div>
                    </div>
                </Col>
                <Col className="mt-2" xs={12} sm={12} md={12} lg={4}>
                    <div className="d-flex justify-content-evenly rounded-2"style={{ color: "black", with: "auto", backgroundColor: "#C6EEE6" }} >
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 30, borderRadius: 40, width: 60, height: 60, backgroundColor: 'white', border: "1px solid #7CD9C6" }}>
                            {loading ? <Spinner size='sm' animation="border" /> : <img src={cours4} width={30} alt="" />}
                        </div>
                        <div className="m">
                            <p className="mt-4 mb-0" style={{ fontSize: 16 }}>Total Cours</p>
                            <p className="fw-bolder mt-0 text-center" style={{ fontSize: 37 }}>{allCours.length}</p>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* {allCours.length > 0 ?
                ( */}
                    <>
                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={9} lg={9}>
                                <div className="mt-4 rounded-4 p-3" style={{ background: "white" }}>
                                    <div className="d-flex justify-content-between" style={{ alignItems: "center", justifyItems: "center" }}>
                                        <div className="mb-4">
                                            <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Cours en attente d'Activation</p>
                                            <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Effectuer le paiement des cours pour l'activation</p>
                                        </div>
                                        {/* {(allCours.length > 0) && <Link className="" style={{ fontSize: 15, letterSpacing: 0, fontWeight: 300 }}>Voir tout </Link>} */}
                                    </div>
                                    {loading ? <p>Chargement en cours</p> : (
                                        <Row className='px-2'>
                                            {coursAActive.length > 0 ?
                                                (
                                                    <div className="table-responsive">
                                                        <table className="table rounded-2">
                                                            <thead className=''>
                                                                <tr>
                                                                    <th scope="col">Cours</th>
                                                                    <th scope="col">Date Cours</th>
                                                                    <th scope="col"></th>
                                                                    {/* <th scope="col">Attribuer un professeur</th> */}
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                                <tbody>
                                                                {coursAActive.map((cour, index) => {
                                                                    return (
                                                                        <>
                                                                            <tr className='pb-0'>
                                                                                <td className='align-middle'>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#F7931A', borderRadius: 50, width: 30, height: 30 }}>
                                                                                            <BiSolidBook size={15} className='' color="white" />
                                                                                        </div>
                                                                                        <div className="pt-3 ps-2">
                                                                                            <p style={{ color: "#6F7A92" }} className="">{cour.nomCours}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td className='align-middle'>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#77C454', borderRadius: 50, width: 30, height: 30 }}>
                                                                                            <BsCalendarDateFill size={15} className='' color="white" />
                                                                                        </div>
                                                                                        <div className="pt-3 ps-2">
                                                                                            <p style={{ color: "#6F7A92" }} className="">{moment(cour.dateDebutCours).format('D MMMM YYYY')} au {moment(cour.dateFinCours).format('D MMMM YYYY')}   </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                {cour.nomProfesseur ?
                                                                                    (
                                                                                        <td className='align-middle'>
                                                                                        <div className="d-flex align-items-center">
                                                                                                <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#FF788E', borderRadius: 50, width: 30, height: 30 }}>
                                                                                                    <GiTeacher size={15} className='' color="white" />
                                                                                                </div>
                                                                                                <div className="pt-3 ps-2">
                                                                                                    <p style={{ color: "#6F7A92" }} className="">{cour.nomProfesseur} {cour.prenomProfesseur}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <td className='align-middle'>
                                                                                            <Tooltipp titre='Attribuer un professeur'>
                                                                                                <button style={{ backgroundColor: 'white' }}>
                                                                                                    <GiTeacher size={23} className='' color='black' onClick={() => { handleShowProf(); listProf(cour) }} alt="" />
                                                                                                </button>
                                                                                            </Tooltipp>
                                                                                            <Modal style={style} show={showProf} onHide={handleCloseProf}>
                                                                                                    <Modal.Header closeButton>
                                                                                                        <Modal.Title>Attribuer un professeur</Modal.Title>
                                                                                                    </Modal.Header>
                                                                                                    <Modal.Body>
                                                                                                        <Form className='w-100 p-3'>
                                                                                                            <Row className='mb-3'>
                                                                                                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                                                                                <Form.Label>Cours</Form.Label>
                                                                                                                <Form.Control
                                                                                                                    readOnly
                                                                                                                    type="text"
                                                                                                                    name="nomCours"
                                                                                                                    onChange={handleChangeProf}
                                                                                                                    value={formProf.nomCours}
                                                                                                                    isInvalid={!!formCoursError.nomCours}
                                                                                                                />
                                                                                                                <Form.Control.Feedback type="invalid">
                                                                                                                    {formCoursError.nomCours}
                                                                                                                </Form.Control.Feedback>
                                                                                                                </Form.Group>
                                                                                                            </Row>
                                                                                                            <Row className='mb-3'>
                                                                                                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12}>
                                                                                                                <Form.Label>Choisir un professeur</Form.Label>
                                                                                                                <Form.Select
                                                                                                                    isInvalid={!!formDataError.professeur}
                                                                                                                    aria-label="Default select example" id="professeur" value={formProf.professeur} name="professeur" onChange={(event) => { handleChangeProf(event)}}>
                                                                                                                    {loading ? <option>Chargement en cours...</option> : (
                                                                                                                        professeurs.map((item) => {
                                                                                                                            return (
                                                                                                                                professeurs.length > 0 ? <option value={item.id}>{item.prenom} {item.nom}</option> : <option>Aucun professeur disponible</option>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    )}
                                                                                                                </Form.Select>
                                                                                                            </Form.Group>
                                                                                                            </Row>
                                                                                                        </Form>
                                                                                                    </Modal.Body>
                                                                                                    <Modal.Footer>
                                                                                                        <Button variant="secondary" onClick={handleCloseProf}>
                                                                                                            Fermer
                                                                                                        </Button>
                                                                                                        {/* <Button onClick={() => { reset() }} variant='danger'>Effacer le formulaire</Button> */}
                                                                                                        <Button variant="primary" onClick={(e) => { attribuerCours(cour.id, formProf.professeur, cour); console.log(cour.id, formProf.professeur) }}>
                                                                                                        Attribuer
                                                                                                    </Button>
                                                                                                    </Modal.Footer>
                                                                                                </Modal>
                                                                                        </td>
                                                                                    )
                                                                                }
                                                                                
                                                                                
                                                                                <td className='align-middle'>
                                                                                    {cour.echeancierUsed ?
                                                                                        (
                                                                                            <div className="d-flex align-items-center">
                                                                                                <div className="pt-2 ps-2">
                                                                                                    <Link className="" onClick={() => list(cour)} to={`/administration/echeancier/cours/${cour.id}`} style={{ textDecoration: 'none' }}>
                                                                                                        <Tooltipp titre='Paiement echeancier'>
                                                                                                            <button style={{ backgroundColor: 'white' }}>
                                                                                                                <MdOutlineViewTimeline size={28} className='' color='black' alt="" />
                                                                                                            </button>
                                                                                                        </Tooltipp>
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                        :
                                                                                        (
                                                                                            <>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    <div className="pt-2 ps-2">
                                                                                                        <Tooltipp titre='Paiement'>
                                                                                                            <button style={{ backgroundColor: 'white' }}>
                                                                                                                <GiTakeMyMoney onClick={() => { handleShow(); listt(cour) }} color='black' size={28} className='me-2' alt="" />
                                                                                                            </button>
                                                                                                        </Tooltipp>
                                                                                                    </div>
                                                                                                </div>
                                                                                                
                                                                                                <Modal style={style} show={show} onHide={handleClosse}>
                                                                                                    <Modal.Header closeButton>
                                                                                                        <Modal.Title>Formulaire de paiement</Modal.Title>
                                                                                                    </Modal.Header>
                                                                                                    <Modal.Body>
                                                                                                        <Form className='w-100 p-3'>
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
                                                                                                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
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
                                                                                                        </Form>
                                                                                                    </Modal.Body>
                                                                                                    <Modal.Footer>
                                                                                                        <Button variant="secondary" onClick={handleClosse}>
                                                                                                            Fermer
                                                                                                        </Button>
                                                                                                        {/* <Button onClick={() => { reset() }} variant='danger'>Effacer le formulaire</Button> */}
                                                                                                        <Button variant="primary" onClick={handleSubmit}>
                                                                                                            Effectuer le paiement
                                                                                                        </Button>
                                                                                                    </Modal.Footer>
                                                                                                </Modal>
                                                                                            </>
                                                                                        )
                                                                                    }
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
                                                    <>
                                                        <p className="ms-3" style={{ fontSize: 16, fontWeight: 300 }}>Aucun cours à activé</p>
                                                    </>
                                                )
                                            }
                                        </Row>
                                        // </Container>
                                    )}
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={3} lg={3}>
                                {/* <div className="mt-4 rounded-4 p-3" style={{ boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", background: "white" }}> */}
                                <div className="mt-4 rounded-4 p-3" style={{ background: "white" }}>
                                    <div className="d-flex justify-content-between mb-3" style={{ alignItems: "center", justifyItems: "center" }}>
                                        <div className="">
                                            <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Statut du Compte</p>
                                            <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Activer ou désactiver le compte</p>
                                        </div>
                                        {apprenant.isValidatedRegistration ? <Tooltipp titre='Compte Activé' ><div className='my-0'><PiCheckFatFill color='green' size={23} /></div></Tooltipp> : <Tooltipp titre='Compte Désactivé' ><div className='my-0'><MdCancel color='red' size={25} /></div></Tooltipp>}
                                    </div>
                                    {!apprenant.isValidatedRegistration ?
                                        (
                                            <>
                                                <button onClick={() => handleClickOpen()} className='bg-success'>Activer le compte</button>
                                            </>
                                        )
                                        : (
                                            <>
                                                <button onClick={() => handleClickOpen()} className='bg-danger'>Désactiver le compte</button>
                                            </>
                                        )
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className="mt-4 rounded-4 p-3" style={{ background: "white" }}>
                                    <div className="d-flex justify-content-between" style={{ alignItems: "center", justifyItems: "center" }}>
                                        <div className="mb-4">
                                            <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Cours en cours</p>
                                            <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Liste des cours en deroulement de l'apprenant {apprenant.prenom}</p>
                                        </div>
                                        {(allCours.length > 0) && <Link to={`/tous-mes-cours/${id}`} className="" style={{ fontSize: 15, letterSpacing: 0, fontWeight: 300 }}>Voir tout </Link>}
                                    </div>
                                    {(coursAActive.length > 0 && cours.length <= 0) ?
                                        (
                                            <p className="ms-3" style={{ fontSize: 16, fontWeight: 300 }}>Cours en attente d'activation </p>
                                        )
                                        :
                                        (
                                            cours.length > 0 ?
                                                (
                                                    <div className="table-responsive">
                                                    <table className="table rounded-2">
                                                        <thead className=''>
                                                            <tr>
                                                                <th scope="col">Cours</th>
                                                                <th scope="col">Date Cours</th>
                                                                <th scope="col">Professeur</th>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
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
                                                                                <p style={{ color: "#6F7A92" }} className="">{cour.nomCours}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='align-middle'>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#77C454', borderRadius: 50, width: 30, height: 30 }}>
                                                                            <BsCalendarDateFill size={15} className='' color="white" />
                                                                        </div>
                                                                        <div className="pt-3 ps-2">
                                                                            <p style={{ color: "#6F7A92" }} className="">{moment(cour.dateDebutCours).format('D MMMM YYYY')} au {moment(cour.dateFinCours).format('D MMMM YYYY')}   </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='align-middle'>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#FF788E', borderRadius: 50, width: 30, height: 30 }}>
                                                                            <GiTeacher size={15} className='' color="white" />
                                                                        </div>
                                                                        <div className="pt-3 ps-2">
                                                                            <p style={{ color: "#6F7A92" }} className="">{cour.nomProfesseur} {cour.prenomProfesseur}</p>
                                                                        </div>
                                                                        </div>
                                                                    </td>
                                                                        
                                                                    <td>
                                                                                {/* <div className="d-flex align-items-center">
                                                                                    <div className="pt-2 ps-2">
                                                                                        <Tooltipp titre='Renouveler'>
                                                                                            <button style={{ backgroundColor: 'white' }} onClick={() => { handleShoww(); renouvelerr(cour) }}>
                                                                                                <MdOutlineRefresh size={28} className='' color='black'  alt="" />
                                                                                            </button>
                                                                                        </Tooltipp>
                                                                                    </div>
                                                                        </div> */}

                                                                        <Tooltipp titre='Renouveler'>
                                                                            <button style={{ backgroundColor: 'white' }} onClick={() => { handleShoww() }}>
                                                                                <MdOutlineRefresh size={28} className='' color='black' alt="" />
                                                                            </button>
                                                                        </Tooltipp>
                                                                                    {/* </div>
                                                                                </div> */}

                                                                        <Modal size='lg' style={style} show={showw} onHide={handleClos}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Modal heading</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                <Row className='mb-3'>
                                                                                    <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                                                        <Form.Label>Date</Form.Label>
                                                                                        <Calendrier
                                                                                            onSelectHour={handleSelectHour}
                                                                                            setNombreApprenants={setNombreApprenants}
                                                                                            prof={formCours.professeur}
                                                                                            cours={cours}
                                                                                            forfait={parseInt(formCours.forfait.split(" ")[0])}
                                                                                            hr={formCours.heureCours}
                                                                                            domaine={formCours.libelle}
                                                                                            disabledDates={disabledDates}
                                                                                            heureCours={formCours.heureCours}
                                                                                            onSelectDate={handleSelectDate} />
                                                                                    </Form.Group>
                                                                                </Row>
                                                                                <Row className='mb-3'>
                                                                                    <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} >
                                                                                                    <Form.Label>Date Debut Cours</Form.Label>
                                                                                                    <Form.Control
                                                                                                        readOnly
                                                                                                        type="date"
                                                                                                        name="dteDteDebutCours"
                                                                                                        onChange={handleChangeCours}
                                                                                                        value={formCours.dteDteDebutCours}
                                                                                                        isInvalid={!!formCoursError.dteDteDebutCours}
                                                                                                    />
                                                                                                    <Form.Control.Feedback type="invalid">
                                                                                                        {formCoursError.dteDteDebutCours}
                                                                                                    </Form.Control.Feedback>
                                                                                                </Form.Group>
                                                                                            </Row>
                                                                                           <Row className='mb-3'>
                                                                                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12}>
                                                                                                    <Form.Label>Date Fin Cours</Form.Label>
                                                                                                    <Form.Control
                                                                                                        readOnly
                                                                                                        type="date"
                                                                                                        name="dteDteFinCours"
                                                                                                        onChange={handleChangeCours}
                                                                                                        value={formCours.dteDteFinCours}
                                                                                                        isInvalid={!!formCoursError.dteDteFinCours}
                                                                                                    />
                                                                                                    <Form.Control.Feedback type="invalid">
                                                                                                        {formCoursError.dteDteFinCours}
                                                                                                    </Form.Control.Feedback>
                                                                                                </Form.Group>
                                                                                            </Row>
        </Modal.Body>
        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose
                        }>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
                                                                        
                                                                                    {/* <Button variant="secondary" onClick={handleClos}>
                                                                                            Fermer
                                                                                        </Button>
                                                                                        <Button variant="primary" onClick={(e) => { submitRenou(e, cour) }}>
                                                                                            Renouveler
                                                                                        </Button> */}
                                                                </td>
                                                                <td>
                                                                {cour.echeancierUsed &&
                                                                    (
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="pt-2 ps-2">
                                                                                <Link className="" onClick={() => list(cour)} to={`/administration/echeancier/cours/${cour.id}`} style={{ textDecoration: 'none' }}>
                                                                                    <Tooltipp titre='Paiement echeancier'>
                                                                                        <button style={{ backgroundColor: 'white' }}>
                                                                                            <MdOutlineViewTimeline size={28} className='' color='black' alt="" />
                                                                                        </button>
                                                                                    </Tooltipp>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    </td>
                                                                    </tr>
                                                                {/* <Row>
                                                                    <Col xs={12} sm={12} md={12} lg={12} className='mt-2'>
                                                                        <div className="rounded-3 d-flex cours" style={{ width: "auto", backgroundColor: "#F9F9F9", fontSize: 16 }}>
                                                                            <div className='mx-4 d-flex justify-content-center align-items-center'>
                                                                                <Tooltipp titre='Cours' >
                                                                                    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'blueviolet', borderRadius: 50, width: 30, height: 30 }}>
                                                                                        <BiSolidBook size={15} className='' color="white" />
                                                                                    </div>
                                                                                </Tooltipp>
                                                                                <p style={{ color: "#6F7A92" }} className='mt-3 ms-2'>
                                                                                    {cour.nomCours}
                                                                                </p>
                                                                            </div>
                                                                            <div className='mx-4 d-flex justify-content-center align-items-center'>
                                                                                <Tooltipp titre='Date Cours' >
                                                                                    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'blueviolet', borderRadius: 50, width: 30, height: 30 }}>
                                                                                        <BsCalendarDateFill size={15} className='' color="white" />
                                                                                    </div>
                                                                                </Tooltipp>
                                                                                <p style={{ color: "#6F7A92" }} className='mt-3 ms-2'>
                                                                                    {moment(cour.dateDebutCours).format('D MMMM YYYY')} au {moment(cour.dateFinCours).format('D MMMM YYYY')}                                                                                  
                                                                                </p>
                                                                            </div>
                                                                            <div className='mx-4 d-flex justify-content-center align-items-center'>
                                                                                <Tooltipp titre='Enseignant' >
                                                                                    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'blueviolet', borderRadius: 50, width: 30, height: 30 }}>
                                                                                        <GiTeacher size={15} className='' color="white" />
                                                                                    </div>
                                                                                </Tooltipp>
                                                                                <p style={{ color: "#6F7A92" }} className='mt-3 ms-2'>
                                                                                    {cour.prenomProfesseur} {cour.nomProfesseur}
                                                                                </p>
                                                                            </div>
                                                                            {cour.isActif && (
                                                                                <>
                                                                                    <div className='mx-4 d-flex justify-content-center align-items-center'>
                                                                                        <Tooltipp titre='Renouveler'>
                                                                                            <div className="mx-4 my-3 d-flex">
                                                                                                <img src={refresh} width={28} className='' onClick={() => { handleShoww(); renouvelerr(cour)  }} alt="" />
                                                                                            </div>
                                                                                        </Tooltipp>

                                                                                        <Modal  style={style} show={showw} onHide={handleClos}>
                                                                                                <Modal.Header closeButton>
                                                                                                    <Modal.Title>Formulaire de renouvellement</Modal.Title>
                                                                                                </Modal.Header>
                                                                                                <Modal.Body>
                                                                                                    <Form className='w-100 p-3'>
                                                                                                        <Row className='mb-3'>
                                                                                                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} >
                                                                                                                <Form.Label>Date Debut Cours</Form.Label>
                                                                                                                <Form.Control
                                                                                                                    type="date"
                                                                                                                    name="dteDteDebutCours"
                                                                                                                    onChange={handleChangeCours}
                                                                                                                    value={formCours.dteDteDebutCours}
                                                                                                                    isInvalid={!!formCoursError.dteDteDebutCours}
                                                                                                                />
                                                                                                                <Form.Control.Feedback type="invalid">
                                                                                                                    {formCoursError.dteDteDebutCours}
                                                                                                                </Form.Control.Feedback>
                                                                                                            </Form.Group>
                                                                                                        </Row>
                                                                                                        <Row className='mb-3'>
                                                                                                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} >
                                                                                                                <Form.Label>Date Fin Cours</Form.Label>
                                                                                                            <Form.Control
                                                                                                                readOnly
                                                                                                                type="date"
                                                                                                                name="dteDteFinCours"
                                                                                                                onChange={handleChangeCours}
                                                                                                                value={formCours.dteDteFinCours}
                                                                                                                isInvalid={!!formCoursError.dteDteFinCours}
                                                                                                            />
                                                                                                                <Form.Control.Feedback type="invalid">
                                                                                                                    {formCoursError.dteDteFinCours}
                                                                                                                </Form.Control.Feedback>
                                                                                                            </Form.Group>
                                                                                                        </Row>
                                                                                                    </Form>
                                                                                                </Modal.Body>
                                                                                                <Modal.Footer>
                                                                                                    <Button variant="secondary" onClick={handleClos}>
                                                                                                        Fermer
                                                                                                </Button>
                                                                                                <Button variant="primary" onClick={(e) => { submitRenou(e, cour) }}>
                                                                                                        Renouveler
                                                                                                    </Button>
                                                                                                </Modal.Footer>
                                                                                            </Modal>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                            {cour.echeancierUsed &&
                                                                                (
                                                                                    <>
                                                                                    <div className='mx-4 d-flex justify-content-center align-items-center'>
                                                                                        <Tooltipp titre='Echeancier'>
                                                                                    <div className="mx-4 my-3 d-flex">
                                                                                        <Link className="" onClick={() => list(cour)} to={`/administration/echeancier/cours/${cour.id}`} style={{ textDecoration: 'none', marginTop: 2 }}>
                                                                                            <button style={{ backgroundColor: 'white' }}>
                                                                                                <img src={deadline} width={30} className='' alt="" />
                                                                                            </button>
                                                                                        </Link>
                                                                                    </div>
                                                                                </Tooltipp>
                                                                            </div>
                                                                        </>
                                                                        )
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row> */}
                                                            </>
                                                        )
                                                                })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )
                                        :
                                        (
                                            <p className="ms-3" style={{ fontSize: 16, fontWeight: 300 }}>Aucun cours en cours </p>
                                        )
                                )
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="my-5 rounded-4 p-3" style={{ background: "white" }} >
                            <div className="mb-3" style={{}} >
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Présence au cours</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Marquer la présence aux cours  </p>
                            </div>
                            <div className="">
                                {allCours.length > 0 ? 
                                    (
                                        (coursAActive.length > 0 && cours.length <= 0) ? 
                                            (
                                                <p className="ms-3" style={{ fontSize: 16, fontWeight: 300 }}>Cours en attente d'activation </p>
                                            )
                                            :
                                            (
                                                cours.length > 0 ?
                                                    (
                                                        <CahierPresence profInterface={false} entite={`apprenant`} app={true} heureProf={false} id={id} nomCours={nomCours} />
                                                    )
                                                    :
                                                    (
                                                        <p className="" style={{ fontSize: 16, fontWeight: 300 }}>Cet apprenant a terminé tous ses cours </p>
                                                    )
                                            )
                                    )
                                    :
                                    (
                                        <p style={{ fontWeight: 300 }}>Aucun cours en cours</p>
                                    )
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div id='cours18' className="mb-5 rounded-4 p-2" style={{ background: "white" }} >
                            <div className="my-3 px-3" style={{}} >
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Emploi du temps</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>L'emploi du temps de l'apprenant {apprenant.prenom}</p>
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
                                                    <p style={{ fontWeight: 300 }}>Cet apprenant à terminé tous ses cours</p>
                                                )
                                        )
                                        :
                                        (
                                            <p style={{ fontWeight: 300 }}>Aucun cours en cours</p>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </>
                 {/* )
                 :
                 (
                     <>
                         <Row className="mt-3">
                             <Col xs={12} sm={12} md={7} lg={7}>
                                 <p className="mt-1 me-3" style={{ fontSize: 20, fontWeight: 300 }}>Cet apprenant n'a souscrit a aucun cours pour le moment</p>
                             </Col>
                             <Col xs={12} sm={12} md={5} lg={5}>
                                 <div className="rounded-4 p-3" style={{ background: "white" }}>
                                     <div className="d-flex justify-content-between mb-3" style={{ alignItems: "center", justifyItems: "center" }}>
                                         <div className="">
                                             <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Statut du Compte</p>
                                             <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Activer ou désactiver le compte</p>
                                         </div>
                                         {apprenant.isValidatedRegistration ? <Tooltipp titre='Compte Activé' ><div className='my-0'><PiCheckFatFill color='green' size={23} /></div></Tooltipp> : <Tooltipp titre='Compte Désactivé' ><div className='my-0'><MdCancel color='red' size={25} /></div></Tooltipp>}
                                     </div>
                                     {!apprenant.isValidatedRegistration ?
                                         (
                                             <>
                                                 <button onClick={() => handleClickOpen()} className='bg-success'>Activer le compte</button>
                                             </>
                                         )
                                         : (
                                             <>
                                                 <button onClick={() => handleClickOpen()} className='bg-danger'>Désactiver le compte</button>
                                             </>
                                         )
                                     }
                                 </div>
                             </Col>
                         </Row>
                     </>
                 )
             } */}
            <AlertDialogSlide
                setAlert={() => console.log('Non')}
                response={false}
                titre="Confirmation Validation Compte"
                text={apprenant.isValidatedRegistration ? `Êtes vous sur de vouloir désactiver le compte de ${apprenant.prenom} ${apprenant.nom} ? ` : `Êtes vous sur de vouloir activer le compte de ${apprenant.prenom} ${apprenant.nom} ? `}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                submit={apprenant.isValidatedRegistration ? () => activeDesactiveCompte(false) : () => activeCompte(true)}
            />
            <AlertDialogSlide
                setAlert={() => console.log('Non')}
                response={false}
                titre="Professeur non disponible"
                button={true}
                open={open3} 
                handleClose={handleCloseC} 
                text={`Le nombre maximal d'apprenant pour les dates de cours ${datesDejaPrises.map((date) => moment(date).format("DD MMMM YYYY"))} du professeur ${professeu?.prenom} ${professeu?.nom} est atteint. Veuillez donc choisir un autre professeur `}
                handleClickOpen={handleClickOpen}
                submit={apprenant.isValidatedRegistration ? () => activeDesactiveCompte(false) : () => activeCompte(true)}
            />
            {/* <AlertDialogSlide
                setAlert={() => console.log('Non')}
                response={false}
                titre="Confirmation heure double"
                text={`Le nombre maximal d'apprenant pour les dates de cours ${datesDejaPrises.map((date) => moment(date).format("DD MMMM YYYY"))} du professeur ${formProf.professeur} est atteint. Veuillez donc choisir un autre professeur `}
                open={open3}
                handleClickOpen={handleClickOpen}
                handleClose={handleCloseC}
                submit={() => console.log('Oui')}
            />
            <CustomizedSnackbars status={`success`} open={open3} handleClose={handleCloseC} text={`Le nombre maximal d'apprenant pour les dates de cours ${datesDejaPrises.map((date) => moment(date).format("DD MMMM YYYY"))} du professeur ${formProf.professeur}. Veuillez donc choisir un autre professeur `} /> */}
            {/* <CustomizedSnackbars status={`error`} open={open3} handleClose={handleCloseC} text={`Le nombre maximal d'apprenant pour les dates de cours ${datesDejaPrises.map((date) => moment(date).format("DD MMMM YYYY"))} du professeur ${formProf.professeur} est atteint. Veuillez donc choisir un autre professeur `} /> */}
        </>
    )
}

export default DetailApprenant
