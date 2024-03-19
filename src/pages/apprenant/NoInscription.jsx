import React, { useContext, useState } from 'react'
import "../../styles/NoFound.css"
import { AiOutlineRight } from 'react-icons/ai'
import { ApprenantContext } from '../../context/ApprenantContext'
import { Link } from 'react-router-dom/dist'

const NoInscription = () => {
    const { apprenant } = useContext(ApprenantContext)
    return (
        <>
            <div className="justify-content-center align-items-center my-5">
                <p className="text-center ss-titre">Bienvenue {apprenant.prenom},</p>
                <p className="text-center fw-semibold titres" style={{}} >
                    Accédez à une  une variété de cours, couvrant une multitude d'instruments musicaux, de genres de danse et bien d'autres.
                </p>
                <p className="text-center ss-titre">Les frais d'inscription sont de 10.000 FCFA/an.</p>
                <center>
                    <Link to={`/inscription/moyen-paiement`} >
                        <button className="but">
                            Terminer l'inscription <AiOutlineRight />
                        </button>
                    </Link>
                </center>
            </div>
        </>
    )
}

export default NoInscription
