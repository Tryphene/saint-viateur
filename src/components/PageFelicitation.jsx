import React from 'react'
import feli from '../img/feli2.png'
import '../styles/Sidebar.css'

const PageFelicitation = ({cours}) => {
  return (
      <div className='page-feli'>
          <center>
              <p className='feli' style={{ marginTop: 30, marginBottom: 10, fontSize: 30, fontWeight: 500 }}>Félicitation !</p>
              <p className='text-muted' style={{ marginBottom: 20, fontSize: 19, fontWeight: 400 }}>
                  La préinscription au cours de {cours} à été prise en compte
              </p>
              <div className="">
                  <img className='feli-img' src={feli} alt="" />
              </div>
              <p className='felis' style={{ marginTop: 20, marginBottom: 60, fontSize: 19, fontWeight: 400 }}>
                  Vous devez à présent vous rendre au conservatoire afin de payer le montant du cours pour son activation!
              </p>
          </center>
      </div>
  )
}

export default PageFelicitation
