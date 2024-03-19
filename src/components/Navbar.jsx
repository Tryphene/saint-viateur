import React, { useState } from 'react'
import "../styles/FormInscription.css"
import { Link, Outlet } from 'react-router-dom'
import { BsTelephone } from 'react-icons/bs'
import { BiLogoFacebook } from 'react-icons/bi'
import Logo from "../img/logo.png"
import Logoo from "../img/logoo.png"
import Footer from './Footer'
import OffCanvas from './OffCanvas'

const Navbar = () => {
    if (!localStorage.getItem("selecte")) {
        localStorage.setItem("selecte", 0)
      }
    let selectStorage = parseInt(localStorage.getItem("selecte"));
    let [select, setSelect] = useState(selectStorage);

    const [selectt, setSelectt] = useState(0);
    let links = [
        {
          title: "Accueil",
          to: "/",
          size: 20,
        },
        {
          title: "Galerie",
          to: "/galerie",
          size: 20,
        },
        {
          title: "Avis",
          to: "/formulaire-avis",
          size: 20,
        },
        {
          title: "Inscription",
          to: "/formulaire-inscription",
          size: 20,
        },
        {
          title: "Nous contacter",
          to: "/formulaire-contact",
          size: 20,
        },
    ];

    return (
        <>
            <div>
                <div className="bg-body navb" style={{borderBottom: "1px solid #EEEEEE"}} >
                    <div className="p-2" style={{ paddingLeft: 100, fontSize: "18px"}}>
                        <div className="items">
                            <div className="icones" ><BsTelephone color='#B60520' /></div>
                            <div className="sidebar-title" style={{fontSize: 13.5, fontWeight: 300, color: "grey"}}>Fixe : +225 22 27 49 99 22</div>
                        </div>
                    </div>
                    <div className="p-2" style={{ paddingLeft: 100, fontSize: "18px"}}>
                        <div className="items">
                            <div className="icones" ><BsTelephone color='#B60520' /></div>
                            <div className="sidebar-title" style={{fontSize: 13.5, fontWeight: 300, color: "grey"}}>Mobile : +225 07 00 15 63 09  / +225 07 57 06 25 38</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-evenly ms-auto p-2" style={{ paddingRight: 100 }}>
                        <div className="ms-2">
                            <Link to="https://www.facebook.com/conservatoiredemusiquesaintviateur/" target="_blank" style={{textDecoration: "none", color: "grey"}}>
                            <BiLogoFacebook />
                            </Link>
                        </div>
                        {/* <div className="ms-2">
                            <Link style={{textDecoration: "none", color: "grey"}}>
                            <BiLogoInstagramAlt />
                            </Link>
                        </div>
                        <div className="ms-2">
                            <Link style={{textDecoration: "none", color: "grey"}}>
                            <BiLogoLinkedin />
                            </Link>
                        </div> */}
                    </div>
                </div>
                <div className="navba" style={{justifyContent: "center", alignItems: "center", borderBottom: "1px solid #EEEEEE"}}>
                    <div className="me-auto py-1 px-2">
                        <img src={Logo} width={150} alt="" />
                    </div>
                    <div className="px-2" >
                        <Link style={{fontWeight: 400}} key={0} to="" onClick={(() => { setSelect(0); localStorage.setItem("selecte", 0); })}  className={`item fw-semibold ${select === 0 && "activ"}`}>Accueil</Link>
                    </div>
                    <div className="px-2" >
                        <Link style={{fontWeight: 400}} key={0} to="/galerie" onClick={(() => { setSelect(1); localStorage.setItem("selecte", 1); })}  className={`item fw-semibold ${select === 1 && "activ"}`}>Galerie</Link>
                    </div>
                    <div className="px-2" >
                        <Link style={{fontWeight: 400}} key={0} to="/formulaire-avis" onClick={(() => { setSelect(2); localStorage.setItem("selecte", 2); })}  className={`item fw-semibold ${select === 2 && "activ"}`}>Avis</Link>
                    </div>
                    <div className="px-2">
                        <Link style={{fontWeight: 400}} key={1} to="/formulaire-inscription" onClick={(() => { setSelect(3); localStorage.setItem("selecte", 3); })}  className={`item fw-semibold ${select === 3 && "activ"}`}>Inscription</Link>
                    </div>
                    <div className="px-2">
                        <Link className="btn-ins" to={`/formulaire-contact`} onClick={(() => { setSelect(4); localStorage.setItem("selecte", 4); })} style={{}}>Nous contacter</Link>
                    </div>
                    {/* <div className="p-2">
                        <Link key={2} to="/conservatoire-saint-viateur/login" onClick={(() => { setSelect(2); localStorage.setItem("selecte", 2); })}  className={`item fw-semibold ${select === 2 && "activ"}`}>Connexion</Link>
                    </div> */}
                </div>
                <div className="offcanva">
                    <div className="d-flex justify-content-between navv p-2" style={{ background: 'white', borderBottom: "1px solid #EEEEEE" }}>
                        <OffCanvas selectt={selectt} setSelectt={setSelectt} items={links} />
                        
                        <div className="">
                            <img src={Logoo} width={40} alt="" />
                        </div>
                        </div>
                    </div>
                <div className="bg-body">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Navbar
