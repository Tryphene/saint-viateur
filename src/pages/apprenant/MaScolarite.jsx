import React, { useContext, useEffect, useState } from 'react'
import { instance } from '../../axios';
import { ApprenantContext } from '../../context/ApprenantContext';
// import { ProgressBar } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import fraisScolarite from '../../img/fraisScolarite.png'
// import { Col, Row } from 'react-bootstrap';
import Tooltipp from '../../components/Tooltipp';
// import { BiSolidBook } from 'react-icons/bi';
// import { BsCalendarDateFill } from 'react-icons/bs';
// import { GiTeacher } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ProgressBarr from '../../components/ProgressBar';
import deadline from '../../img/deadline.png'

const MaScolarite = () => {
    const { apprenant } = useContext(ApprenantContext);

    const [loading, setLoading] = useState(true)
    const [totalMontantCours, setTotalMontantCours] = useState('')
    const [totalMontantPaiement, setTotalMontantPaiement] = useState('')
    const [montantCours, setMontantCours] = useState('')
    const [montantPaiement, setMontantPaiement] = useState('')
    const [pourcentage, setPourcentage] = useState('')
    const [pourcentageCours, setPourcentageCours] = useState({})
    const [cours, setCours] = useState([])
    
    const [montantPaiements, setMontantPaiements] = useState({});

    const fetchData = (url, set, item) => {
        instance.get(url)
            .then(response => {
                set(response.data);
                console.log(response.data);
                if (item) {
                    setMontantPaiements((prevResults) => ({
                        ...prevResults,
                        [item.id]: response.data,
                    }));

                    // setTimeout(() => {
                        setPourcentageCours((prevResults) => ({
                            ...prevResults,
                            [item.id]: ((response.data / item.montant) * 100).toFixed(0),
                        }));
                    //   }, 2000);

                }
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des données :', error);
              setLoading(false)
          });
    };
    
    
    useEffect(() => {
        const fetchDataCoursActif = (url, set, item) => {
            instance.get(url, {
                params: {
                    isActif: true
                }
            })
                .then(response => {
                    set(response.data);
                    console.log(response.data);
                    
              })
              .catch(error => {
                  console.error('Erreur lors de la récupération des données :', error);
                  setLoading(false)
              });
          };
        fetchData(`paiement/count-montant-by-apprenant/${apprenant.id}`, setTotalMontantPaiement, null)
        fetchDataCoursActif(`cours/somme-montant-by-apprenant-actif/${apprenant.id}`, setTotalMontantCours)
        cours.forEach((item) => {
            fetchData(`paiement/count-montant-by-apprenant-cours/${apprenant.id}/${item.id}`, setMontantPaiement, item)
            fetchDataCoursActif(`cours/somme-montant-by-apprenant-cours/${apprenant.id}/${item.id}`, setMontantCours)
            
         })
    }, [apprenant.id, cours])

    useEffect(() => {
        const fetchCours = () => {
            instance.get(`cours/read-cours-apprenant-actif/${apprenant.id}`, {
                params: {
                    isActif: true,
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

    }, [apprenant.id])
    
    useEffect(() => { 
        // setPourcentage(((scolariteAcompte / scolarite) * 100).toFixed(0))
            setPourcentage(((totalMontantPaiement / totalMontantCours) * 100).toFixed(0))
    }, [totalMontantCours, totalMontantPaiement, apprenant])

    const cour = {}

    const list = (item) => {
        cour.id = item.id
        cour.dateDebutCours = item.dateDebutCours
        cour.dateFinCours = item.dateFinCours
        cour.montant = item.montant
        cour.nomCours = item.nomCours
        cour.echeancierUsed = item.echeancierUsed
    
        localStorage.setItem('cours', JSON.stringify(cour))
    }


    return (
        <>
        {/* <div className="containeur p-4"> */}
        {/* <div className="px-4 py-3 rounded-3 mb-4" style={{backgroundColor: '#305372', boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)"}}> */}
        <div className="px-4 py-3 rounded-3 mb-4" style={{backgroundColor: '#305372', border: "1px solid #E5E5E5"}}>
                {totalMontantCours !== totalMontantPaiement  ?
                    (
                        <>
                            <div className="d-flex mb-3">
                                <img src={fraisScolarite} width={90} alt="" />
                                <div className="ms-3 pt-2">
                                    <p className='' style={{ color: 'white', fontSize: 18, letterSpacing: 1, fontweight: 400 }}>Suivi de paiement de la scolarité</p>
                                    <p className="fw-bolder" style={{ fontSize: 21, color: 'white', letterSpacing: 2 }}>
                                        {totalMontantCours - totalMontantPaiement} FCFA de la scolarité à payé
                                    </p>
                                </div>
                            </div>
                            <center>
                                <ProgressBar animated now={pourcentage} label={`${pourcentage}%`} style={{backgroundColor: 'gray'}} />
                            </center>
                        </>
                
                    )
                    :
                    (
                        <>
                            <div className="d-flex mb-3">
                                <img src={fraisScolarite} width={90} alt="" />
                                <div className="ms-3 pt-2">
                                    <p className='' style={{ color: 'white', fontSize: 18, letterSpacing: 1, fontweight: 400 }}>Suivi de paiement global de la scolarité</p>
                                    <p className='ms-2 fw-bolder' style={{ color: 'white', fontSize: 21, letterSpacing: 2 }}>Vous êtes à jour sur le paiement de votre scolarité</p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            
            <div className="mt-5 rounded-4 p-3" style={{ background: "white", border: "1px solid #E5E5E5" }}>
                <div className="d-flex justify-content-between" style={{ alignItems: "center", justifyItems: "center" }}>
                    <div className="mb-4">
                        <p className="my-0 py-0 fw-semibold" style={{ fontSize: 22, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Suivi du paiement de la scolarité de mes cours</p>
                        <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Détail des paiements de chacun de mes cours</p>
                    </div>
                </div>
                {cours.length > 0 ?
                    (
                        <table className="table rounded-2 table-striped">
                            {/* <thead className='table-primary'> */}
                            <thead className=''>
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">Cours</th>
                                    <th scope="col">Date Début</th>
                                    <th scope="col">Date Fin</th>
                                    <th scope="col">Forfait</th>
                                    <th scope="col">Montant</th>
                                    <th scope="col">Montant Payé</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cours.length > 0 && cours.map((cour, i) => {
                                    return (
                                        <>
                                            <tr key={i}>
                                                <td className='align-middle'>{cour.nomCours}</td>
                                                <td className='align-middle'>{moment(cour.dateDebutCours).format('DD MMMM YYYY')}</td>
                                                <td className='align-middle'>{moment(cour.dateFinCours).format('DD MMMM YYYY')}</td>
                                                <td className='align-middle'>{cour.forfait}</td>
                                                <td className='align-middle'>{cour.montant} FCFA</td>
                                                <td className='align-middle'>{montantPaiements[cour.id] && montantPaiements[cour.id]} FCFA</td>
                                                {/* <td className='align-middle'>{pourcentageCours[cour.id] && `${pourcentageCours[cour.id]}%`}</td> */}
                                                <td className='align-middle'><ProgressBarr titre={pourcentageCours[cour.id] && `${parseInt(pourcentageCours[cour.id])}%`} width={pourcentageCours[cour.id] && `${parseInt(pourcentageCours[cour.id])}%`} bgColor={pourcentageCours[cour.id] <= 35 ? `linear-gradient(to right, #ED213A, #93291E)` : pourcentageCours[cour.id] <= 65 ? `linear-gradient(to right, #FFCC45, #FF9554)` : `linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)`} /></td>
                                                <td>
                                                    {/* {cour.echeancierUsed && ( */}
                                                    <Tooltipp titre='Paiement'>
                                                        <Link className="" onClick={() => list(cour)} to={`/apprenant/ma-scolarite/echeancier/${cour.id}`} style={{ textDecoration: 'none', marginTop: 2 }}>
                                                            {/* <button style={{ backgroundColor: 'white' }}> */}
                                                            <img src={deadline} width={29} className='' alt="" />
                                                            {/* </button> */}
                                                        </Link>
                                                    </Tooltipp>
                                                    {/* )} */}
                                                </td>
                                            </tr>
                                            {/* d-flex justify-content-center align-items-center */}
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                    :
                    (
                        <p className='ms-3' style={{fontWeight: 300}}>Aucun cours pour le moment</p>
                    )
                }         
            </div>
        </>
  )
}

export default MaScolarite
