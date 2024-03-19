import React, { useEffect, useState } from 'react'
// import axios from "axios"
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { BsEyeFill, BsEyeSlashFill, BsFillPersonPlusFill, BsPersonFillSlash } from 'react-icons/bs';
import ModalAjout from '../../components/ModalAjout';
import { MdPersonAddAlt } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Status from '../../components/Status';
import Table from '../../components/Table';
import { FiEye } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';
import ActionButton from '../../components/ActionButton';
import { instance } from '../../axios';
import Confirmation from '../../components/Confirmation';
import { PiCheckFatFill } from 'react-icons/pi';
import moment from 'moment';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';

const Professeur = () => {
  const [professeur, setProfesseur] = useState([]);
  const [tableau, setTableau] = useState([]);
  const [formDataError, setFormDataError] = useState({});
  const [formDataErrorM, setFormDataErrorM] = useState({});
  const [mdp2, setMdp2] = useState("");
  const [vue, setVue] = useState("password")
  const [vue2, setVue2] = useState("password")
  const [chiffre, setChiffre] = useState(10);
  const [coursActive, setCoursActive] = useState([]);
  const [emailMdpExist, setEmailMdpExist] = useState(false)
  const [show, setShow] = useState(false);
  
  const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

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

  const prof = {
};

const list = (item) => {
    formDataM.id = item.id
    formDataM.nom = item.nom
    formDataM.prenom = item.prenom
    formDataM.dteNaissance = item.dteNaissance
    formDataM.categorieCours = item.categorieCours
    formDataM.email = item.email
    // formDataM.mdp = item.mdp
    formDataM.telephone = item.telephone
    formDataM.status = item.status

    localStorage.setItem('profInfo', JSON.stringify(prof))

    console.log(prof);
}

  const label = [
    "ID",
    "Nom",
    "Prenom(s)",
    "Date de naissance",
    "Categorie Cours",
    "Adresse-mail",
    "Telephone",
    "Status",
    "Action",
  ];
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dteNaissance: "",
    categorieCours: "",
    email: "",
    mdp: "",
    telephone: "",
    status: "Actif",
    disponibilite: "Disponible",
    salaire: 0
  });

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  // console.log(monthNames[new Date().getMonth()]);
  const currentYear = new Date().getFullYear();


  const horaireMensuel = {
    mois: monthNames[new Date().getMonth()] + " " + currentYear,
    heureMensuel: 0
  }
  
  const [formDataM, setFormDataM] = useState({
    nom: "",
    prenom: "",
    dteNaissance: "",
    categorieCours: "",
    email: "",
    mdp: "",
    telephone: "",
    status: "Actif",
    disponibilite: "Disponible"
  });
  
  const reset = () => {
    const intialiseForm = {
      nom: "",
      prenom: "",
      dteNaissance: "",
      categorieCours: "",
      email: "",
      mdp: "",
      telephone: "",
      status: "Actif"
    };
    setMdp2("")

    setFormData(intialiseForm)
  }

  const fetchProfesseur = () => {
    instance.get('professeur/read')
      .then(response => {
        setProfesseur(response.data);
        // setTableau(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }

//   const verifMdp = () => {
//     instance.get('professeur/exist-mail-mdp', {
//             params: {
//             mail: formData.mail,
//             mdp: mdp2
//             },
//         })
//             .then(response => {
//                 setEmailMdpExist(response.data)
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la récupération des données :', error);
//             });
// }

    useEffect(() => {
        const fetchData = () => {
            instance.get('professeur/read')
                .then(response => {
                    setProfesseur(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };
      
        fetchData();
    }, []);

    useEffect(() => {
        setTableau([...professeur]);
    }, [professeur]);
  
    useEffect(() => {
      const fetchData = () => {
        instance.get('categorie-cours/cours-active')
          .then(response => {
            setCoursActive(response.data)
            if (response.data.length > 0) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                categorieCours: response.data[0].libelle,
              })); 
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
          });
      };
      
      fetchData();
  }, []);
  
    const mailAcceptation = {
      to: formData.email,
      subject: "Créaton de compte enseignant",
      text: `<!DOCTYPE html>
      <html>
      <head>
          <title>Création de votre compte Enseignant</title>
      </head>
      <body>
          <p>Cher/Chère ${formData.prenom} ${formData.nom},</p>
          <p>Nous sommes heureux de vous informer que votre compte Enseignant a été créé avec succès dans l'espace enseignant de l'application du 
          conservatoire Saint Viateur Abidjan. Vous êtes désormais prêt(e) à accéder à votre espace et à utiliser les fonctionnalités de 
          l'application.
          </p>
          <p>Vos accès à l'application :</p>
          <ul>
              <li><strong>Adresse e-mail :</strong> ${formData.email}</li>
              <li><strong>Mot de passe :</strong> ${formData.mdp}</li>
          </ul>
          <p>Il est essentiel de garder vos informations de connexion confidentielles et de ne jamais les partager avec quiconque. En cas de 
          problème ou si vous avez besoin d'assistance pour réinitialiser votre mot de passe, n'hésitez pas à nous contacter à 
          conservatoiresaintviateur1@gmail.com ou en répondant à cet e-mail.</p>
          <p>Nous sommes impatients de vous voir utiliser l'application qui vous permettra d'avoir une vue sur vos cours de manière plus 
          efficace.</p>
          <p>Cordialement,</p>
          <p>Conservatoire Saint Viateur d'Abidjan</p>
      </body>
      </html>
      `
  };

  const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
  };
  
  const handleChangeM = (event) => {
      setFormDataM({
        ...formDataM,
        [event.target.name]: event.target.value,
      });
  };
  
  const handleChangeMdp = (event) => {
      setMdp2(event.target.value);
  };

  const bloquer = () => {
    const dataToUpdate = {
      status: "Bloqué"
    };

    instance.put(`professeur/update/status/${formDataM.id}`, dataToUpdate)
      .then(response => {
        console.log('Champ mis à jour avec succès:', response.data);
        fetchProfesseur()
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du champ:', error);
      });
  };
  
  const debloquer = () => {
    const dataToUpdate = {
      status: "Actif"
    };

    instance.put(`professeur/update/status/${formDataM.id}`, dataToUpdate)
      .then(response => {
        console.log('Champ mis à jour avec succès:', response.data);
        fetchProfesseur()
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du champ:', error);
      });
  };

  const handleSubmitM = (event) => {
    event.preventDefault();
    //   existMail()
    const errors = {};
    
    if (!formDataM.nom) {
        errors.nom = 'Le nom est requis.';
    }
    
    if (!formDataM.prenom) {
        errors.prenom = 'Le prenom est requis.';
    }
    
    if (!formDataM.categorieCours) {
        errors.categorieCours = 'Veuillez sélectionner un cours SVP!';
    }

    if (!formDataM.email) {
      errors.email = 'Le mail est requis.';
  } else {
      if (!isValidEmail(formDataM.email)) {
          errors.email = "L'email n'est pas valide.";
        } 
  }
    
    // if (!formDataM.mdp) {
    //   errors.mdp = 'Le mot de passe est requis.';
    // }

    if (formDataM.mdp && !mdp2) {
        errors.mdp = 'Le mot de passe de confirmation est requis.';
      } else {
          if (formDataM.mdp !== mdp2) {
            errors.mdp = 'Les mots de passe ne correspondent pas!';
          }
        }
    
    // if (!mdp2) {
    //   errors.mdp2 = 'Le mot de passe de confirmation est requis.';
    // } else {
    //   if (formDataM.mdp !== mdp2) {
    //     errors.mdp = 'Les mots de passe ne correspondent pas!';
    //   }
    // }
    
    if (!formDataM.telephone) {
      errors.telephone = 'Le téléphone est requis.';
  }

    if (!formDataM.status) {
        errors.status = 'Le status est requis.';
    }

    if (Object.keys(errors).length > 0) {
        setFormDataErrorM(errors);
      } else {
      setFormDataErrorM({});
      if (!formDataM.mdp) {
        console.log("notal");
        instance.put(`professeur/update/${formDataM.id}`, formDataM)
        .then(response => {
          console.log('Données mises à jour avec succès:', response.data);
          // window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour des données:', error);
        });
      } else {
        instance.put(`professeur/update-all/${formDataM.id}`, formDataM)
        .then(response => {
          console.log('Données mises à jour avec succès:', response.data);
          // window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour des données:', error);
        });
      }
      
      fetchProfesseur()
        
    }
}
  
    const handleSubmit = (event) => {
      event.preventDefault();
      //   existMail()
      const errors = {};
      
      if (!formData.nom) {
          errors.nom = 'Le nom est requis.';
      }
      
      if (!formData.prenom) {
          errors.prenom = 'Le prenom est requis.';
      }
      
      if (!formData.categorieCours) {
          errors.categorieCours = 'Veuillez sélectionner un cours SVP!';
      }

      if (!formData.email) {
        errors.email = 'Le mail est requis.';
    } else {
        if (!isValidEmail(formData.email)) {
            errors.email = "L'email n'est pas valide.";
          } 
    }
      
      if (!formData.mdp) {
        errors.mdp = 'Les mot de passes sont requis.';
      }

      if (!mdp2) {
        errors.mdp2 = 'Le mot de passe de confirmation est requis.';
      } else {
        if (formData.mdp !== mdp2) {
          errors.mdp = 'Les mots de passe ne correspondent pas!';
        }
      }
      
      if (!formData.telephone) {
        errors.telephone = 'Le téléphone est requis.';
    }

      if (!formData.status) {
          errors.status = 'Le status est requis.';
      }

      if (Object.keys(errors).length > 0) {
          setFormDataError(errors);
        } else {
        setFormDataError({});
        console.log('Données valides :', formData);
        console.log(formData);
        instance.post("professeur/create", formData)
          .then(response => {
            console.log('Enregistrement réussi :', response.data);
            handleClick();

            instance.post("envoie-email", mailAcceptation)
              .then(response => {
                  console.log('Email envoyé avec succès :', response.data);
                  // window.location.reload();
              })
              .catch(error => {
                  console.error('Erreur d\'envoi :', error);
              });
        
        reset()

        fetchProfesseur()
              // window.location.reload();
          })
          .catch(error => {
              console.error('Erreur lors de l\'enregistrement :', error);
          });
        // instance.post("professeur/create-with-horaire", {
        //   professeur: formData,
        //   horaireMensuel
        // })
        //       .then(response => {
        //         console.log('Enregistrement réussi :', response.data);
        //         handleClick();
        //         fetchProfesseur()
        //           // window.location.reload();
        //       })
        //       .catch(error => {
        //           console.error('Erreur lors de l\'enregistrement :', error);
        //       });
          
        }
  }

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
  
  return (
    <>
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <ModalAjout
              handleSubmit={handleSubmit}
              titre="Ajouter un professeur"
              icon={<MdPersonAddAlt size={23} style={{ marginRight: 10, marginBottom: 3 }} />}
            >
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
                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                    <Form.Label>Prénom(s)</Form.Label>
                    <Form.Control
                      type="hidden"
                      name="prenom"
                      value={formData.salaire}
                    />
                  </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustomUsername">
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
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                    <Form.Label>Categorie Cours</Form.Label>
                    <Form.Select aria-label="Default select example" id="categorieCours" value={formData.categorieCours} name="categorieCours" onChange={handleChange}>
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
                      onChange={handleChange}
                      value={formData.email}
                      isInvalid={!!formDataError.email}
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
                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                    <Form.Label>Télephone</Form.Label>
                    <Form.Control
                      type="text"
                      name="telephone"
                      onChange={handleChange}
                      value={formData.telephone}
                      isInvalid={!!formDataError.telephone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formDataError.telephone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                    <Form.Label>Status</Form.Label>
                    <Form.Select aria-label="Default select example" id="status" value={formData.status} name="status" onChange={handleChange}>
                          <option value="Actif">Actif</option>
                          <option value="Bloqué">Bloqué</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                          {formDataError.status}
                      </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </ModalAjout>
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="containeur" style={{ marginTop: 40, marginBottom: 20 }}>
              <Table
                data={tableau}
                nomFichier='ListeProfesseur.xlsx'
                onChangeChiffre={handleChangeChiffre}
                chiffre={chiffre}
                item={professeur}
                items={label}
                titre="Liste des professeurs"
                nom="Aucun professeur enregistré"
                entite={`professeur`}
                setAdmins={setTableau}
                apprenants={professeur} >
                {currentItems.map((professeur, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{professeur.id}</th>
                      <td className='align-middle'>{professeur.nom}</td>
                      <td className='align-middle'>{professeur.prenom}</td>
                      <td className='align-middle'>{moment(professeur.dteNaissance).format("DD MMMM YYYY")}</td>
                      <td className='align-middle'>{professeur.categorieCours}</td>
                      <td className='align-middle'>{professeur.email}</td>
                      <td className='align-middle'>{professeur.telephone}</td>
                      <td className='align-middle'>
                        {professeur.status === "Actif" ? <Status titre={professeur.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={professeur.status} bgColor="linear-gradient(to right, #ED213A, #93291E)" />}
                      </td>
                      <td className='align-middle'>
                        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group me-2" role="group" aria-label="First group">
                            <Link to={`/administration/detailProfesseur/${professeur.id}`}>
                              <button style={{ marginBottom: 2, marginTop: 2 }} type="button" className="icon-button bg-warning" onClick={() => { list(professeur) }}>
                                <FiEye size={18} />
                              </button>
                            </Link>
                          </div>
                          <div className="btn-group me-2" role="group" aria-label="Second group">
                            <ActionButton
                              del={true}
                              list={list}
                              key={professeur.id}
                              reset={reset}
                              handleChangeM={handleChangeM}
                              handleSubmit={handleSubmitM}
                              formDataM={formDataM}
                              item={professeur}
                              setStatut={professeur.status === "Actif" ? bloquer : debloquer}
                              icon={professeur.status === "Actif" ? [<BsPersonFillSlash size={18} />] : <BsFillPersonPlusFill size={18} />}
                              message={professeur.status === "Actif" ? `Êtes-vous sûr(e) de vouloir bloquer ${professeur.prenom} ${professeur.nom} ?` : `Êtes-vous sûr(e) de vouloir débloquer ${professeur.prenom} ${professeur.nom} ?`}
                              id={professeur.id}
                              titre={`Modifier le professeur ${professeur.prenom} ${professeur.nom}`}
                            >
                              <Form>
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
                                        <option value={item.id}>{item.libelle}</option>
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
                                      <option value="Actif">Actif</option>
                                      <option value="Bloqué">Bloqué</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                      {formDataErrorM.status}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Row>
                              </Form>
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
      <CustomizedSnackbars status={`success`} open={open} handleClose={handleClose} text='Professeur créé avec succès !' />
      {/* <Confirmation show={show} img={<PiCheckFatFill className="rounded me-2" color='green' size={23} />} setShow={setShow} titre="Confirmation d'enregistrement" message="Professeur créé avec succès" button={<Button onClick={() => setShow(true)}>Show Toast</Button>} /> */}
    </>
  )
}

export default Professeur
