import React, { useContext, useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Container, Row, Col, InputGroup, Button } from 'react-bootstrap'
import Status from '../../components/Status';
import ModalAjout from '../../components/ModalAjout';
import { MdPersonAddAlt } from 'react-icons/md';
import { BsEyeFill, BsEyeSlashFill, BsFillPersonPlusFill, BsPersonFillSlash } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import Form from 'react-bootstrap/Form';
import { Link} from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import axios from 'axios';
import moment from 'moment';
import { formatDateToYYYYMMDD } from '../../date';
import ActionButton from '../../components/ActionButton';
import { AdminContext } from '../../context/AdminContext';
import { instance } from '../../axios';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';


const Apprenant = () => {
  const label = [
    // "ID",
    "Nom",
    "Prenom(s)",
    // "Date de naissance",
    "Date d'inscription",
    // "Profession",
    // "Niveau Scolaire",
    "Adresse-mail",
    "Telephone",
    // "Domaine",
    "Status",
    "Action",
  ];

  const [formCompte, setFormCompte] = useState({
    compte: false
})

const handleCompteChange = (event) => {
    setFormCompte((prevFormCompte) => ({
      ...prevFormCompte,
      compte: event.target.value === 'true',
    }));
  console.log(formCompte.compte);
  setFormDataError({})
};

  const { admin } = useContext(AdminContext)
  
  const [formData, setFormData] = useState({
    admin: admin.email,
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
    isValidatedRegistration: false,
    isUpToDateEcheancier: true,
    abonnementExpiryDate: null,
    changeMdp: false
});

  const [apprenants, setApprenants] = useState([]);
  const [tableau, setTableau] = useState([]);

  const fetchApprenant = () => {
    instance.get('apprenant/read')
      .then(response => {
        setApprenants(response.data);
        // setTableau(response.data);
        // console.log(response.data[0].children);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  };

useEffect(() => {
  fetchApprenant();
}, []);

useEffect(() => {
  setTableau([...apprenants]);
}, [apprenants]);


  const [vue, setVue] = useState("password")
  const [vue2, setVue2] = useState("password")

  // const [error, setError] = useState('')
  const [formDataError, setFormDataError] = useState({});

  const [mdp2, setMdp2] = useState("")

  const handleChangeMdp2 = (event) => {
    setMdp2(event.target.value)
  }

  const [apprenant, setApprenant] = useState({})

const list = (item) => {
    apprenant.id = item.id
    apprenant.nom = item.nom
    apprenant.prenom = item.prenom
    apprenant.dteNaissance = item.dteNaissance
    apprenant.profession = item.profession
    apprenant.nvScolaire = item.nvScolaire
    apprenant.mail = item.mail
    apprenant.tel = item.telephoneMobile
    apprenant.domaine = item.domaine
    apprenant.status = item.status

    localStorage.setItem('apprenantInfo', JSON.stringify(apprenant))

    console.log(apprenant);
}

  const bloquer = () => {
    const dataToUpdate = {
      status: "Bloqué",
      updated_at: new Date(),
      updated_by: admin.email,
    };

    instance.put(`apprenant/update/status/${apprenant.id}`, dataToUpdate)
      .then(response => {
        console.log('Champ mis à jour avec succès:', response.data);
        fetchApprenant()
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du champ:', error);
      });
  };
  
  const debloquer = () => {
    const dataToUpdate = {
      status: "Actif",
      updated_at: new Date(),
      updated_by: admin.email,
    };

    instance.put(`apprenant/update/status/${apprenant.id}`, dataToUpdate)
      .then(response => {
        console.log('Champ mis à jour avec succès:', response.data);
        fetchApprenant()
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du champ:', error);
      });
  };
  
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  const [emailExist, setEmailExist] = useState(false);

  useEffect(() => {
    const existMail = () => {
        instance.get('apprenant/exist-mail', {
            params: {
            mail: formData.mail
            },
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

const reset = () => {
    const intialiseForm = {
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
      
      const post = (url, form, text, openn) => {
        instance.post(url, form)
        .then(response => {
          console.log('Message envoyé :', response.data);
          fetchApprenant()
          handleClick();
          // <CustomizedSnackbars status={`success`} open={openn} handleClose={handleClose} text={text} />
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement :', error);
        });
      }

      const mailAcceptation = {
        to: formData.mail,
        subject: "Confirmation d'Inscription",
        text: `<!DOCTYPE html>
        <html>
        <head>
            <title>Inscription au Conservatoire Saint Viateur Abidjan</title>
        </head>
        <body>
          <center>
             <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; border-collapse: collapse;">
        <tr>
            <td style="background-color: #B60520; padding: 20px; text-align: center;">
                <h2 style="color: white;">Bienvenue au Conservatoire Saint Viateur Abidjan</h2>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p>Cher(e) Mr/Mme <b>${formData.prenom} ${formData.nom}</b>,</p>
                <p>Votre compte a été créé avec succès sur l'application du Conservatoire Saint Viateur d'Abidjan. Vous êtes maintenant prêt(e) à plonger dans une expérience artistique exceptionnelle.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p>Voici vos informations de connexion :</p>
                <ul>
                    <li><strong>Adresse e-mail :</strong> ${formData.mail}</li>
                    <li><strong>Mot de passe :</strong> ${formData.mdp}</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p>Après la validation de votre compte, y compris l'inscription, vous pourrez accéder à votre interface personnelle.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p>Lors de votre première connexion, vous serez invité(e) à modifier votre mot de passe pour des raisons de sécurité.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p>Nous sommes impatients de vous accueillir au sein de notre communauté artistique. Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter à l'adresse e-mail suivante : <a href="mailto:contact@viateur-ci.site">contact@viateur-ci.site</a>.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p>Cordialement,<br> Conservatoire Saint Viateur d'Abidjan</p>
            </td>
        </tr>
    </table>
          </center>
        </body>
        </html>
        `
};

    if (Object.keys(errors).length > 0) {
      setFormDataError(errors);
    } else {
        setFormDataError({});
        console.log('Données valides :', formData);
        post('apprenant/create', formData, 'Apprenant créer avec succès !', true)
        post('envoie-email', mailAcceptation, '', false)
        reset()
    }
  };

  const style = {
    fontFamily: "Poppins, sans-serif",
    // Ajoutez d'autres styles CSS au besoin
};
  
  const handleSubmitt = (event) => {
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
    
    if (!formData.nomParent) {
      errors.nomParent = 'Le nom du parent est requis.';
  }

  if (!formData.prenomParent) {
      errors.prenomParent = 'Le prénom du parent est requis.';
  }
  
  if (!formData.telParent) {
      errors.telParent = 'Le téléphone du parent est requis.';
    }
  
    if (!formData.mailParent) {
      errors.mailParent = 'Le mail est requis.du parent est requis.';
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
      
      const post = (url, form, text, openn) => {
        instance.post(url, form)
        .then(response => {
          console.log('Message envoyé :', response.data);
          fetchApprenant()
          handleClick();
          // <CustomizedSnackbars status={`success`} open={openn} handleClose={handleClose} text={text} />
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement :', error);
        });
      }

      const mailAcceptation = {
        to: formData.mailParent,
        subject: "Confirmation d'Inscription",
        text: `<!DOCTYPE html>
        <html>
        <head>
            <title>Inscription au Conservatoire Saint Viateur Abidjan</title>
        </head>
        <body>
        <center>
            <table width="70%" border="0" cellspacing="0" cellpadding="0">
                <tr style="">
                    <td style="background-color: #B60520; padding: 18px; text-size: 18px; text-align: center; color: white; border-radius: 10px; margin-bottom: 30px;">
                        <h1>Bienvenue au Conservatoire Saint Viateur Abidjan</h1>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <p>Mr/Mme <b>${formData.prenomParent} ${formData.nomParent}</b>, le compte de votre enfant à bien été créé sur l'application du conservatoire Saint
                        Viateur d'Abidjan. Vous et votre enfant êtes sur le point de vivre une expérience artistique exceptionnelle.</p>
                    </td>
                </tr>
                <tr>
                
                    <td align="left">
                      <p>L'accès de votre enfant :</p>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                      <ul>
                          <li><strong>Adresse e-mail :</strong> ${formData.mail}</li>
                          <li><strong>Mot de passe :</strong> ${formData.mdp}</li>
                      </ul>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <p>Dès la première connexion vous serez ammener à modifier le mot de passe.</p>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <p>Nous sommes impatients de vous accueillir dans notre communauté artistique. Si vous avez des questions ou avez
                        besoin d'aide, n'hésitez pas à nous contacter à l'adresse email suivante : <a href="mailto:contact@viateur-ci.site">contact@viateur-ci.site</a>.</p>
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

    if (Object.keys(errors).length > 0) {
      setFormDataError(errors);
    } else {
        setFormDataError({});
        console.log('Données valides :', formData);
        post('apprenant/create', formData, 'Apprenant créer avec succès !', true)
        post('envoie-email', mailAcceptation, '', false)
        reset()
    }
  };

  const [chiffre, setChiffre] = useState(10);
  const handleChangeChiffre = (event) => {
    const newChiffre = parseInt(event.target.value, 10);
    setChiffre(newChiffre);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = chiffre;

  const [totalPage, setTotalPage] = useState(Math.ceil(tableau.length / itemsPerPage));

  useEffect(() => {
    const newTotalPage = Math.ceil(tableau.length / itemsPerPage);
    setCurrentPage(1);
    setTotalPage(newTotalPage);
  }, [tableau, itemsPerPage]);

  const calculateDisplayedPages = () => {
    const MIN_PAGES = 10; // Nombre minimum de pages affichées

    if (totalPage <= MIN_PAGES) {
      // Si le nombre total de pages est inférieur ou égal au nombre minimum, toutes les pages sont affichées
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    const isStartEllipsisVisible = currentPage > 2;
    const isEndEllipsisVisible = currentPage < totalPage - 1;

    let startPage = currentPage - Math.floor(MIN_PAGES / 2);
    let endPage = currentPage + Math.floor(MIN_PAGES / 2);

    if (startPage < 1) {
      startPage = 1;
      endPage = MIN_PAGES;
    }

    if (endPage > totalPage) {
      startPage = totalPage - MIN_PAGES + 1;
      endPage = totalPage;
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    if (isStartEllipsisVisible) {
      pages.unshift('...');
    }

    if (isEndEllipsisVisible) {
      pages.push('...');
    }

    return pages;
  };

  const pages = calculateDisplayedPages();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tableau.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0)
    
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


  return (
    <>
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <ModalAjout
              size="lg"
              handleSubmit={(e) => { formCompte.compte === true ? handleSubmit(e) : handleSubmitt(e)  }}
              titre="Ajouter un apprenant"
              icon={<MdPersonAddAlt size={23} style={{ marginRight: 10, marginBottom: 3 }} />} >
              <div style={{ marginLeft: 70, marginRight: 70}}>
                <Form onSubmit={() => console.log("Bon")}>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom03">
                      <Form.Label className="fw-bolder">Je crée un compte : </Form.Label> <br />
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
                  
              {formCompte.compte === true && (
                <Form>
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
                          onChange={handleChangeMdp2}
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
                      // required
                      label="Je souhaiterais que mon enfant participe
                                    aux auditions, tests de passage à un niveau supérieur
                                    et au concert de fin d'année de conservatoire"
                      feedback="You must agree before submitting."
                      feedbackType="invalid"
                    />
                  </Form.Group>
                </Form>)}
              {formCompte.compte === false && (
                  <>
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
                                                                                        onChange={handleChangeMdp2}
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
                  </>
                )}
                </div>
            </ModalAjout>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <TableDataToExcel data={tableau} nomFichier='ListeApprenant..xlsx' titre='Télécharger en excel' /> */}
            <div className="containeur" style={{ marginTop: 40, marginBottom: 20 }}>
              <Table
                data={tableau}
                nomFichier='ListeApprenant.xlsx'
                onChangeChiffre={handleChangeChiffre}
                chiffre={chiffre}
                item={apprenants}
                items={label}
                titre="Liste des apprenants"
                sousTitre="Liste des apprenants insrits sur l'application Web"
                nom="Aucun apprenant enregistré"
                entite={`apprenant`}
                admins={apprenants}
                setAdmins={setTableau}
                setApprenants={setTableau}
                apprenants={apprenants} >
                {currentItems.map((apprenant, index) => {
                  return (
                    <tr key={index}>
                      {/* <th scope="row" className='align-middle'>{apprenant.id}</th> */}
                      <td className='align-middle'>{apprenant.nom}</td>
                      <td className='align-middle'>{apprenant.prenom}</td>
                      <td className='align-middle'>{moment(apprenant.dteInscription).format("DD MMMM YYYY")}</td>
                      {/* <td className='align-middle'>{apprenant.profession ? apprenant.profession : <TiDelete size={30} color='red' />}</td>
                      <td className='align-middle'>{apprenant.nvScolaire ? apprenant.nvScolaire : <TiDelete size={30} color='red' />}</td> */}
                      <td className='align-middle'>{apprenant.mail}</td>
                      <td className='align-middle'>{apprenant.telephoneMobile}</td>
                      <td className='align-middle'>
                        {apprenant.status === "Actif" ? <Status titre={apprenant.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={apprenant.status} bgColor="linear-gradient(to right, #ED213A, #93291E)" />}
                      </td>
                      <td className='align-middle'>
                        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                          <div className="btn-group me-2" role="group" aria-label="First group">
                            <Link to={`/administration/detailApprenant/${apprenant.id}`}>
                              <button style={{ marginBottom: 2, marginTop: 2 }} type="button" className="icon-button bg-warning" onClick={() => { list(apprenant) }}>
                                <FiEye size={18} />
                              </button>
                            </Link>
                          </div>
                          <div className="btn-group me-2" role="group" aria-label="Second group">
                          <ActionButton
                              list={list}
                              del={true}
                            key={apprenant.id}
                            reset={reset}
                            // handleChangeM={handleChangeM}
                            // handleSubmit={handleSubmitM}
                            // formDataM={formDataM}
                            item={apprenant}
                            setStatut={apprenant.status === "Actif" ? bloquer : debloquer}
                            icon={apprenant.status === "Actif" ? [<BsPersonFillSlash size={18} />] : <BsFillPersonPlusFill size={18} />}
                            message={apprenant.status === "Actif" ? `Êtes-vous sûr(e) de vouloir bloquer ${apprenant.prenom} ${apprenant.nom} ?` : `Êtes-vous sûr(e) de vouloir débloquer ${apprenant.prenom} ${apprenant.nom} ?`}
                            id={apprenant.id}
                            titre={`Modifier l' apprenant ${apprenant.prenom} ${apprenant.nom}`}
                            >
                              {/* <Form>
                                <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="nom"
                                      onChange={handleChangeM}
                                      value={formDataM.nom}
                                      isInvalid={!!formDataErrorM.nom}
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
                                      onChange={handleChangeM}
                                      value={formDataM.prenom}
                                      isInvalid={!!formDataErrorM.prenom}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {formDataError.prenom}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustomUsername">
                                    <Form.Label>Date de Naissance</Form.Label>
                                    <InputGroup hasValidation>
                                      <Form.Control
                                        type="date"
                                        name="dteNaissance"
                                        onChange={handleChangeM}
                                        value={formDataM.dteNaissance}
                                        aria-describedby="inputGroupPrepend"
                                        isInvalid={!!formDataErrorM.dteNaissance}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {formDataError.dteNaissance}
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                  </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select aria-label="Default select example" id="categorieCours" value={formDataM.categorieCours} name="categorieCours" onChange={handleChangeM}>
                                    {coursActive.map((item) => {
                                      return (
                                        <option value={item.libelle}>{item.libelle}</option>
                                      )
                                    })}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                      {formDataError.categorieCours}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Adresse E-mail</Form.Label>
                                    <Form.Control
                                      type='mail'
                                      name="email"
                                      onChange={handleChangeM}
                                      value={formDataM.email}
                                      sInvalid={!!formDataErrorM.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {formDataError.email}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <InputGroup hasValidation>
                                      <Form.Control
                                        type={vue}
                                        name="mdp"
                                        onChange={handleChangeM}
                                        value={formDataM.mdp}
                                        isInvalid={!!formDataErrorM.mdp}
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
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Confirmation du mot de passe</Form.Label>
                                    <InputGroup hasValidation>
                                      <Form.Control
                                        type={vue2}
                                        name="mdp2"
                                        onChange={handleChangeMdp}
                                        value={mdp2}
                                        isInvalid={!!formDataErrorM.mdp}
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
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Télephone</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="telephone"
                                      onChange={handleChangeM}
                                      value={formDataM.telephone}
                                      isInvalid={!!formDataErrorM.telephone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {formDataError.telephone}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select isInvalid={!!formDataErrorM.status} aria-label="Default select example" id="status" value={formDataM.status} name="status" onChange={handleChangeM}>
                                      <option value="Activé">Activé</option>
                                      <option value="Désactivé">Désactivé</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                      {formDataErrorM.status}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Row>
                              </Form> */}
                            </ActionButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </Table>
              {currentItems.length > 0 && <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: "flex-end" }}>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                  <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => { setCurrentPage(currentPage - 1) }}>Précédent</Link></li>
                  {pages.map((page, index) => (
                    <li className={`page-item ${page === currentPage && 'active'} ${page === "..." && 'disabled'} `} key={index} onClick={() => handlePageChange(page)}>
                      <Link className={`page-link`}>{page}</Link>
                    </li>
                  ))}
                   <li className={currentPage === totalPage ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => {setCurrentPage(currentPage + 1)}}>Suivant</Link></li>
                  </ul>
                </nav>
              </div>}
              </div>
          </Col>
        </Row>
      </Container>
      <CustomizedSnackbars status={`success`} open={open} handleClose={handleClose} text='Apprenant créer avec succès !' />
    </>
  )
}

export default Apprenant
