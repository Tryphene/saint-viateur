import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Table from '../../components/Table'
import Status from '../../components/Status';
import ModalAjout from '../../components/ModalAjout';
import { MdPersonAddAlt } from 'react-icons/md';
import ActionButton from '../../components/ActionButton';
import { BsEyeFill, BsEyeSlashFill, BsFillPersonPlusFill, BsPersonFillSlash } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import moment from 'moment';
import { AdminContext } from '../../context/AdminContext';
import { instance } from '../../axios';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';

const Administrateur = () => {

  const { admin } = useContext(AdminContext)

  // const getPageName = () => {
  //   const pathname = window.location.pathname;
  //   const pageName = pathname.substring(1); // Exclut le premier caractère '/'
  //   return pageName;
  // };

  // function capitalize(str) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

  const label = [
    // "ID",
    "Nom",
    "Prenom(s)",
    // "Date de naissance",
    "Adresse-mail",
    // "Mot de passe",
    "Telephone",
    "Rôle",
    "Status",
    "Action",
  ];

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  };

  const [admins, setAdmins] = useState([]);
  const [tableau, setTableau] = useState([]);

  const fetchAdmin = () => {
    instance.get('admin/read')
      .then(response => {
        setAdmins(response.data);
        // setTableau(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  };

useEffect(() => {
  fetchAdmin();
}, []);

useEffect(() => {
  setTableau([...admins]);
}, [admins]);


  const [vue, setVue] = useState("password")
  const [vue2, setVue2] = useState("password")

  const [error, setError] = useState('')
  // const [loading, setLoading] = useState(true)

  console.log();
  const [formData, setFormData] = useState({
    admin: admin.email,
    id: "",
    nom: "",
    prenom: "",
    dteNaissance: "",
    mail: "",
    updated_at: "",
    updated_by: "",
    mdp: "",
    telephone: "",
    role: "Super administrateur",
    status: "Actif",
  });

  const [mdp2, setMdp2] = useState("")

  const list = (item) => {
      formDataM.id = item.id
      formDataM.nom = item.nom
      formDataM.prenom = item.prenom
      formDataM.dteNaissance = item.dteNaissance
      formDataM.email = item.email
      // formDataM.mdp = item.mdp
      formDataM.telephone = item.telephone
      formDataM.role = item.role
      formDataM.status = item.status
  
      console.log(formDataM);
    }
  
  const [formDataM, setFormDataM] = useState({
    id: "",
    nom: "",
    prenom: "",
    dteNaissance: "",
    email: "",
    mdp: "",
    updated_at: new Date(),
    updated_by: admin.email,
    telephone: "",
    role: "",
    status: "",
  });

  const handleChangeM = (event) => {
    setFormDataM({
      ...formDataM,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeMdp2 = (event) => {
    setMdp2(event.target.value)
    
  }
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const isFormEmpty = formData.nom === "" || formData.prenom === "" || formData.dteNaissance === "" ||
    formData.email === "" || formData.mdp === "" || mdp2 === "" || formData.telephone === "" || formData.status === "";
  
  const isFormEmptyM = formDataM.nom === "" || formDataM.prenom === "" || formDataM.dteNaissance === "" ||
    formDataM.email === "" || formDataM.telephone === "" || formDataM.status === "";
  
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormEmpty) {
      setError('Veuillez remplir tous les champs SVP !');
      console.log('Au moins un champ est vide');
      console.log(formData);
      console.log(mdp2);
    } else {
      if (isValidEmail(formData.email)) {
        if (formData.mdp === mdp2) {
          console.log(formData);
          instance.post('admin/create', formData)
            .then(response => {
              console.log('Enregistrement réussi :', response.data);
              handleClick()
              fetchAdmin()
              // window.location.reload();
            })
            .catch(error => {
              console.error('Erreur lors de l\'enregistrement :', error);
            });
        } else {
          setError("Les mots de passe ne correspondent pas !")
        }
      } else {
        setError("Veuillez rentrer un format correct d'e-mail !");
      }
    }
  };
  
  const reset = () => {
    const intialiseForm = {
      admin: admin.email,
      id: "",
      nom: "",
      prenom: "",
      dteNaissance: "",
      mail: "",
      updated_at: "",
      updated_by: "",
      mdp: "",
      telephone: "",
      role: "Super administrateur",
      status: "Actif",
    };
    setMdp2("")

    setFormData(intialiseForm)
  }

  const update = (url) => { 
    instance.put(url, formDataM)
        .then(response => {
          console.log('Données mises à jour avec succès:', response.data);
          setOpen1(true)
          fetchAdmin()
          // window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour des données:', error);
        });
  }
  
  const handleSubmitM = (event) => {
    event.preventDefault();
    if (isFormEmptyM) {
      setError('Veuillez remplir tous les champs SVP !');
      console.log('Au moins un champ est vide');
    } else {
      if (isValidEmail(formDataM.email)) {
        if (!formDataM.mdp) {
          update(`admin/update/${formDataM.id}`)
        } else {
          update(`admin/update-all/${formDataM.id}`)

        }
        
        console.log(formDataM);
      } else {
        setError("Veuillez rentrer un format correct d'e-mail !");
      }
    }
  };

  const bloquer = () => {
    const dataToUpdate = {
      status: "Bloqué",
      updated_at: new Date(),
      updated_by: admin.email,
    };

    instance.put(`admin/update/status/${formDataM.id}`, dataToUpdate)
      .then(response => {
        console.log('Champ mis à jour avec succès:', response.data);
        fetchAdmin()
        setOpen2(true)
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

    instance.put(`admin/update/status/${formDataM.id}`, dataToUpdate)
      .then(response => {
        console.log('Champ mis à jour avec succès:', response.data);
        fetchAdmin()
        setOpen3(true)
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

  const style = {
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <>
    {/* <button class="bouton-transition">Survolez-moi</button> */}
      {/* <MailProgrammer apprenantId={3} /> */}
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <ModalAjout
              handleSubmit={handleSubmit}
              titre="Ajouter un administrateur"
              icon={<MdPersonAddAlt size={23} style={{ marginRight: 10, marginBottom: 3 }} />} >
            <form>
            <div className="mb-3">
                <input type="hidden" value={formData.admin} name="admin" className="form-control" id="nom" placeholder="" />
                <label htmlFor="nom" className="form-label fw-bolder">Nom</label>
                <input type="text" value={formData.nom} name="nom" onChange={handleChange} className="form-control" id="nom" placeholder="" />
                {/* {error && <p className="error-message">{error}</p>} */}
            </div>
            <div className="mb-3">
                <label htmlFor="prenom" className="form-label fw-bolder">Prenom</label>
                <input type="text" value={formData.prenom} name='prenom' onChange={handleChange} className="form-control" id="prenom" placeholder="" />
                  {/* {error && <p className="error-message">{error}</p>} */}
                </div>
                <div className="mb-3">
                <label htmlFor="dteN" className="form-label fw-bolder">Date de Naissance</label>
                  <input type="date" value={formData.dteNaissance} name="dteNaissance" onChange={handleChange} className="form-control" id="dteN" placeholder="" />
                {/* {error && <p className="error-message">{error}</p>} */}
            </div>
            <div className="mb-3">
                <label htmlFor="mail" className="form-label fw-bolder">Adresse e-mail</label>
                  <input type="email" value={formData.email} name="email" onChange={handleChange} className="form-control" id="mail" placeholder="" />
                {/* {error && <p className="error-message">{error}</p>} */}
            </div>
            <label htmlFor="mdp" className="form-label fw-bolder">Mot de passe</label>
            <div className="input-group mb-3">
              <input type={vue} value={formData.mdp} name="mdp" onChange={handleChange} className="form-control" id="mdp" aria-describedby="button-addon1" />
                  {vue === "password" ? <button className="btn btn-outline-secondary" onClick={() => setVue('text')} type="button" id="button-addon1"><BsEyeFill /> </button> : 
              <button className="btn btn-outline-secondary" onClick={() => setVue('password')} type="button" id="button-addon1"> <BsEyeSlashFill /> </button>}
            </div>
            <label htmlFor="mdp2" className="form-label fw-bolder">Confirmation de mot de passe</label>
            <div className="input-group mb-3">
              <input type={vue2} value={mdp2} name="mdp2"  onChange={handleChangeMdp2} className="form-control" id="mdp2" aria-describedby="button-addon2" />
                  {vue2 === "password" ? <button className="btn btn-outline-secondary" onClick={() => setVue2('text')} type="button" id="button-addon2"><BsEyeFill /> </button> : 
              <button className="btn btn-outline-secondary" onClick={() => setVue2('password')} type="button" id="button-addon2"> <BsEyeSlashFill /> </button>}
            </div>
            <div className="mb-3">
                <label htmlFor="telephone" className="form-label fw-bolder">Telephone</label>
                <input type="text" value={formData.telephone} name="telephone" onChange={handleChange} className="form-control" id="telephone"/>
                {/* {error && <p className="error-message">{error}</p>} */}
            </div>
            <div className="mb-3">
                  <label htmlFor="role" className="form-label fw-bolder">Rôle</label>
                  <Form.Select aria-label="Default select example" id="role" value={formData.role} name="role" onChange={handleChange}>
                    <option value="Super Administrateur">Super Administrateur</option>
                    <option value="Administrateur">Administrateur</option>
                  </Form.Select>
                  {/* {error && <p className="error-message">{error}</p>} */}
            </div>
            <div className="mb-3">
                  <label htmlFor="status" className="form-label fw-bolder">Status</label>
                  <Form.Select aria-label="Default select example" id="status" value={formData.status} name="status" onChange={handleChange}>
                    <option value="Actif">Actif</option>
                    <option value="Bloqué">Bloqué</option>
                  </Form.Select>
                  {formData.status}
                  {/* {error && <p className="error-message">{error}</p>} */}
            </div>
                {error && (
                <>
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <TiDelete size={25} color='red' />
                    <div style={{marginLeft: 15}}>
                      {error}
                    </div>
                  </div>
                </>
                  )}
          </form>
            </ModalAjout>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="containeur" style={{ marginTop: 40, marginBottom: 20 }}>
              <Table
                nomFichier='ListeAdmins.xlsx'
                onChangeChiffre={handleChangeChiffre}
                chiffre={chiffre}
                item={admins}
                items={label}
                titre="Liste des Administrateurs"
                sousTitre="Liste des Administrateurs du back office"
                nom="Aucun administrateur enregistré"
                entite={`admin`}
                setAdmins={setTableau}
                setApprenants={setTableau}
                apprenants={admins}
              >
                {currentItems.map((admin, index) => {
                    return (
                      <tr key={index}>
                        {/* <th scope="row">{admin.id}</th> */}
                        <td className='align-middle'>{admin.nom}</td>
                        <td className='align-middle'>{admin.prenom}</td>
                        {/* <td className='align-middle'>{moment(admin.dteNaissance).format("DD MMMM YYYY")}</td> */}
                        <td className='align-middle'>{admin.email}</td>
                        {/* <td className='align-middle'>{admin.mdp}</td> */}
                        <td className='align-middle'>{admin.telephone}</td>
                        <td className='align-middle'>{admin.role}</td>
                        <td className='align-middle'>
                        {admin.status === "Actif" ? <Status titre={admin.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={admin.status} bgColor="linear-gradient(to right, #ED213A, #93291E)" />}
                        </td>
                        <td className='align-middle'>
                          <ActionButton
                            del={true}
                            style={style}
                            list={list}
                            key={admin.id}
                            reset={reset}
                            handleChangeM={handleChangeM}
                            handleSubmit={handleSubmitM}
                            formDataM={formDataM}
                            item={admin}
                            setStatut={admin.status === "Actif" ? bloquer : debloquer}
                            icon={admin.status === "Actif" ? [<BsPersonFillSlash size={18} />] : <BsFillPersonPlusFill size={18} />}
                            message={admin.status === "Actif" ? `Êtes-vous sûr(e) de vouloir bloquer ${admin.prenom} ${admin.nom} ?` : `Êtes-vous sûr(e) de vouloir débloquer ${admin.prenom} ${admin.nom} ?`}
                            id={admin.id}
                            titre={`Modifier l'administrateur ${admin.prenom} ${admin.nom}`}
                          >
                            <form method='post' key={admin.id}>
                              <div className="mb-3">
                                <label htmlFor="nom" className="form-label fw-bolder">Nom</label>
                                <input type="text" value={formDataM.nom} name="nom" onChange={handleChangeM} className="form-control" id="nom" placeholder="" />
                                {/* {error && <p className="error-message">{error}</p>} */}
                              </div>
                              <div className="mb-3">
                                <label htmlFor="prenom" className="form-label fw-bolder">Prenom</label>
                                <input type="text" value={formDataM.prenom} name="prenom" onChange={handleChangeM} className="form-control" id="prenom" placeholder="" />
                                {/* {error && <p className="error-message">{error}</p>} */}
                              </div>
                              <div className="mb-3">
                                <label htmlFor="dteN" className="form-label fw-bolder">Date de Naissance</label>
                                <input type="date" value={formDataM.dteNaissance} name="dteNaissance" onChange={handleChangeM} className="form-control" id="dteN" placeholder="" />
                                {/* {error && <p className="error-message">{error}</p>} */}
                              </div>
                              <div className="mb-3">
                                <label htmlFor="mali" className="form-label fw-bolder">Adresse e-mail</label>
                                <input type="email" value={formDataM.email} name="email" onChange={handleChangeM} className="form-control" id="mali" placeholder="" />
                                {/* {error && <p className="error-message">{error}</p>} */}
                              </div>
                              <label htmlFor="mdp" className="form-label fw-bolder">Mot de passe</label>
                              <div className="input-group mb-3">
                                <input type={vue} value={formDataM.mdp} name="mdp" onChange={handleChangeM} className="form-control" id="mdp" aria-describedby="button-addon2" />
                                    {vue === "password" ? <button className="btn btn-outline-secondary" onClick={() => setVue('text')} type="button" id="button-addon2"><BsEyeFill /> </button> : 
                                <button className="btn btn-outline-secondary" onClick={() => setVue('password')} type="button" id="button-addon2"> <BsEyeSlashFill /> </button>}
                              </div>
                              <div className="mb-3">
                                <label htmlFor="telephone" className="form-label fw-bolder">Telephone</label>
                                <input type="text" value={formDataM.telephone} name="telephone" onChange={handleChangeM} className="form-control" id="telephone"/>
                                {/* {error && <p className="error-message">{error}</p>} */}
                              </div>
                              <div className="mb-3">
                                <label htmlFor="role" className="form-label fw-bolder">Rôle</label>
                                <Form.Select aria-label="Default select example" id="role" value={formDataM.role} name="role" onChange={handleChangeM}>
                                  <option value="Super Administrateur">Super Administrateur</option>
                                  <option value="Administrateur">Administrateur</option>
                                </Form.Select>
                                {/* {error && <p className="error-message">{error}</p>} */}
                            </div>
                              <div className="mb-3">
                                <label htmlFor="status" className="form-label fw-bolder">Status</label>
                                <Form.Select aria-label="Default select example" id="status" value={formDataM.status} name="status" onChange={handleChangeM}>
                                  <option value="Actif">Actif</option>
                                  <option value="Bloqué">Bloqué</option>
                                </Form.Select>
                                {/* {error && <p className="error-message">{error}</p>} */}
                              </div>
                              {error ? (
                                <>
                                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <TiDelete size={25} color='red' />
                                    <div style={{marginLeft: 15}}>
                                      {error}
                                    </div>
                                  </div>
                                </>
                                  ) : null}
                            </form>
                          </ActionButton>
                        </td>
                      </tr>
                    )
                  })
                }
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
      <CustomizedSnackbars status={`success`} open={open} handleClose={handleClose} text='Administrateur créer avec succès !' />
      <CustomizedSnackbars status={`success`} open={open1} handleClose={handleClose} text='Administrateur modifié avec succès !' />
      <CustomizedSnackbars status={`success`} open={open2} handleClose={handleClose} text='Administrateur bloqué avec succès !' />
      <CustomizedSnackbars status={`success`} open={open3} handleClose={handleClose} text='Administrateur débloqué avec succès !' />
    </>
  )
}

export default Administrateur
