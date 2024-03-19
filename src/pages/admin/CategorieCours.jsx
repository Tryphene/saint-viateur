import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import Status from '../../components/Status';
import Table from '../../components/Table';
import ModalAjout from '../../components/ModalAjout';
import { MdPersonAddAlt } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import Form from 'react-bootstrap/Form';
import { Link} from 'react-router-dom';
import ActionButton from '../../components/ActionButton';
import { MdDeleteForever } from 'react-icons/md';
import { instance } from '../../axios';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';

const CategorieCours = () => {
    const coursLabel = [
        "ID",
        "Libelle",
        "Status",
        "Action",
    ];

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

    const [error, setError] = useState('')
    const [formDataError, setFormDataError] = useState({});

    const [formCours, setFormCours] = useState({
        libelle: "",
        status: "Activé",
    });

    const reset = () => {
        const intialiseForm = {
            libelle: "",
            status: "Activé",
        };
        setFormCours(intialiseForm)
    }
   
    const [formCoursM, setFormCoursM] = useState({
        libelle: "",
        status: "",
    });
    
    const [cours, setCours] = useState([]);
    const [coursActive, setCoursActive] = useState([]);
    const [tableau, setTableau] = useState([]);

    const fetchCategorie = () => {
            instance.get('categorie-cours/read')
                .then(response => {
                    setCours(response.data);
                    // setTableau(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };

    useEffect(() => {
        fetchCategorie()
    }, []);

    useEffect(() => {
        setTableau([...cours]);
    }, [cours]);

    useEffect(() => {
        const fetchData = () => {
            instance.get('categorie-cours/cours-active')
                .then(response => {
                    setCoursActive(response.data)
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

    const isFormEmptyM = formCoursM.libelle === "" || formCoursM.status === ""
    
    const handleSubmit = (event, condition, form, url) => {
        event.preventDefault();
        if (condition) {
            setError('Veuillez remplir tous les champs SVP !');
            console.log('Au moins un champ est vide');
            console.log(form);
        } else {
            console.log(form);
            instance.post(url, form)
                .then(response => {
                    console.log('Enregistrement réussi :', response.data);
                    fetchCategorie();
                    handleClick();
                    // window.location.reload();
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement :', error);
                });
        }
    };

    const handleSubmitt = (event) => {
        event.preventDefault();
        //   existMail()
        const errors = {};
        
        if (!formCours.libelle) {
            errors.libelle = 'Le libelle est requis.';
        }
  
        if (!formCours.status) {
            errors.status = 'Le status est requis.';
        }

        if (Object.keys(errors).length > 0) {
            setFormDataError(errors);
          } else {
              setFormDataError({});
            console.log('Données valides :', formCours);
            console.log(formCours);
            instance.post("categorie-cours/create", formCours)
                .then(response => {
                    console.log('Enregistrement réussi :', response.data);
                    // window.location.reload();
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement :', error);
                });
              reset()
          }
    }


    const list = (item) => {
        formCoursM.id = item.id
        formCoursM.libelle = item.libelle
        formCoursM.status = item.status

        console.log(formCoursM);
    }

    const bloquer = () => {
        instance.delete(`categorie-cours/delete/${formCoursM.id}`)
          .then(response => {
            console.log('Champ mis à jour avec succès:', response.data);
            console.log(formCoursM.id);
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour du champ:', error);
          });
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

        return (
            <>
                <Container style={{ marginTop: 50 }}>
                    <Row>
                        <Col xs={12} sm={12} md={3} lg={3}>
                            <ModalAjout
                                handleSubmit={handleSubmitt}
                                titre="Ajouter un cour"
                                icon={<MdPersonAddAlt size={23} style={{ marginRight: 10, marginBottom: 3 }} />} >
                                <form>
                                    <Row>
                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                            <Form.Label>Libelle</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="libelle"
                                                onChange={(event) => handleChange(event, formCours, setFormCours)}
                                                value={formCours.libelle}
                                                isInvalid={!!formDataError.libelle}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formDataError.libelle}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Select aria-label="Default select example" id="status" value={formCours.status} name="status" onChange={(event) => handleChange(event, formCours, setFormCours)}>
                                                <option value="Activé">Activé</option>
                                                <option value="Désactivé">Désactivé</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {formDataError.status}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                </form>
                            </ModalAjout>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="containeur" style={{ marginTop: 40, marginBottom: 20 }}>
                                <Table
                                    data={tableau}
                                    nomFichier='ListeCours.xlsx'
                                    onChangeChiffre={handleChangeChiffre}
                                    chiffre={chiffre}
                                    item={cours}
                                    items={coursLabel}
                                    titre="Liste des cours"
                                    sousTitre="Liste des catégories de cours dédiés aux apprenants"
                                    nom="Aucun cour enregistré"
                                    elements={cours}
                                    admins={cours}
                                    setAdmins={setTableau}
                                    setApprenants={setTableau}
                                    apprenants={cours} >
                                    {currentItems.map((cour, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{cour.id}</th>
                                                <td className='align-middle'>{cour.libelle}</td>
                                                <td className='align-middle'>
                                                    {cour.status === "Activé" ? <Status titre={cour.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={cour.status} bgColor="linear-gradient(to right, #ED213A, #93291E)" />}
                                                </td>
                                                <td className='align-middle'>
                                                    <ActionButton
                                                        key={cour.id}
                                                        list={list}
                                                        reset={reset}
                                                        handleChangeM={(event) => handleChange(event, formCoursM, setFormCoursM)}
                                                        handleSubmit={(event) => handleSubmit(event, isFormEmptyM, formCoursM, 'categorie-cours/create')}
                                                        formDataM={formCoursM}
                                                        item={cour}
                                                        // setStatut={cour.status === "Activé" ? bloquer : debloquer}
                                                        setStatut={bloquer}
                                                        icon={<MdDeleteForever size={18} />}
                                                        // icon={cour.status === "Activé" ? [<BsPersonXFill size={18} />] : <BsFillPersonPlusFill size={18} />}
                                                        // message={cour.status === "Activé" ? `Êtes-vous sûr(e) de vouloir désactivé le cour ${cour.libelle} ?` : `Êtes-vous sûr(e) de vouloir activé lr cour ${cour.libelle} ?`}
                                                        message={`Êtes-vous sûr(e) de vouloir supprimé le cour ${cour.libelle} ?`}
                                                        id={cour.id}
                                                        titre={`Modifier l'administrateur ${cour.libelle}`}
                                                    >
                                                       <form>
                                                            <div className="mb-3">
                                                                <label htmlFor="nom" className="form-label fw-bolder">Nom</label>
                                                                <input type="text" value={formCoursM.libelle} name="libelle" onChange={(event) => handleChange(event, formCoursM, setFormCoursM)} className="form-control" id="nom" placeholder="" />
                                                                {/* {error && <p className="error-message">{error}</p>} */}
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="status" className="form-label fw-bolder">Status</label>
                                                                <Form.Select aria-label="Default select example" id="status" value={formCoursM.status} name="status" onChange={(event) => handleChange(event, formCoursM, setFormCoursM)}>
                                                                    <option value="Activé">Activé</option>
                                                                    <option value="Désactivé">Désactivé</option>
                                                                </Form.Select>
                                                                {formCours.status}
                                                                {error && <p className="error-message">{error}</p>}
                                                            </div>
                                                            {error && (
                                                                <>
                                                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                                                        <TiDelete size={25} color='red' />
                                                                        <div style={{ marginLeft: 15 }}>
                                                                            {error}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
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
                </Container>
                <CustomizedSnackbars status={`success`} open={open} handleClose={handleClose} text='Apprenant créer avec succès !' />
            </>
        )
    }


export default CategorieCours
