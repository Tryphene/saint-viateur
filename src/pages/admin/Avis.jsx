import React, { useEffect, useState } from 'react'
import Status from '../../components/Status'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import { instance } from '../../axios';
import { Link } from 'react-router-dom';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';
import Table from '../../components/Table';
import { MdAdd, MdBlock } from 'react-icons/md';
import Tooltipp from '../../components/Tooltipp';
import { GrAdd } from 'react-icons/gr';
import ActionButton from '../../components/ActionButton';
import { Add } from '@mui/icons-material';
import { ImCross } from 'react-icons/im';
import { PiCheckFatFill } from 'react-icons/pi';

const Avis = () => {
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    
    const label = [
        "Nom",
        "Prenom(s)",
        "Commentaire",
        "Note",
        "Status",
        "Action",
      ];

  const handleClick = () => {
    // setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
    setOpen3(false);
  };

  const [avis, setAvis] = useState([]);
  const [tableau, setTableau] = useState([]);

  const fetchAvis = () => {
    instance.get('avis/readAll')
      .then(response => {
        setAvis(response.data);
        console.log(response.data);
        // setTableau(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  };

useEffect(() => {
  fetchAvis();
}, []);

useEffect(() => {
  setTableau([...avis]);
}, [avis]);
    const bloquer = (id, status) => {
        const dataToUpdate = {
          status
        };
    
        instance.put(`avis/update/status/${id}`, dataToUpdate)
          .then(response => {
            console.log('Champ mis à jour avec succès:', response.data);
              fetchAvis()
              setOpen2(true)
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour du champ:', error);
          });
    };
    
    const debloquer = (id, status) => {
        const dataToUpdate = {
          status
        };
    
        instance.put(`avis/update/status/${id}`, dataToUpdate)
          .then(response => {
            console.log('Champ mis à jour avec succès:', response.data);
              fetchAvis()
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
        <div>
            <Row>
                <Col>
                    <div className="containeur" style={{ marginTop: 40, marginBottom: 20 }}>
                        <Table
                            nomFichier='ListeAvis.xlsx'
                            onChangeChiffre={handleChangeChiffre}
                            chiffre={chiffre}
                            item={avis}
                            items={label}
                            titre="Liste des Avis"
                            sousTitre="Liste des Avis publié sur le site du conservatoire"
                            nom="Aucun avis enregistré"
                            entite={`avis`}
                            setAdmins={setTableau}
                            setApprenants={setTableau}
                            apprenants={avis}
                        >
                            {currentItems.map((avi, index) => {
                                return (
                                    <tr key={index}>
                                        {/* <th scope="row">{avi.id}</th> */}
                                        <td className='align-middle'>{avi.nom}</td>
                                        <td className='align-middle'>{avi.prenom}</td>
                                        <td className='align-middle'>{avi.commentaire}</td>
                                        <td className='align-middle'>{avi.note}</td>
                                        <td className='align-middle'>
                                            {avi.status === true ?
                                                (
                                                    <Tooltipp titre={'Approuver'}>
                                                        <div className="">
                                                            <PiCheckFatFill color='green' size={23} />
                                                        </div>
                                                    </Tooltipp>
                                                )
                                                :
                                                (
                                                    <Tooltipp titre={'Non Approuver'}>
                                                        <div className="">
                                                            <ImCross color='red' size={21} />
                                                        </div>
                                                    </Tooltipp>
                                                )}
                                        </td>
                                        <td className='align-middle'>
                                            {avi.status === true ?
                                                <>
                                                    <Tooltipp titre={'Désapprouver'}>
                                                        <button style={{ marginBottom: 2, marginTop: 2 }} className='icon-button d-flex justify-content-center align-items-center bg-danger rounded-2' onClick={() => debloquer(avi.id, false)}><MdBlock size={18} /></button>
                                                    </Tooltipp>
                                                </>
                                                :
                                                <Tooltipp titre={'Approuver'}>
                                                    <button style={{ marginBottom: 2, marginTop: 2 }} className='icon-button d-flex justify-content-center align-items-center bg-success rounded-2' onClick={() => bloquer(avi.id, true)}><MdAdd color='white' size={18} /></button>
                                                </Tooltipp>
                                            }
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
                                    <li className={currentPage === totalPage ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => { setCurrentPage(currentPage + 1) }}>Suivant</Link></li>
                                </ul>
                            </nav>
                        </div>}
                    </div>
                </Col>
            </Row>
            <CustomizedSnackbars status={`success`} open={open2} handleClose={handleClose} text='Avis approuvé avec succès !' />
            <CustomizedSnackbars status={`success`} open={open3} handleClose={handleClose} text='Avis approuvé avec succès !' />
        </div>
    )
}

export default Avis
