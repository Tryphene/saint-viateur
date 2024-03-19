import React, { useContext } from 'react'
import { ApprenantContext } from '../../context/ApprenantContext'
import FormMulti from '../../components/FormMulti'

const ChoixFormation = () => {
    const { apprenant } = useContext(ApprenantContext)
    
  return (
      <>
          {/* <div className='conteneur-ins' style={{}}>
              <div style={{ margin: "auto" }}>
                  <div className='titre-conteneur pt-3 px-5'>
                      <p className='text-center fw-bolder text-gradient' >FORMULAIRE D'INSCRIPTION</p>
                  </div>
              </div>

              <div class="d-flex justify-content-around">
                    <p style={{ color: "#B60520" }} className='fw-bolder'>
                        <Link to={"/conservatoire-saint-viateur/formulaire-inscription"} style={{textDecoration: "none"}}>
                            <FiChevronsLeft className='ms-3' size={15} /> Précédent
                        </Link>
                    </p>
                    <p></p>
                </div>
          </div> */}
          <div className="contenuu">
              <h1 className="text-center fs-4">Formulaire de souscription</h1>
              <div className="cont" style={{  }}>
                  {/* {paiement ? <FormPaiement /> : 
                      <CoursApprenant apprenant={apprenant} key={1} style={{transition: 'left  4s ease-in'}} />
                  }
                  {paiement ? (
                      <div className="mt-5">
                          <p style={{ color: "#B60520" }} onClick={() => { setPaiement(false) }} className='fw-bolder'>
                          <Link style={{textDecoration: "none"}}>
                              <FiChevronsLeft className='ms-3' size={15} /> Précédent
                          </Link>
                      </p>
                          <p></p>
                      </div>
                  ) : !ok ? <Button style={{cursor: 'not-allowed'}} variant="primary" size="md" disabled>Effectuer le paiement</Button>
                      : <button className='rounded-2' onClick={() => { setPaiement(true) }} >Effectuer le paiement</button>} */}
                  {/* {paiement ?  : ''} */}
                  <FormMulti apprenant={apprenant} proff={false} />
              </div>
          </div>
      </>
  )
}

export default ChoixFormation
