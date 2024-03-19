import React, { useEffect, useState } from 'react'
import { instance } from '../../axios';
import { Col, Form, Row } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';
import { MdDeleteForever, MdPersonAddAlt } from 'react-icons/md';
import ModalAjout from '../../components/ModalAjout';
import { Link } from 'react-router-dom';
import Status from '../../components/Status';
import ActionButton from '../../components/ActionButton';
import Table from '../../components/Table';
import TableMui from '../../components/TableMui';

const DomaineCours = () => {
    const domainesLabel = [
        "ID",
        "Libelle",
        "Categorie",
        "Status",
        "Action",
    ];

    const [domaine, setDomaine] = useState([]);
    const [coursActive, setCoursActive] = useState([]);
    const [tableau, setTableau] = useState([]);
    const [error, setError] = useState('')
    const [formDataError, setFormDataError] = useState({});
    const [formDataErrorM, setFormDataErrorM] = useState({});
    const [formDataErrorDC, setFormDataErrorDC] = useState({});
    const [nomCours, setNomCours] = useState("")
    const [professeur, setProfesseur] = useState([]);
    const [domaineProfesseurExist, setDomaineProfesseurExist] = useState(false);
    
    const [formDomaine, setFormDomaine] = useState({
        libelle: "",
        categorie_id: 1,
        placeDisponible: 1000,
        status: "Activé",
    });

    const [formDomaineM, setFormDomaineM] = useState({
        libelle: "",
        categorie_id: 1,
        placeDisponible: "",
        status: "Activé",
    });
    
    const [formDomaineProfesseur, setFormDomaineProfesseur] = useState({
        professeurId: 1,
        domaineCategorieId: 1,
    });
    
    const reset = () => {
        const intialiseForm = {
            libelle: "",
            categorie_id: 1,
            placeDisponible: 1000,
            status: "Activé",
        };
        setFormDomaine(intialiseForm)
    }
    
    const resetFormDomaineProfesseur = () => {
        const intialiseForm = {
            professeurId: 1,
            domaineCategorieId: 1,
        };
        setFormDomaineProfesseur(intialiseForm)
    }

    const fetchData = () => {
        instance.get('domaine-categorie/read-with-nom-domaine')
            .then(response => {
                setDomaine(response.data);
                // console.log(response.data)
                // if (response.data.length > 0) {
                //     setFormDomaineProfesseur((prevFormProf) => ({
                //         ...prevFormProf,
                //         domaineCategorieId: response.data[0].domaineCategorie.id,
                //     }));
                // }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    };

    useEffect(() => {
        fetchData()
    }, []);

     useEffect(() => {
        setTableau([...domaine]);
    }, [domaine]);

    useEffect(() => {
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
    
        fetchProfesseur()
    }, [professeur]);


    useEffect(() => {
        const fetchData = () => {
            instance.get('categorie-cours/cours-active')
                .then(response => {
                    setCoursActive(response.data)
                    // console.log(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };
      
        fetchData();
    }, [coursActive]);

    const handleChange = (event, form, set) => {
        set({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    // useEffect(() => {
    //     async function fetchCoursNames() {
    //       const coursNames = {};
    //       for (const fils of domaine) {
    //         try {
    //           const response = await fetch(`http://localhost:8081/categorie-cours/categorie-cours-for-domaine-categorie/${fils.id}`);
    //           const data = await response.json();
    //           coursNames[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
    //         } catch (error) {
    //           console.error("Erreur lors de la récupération du nom du père :", error);
    //           coursNames[fils.id] = "Nom Inconnu";
    //         }
    //       }
    //       setNomCours(coursNames);
    //     }

    //     fetchCoursNames();
    //   }, [domaine]);

    const handleSubmit = (event) => {
        event.preventDefault();
        //   existMail()
        const errors = {};
        
        if (!formDomaine.libelle) {
            errors.libelle = 'Le libelle est requis.';
        }
  
        if (!formDomaine.status) {
            errors.status = 'Le status est requis.';
        }
        
        if (!formDomaine.placeDisponible) {
            errors.placeDisponible = 'Le nombre de place disponible est requis.';
        }

        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
          } else {
              setFormDataError({});
            console.log('Données valides :', formDomaine);
            console.log(formDomaine);
            instance.post(`domaine-categorie/create/${formDomaine.categorie_id}`, formDomaine)
                .then(response => {
                    console.log('Enregistrement réussi :', response.data);
                    fetchData()
                    // window.location.reload();
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement :', error);
                });
              reset()
          }
    }
    const handleSubmitM = (event,) => {
        event.preventDefault();
        //   existMail()
        const errors = {};
        
        if (!formDomaineM.libelle) {
            errors.libelle = 'Le libelle est requis.';
        }
  
        if (!formDomaineM.status) {
            errors.status = 'Le status est requis.';
        }
        
        if (!formDomaineM.placeDisponible) {
            errors.placeDisponible = 'Le nombre de place disponible est requis.';
        }

        if (Object.keys(errors).length > 0) {
            setFormDataErrorM(errors);
          } else {
              setFormDataErrorM({});
            console.log('Données valides :', formDomaineM);
            console.log(formDomaineM);
            instance.put(`domaine-categorie/update/${formDomaineM.id}`, formDomaineM)
                .then(response => {
                    console.log('Modification réussie :', response.data);
                    fetchData()
                    // window.location.reload();
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement :', error);
                });
              reset()
          }
    }
    
    useEffect(() => {
        const existDomaineProfesseur = () => {
            instance.get('professeur/exists-by-id-domaine-categories-id', {
                params: {
                    professeurId: parseInt(formDomaineProfesseur.professeurId),
                    domaineCategorieId: parseInt(formDomaineProfesseur.domaineCategorieId)
                }
            })
                .then(response => {
                    setDomaineProfesseurExist(response.data)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
    };
        
        existDomaineProfesseur()

    }, [formDomaineProfesseur])
   
    const handleSubmitDC = (event) => {
        event.preventDefault();
        //   existMail()
        // existDomaineProfesseur()
        const errors = {};
        
        if (!formDomaineProfesseur.professeurId) {
            errors.professeurId = 'Le Professeur est requis.';
        }
  
        if (!formDomaineProfesseur.domaineCategorieId) {
            errors.domaineCategorieId = 'Le cours est requis.';
        }

        if (Object.keys(errors).length > 0) {
            setFormDataErrorDC(errors);
        } else {
            setFormDataErrorM({});
            if (domaineProfesseurExist) {
                console.log('Données invalides :', formDomaineProfesseur);
                setError('Le professeur sélectionné est déjà inscrit à ce cours!')
            } else {
                setError('')
                console.log('Données valides :', formDomaineProfesseur);
                instance.post('professeur/inscription', null, {
                    params: {
                        professeurId: parseInt(formDomaineProfesseur.professeurId),
                        domaineCategorieId: parseInt(formDomaineProfesseur.domaineCategorieId)
                    }
                })
                    .then(response => {
                        console.log('Enregistrement réussi :', response.data);
                        // window.location.reload();
                    })
                    .catch(error => {
                        console.error('Erreur lors de l\'enregistrement :', error);
                    });
                  resetFormDomaineProfesseur()
            }
        }
    }

    const list = (item) => {
        formDomaineM.id = item.id
        formDomaineM.libelle = item.libelle
        formDomaineM.placeDisponible = item.placeDisponible
        formDomaineM.status = item.status

        console.log(formDomaineM);
    }
    // const bloquer = () => {
    //     instance.delete(`categorie-cours/delete/${formDomaineM.id}`)
    //       .then(response => {
    //         console.log('Champ mis à jour avec succès:', response.data);
    //         console.log(formDomaineM.id);
    //       })
    //       .catch(error => {
    //         console.error('Erreur lors de la mise à jour du champ:', error);
    //       });
    // };

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

    const [professeurs, setProfesseurs] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchData = () => {
            // instance.get(`professeur/by-domaine/${formDomaineProfesseur.domaineCategorieId}/status/Actif/disponibilite/Disponible`)
            instance.get(`professeur/find-prof`)
                .then(response => {
                  setProfesseurs(response.data)
                    setLoading(false)
                //     if (response.data.length > 0) {
                //             setFormDomaineProfesseur((prevFormProf) => ({
                //                 ...prevFormProf,
                //                 professeurId: response.data[0].id,
                //             }));
                //     }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
    }, [formDomaineProfesseur.domaineCategorieId]);

    const vide = ""
    
    return (
        <>
            <Row className="mt-5">
                <Col xs={12} sm={12} md={3} lg={3}>
                    <ModalAjout
                        handleSubmit={handleSubmit}
                        titre="Ajouter un Domaine"
                        icon={<MdPersonAddAlt size={23} style={{ marginRight: 10, marginBottom: 3 }} />} >
                        <form>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label className="form-label fw-bolder">Libelle</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="libelle"
                                        onChange={(event) => handleChange(event, formDomaine, setFormDomaine)}
                                        value={formDomaine.libelle}
                                        isInvalid={!!formDataError.libelle}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.libelle}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label className="form-label fw-bolder">Catégorie Cours</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        id="categorie_id"
                                        value={formDomaine.categorie_id}
                                        name="categorie_id"
                                        onChange={(event) => handleChange(event, formDomaine, setFormDomaine)}
                                        isInvalid={!!formDataError.categorie_id}
                                    >
                                        {coursActive.map((item) => {
                                            return (
                                                <option value={item.id}>{item.libelle}</option>
                                            )
                                        })}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.categorie_id}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label className="form-label fw-bolder">Status</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        id="status"
                                        value={formDomaine.status}
                                        name="status"
                                        onChange={(event) => handleChange(event, formDomaine, setFormDomaine)}
                                        isInvalid={!!formDataError.status}
                                    >
                                        <option value='Activé'>Activé</option>
                                        <option value='Bloqué'>Bloqué</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.status}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label className="form-label fw-bolder">Place disponible</Form.Label>
                                    <Form.Control
                                        type='number'
                                        value={formDomaine.placeDisponible}
                                        name="placeDisponible"
                                        onChange={(event) => handleChange(event, formDomaine, setFormDomaine)}
                                        isInvalid={!!formDataError.placeDisponible}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formDataError.placeDisponible}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ fontSize: 15 }}>
                                {error}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                            </div> : ''}
                        </form>
                    </ModalAjout>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <ModalAjout
                        handleSubmit={handleSubmitDC}
                        titre="Atribuer un domaine à un professeur"
                        icon={<MdPersonAddAlt size={23} style={{ marginRight: 10, marginBottom: 3 }} />} >
                        <form>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label className="form-label fw-bolder">Domaine Cours</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        id="domaineCategorieId"
                                        value={formDomaineProfesseur.domaineCategorieId}
                                        name="domaineCategorieId"
                                        onChange={(event) => handleChange(event, formDomaineProfesseur, setFormDomaineProfesseur)}
                                        isInvalid={!!formDataErrorDC.domaineCategorieId}
                                    >
                                        {domaine.map((item) => {
                                            return (
                                                <option value={item.domaineCategorie.id}>{item.domaineCategorie.libelle}</option>
                                            )
                                        })}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formDataErrorDC.domaineCategorieId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                    <Form.Label className="form-label fw-bolder">Professeur</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        id="professeurId"
                                        value={formDomaineProfesseur.professeurId}
                                        name="professeurId"
                                        onChange={(event) => handleChange(event, formDomaineProfesseur, setFormDomaineProfesseur)}
                                        isInvalid={!!formDataErrorDC.professeurId}
                                    >
                                        {professeurs.length > 0 ?
                                            professeurs.map((item) => {
                                                return (
                                                    <option value={item.id}>{item.prenom} {item.nom}</option>
                                                )
                                            }) : <option value={vide}>Aucun Professeur enregistré</option>}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formDataErrorDC.professeurId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            {error !== '' ? <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ fontSize: 15 }}>
                                {error}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                            </div> : <p></p> }
                        </form>
                    </ModalAjout>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="containeur" style={{ marginTop: 40, marginBottom: 20 }}>
                        <Table
                            data={tableau}
                            nomFichier='ListeDomainesCours.xlsx'
                            onChangeChiffre={handleChangeChiffre}
                            chiffre={chiffre}
                            item={domaine}
                            items={domainesLabel}
                            titre="Liste des Domaines de Cours"
                            sousTitre="Liste des domaines de cours des différents catégories de cours"
                            nom="Aucun domaine enregistré"
                            entite={`domaine-categorie`}
                            admins={domaine}
                            setAdmins={setTableau}
                            setApprenants={setTableau}
                            apprenants={domaine} >
                            {currentItems.map((cour, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{cour.domaineCategorie.id}</th>
                                        <td className='align-middle'>{cour.domaineCategorie.libelle}</td>
                                        <td className='align-middle'>{cour.parent}</td>
                                        <td className='align-middle'>
                                            {cour.domaineCategorie.status === "Activé" ? <Status titre={cour.domaineCategorie.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={cour.domaineCategorie.status} bgColor="linear-gradient(to right, #ED213A, #93291E)" />}
                                        </td>
                                        <td className='align-middle'>
                                            <ActionButton
                                                key={cour.id}
                                                list={list}
                                                reset={reset}
                                                handleChangeM={(event) => handleChange(event, formDomaineM, setFormDomaineM)}
                                                handleSubmit={(event) => handleSubmitM(event, cour.domaineCategorie.id)}
                                                formDataM={formDomaineM}
                                                item={cour.domaineCategorie}
                                                // setStatut={cour.status === "Activé" ? bloquer : debloquer}
                                                // setStatut={bloquer}
                                                icon={<MdDeleteForever size={18} />}
                                                // icon={cour.status === "Activé" ? [<BsPersonXFill size={18} />] : <BsFillPersonPlusFill size={18} />}
                                                // message={cour.status === "Activé" ? `Êtes-vous sûr(e) de vouloir désactivé le cour ${cour.libelle} ?` : `Êtes-vous sûr(e) de vouloir activé lr cour ${cour.libelle} ?`}
                                                message={`Êtes-vous sûr(e) de vouloir supprimé le domaine cour ${cour.domaineCategorie.libelle} ?`}
                                                id={cour.domaineCategorie.id}
                                                titre={`Modifier le domaine cours ${cour.domaineCategorie.libelle}`}
                                            >
                                                <form>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label className="form-label fw-bolder">Libelle</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="libelle"
                                                                onChange={(event) => handleChange(event, formDomaineM, setFormDomaineM)}
                                                                value={formDomaineM.libelle}
                                                                isInvalid={!!formDataErrorM.libelle}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formDataErrorM.libelle}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label className="form-label fw-bolder">Catégorie Cours</Form.Label>
                                                            <Form.Select aria-label="Default select example"
                                                                id="categorie_id"
                                                                value={formDomaineM.categorie_id}
                                                                name="categorie_id"
                                                                onChange={(event) => handleChange(event, formDomaineM, setFormDomaineM)}
                                                                isInvalid={!!formDataErrorM.categorie_id}
                                                            >
                                                                {coursActive.map((item) => {
                                                                    return (
                                                                        <option value={item.id}>{item.libelle}</option>
                                                                    )
                                                                })}
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                {formDataErrorM.categorie_id}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label className="form-label fw-bolder">Status</Form.Label>
                                                            <Form.Select aria-label="Default select example"
                                                                id="status"
                                                                value={formDomaineM.status}
                                                                name="status"
                                                                onChange={(event) => handleChange(event, formDomaineM, setFormDomaineM)}
                                                                isInvalid={!!formDataErrorM.status}
                                                            >
                                                                <option value='Activé'>Activé</option>
                                                                <option value='Bloqué'>Bloqué</option>
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                {formDataErrorM.status}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                                            <Form.Label className="form-label fw-bolder">Place disponible</Form.Label>
                                                            <Form.Control
                                                                type='number'
                                                                value={formDomaineM.placeDisponible}
                                                                name="placeDisponible"
                                                                onChange={(event) => handleChange(event, formDomaineM, setFormDomaineM)}
                                                                isInvalid={!!formDataErrorM.placeDisponible}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formDataErrorM.placeDisponible}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ fontSize: 15 }}>
                                                        {error}
                                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ width: 10 }}></button>
                                                    </div> : ''}
                                                </form>  
                                            </ActionButton>
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
                                    <li className={currentPage === totalPage ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => { setCurrentPage(currentPage + 1) }}>Suivant</Link></li>
                                </ul>
                            </nav>
                        </div>}
                    </div>
                </Col>
            </Row>
            {/* <TableMui /> */}
        </>
    )
}

export default DomaineCours
