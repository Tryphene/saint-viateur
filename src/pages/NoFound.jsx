import React from 'react';
import "../styles/NoFound.css"
import erreur from "../img/erreur.png"
import erreur2 from "../img/404.jpg"
import { Link } from 'react-router-dom';


const NoFound = () => {
    return (
        <>
            <div className="body p-3" style={{ backgroundColor: "#fff" }}>
                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                    <div className="no" style={{}}>
                        <center>
                            <p style={{fontSize: 22, fontWeight: 600}}>Oups ! Pourquoi êtes-vous ici ?</p>
                            <p className="text-muted" style={{ fontSize: 15 }}>
                                Nous sommes désolés pour la gêne occasionnée. Il semble que vous essayez d'accéder à une page qui a été supprimée
                                ou qui n'a jamais existé.
                            </p>
                            <div className="my-3">
                                <Link to="/" className='px-3' style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", backgroundColor: "#B60520", borderRadius: 50, textDecoration: "none", padding: 10, color: "white" }}>Retour à la page d'accueil</Link>
                            </div>
                            <div className="mt-3">
                                <img className="iimmg" src={erreur2} width={700} alt="" />
                            </div>
                        </center>
                    </div>
                    {/* <div className="error-wrapper">
                        <h1 className="error-title">
                            Oups...
                        </h1>
                        <img className="iimmg" src={erreur} alt="" />
                        <h2 className="error-subtitle">
                            Il semblerait que la page que vous cherchez n’existe pas
                        </h2>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default NoFound
