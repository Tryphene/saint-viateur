import React, { useContext } from 'react'
import "../../styles/NoFound.css"
import { ApprenantContext } from '../../context/ApprenantContext'
import { Link } from 'react-router-dom/dist'
import cadenas from "../../img/cadenas.png"
import moovMoneyLogo from "../../img/moov-money-logo.png"
import mtnMoneyLogo from "../../img/mtn-money-logo.png"
import orangeMoneyLogo from "../../img/orange-money-logo.png"
import { AiOutlineRight } from 'react-icons/ai'

const MoyenPaiement = () => {
    const { apprenant } = useContext(ApprenantContext)
    return (
        <>
            <div className="justify-content-center align-items-center my-5">
                <center>
                    <img className="cadenas" src={cadenas} alt="" />
                    <p className="text-center ss-titre mt-4" style={{fontSize: 30, fontWeight: 600}}>
                        Choisissez comment payer
                    </p>
                    <p className="largeur">
                        Votre paiement est crypté et vous pouvez modifier votre mode de paiement à tout moment.
                    </p>
                    <h4 style={{ fontSize: 19, fontWeight: 600 }}> 
                        Sécurisé pour la tranquillité d'esprit. <br />
                        Annulez facilement en ligne.
                    </h4>
                    {/* <button className="py-2 px-4 my-4 bg-body rounded-2" style={{ border: "2px solid #ccc", color: "black", width: 500 }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-center align-items-center">
                                <p className="me-4 pt-3">Carte de credit ou de débit</p>
                                <img className="me-3" width={35} src={cadenas} alt="" />
                                <img className="me-3" width={35} src={cadenas} alt="" />
                                <img className="" width={35} src={cadenas} alt="" />
                            </div>
                            <AiOutlineRight size={23} />
                        </div>
                    </button>
                    <p>OU</p> */}
                    <button className="py-2 px-4 my-4 bg-body rounded-2 bouton-m" style={{ border: "2px solid #ccc", color: "black" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-center align-items-center">
                                <p className="me-4 pt-3">Mobile money</p>
                                <img className="me-3 logo-money" src={orangeMoneyLogo} alt="" />
                                <img className="me-3 logo-money" src={moovMoneyLogo} alt="" />
                                <img className="me-3 logo-money" src={mtnMoneyLogo} alt="" />
                                {/* <img className="me-3" width={35} src={cadenas} alt="" />
                                <img className="" width={35} src={cadenas} alt="" /> */}
                            </div>
                            <AiOutlineRight size={23} />
                        </div>
                    </button>
                </center>
            </div>

        </>
    )
}

export default MoyenPaiement
