import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { formatDateToYYYYMMDD } from '../../date';
import { Link, useNavigate } from 'react-router-dom/dist';
import { instance } from '../../axios';
import jsPDF from 'jspdf';
import logo from '../../img/logo.png'
import moment from 'moment/moment';
import { PiPaypalLogo } from 'react-icons/pi';
import Pdfonction from '../../components/Pdfonction';
import ConvertToPDF from '../../components/ConvertToPDF';
import { Stepper, Step, StepLabel, Typography, Box} from '@mui/material';
import { BiSmile } from 'react-icons/bi';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';
// import authAxios, { authAxios2 } from "../authAxios";
// import { FiChevronsRight } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import CustomDatePicker from '../components/CustomDatePicker';

const Inscription = () => {
    const [formCompte, setFormCompte] = useState({
        compte: false
    })

    const handleCompteChange = (event) => {
        setFormCompte((prevFormCompte) => ({
          ...prevFormCompte,
          compte: event.target.value === 'true',
        }));
        console.log(formCompte.compte);
  };

    const [formData, setFormData] = useState({
        admin: "Apprenant",
        nom: "",
        prenom: "",
        dteNaissance: "",
        dteInscription: formatDateToYYYYMMDD(new Date()),
        lieuNaissance: "",
        profession: "",
        nvScolaire: "",
        mail: "",
        mdp: "",
        status: "Actif",
        telephoneDomicile: "",
        telephoneMobile: "",
        testIsChecked: false,
        scolarite: 0,
        scolaritePayé: 0,
        fraisInscription: 0,
        disponibilité: "Disponible", 
        isValidatedRegistration: false,
        isUpToDateEcheancier: true,
        nomParent: "",
        prenomParent: "",
        mailParent: "",
        telParent: "",
        abonnementExpiryDate: null,
        changeMdp: true,
    });

    const reset = () => {
        const intialiseForm = {
            admin: "Apprenant",
            nom: "",
            prenom: "",
            dteNaissance: "",
            dteInscription: formatDateToYYYYMMDD(new Date()),
            lieuNaissance: "",
            profession: "",
            nvScolaire: "",
            mail: "",
            mdp: "",
            status: "Actif",
            telephoneDomicile: "",
            telephoneMobile: "",
            testIsChecked: false,
            scolarite: 0,
            scolaritePayé: 0,
            fraisInscription: 0,
            nomParent: "",
            prenomParent: "",
            mailParent: "",
            telParent: "",
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
    
    const history = useNavigate();

    const etapes = [
        { label: 'Étape 1 : Choix du cours' },
        // { label: 'Étape 2 : Formulaire de paiement' },
          { label: 'Étape 2 : Récapitulatif de la préinscription' },
        //   { label: 'Étape 3 : Confirmation de préinscription' },
    ];

    const [activeStep, setActiveStep] = useState(0)
    const [formDataError, setFormDataError] = useState({});
    
    const suivant = () => {
        const errors = {}
        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
              } else {
                  setActiveStep((prevStep) => prevStep + 1);
        }
    }
    
    const precedent = () => {
        setActiveStep((prevStep) => prevStep - 1);
    }

    const [vue, setVue] = useState("password")
    const [vue2, setVue2] = useState("password")
    
    const [mdp2, setMdp2] = useState("")
  
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const [emailExist, setEmailExist] = useState(false);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        if (token) {
          return { 'Authorization': 'Bearer ' + token };
        }
        return {};
    };
    
    useEffect(() => {
        const existMail = () => {
            instance.get('apprenant/exist-mail', {
                params: {
                    mail: formData.mail
                }
            })
                .then(response => {
                    setEmailExist(response.data)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };
    
        
        existMail()

    }, [formData.mail])

    const [success, setSuccess] = useState(false)

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    
    
  const handleSubmit = (event) => {
      event.preventDefault();
    //   existMail()
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
      
      if (!formData.mdp || !mdp2) {
          errors.mdp = 'Les mots de passe sont requis.';
      } else {
          if (formData.mdp !== mdp2) {
            errors.mdp = 'Les mots de passe ne correspondent pas!';
          }
      }

      if (!formData.telephoneMobile) {
        errors.telephoneMobile = 'Le numéro mobile est requis!';
    }

      if (!formData.mail) {
          errors.mail = 'Le mail est requis.';
      } else {
          if (!isValidEmail(formData.mail)) {
              errors.mail = "L'email n'est pas valide.";
            } else {
                if (emailExist) {
                    errors.mail = "Adresse E-mail déjà utilisée"
                }
            }
      }
      
      const post = (url, form) => {
        instance.post(url, form)
            .then(response => {
            setSuccess(true)
            console.log(response.data);
        })
        .catch(error => {
            setSuccess(false)
            console.error('Erreur lors de l\'enregistrement :', error);
            if (error.message === "Network Error") {
                setLoading(false)
                setOpen(true)
            }
            setLoading(false)
        });
      }

      const mailAcceptation = {
            to: formData.mail,
            subject: "Confirmation d'Inscription",
            text: `<!DOCTYPE html>
            <html>
            <head>
                <title>Confirmation d'Inscription au Conservatoire Saint Viateur Abidjan</title>
            </head>
            <body>
            <center>
                <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; border-collapse: collapse;">
                    <tr style="">
                        <td style="background-color: #B60520; padding: 20px; text-align: center;"s>
                            <h1>Bienvenue au Conservatoire Saint Viateur Abidjan</h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Mr/Mme <b>${formData.prenom} ${formData.nom}</b>, merci de vous être inscrit à notre école de musique. Vous êtes sur 
                            le point de vivre une expérience artistique exceptionnelle.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Pour finaliser votre inscription, veuillez payer les frais d'inscription directement au conservatoire ou par mobile money.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Une fois que vous avez payé les frais d'inscription, vous pourrez accéder à votre espace personnel, consulter votre emploi du temps, et explorer notre programme artistique.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>Nous sommes impatients de vous accueillir dans notre communauté artistique. Si vous avez des questions ou avez 
                            besoin d'aide, n'hésitez pas à nous contacter à l'adresse email suivante : <a href="mailto:conservatoiresaintviateur1@gmail.com">conservatoiresaintviateur1@gmail.com</a>.</p>
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
    };

    //   const mailAcceptation = {
    //         to: formData.mail,
    //         text: `Bonjour Mr/Mme ${formData.prenom} ${formData.nom}. Vous avez bien été enregistrer sur l'application Saint Viateur. 
    //      Vous pouvez dès à présent payer les frais d'inscription par mobile money ou en espèce directement au conservatoire.
    //      Bonne journée.`
    // };

    if (Object.keys(errors).length > 0) {
        setFormDataError(errors);
        setSuccess(false)
    } else {
        setFormDataError({});
        // console.log(formDataError.length);
        // console.log(formDataError);
        console.log('Données valides :', formData);
        post('apprenant/create', formData)
        post('envoie-email', mailAcceptation)
        reset()
      }
    };
    
  const handleSubmitt = (event) => {
      event.preventDefault();
    //   existMail()
      const errors = {};
      
      if (!formData.nom) {
          errors.nom = 'Le nom est requis.';
      }

      if (!formData.prenom) {
          errors.prenom = 'Le prénom est requis.';
      }
      
      if (!formData.nomParent) {
          errors.nomParent = 'Le nom du parent est requis.';
      }

      if (!formData.prenomParent) {
          errors.prenomParent = 'Le prénom du parent est requis.';
      }
      
      if (!formData.telParent) {
          errors.telParent = 'Le téléphone du parent est requis.';
      }

      if (!formData.dteNaissance) {
          errors.dteNaissance = 'Le date de naisance est requise.';
      }

      if (!formData.lieuNaissance) {
          errors.lieuNaissance = 'Le lieu de naissance est requis.';
      }

      if (!formData.nvScolaire) {
          errors.profession = 'Veuillez rentrer le niveau scolaire SVP!';
      }
      
      if (!formData.mdp || !mdp2) {
          errors.mdp = 'Les mots de passe sont requis.';
      } else {
          if (formData.mdp !== mdp2) {
            errors.mdp = 'Les mots de passe ne correspondent pas!';
          }
      }

      if (!formData.mailParent) {
          errors.mailParent = 'Le mail est requis.';
      } else {
          if (!isValidEmail(formData.mailParent)) {
              errors.mailParent = "L'email n'est pas valide.";
            }
      }

      if (!formData.mail) {
        errors.mail = 'Le mail est requis.';
    } else {
        if (!isValidEmail(formData.mail)) {
            errors.mail = "L'email n'est pas valide.";
          } else {
              if (emailExist) {
                  errors.mail = "Adresse E-mail déjà utilisée"
              }
          }
    }
      
      const post = (url, form) => {
        instance.post(url, form)
        .then(response => {
            console.log('Message envoyé :', response.data);
            setSuccess(true)
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement :', error);
            setSuccess(false)
            if (error.message === "Network Error") {
                setLoading(false)
                setLoading(false)
                setOpen(true)
            }
            setLoading(false)
        });
      }

      let mailAcceptation = {}
      if (formData.mailParent) {
        //    mailAcceptation = {
        //        to: formData.mailParent,
        //        text: `Bonjour Mr/Mme ${formData.prenomParent} ${formData.nomParent}. Votre enfant ${formData.prenom} ${formData.nom} à bien été enregistrer sur l'application Saint Viateur. 
        //     Vous pouvez dès à présent payer les frais d'inscription par mobile money ou en espèce directement au conservatoire.
        //     Bonne journée.`
        //   };
           mailAcceptation = {
               to: formData.mailParent,
               subject: "Confirmation d'Inscription ",
               text: `<!DOCTYPE html>
               <html>
               <head>
                   <title>Confirmation d'Inscription </title>
               </head>
               <body>
               <center>
                   <table width="0%" border="0" cellspacing="0" cellpadding="0">
                   <tr>
                           <td style="background-color: #B60520; padding: 18px; text-size: 18px; text-align: center; color: white; border-radius: 10px; margin-bottom: 30px;">
                               <h1>Confirmation d'Inscription au Conservatoire Saint Viateur Abidjan</h1>
                           </td>
                       </tr>
                       <tr>
                           <td align="left">
                               <p>Mr/Mme ${formData.prenomParent} ${formData.nomParent}, merci d'avoir inscrit votre enfant au Conservatoire 
                               Saint Viateur Abidjan. Nous sommes ravis de l'accueillir parmi nos élèves.</p>
                           </td>
                       </tr>
                       <tr>
                           <td align="left">
                               <p>Pour finaliser l'inscription de votre enfant, veuillez payer les frais d'inscription directement au
                                conservatoire ou par mobile money</p>
                           </td>
                       </tr>
                       <tr>
                           <td align="left">
                               <p>Une fois que vous avez confirmé l'inscription, vous pourrez accéder à l'espace personnel de votre enfant, 
                               consulter son emploi du temps, et explorer notre programme artistique.</p>
                           </td>
                       </tr>
                       <tr>
                       <td align="left">
                               <p>Nous sommes impatients d'aider votre enfant à développer son talent artistique. Si vous avez des questions
                                ou avez besoin d'assistance, n'hésitez pas à nous contacter à l'adresse email suivante : 
                                <a href="mailto:conservatoiresaintviateur1@gmail.com">conservatoiresaintviateur1@gmail.com</a>.</p>
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
          };
        } 


      if (Object.keys(errors).length > 0) {
        console.log(formData)
      setFormDataError(errors);
    } else {
        setFormDataError({});
        console.log('Données valides :', formData);
        post('apprenant/create', formData)
        post('envoie-email', mailAcceptation)
        reset()
      }
    };
    
    // useEffect(() => {
    //     if (success) {
    //         history('/conservatoire-saint-viateur/login');
    //     }
    // }, [success, history])
    
    const handleChangeMdp = (event) => {
        setMdp2(event.target.value)
    }

    if (localStorage.getItem("selecte") !== 1) {
        localStorage.setItem("selecte", 1) 
    }

    
    // const [showEtapes, setShowEtapes] = useState(true)

    const style = {
        fontFamily: "Poppins, sans-serif",
        // Ajoutez d'autres styles CSS au besoin
    };

    const studentInfo = {
        nom: formData.nom,
        prenom: formData.prenom,
        dateNaissance: moment(formData.dteNaissance).format("DD MMMM YYYY"),
        lieuNaissance: formData.lieuNaissance,
        adresseEmail: formData.mail,
        telephoneMobile: formData.telephoneMobile,
        profession: formData.profession,
        nvScolaire: formData.nvScolaire,
        test: formData.testIsChecked,
        nomParent: formData.nomParent,
        prenomParent: formData.prenomParent,
        mailParent: formData.mailParent,
        telParent: formData.telParent
    }

    const [anneeScolaire, setAnneeScolaire] = useState('');

    useEffect(() => {
        const currentDate = new Date("2024-07-01"); // Utilisez la date actuelle
        const currentYear = currentDate.getFullYear();
        const startDate = new Date(currentYear, 8, 12); // 8 correspond à septembre (car les mois commencent à 0)
        const endDate = new Date(currentYear + 1, 5, 24); // 5 correspond à juin

        if (currentDate >= endDate) {
            // Si la date actuelle est après le 24 juin, utilisez l'année suivante
            setAnneeScolaire(`${currentYear + 1}/${currentYear + 2}`);
        } else if (currentDate < startDate) {
            // Si la date actuelle est avant le 12 septembre, utilisez l'année précédente
            setAnneeScolaire(`${currentYear - 1}/${currentYear}`);
        } else {
            setAnneeScolaire(`${currentYear}/${currentYear + 1}`);
        }
    }, []);
    
    return (
        <>
            {/* <p>Année scolaire en cours : {anneeScolaire}</p>
            <p>{new Date("2024-01-01").getFullYear()}</p> */}
            
            {/* <Pdfonction /> */}
            {/* <div style={style}>
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
            </div> */}
            
            <div className='conteneur-ins' style={{paddingTop: 20}}>
                <div style={{  }}>
                    <div className='titre-conteneur pt-3 px-5'>
                        <p className='text-center fw-bolder text-gradient' >FORMULAIRE D'INSCRIPTION</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                {/* {success ? <div className="alert alert-success alert-dismissible fade show" role="alert" style={{fontSize: 15}}>
                        Félicitation, votre inscription à été un succès. Vous pouvez à présent !
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                    </div> : ""} */}
                    <div className="conteneur-form my-5">
                        <div className="j">
                        {activeStep === 0 && (
                                <div>
                                    <Form onSubmit={() => console.log("Bon")}>
                                        {/* <p className="fw-bolder" style={{ fontSize: 18, color: "#B60520" }}>Propiétaire Compte</p>
                                        <div className="line"></div> */}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom03">
                                                <Form.Label className="fw-bolder">Je crée un compte pour : </Form.Label> <br />
                                                <Form.Check
                                        inline
                                        type="radio"
                                        name="compte"
                                        label="Pour moi"
                                        value="true"
                                        isInvalid={!!formDataError.compte}
                                        checked={formCompte.compte === true}
                                        onChange={handleCompteChange}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        name="compte"
                                        label="Pour mon enfant"
                                        value="false"
                                        isInvalid={!!formDataError.compte}
                                        checked={formCompte.compte === false}
                                        onChange={handleCompteChange}
                                    />
                                    
                                    {formDataError.compte && (
                                        <p style={{ color: "#DC3545", paddingTop: 5, fontSize: 15 }}>
                                            {formDataError.compte}
                                        </p>
                                    )}
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                    <div className="d-flex justify-content-between my-5">
                                        <Button variant="primary" disabled>
                                            Précédent
                                        </Button>
                                        <Button variant="primary" onClick={suivant} disableElevation>
                                            Suivant
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="j">
                            {activeStep === 1 && (
                                <div>
                                    {formCompte.compte === true ?  
                                        (
                                            <>
                                                {/* <Form onSubmit={(event) => { handleSubmit(event); imprimerInformations(); genererPDF() }}> */}
                                                <Form onSubmit={() => console.log("Bon")}>
                                                    <p className="fw-bolder" style={{ fontSize: 18, color: "#B60520" }}>Informations personnelles</p>
                                                    <div className="line"></div>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
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
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
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
                                                            <Form.Label>Mot de passe</Form.Label>
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
                                                                                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                                                                    <Form.Label>Confirmation du mot de passe</Form.Label>
                                                                                    <InputGroup hasValidation>
                                                                                        <Form.Control
                                                                                            type={vue2}
                                                                                            name="mdp2"
                                                                                            onChange={handleChangeMdp}
                                                                                            value={mdp2}
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
                                                                            <Form.Group className="mb-3">
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    checked={formData.testIsChecked}
                                                                                    name="testIsChecked"
                                                                                    onChange={handleChange}
                                                                                    label="Je souhaiterais participer
                                                                                    aux auditions, tests de passage à un niveau supérieur
                                                                                    et au concert de fin d'année de conservatoire"
                                                                                    feedback="You must agree before submitting."
                                                                                    feedbackType="invalid"
                                                                                />
                                                                            </Form.Group>
                                                                            <div className="my-3">
                                                                                {success ?
                                                                                    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ fontSize: 15, textAlign: "justify" }}>
                                                                                    Félécitation ! Vous Avez été enregistré avec succès. Nous vous souhaitons bonne aventure avec nous  <BiSmile size={22} color='#416757' />
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                                                                                </div>
                                                                                    :
                                                                                    ""
                                                                                }
                                                                            </div>
                                                                            <div className="d-flex justify-content-between my-5">
                                                                                <Button variant="primary" onClick={() => {precedent()}}>
                                                                                    Précédent
                                                                                </Button>
                                                                                <ConvertToPDF titre="S'inscrire" studentInfo={studentInfo} compte={formCompte.compte} submit={handleSubmit} />
                                                                            </div>
                                                                            {/* <Button type="submit">S'inscrire</Button> */}
                                                                        </Form>
                                                                    </>
                                                                )
                                                                : 
                                                                (
                                                                    <>{/* <Form onSubmit={(event) => { handleSubmit(event); imprimerInformations(); genererPDF() }}> */}
                                                                    <Form onSubmit={() => console.log("Bon")}>
                                                                        <p className="fw-bolder" style={{ fontSize: 18, color: "#B60520" }}>Informations Apprenant</p>
                                                                        <div className="line"></div>
                                                                        <Row className="mb-3">
                                                                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
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
                                                                        </Row>
                                                                        <Row className="mb-3">
                                                                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
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
                                                                            {/* <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
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
                                                                            </Form.Group> */}
                                                                            <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="">
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
                                                                                <Form.Label>Mot de passe</Form.Label>
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
                                                                            <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="validationCustom01">
                                                                                <Form.Label>Confirmation du mot de passe</Form.Label>
                                                                                <InputGroup hasValidation>
                                                                                    <Form.Control
                                                                                        type={vue2}
                                                                                        name="mdp2"
                                                                                        onChange={handleChangeMdp}
                                                                                        value={mdp2}
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
                                                                        {/* <Row className="mb-3">
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
                                                                            </Row> */}
                                                    <p className="fw-bolder mt-5" style={{ fontSize: 18, color: "#B60520" }}>Répresentant Légal</p>
                                                    <div className="line"></div>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label>Nom</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="nomParent"
                                                                onChange={handleChange}
                                                                value={formData.nomParent}
                                                                isInvalid={!!formDataError.nomParent}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formDataError.nomParent}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label>Prénom(s)</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="prenomParent"
                                                                placeholder=''
                                                                onChange={handleChange}
                                                                value={formData.prenomParent}
                                                                isInvalid={!!formDataError.prenomParent}
                                                            />
                                                            <Form.Control.Feedback type="invalid"> 
                                                                {formDataError.prenomParent}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label>Adresse E-mail</Form.Label>
                                                            <Form.Control
                                                                type="mail"
                                                                name="mailParent"
                                                                onChange={handleChange}
                                                                value={formData.mailParent}
                                                                isInvalid={!!formDataError.mailParent}
                                                            />
                                                            {/* <i style={{fontSize: 13, fontWeight: 400}}>Cette adresse e-mail servira a la connexion au compte de votre enfant. Vous pourrez le changer a tout moment.</i> */}
                                                            <Form.Control.Feedback type="invalid">
                                                                {formDataError.mailParent}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label>Téléphone</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="telParent"
                                                                onChange={handleChange}
                                                                value={formData.telParent}
                                                                isInvalid={!!formDataError.telParent}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formDataError.telParent}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Check
                                                            type="checkbox"
                                                            checked={formData.testIsChecked}
                                                            name="testIsChecked"
                                                            onChange={handleChange}
                                                            label="Je souhaiterais que mon enfant participe
                                                            aux auditions, tests de passage à un niveau supérieur
                                                            et au concert de fin d'année de conservatoire"
                                                            feedback="You must agree before submitting."
                                                            feedbackType="invalid"
                                                        />
                                                    </Row>
                                                    <div className="my-3">
                                                        {success ?
                                                            <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ fontSize: 15, textAlign: "justify" }}>
                                                                Félicitation ! Votre enfant à bien été enregistré avec succès. Nous vous souhaitons bonne aventure avec nous  <BiSmile size={22} color='#416757' />
                                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                                                            </div>
                                                            :
                                                            ""
                                                        }
                                                    </div>
                                                    <div className="d-flex justify-content-between my-5">
                                                        <Button variant="primary" onClick={() => { precedent() }}>
                                                            Précédent
                                                        </Button>
                                                        <ConvertToPDF bg='primary' titre="S'inscrire" studentInfo={studentInfo} compte={formCompte.compte} submit={handleSubmitt} />
                                                    </div>
                                                </Form>
                                            </>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                        <div className="row mt-3">
                            <small style={{fontSize: 17, fontWeight: 300}}>Vous avez déjà un compte? <Link className='ms-2' to={`/login`} style={{fontSize: 17, fontWeight: 300}}>Se connecter</Link></small>
                        </div>
                    </div>
                </div>
                {/* <div className="d-flex justify-content-around">
                    <p></p>
                    <p style={{ color: "#B60520" }} className='fw-bolder'>
                        <Link to={"/conservatoire-saint-viateur/finalisation-inscription"} style={{textDecoration: "none"}}>
                            Suivant <FiChevronsRight className='me-3' size={15} />
                        </Link>
                    </p>
                </div> */}
            </div>
            <CustomizedSnackbars status={`error`} open={open} handleClose={handleClose} text='Erreur réseau' />
        </>
  )
}

export default Inscription