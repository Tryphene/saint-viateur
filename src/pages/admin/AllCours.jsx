import React, { useContext, useEffect, useState } from 'react'
import paysage from "../../img/paysage.jpg"
import { instance } from '../../axios'
import { useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';


const AllCours = () => {
    const { id } = useParams();
    const { admin } = useContext(AdminContext)
    const [coursTerminé, setCoursTerminé] = useState([])

    useEffect(() => {
        instance.get(`cours/cours-is-actif-apprenant/${id}`, {
            params: {
                isActif: true,
                status: "Terminé"
            }
        })
            .then(response => {
                setCoursTerminé(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });

    }, [coursTerminé, id])


    // instance.get(`cours/cours-is-actif-apprenant/${id}`)
    return (
        <>
          <div className=" d-flex justify-content-center align-items-center" style={{backgroundColor: "#B60520", backgroundImage: `url(${paysage})`, borderRadius: 10,  backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', width: '100%', height: 250 }}>
            {/* <div className="mt-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#B60520", color: "white", width: '100%', height: 200, borderRadius: 10 }}> */}
              <div className="" style={{ fontSize: 30, fontWeight: 600 }}>
                  Mes cours
                </div>
            </div>
        </>
    )
}

export default AllCours
