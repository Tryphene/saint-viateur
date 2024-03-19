import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
import Table from '../../components/Table';
// import ModalAjout from '../../components/ModalAjout';
// import { MdPersonAddAlt } from 'react-icons/md';
// import { TiDelete } from 'react-icons/ti';
// import Form from 'react-bootstrap/Form';
import { Link} from 'react-router-dom';
// import ActionButton from '../../components/ActionButton';
// import { MdDeleteForever } from 'react-icons/md';
import { instance } from '../../axios';
// import CustomizedSnackbars from '../../components/CustomizedSnackbars';
import { AdminContext } from '../../context/AdminContext';
import jour from "../../img/jour.png"
import total from "../../img/total.png"
import mensuel from "../../img/mensuel.png"
import { formatDateToYYYYMMDD } from '../../date';

const PaiementFrais = () => {
  const { admin } = useContext(AdminContext)
  const [loading, setLoading] = useState(true)
  const [fraisJournalier, setFraisJournalier] = useState('')
  const [fraisMensuel, setFraisMensuel] = useState('')
  const [fraisTotal, setFraisTotal] = useState('')
  const [fraisAnnuel, setFraisAnnuel] = useState('')
  
  let fraisInscriptionLabel = [
    "ID",
    "Frais",
    "Date Paiement",
    "Apprenant",
    "Admin",
    ];

  if (admin.role !== 'Super administrateur') {
    fraisInscriptionLabel = [
      "ID",
      "Frais",
      "Date Paiement",
      "Apprenant"
  ];
  }
  
  const fetchFraisJournalier = () => {
    instance.get('paiement-frais/count-frais-day', {
      params: {
        date: formatDateToYYYYMMDD(new Date())
      }
    })
      .then(({ data }) => {
        setFraisJournalier(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
  };
  
  const fetchFraisMensuel = () => {
    instance.get('paiement-frais/count-frais-mois', {
      params: {
        month: new Date().getMonth() + 1
      }
    })
      .then(({ data }) => {
        setFraisMensuel(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
  };
  
  const fetchFraisTotal = () => {
    instance.get('paiement-frais/count-frais-total')
      .then(({ data }) => {
        setFraisTotal(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
  };
  
  const fetchFraisAnnuel = () => {
    instance.get('paiement-frais/count-frais-annee')
      .then(({ data }) => {
        setFraisAnnuel(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFraisJournalier()
    fetchFraisMensuel()
    fetchFraisTotal()
    fetchFraisAnnuel()
  }, [])

    // const [error, setError] = useState('')
    // const [formDataError, setFormDataError] = useState({});

    // const [formPaiementFrais, setFormPaiementFrais] = useState({
    //   FraisInscripion: "",
    //   datePaiement: "",
    //   Admin: ""
    // });

    // const reset = () => {
    //     const intialiseForm = {
    //       FraisInscripion: "",
    //       datePaiement: "",
    //       Admin: "",
    //   };
    //   setFormPaiementFrais(intialiseForm)
    // }
   
    // const [formPaiementFraisM, setFormPaiementFraisM] = useState({
    //   FraisInscripion: "",
    //   datePaiement: "",
    //   Admin: ""
    // });
    
    const [fraisInscription, setFraisInscription] = useState([]);
    const [tableau, setTableau] = useState([]);

  const fetchFrais = () => {
    instance.get('paiement-frais/read-frais')
      .then(response => {
        setFraisInscription(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  };

    useEffect(() => {
        fetchFrais()
    }, []);

    useEffect(() => {
        setTableau([...fraisInscription]);
    }, [fraisInscription]);
    
    // const handleChange = (event, form, set) => {
    //     set({
    //         ...form,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     //   existMail()
    //     const errors = {};
        
    //     if (!formPaiementFrais.libelle) {
    //         errors.libelle = 'Le libelle est requis.';
    //     }
  
    //     if (!formPaiementFrais.status) {
    //         errors.status = 'Le status est requis.';
    //     }

    //     if (Object.keys(errors).length > 0) {
    //         setFormDataError(errors);
    //       } else {
    //           setFormDataError({});
    //         console.log('Données valides :', formPaiementFrais);
    //         console.log(formPaiementFrais);
    //         instance.post("categorie-cours/create", formPaiementFrais)
    //             .then(response => {
    //                 console.log('Enregistrement réussi :', response.data);
    //                 // window.location.reload();
    //             })
    //             .catch(error => {
    //                 console.error('Erreur lors de l\'enregistrement :', error);
    //             });
    //           reset()
    //       }
    // }


    // const list = (item) => {
    //     formPaiementFraisM.id = item.id
    //     formPaiementFraisM.admin = item.admin
    //     formPaiementFraisM.datePaiement = item.datePaiement
    //     formPaiementFraisM.fraisInscription = item.fraisInscription

    //     console.log(formPaiementFraisM);
    // }

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

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  return (
    <>
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4}>
            <div className="rounded-2" style={{ backgroundColor: "#F14F7C", color: "white" }}>
              <div className="d-flex justify-content-between">
                <div className="pt-3 ps-3">
                  <p style={{ fontSize: 15 }}>Frais Inscription Journalier </p>
                  {/* <span style={{fontWeight: 700}}>{capitalize(moment(new Date()).format("DD MMMM YYYY"))}</span> */}
                  <p className='pt-0 mt-0' style={{fontSize: 27, fontWeight: 600}}>{fraisJournalier} FCFA</p>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: 80, backgroundColor: "#F67C9D", borderTopRightRadius: 7, borderBottomRightRadius: 7 }}>
                  <img src={jour} width={45} alt="" />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4}>
            <div className="rounded-2" style={{ backgroundColor: "#6F6DAF", color: "white" }}>
              <div className="d-flex justify-content-between">
                <div className="pt-3">
                  <p style={{ fontSize: 15 }} className='ps-2'>Frais Inscription Mensuel </p>
                  {/* <span style={{fontWeight: 700}}>{capitalize(moment(new Date()).format("MMMM YYYY"))}</span> */}
                  <p className='pt-0 mt-0 ps-3' style={{fontSize: 27, fontWeight: 600}}>{fraisMensuel} FCFA</p>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: 80, backgroundColor: "#9292C4", borderTopRightRadius: 7, borderBottomRightRadius: 7 }}>
                  <img src={mensuel} width={45} alt="" />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4}>
            <div className="rounded-2" style={{ backgroundColor: "#32B1DF", color: "white" }}>
              <div className="d-flex justify-content-between">
                <div className="pt-3 ps-3">
                  <p style={{fontSize: 15}}>Frais Inscription Annuel</p>
                  <p className='pt-0 mt-0' style={{fontSize: 27, fontWeight: 600}}>{fraisAnnuel} FCFA</p>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: 80, backgroundColor: "#64C5E8", borderTopRightRadius: 7, borderBottomRightRadius: 7 }}>
                  <img src={total} width={45} alt="" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="containeur" style={{ marginTop: 40, marginBottom: 20 }}>
              <Table
                data={tableau}
                nomFichier='ListeFrais.xlsx'
                onChangeChiffre={handleChangeChiffre}
                chiffre={chiffre}
                item={fraisInscription}
                items={fraisInscriptionLabel}
                titre="Frais Inscription"
                sousTitre="Liste des Frais Inscription"
                nom="Aucun Frais enregistré"
                elements={fraisInscription}
                                    admins={fraisInscription}
                                    setAdmins={setTableau}
                                    setApprenants={setTableau}
                                    apprenants={fraisInscription} >
                                    {currentItems.map((frais, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{frais.id}</th>
                                                <td className='align-middle'>{frais.fraisInscription} FCFA</td>
                                                <td className='align-middle'>{moment(frais.datePaiement).format("DD MMMM YYYY")}</td>
                                                <td className='align-middle'>{frais.prenomApprenant} {frais.nomApprenant}</td>
                                                {admin.role === 'Super administrateur' && <td className='align-middle'>{frais.admin}</td>}
                                                {/* <td className='align-middle'>
                                                    <ActionButton
                                                        key={frais.id}
                                                        list={list}
                                                        reset={reset}
                                                        handleChangeM={(event) => handleChange(event, formPaiementFraisM, setFormPaiementFraisM)}
                                                        handleSubmit={(event) => handleSubmit(event, formPaiementFraisM, 'categorie-cours/create')}
                                                        formDataM={formPaiementFraisM}
                                                        item={frais}
                                                        setStatut={bloquer}
                                                        icon={<MdDeleteForever size={18} />}message={null}
                                                        id={frais.id}
                                                        titre={`Modifier  ${frais.id}`}
                                                    >
                                                       <form>
                                                            <div className="mb-3">
                                                                <label htmlFor="nom" className="form-label fw-bolder">Nom</label>
                                                                <input type="text" value={formPaiementFraisM.libelle} name="libelle" onChange={(event) => handleChange(event, formPaiementFraisM, setFormPaiementFraisM)} className="form-control" id="nom" placeholder="" />
                                                                
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="status" className="form-label fw-bolder">Status</label>
                                                                <Form.Select aria-label="Default select example" id="status" value={formPaiementFraisM.status} name="status" onChange={(event) => handleChange(event, formPaiementFraisM, setFormPaiementFraisM)}>
                                                                    <option value="Activé">Activé</option>
                                                                    <option value="Désactivé">Désactivé</option>
                                                                </Form.Select>
                                                                {formPaiementFrais.status}
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
                                                </td> */}
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
                {/* <CustomizedSnackbars status={`success`} open={open} handleClose={handleClose} text='Apprenant créer avec succès !' /> */}
    </>
  )
}

export default PaiementFrais
