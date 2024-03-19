import React, { useState, useEffect, useContext } from 'react'
import jwtService from '../RefresToken';
import {ApprenantContext} from '../context/ApprenantContext'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "../styles/ApprenantNavbar.css"
import Logos from "../img/logo.png"
import { RiAccountPinCircleFill, RiAccountPinCircleLine } from 'react-icons/ri';
import { PiBookFill, PiBookLight } from 'react-icons/pi';
import { MdOutlineAccountBalance, MdAccountBalance } from 'react-icons/md';
import OffCanvas from './OffCanvas';
import { BiLogOut } from 'react-icons/bi';
import moment from 'moment';
import { instance } from '../axios';
import Tooltipp from './Tooltipp';
import SimpleBackdrop from './Backdrop';
import { formatDateToYYYYMMDD } from '../date';

const ApprenantNavbar = () => {
    const [email, setEmail] = useState('');
    const [selectt, setSelectt] = useState(0);
    const [nbreCoursActif, setNbreCoursActif] = useState(0);
    const [nbreCoursNonActif, setNbreCoursNonActif] = useState(0);
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    const { apprenant, setApprenant, cours, setCours } = useContext(ApprenantContext)
    const [datePaiement, setDatePaiement] = useState('');
    const [dateEnvoieMail, setDateEnvoieMail] = useState('');
    const [echeance, setEcheance] = useState([]);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    if (apprenant.changeMdp === false) {
        history('/reset/mot-de-passe'); 
    }

    if (!localStorage.getItem('selectt')) {
        localStorage.setItem("selectt", selectt)
    }

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        if (token) {
          return { 'Authorization': 'Bearer ' + token };
        }
        return {};
    };
    
    useEffect(() => {
        const fetchData = () => {
          instance.get('api/auth/user', {headers: getAuthHeaders()})
              .then(response => {
                  setEmail(response.data.username);
                  setLoading(false)
                  setOpen(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                    setOpen(false)
                    setApprenant([])
                    history('/login');
            });
        };
        
        fetchData();
    }, [history, setApprenant]);

    const deconnexion = () => {
        setApprenant([])
        localStorage.removeItem('token')
        history("/login")
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setApprenant([])
            localStorage.removeItem('token')
            history('/login');
        }
    }, [apprenant, history, setApprenant]);
    
    useEffect(() => {
        if (apprenant.scolarite === apprenant.scolaritePayé && apprenant.id !== undefined) {
            instance.put(`apprenant/update/scolarite-acompte/${apprenant.id}`, {
                scolarite: 0,
                scolaritePayé: 0
            })
                .then(response => {
                    console.log('Données mises à jour avec succès:', response.data);
                })
                .catch(error => {
                  console.error('Erreur lors de la mise à jour des données:', error);
                });
        }
    }, [apprenant]);
    
    
    // useEffect(() => {
    //     if (apprenant.fraisInscription !== 15000) {
    //         history('/inscription/accueil-paiement');
    //         console.log(apprenant.fraisInscription, 15000);
    //         console.log(typeof(apprenant.fraisInscription), typeof(15000));
    //     }
    // }, [apprenant.fraisInscription, history, setApprenant]);

    useEffect(() => {
        // Vérifier périodiquement si le JWT doit être rafraîchi (toutes les 5 minutes ici)
        const interval = setInterval(() => {
          jwtService.refreshJwt();
        }, 300000); // 5 minutes (in milliseconds)
    
        return () => {
          // Annuler le minuteur lors du démontage du composant
          clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await instance.get('apprenant/by-mail', {
              params: {
                mail: email,
              },
            });
            setApprenant(response.data);
            setLoading(false)
            setOpen(false);
          } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
            setOpen(false);
            setApprenant([]);
            history('/login'); // Utilisez "push" au lieu de "history" pour rediriger l'utilisateur
          }
        };
    
        if (email) {
            fetchData();
        }
      }, [email, history, setApprenant]);
    
    useEffect(() => {
        const fetchDataCoursActif = async () => {
          try {
            //   const response = await instance.get(`cours/cours-is-actif-apprenant/${apprenant.id}`, {
                const response = await instance.get(`cours/read-cours-apprenant-actif/${apprenant.id}`, {
                    params: {
                        isActif: true,
                        // status: 'En cours',
                  }
              });
            setCours(response.data);
            setNbreCoursActif(response.data.length);
            console.log(response.data.length);
            setLoading(false)
            setOpen(false);
          } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
            setOpen(false);
          }
        };
        
        const fetchDataCoursNonActif = async () => {
          try {
            //   const response = await instance.get(`cours/cours-is-actif-apprenant/${apprenant.id}`, {
              const response = await instance.get(`cours/read-cours-apprenant-actif/${apprenant.id}`, {
                  params: {
                      isActif: false,
                }
            });
            setCours(response.data);
            setNbreCoursNonActif(response.data.length);
            console.log(response.data.length);
            setLoading(false)
            
          } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
            
          }
        };
    
        if (apprenant.id !== undefined) {
            fetchDataCoursActif();
            fetchDataCoursNonActif();
        }
    }, [apprenant, setCours]);
    
    //  ENVOIE DE MAIL

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await instance.get(`echeancier/read-dte-paiement-status-by-apprenant/${apprenant.id}`);
            setEcheance(response.data);
            setDatePaiement(response.data[0].datePaiement);
            console.log(response.data);
            console.log(response.data[0].datePaiement);
            setLoading(false)
            setOpen(false);
          } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
            setOpen(false);
          }
        };
        console.log(apprenant);
        
        if (apprenant.id !== undefined) {
            console.log(apprenant);
            fetchData();
        }
      }, [apprenant]);

    const token = localStorage.getItem('token')

    useEffect(() => {
        const generateAttendanceDates = (startDate) => {
            if (!startDate) return [];
            const dates = [];
            const startMoment = moment(startDate, 'YYYY-MM-DD');
        
            for (let i = 1; i < 3; i++) {
                const currentDate = startMoment.clone().subtract(i * 7, 'days');
                dates.push({
                    dateMarqueDePresence: currentDate.format('YYYY-MM-DD')
                });
            }
    
            setDateEnvoieMail(dates)
        };

        generateAttendanceDates(datePaiement) 
    }, [datePaiement]);
    
    let links = [
        {
          title: "Mon compte",
          to: "/apprenant/moncompte",
          icon: selectt === 1 ? <MdAccountBalance size={30} /> : <MdOutlineAccountBalance size={30} />,
          size: 20,
        },
        {
          title: "Choisir une Formation",
          to: "/apprenant/choix-formation",
          icon: selectt === 1 ? <PiBookFill size={29} /> : <PiBookLight size={29} />,
          size: 20,
        },
        {
          title: "Profil",
          to: "/apprenant/profil",
          icon: selectt === 2 ? <RiAccountPinCircleFill size={29} /> : <RiAccountPinCircleLine size={29} />,
          size: 20,
        },
    ];

    useEffect(() => {
        console.log(dateEnvoieMail);
     }, [dateEnvoieMail])
    
    useEffect(() => {
        if (echeance.length > 0) {
            const startMoment = moment(new Date(echeance[0].datePaiement));
            const currentDate = startMoment.clone().add(1, 'days');
    
            if (formatDateToYYYYMMDD(new Date()) === formatDateToYYYYMMDD(new Date(currentDate))) {
                instance.put(`apprenant/update/is-uptodate-echeancier/${apprenant.id}`, {
                    isUpToDateEcheancier: 0
                })
                    .then(response => {
                        console.log('Données mises à jour avec succès:', response.data);
                        // setApprenant([])
                        localStorage.removeItem('token')
                        history("/login")
                    })
                    .catch(error => {
                        console.error('Erreur lors de la mise à jour des données:', error);
                    });
                console.log('oui');
            } else {
                console.log('non');
            }
        }
    }, [echeance, apprenant, history]);
    
    return (
        <>
            {token ? (
                <div className='corps'>
                    <header style={{ backgroundColor: "white" }}>
                        <img src={Logos} width={150} alt="" />
                        {apprenant.abonnementExpiryDate < new Date() ? "" : (
                            <nav >
                                <ul className="nav__links mt-3">
                                    <li>
                                        <Tooltipp titre='Compte' >
                                            <div className="">
                                                <Link key={0}
                                                    onClick={(() => { setSelectt(0); localStorage.setItem("selectt", 0); })}
                                                    className={selectt === 0 ? " actives link " : " link "}
                                                    to={`/apprenant/moncompte`}
                                                    style={{ textDecoration: "none" }}
                                                    titre=''
                                                >
                                                    {selectt === 0 ? <MdAccountBalance size={30} /> : <MdOutlineAccountBalance size={30} />}
                                                </Link>
                                            </div>
                                        </Tooltipp>
                                    </li>
                                    {nbreCoursActif >= 2 || nbreCoursNonActif >= 2 ?
                                        // <Tooltipp titre="Vous avez déjà deux formations en cours ou en attente d'activation">
                                        //     <Link className='mx-5' titre="Vous avez déjà deux formations en cours ou en attente d'activation ">
                                        //     <div className="">
                                        //         <PiBookLight size={29} color='gray' disabled />
                                        //     </div>
                                        // </Link>
                                        // </Tooltipp>
                                        <li>
                                            <Tooltipp titre="Vous avez déjà deux formations en cours ou en attente d'activation" >
                                                <Link key={1}
                                                    style={{ textDecoration: "none" }}
                                                    titre="Vous avez déjà deux formations en cours ou en attente d'activation"
                                                    // className={"link"} 
                                                >
                                                    <PiBookLight size={29} />
                                                </Link>
                                            </Tooltipp>
                                        </li>
                                        : (
                                            <li>
                                                 <Tooltipp titre='Choisir une Formation' >
                                                    <Link key={1}
                                                        onClick={(() => { setSelectt(1); localStorage.setItem("selectt", 1); })} 
                                                        className={selectt === 1 ? " actives link" : " link"}
                                                        to={`/apprenant/choix-formation`}
                                                        style={{ textDecoration: "none" }}
                                                        titre="Choisir une Formation"
                                                    >
                                                        {selectt === 1 ? <PiBookFill size={29} /> : <PiBookLight size={29} />}
                                                    </Link>
                                                </Tooltipp>
                                            </li>
                                    )}
                                    <li>
                                        {/* tooltip-link */}
                                        <Tooltipp titre='Profil' >
                                            <Link key={2}
                                                onClick={(() => { setSelectt(2); localStorage.setItem("selectt", 2); })} 
                                                className={selectt === 2 ? " actives link" : " link"}
                                                to={`/apprenant/profil`} 
                                                style={{ textDecoration: "none", fontSize: 25 }}
                                                titre='Profil'
                                            >
                                                {selectt === 2 ? <RiAccountPinCircleFill size={29} /> : <RiAccountPinCircleLine size={29} />}
                                                {/* {selectt === 2 ? <FontAwesomeIcon icon={user} /> : <FontAwesomeIcon icon={faUser} size={29} />} */}
                                                {/* <PersonOutlined /> */}
                                            </Link>
                                        </Tooltipp>
                                    </li>
                                </ul>
                            </nav>
                        )}
                        <Tooltipp titre='Déconnection'>
                            <div className="icone" onClick={deconnexion} titre="Déconnection"><BiLogOut size={25} /></div>
                        </Tooltipp>
                    </header>
                    <div className="offcanva">
                        <div className="d-flex justify-content-between navv py-2" style={{ background: 'white' }}>
                            <OffCanvas selectt={selectt} setSelectt={setSelectt} items={links}/>
                            <Tooltipp titre='Déconnection'>
                                <div className="icone" onClick={deconnexion} titre="Déconnection"><BiLogOut size={21} /></div>
                            </Tooltipp>
                        </div>
                    </div>
                    <div className="contentt">
                        {/* <SimpleBackdrop handleClose={handleClose} open={open} /> */}
                        {loading ? <SimpleBackdrop handleClose={handleClose} open={open} /> : <Outlet />}  
                    </div>
                </div>
            ) : ''}
        </>
    )
}

export default ApprenantNavbar
