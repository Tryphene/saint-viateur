import { useContext, useEffect, useState } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsPersonGear } from 'react-icons/bs';
import { SlPeople } from 'react-icons/sl';
import "../styles/Sidebar.css"
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import Logo from "../img/logo.png"
import { BiLogOut } from 'react-icons/bi';
import NavProf from './NavProf';
import { LiaBookSolid, LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { ProfesseurContext } from '../context/ProfesseurContext';
// import Nav from './Nav';
import axios from 'axios';
import patron from '../img/patron.png';
// import jwtService from '../RefresToken';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import jwtService from '../RefresTokenAdmin';
import { instance } from '../axios';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    top: 30,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const SidebarProf = () => {
  const { professeur, setProfesseur } = useContext(ProfesseurContext)

  const getPageName = () => {
      const pathname = window.location.pathname;
      const pageName = pathname.substring(1); // Exclut le premier caractère '/'
      return pageName;
    };
  
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [domaines, setDomaines] = useState([]);
    const history = useNavigate();


   const token = localStorage.getItem('tokkken');

    const getAuthHeaders = () => {
        const token = localStorage.getItem('tokkken');
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
                    setProfesseur([])
                    history('/espace-enseignant/login');
            });
        };
        
        fetchData();
    }, [history, setProfesseur]);
   
   useEffect(() => {
    const fetchData = () => {
    instance.get('professeur/by-mail', {
        params: {
        email: email
        }
    })
        .then(response => {
            setProfesseur(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
            setProfesseur([])
            history('/espace-enseignant/login');
        });
    };
    fetchData();
   }, [email, setProfesseur, history]);
   
    useEffect(() => {
    const fetchData = () => {
    instance.get(`/professeur/find-prof/${professeur.id}`)
        .then(response => {
            setDomaines(response.data[0].domaineCategories[0])
            console.log(response.data[0].domaineCategories[0])
            console.log(professeur.id)
            setLoading(false)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
        });
        };
        
        if (professeur.id !== undefined) {
            fetchData();
        }
   }, [professeur]);
  
   let links = [
    {
      title: "Accueil",
      to: "/espace-enseignant",
      icon: <LuLayoutDashboard />,
      size: 20,
    },
    {
      title: "Profil",
      to: "/espace-enseignant/profil",
      icon: <SlPeople />,
      size: 20,
    }
];
  
  useEffect(() => {
    // Vérifier périodiquement si le JWT doit être rafraîchi (toutes les 5 minutes ici)
    const interval = setInterval(() => {
      jwtService.refreshJwtProf();
    }, 300000); // 5 minutes (in milliseconds)

    return () => {
      // Annuler le minuteur lors du démontage du composant
      clearInterval(interval);
    };
}, []);

   if (!localStorage.getItem("active")) {
     localStorage.setItem("active", 0)
   }
     let activeStorage = parseInt(localStorage.getItem("active"));
   let [active, setActive] = useState(activeStorage);
   
   
   const deconnexion = () => {
    setProfesseur([])
    localStorage.removeItem('tokkken')
    localStorage.removeItem('apprenantInfo')
    history("/espace-enseignant/login")
   }
   
   useEffect(() => {
    if (!localStorage.getItem('tokkken')) {
        setProfesseur([])
        history('/espace-enseignant/login');
    }
}, [professeur, history, setProfesseur]);

   return (
     <>
       {token ? (
         <>
           <NavProf items={links} setSelect={setActive} select={active} deconnexion={deconnexion} />
           <div className='mb-5'>
             <div className="sidebar">
               {/* <Link to={"/"}> */}
               <div className="contain-logo">
                 {/* <img className="" width={70} alt='Logo' src={Logo} /> */}
                 <p className="p">ESPACE ENSEIGNANT</p>
               </div>
               {/* <hr className="border border-secondary border-1 opacity-50"></hr> */}
               {/* </Link> */}
               {links.map((link, index) => {
                 return (
                   <Link to={link.to} onClick={(() => { setActive(index); localStorage.setItem("active", index); })} className={active === index ? "my-2 sidebar-item active" : "my-2 sidebar-item"} key={index} style={{ fontSize: `${link.size}px`, }}>
                     <div className="sidebar-icon" >{link.icon}</div>
                     <div className="sidebar-title fw-semibold">{link.title}</div>
                   </Link>
                 )
               })}
               <div onClick={deconnexion} className="sidebar-item bas" style={{ color: "white", borderRadius: 0 }}> 
                 <div className="sidebar-icon" ><BiLogOut size={20} /></div>
                 <div className="sidebar-title fw-semibold">Déconnexion</div>
               </div>
             </div>
             <div className="haut-page" style={{ marginLeft: 280, marginRight: 30 }}>
               <div className="d-flex justify-content-between ">
                 <div className="">
                   {/* <p className='fw-semibold my-0' style={{ fontSize: 30, color: "#464255" }}>
                     {capitalize(getPageName())}
                   </p> */}
                   <p className="mt-3 text-muted" style={{ fontSize: 14 }}>
                     Salut {professeur.prenom}! Bienvenue sur l'espace enseignant du Conservatoire Saint Viateur d'Abidjan
                   </p>
                 </div>
                 <div className="d-flex">
                   <div className="rounded-5 my-0 ms-5 me-3" style={{ width: 50, backgroundColor: "#D7F5E7", height: 50, border: "1px solid #E2E5EA", position: "relative", alignItems: "center" }}>
                     <div className="d-flex justify-content-center pt-1" style={{ alignItems: 'center' }}>
                       {/* <img src={patron} width={40} alt="" />
                       <div className="p-2" style={{ position: "absolute", top: 39, backgroundColor: "#28C76F", borderRadius: "100%", right: 3, fontSize: 10, color: "white" }}></div> */}
                       <StyledBadge
                         overlap="circular"
                         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                         variant="dot"
                       >
                         <Avatar alt="Remy Sharp" src={patron} />
                       </StyledBadge>
                     </div>
                   </div>
                   <div className="">
                     <p className="my-0 fw-semibold" style={{ fontSize: 15 }}>{professeur.prenom} {professeur.nom}</p>
                     <p className="my-0 text-muted" style={{ fontSize: 12 }}> Enseignant de {domaines}</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="content">
               <Outlet />
             </div>
             {/* style={{ backgroundColor: "#f7f7ff"}} */}
           </div>
         </>
       ) : ""}
     </>
  )
}

export default SidebarProf
