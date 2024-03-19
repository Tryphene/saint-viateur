import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import jwtService from '../RefresToken';
import {ApprenantContext} from '../context/ApprenantContext'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "../styles/ApprenantNavbar.css"
import Logos from "../img/logo.png"
import { RiAccountPinCircleFill, RiAccountPinCircleLine } from 'react-icons/ri';
import { PiBookFill, PiBookLight } from 'react-icons/pi';
import { MdOutlineAccountBalance, MdAccountBalance } from 'react-icons/md';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-regular-svg-icons'
// import { faUser as user } from '@fortawesome/free-solid-svg-icons';
// import { PersonOutlined } from '@material-ui/icons';
import OffCanvas from './OffCanvas';
import { BiLogOut } from 'react-icons/bi';
import { Spinner } from 'react-bootstrap';
// import content from "../img/content.png";

const NavPaiement = () => {
    const [email, setEmail] = useState('');
    const [selectt, setSelectt] = useState(0);
    const [nbreCours, setNbreCours] = useState(0);
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    const { apprenant, setApprenant, cours, setCours } = useContext(ApprenantContext)

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
          axios.get('http://localhost:8081/api/auth/user', {headers: getAuthHeaders()})
              .then(response => {
                  setEmail(response.data.username);
                  setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                    setApprenant([])
                    history('/conservatoire-saint-viateur/login');
            });
        };
        
        fetchData();
    }, [history, setApprenant]);

    const deconnexion = () => {
        setApprenant([])
        localStorage.removeItem('token')
        history("/conservatoire-saint-viateur/login")
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setApprenant([])
            history('/conservatoire-saint-viateur/login');
        }
    }, [apprenant, history, setApprenant]);
    
    useEffect(() => {
        if (apprenant.scolarite === apprenant.scolaritePayé) {
            axios.put(`http://localhost:8081/apprenant/update/scolarite-acompte/${apprenant.id}`, {
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
    }, [apprenant.id, apprenant.scolarite, apprenant.scolaritePayé]);
    
    // useEffect(() => {
    //     if (apprenant.fraisInscription === 0) {
    //         history('/apprenant/accueil-paiement');
    //     }
    // }, [apprenant.fraisInscription, history]);

    useEffect(() => {
        // Vérifier périodiquement si le JWT doit être rafraîchi (toutes les 5 minutes ici)
        const interval = setInterval(() => {
          jwtService.refreshJwt();
        }, 600000); // 5 minutes (in milliseconds)
    
        // return () => {
        //   // Annuler le minuteur lors du démontage du composant
        //   clearInterval(interval);
        // };
    }, []);

    useEffect(() => {
        const fetchData = () => {
        axios.get('http://localhost:8081/apprenant/by-mail', {
            params: {
            mail: email
            }
        })
            .then(response => {
                setApprenant(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false)
                setApprenant([])
                history('/conservatoire-saint-viateur/login');
            });
        };
        fetchData();
    }, [email, setApprenant, history]);
    
    useEffect(() => {
        const fetchData = () => {
          axios.get(`http://localhost:8081/cours/cours/${apprenant.id}`)
          .then(response => {
            //   console.log(response.data);
              setCours(response.data);
              setNbreCours(response.data.length);
              setLoading(false);
          })
          .catch(error => {
              console.error('Erreur lors de l\'enregistrement :', error);
              setLoading(false);
          });
        };
        
        fetchData();
    }, [apprenant.id, setCours]);
    
    useEffect(() => {
        // console.log(cours);
        console.log(nbreCours);
    }, [cours, nbreCours])

    const token = localStorage.getItem('token');
    
    return (
        <>
            {token ? (
                <div className='corps'>
                    <header style={{ backgroundColor: "white" }}>
                <img src={Logos} width={150} alt="" />
                <div className="icone tooltip-link" onClick={deconnexion} titre="Déconnection"><BiLogOut size={25}/></div>
            </header>
            <div className="offcanva">
                <div className="d-flex justify-content-between navv py-2" style={{background: 'white'}}>
                    <OffCanvas />
                    <img src={Logos} width={120} alt="" />
                    <div className="icone tooltip-link" onClick={deconnexion} titre="Déconnection"><BiLogOut size={21}/></div>
                </div>
            </div>
            <div className="contentt">
                {loading ? <Spinner /> : <Outlet />}  
            </div>
        </div>
            ) : ''}
        </>
    )
}

export default NavPaiement
