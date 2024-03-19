import { useContext, useEffect, useState } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsPersonGear, BsPersonFillGear } from 'react-icons/bs';
import { RiDashboardFill, RiDashboardLine, RiBook3Fill, RiBook3Line } from 'react-icons/ri';
import { PiChalkboardTeacherFill, PiChalkboardTeacher } from 'react-icons/pi';
import { IoPeopleSharp, IoPeopleOutline } from 'react-icons/io5';
import { SlPeople } from 'react-icons/sl';
import "../styles/Sidebar.css"
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import Logo from "../img/logo.png"
import { BiLogOut } from 'react-icons/bi';
import Nav from './Nav';
import { LiaBookSolid, LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { AdminContext } from '../context/AdminContext';
// import Nav from './Nav';
import axios from 'axios';
import avisB from "../img/avis-b.png"
import avis from "../img/avis.png"
// import dashboardB from "../img/dashboard-b.png"
// import dashboard from "../img/dashboard.png"
// import adminn from "../img/admin.png"
// import adminB from "../img/admin-b.png"
import patron from '../img/patron.png';
// import jwtService from '../RefresToken';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import jwtService from '../RefresTokenAdmin';

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


const Sidebar = () => {
  const { admin, setAdmin } = useContext(AdminContext)

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
   const history = useNavigate();


   const token = localStorage.getItem('tokken');

    const getAuthHeaders = () => {
        const token = localStorage.getItem('tokken');
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
                    setAdmin([])
                    history('/administration/login');
            });
        };
        
        fetchData();
    }, [history, setAdmin]);
   
   useEffect(() => {
    const fetchData = () => {
    axios.get('http://localhost:8081/admin/by-mail', {
        params: {
        email: email
        }
    })
        .then(response => {
            setAdmin(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false)
            setAdmin([])
            history('/administration/login');
        });
    };
    fetchData();
   }, [email, setAdmin, history]);
  
   let selectStorage = parseInt(localStorage.getItem("select"));
   let [select, setSelect] = useState(selectStorage);
  
   let links = [
    {
      title: "Tableau de bord",
      to: "/administration/",
      icon: select === 0 ? <RiDashboardFill /> : <RiDashboardLine />,
      size: 22,
    },
    {
      title: "Administrateur",
      to: "/administration/administrateur",
      icon: select === 1 ? <BsPersonFillGear /> : <BsPersonGear />,
      size: 23,
    },
    {
      title: "Apprenant",
      to: "/administration/apprenant",
      icon: select === 2 ? <IoPeopleSharp /> : <IoPeopleOutline />, 
      size: 22,
    },
    {
      title: "Cours",
      to: "/administration/cours",
      icon: select === 3 ? <RiBook3Fill /> : <RiBook3Line />,
      size: 22,
    },
    {
      title: "Catégorie Cours",
      to: "/administration/categorie-cours",
      icon: select === 4 ? <RiBook3Fill /> : <RiBook3Line />,
      size: 22,
    },
    {
      title: "Domaine Cours",
      to: "/administration/domaine-cours",
      icon: select === 5 ? <RiBook3Fill /> : <RiBook3Line />,
      size: 22,
    },
    {
      title: "Professeur",
      to: "/administration/professeur",
      icon: select === 6 ? <PiChalkboardTeacherFill /> : <PiChalkboardTeacher />,
      size: 22,
    },
    {
      title: "Paiement Scolarité",
      to: "/administration/paiement-scolarite",
      icon: <LiaChalkboardTeacherSolid />,
      size: 22,
    },
    {
      title: "Paiement Frais Inscription",
      to: "/administration/paiement-frais-inscription",
      icon: <LiaChalkboardTeacherSolid />,
      size: 22,
    },
    {
      title: "Avis",
      to: "/administration/avis",
      icon: select === 9 ? <img width={20} src={avisB} alt="" />  : <img width={20} src={avis} alt="" />,
      size: 23,
    },
];

  if (admin.role !== 'Super administrateur') {
    links = [
      {
        title: "Tableau de bord",
        to: "/administration/",
        icon: <LuLayoutDashboard />,
        size: 20,
      },
      {
        title: "Apprenant",
        to: "/administration/apprenant",
        icon: <SlPeople />,
        size: 20,
      },
      {
        title: "Cours",
        to: "/administration/cours",
        icon: <LiaBookSolid />,
        size: 20,
      },
      {
        title: "Catégorie Cours",
        to: "/administration/categorie-cours",
        icon: <LiaBookSolid />,
        size: 20,
      },
      {
        title: "Domaine Cours",
        to: "/administration/domaine-cours",
        icon: <LiaBookSolid />,
        size: 20,
      },
      {
        title: "Professeur",
        to: "/administration/professeur",
        icon: <LiaChalkboardTeacherSolid />,
        size: 20,
      },
      {
        title: "Paiement Scolarité",
        to: "/administration/paiement-scolarite",
        icon: <LiaChalkboardTeacherSolid />,
        size: 20,
      },
      {
        title: "Paiement Frais Inscription",
        to: "/administration/paiement-frais-inscription",
        icon: <LiaChalkboardTeacherSolid />,
        size: 20,
      },
      {
        title: "Avis",
        to: "/administration/avis",
        icon: select === 9 ? <img width={20} src={avisB} alt="" />  : <img width={20} src={avis} alt="" />,
        size: 23,
      },
];
  }
  
  
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

   if (!localStorage.getItem("select")) {
     localStorage.setItem("select", 0)
   }
   
   const deconnexion = () => {
    setAdmin([])
    localStorage.removeItem('tokken')
    localStorage.removeItem('apprenantInfo')
    history("/administration/login")
   }
   
   useEffect(() => {
    if (!localStorage.getItem('tokken')) {
        setAdmin([])
        history('/administration/login');
    }
}, [admin, history, setAdmin]);

   return (
     <>
       {token ? (
         <>
           <Nav items={links} setSelect={setSelect} select={select} deconnexion={deconnexion} />
           <div className='mb-5'>
             <div className="sidebar">
               {/* <Link to={"/"}> */}
               <div className="contain-logo">
                 {/* <img className="" width={70} alt='Logo' src={Logo} /> */}
                 <p className="p">ADMINISTRATION</p>
               </div>
               {/* <hr className="border border-secondary border-1 opacity-50"></hr> */}
               {/* </Link> */}
               {links.map((link, index) => {
                 return (
                   <Link to={link.to} onClick={(() => { setSelect(index); localStorage.setItem("select", index); })} className={select === index ? "my-2 sidebar-item active" : "my-2 sidebar-item"} key={index} style={{ fontSize: `${link.size}px`, }}>
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
                   <p className='fw-semibold my-0' style={{ fontSize: 30, color: "#464255" }}>
                     {getPageName() !== '' && !getPageName().includes('/') ? capitalize(getPageName())
                      : getPageName().includes('/') ? '' 
                      : 'Tableau de bord'}
                   </p>
                   <p className="my-0 text-muted" style={{ fontSize: 14 }}>
                     Salut {admin.prenom}! Bienvenue sur le back office du conservatoire saint viateur d'abidjan
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
                     <p className="my-0 fw-semibold" style={{ fontSize: 15 }}>{admin.prenom} {admin.nom}</p>
                     <p className="my-0 text-muted" style={{ fontSize: 12 }}>{admin.role}</p>
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

export default Sidebar
