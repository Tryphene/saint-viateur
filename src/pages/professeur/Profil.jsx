import React, { useContext} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ProfesseurContext } from '../../context/ProfesseurContext'
import user from "../../img/user.png";
import moment from 'moment';

const Profil = () => {
    const { professeur } = useContext(ProfesseurContext)

  return (
      <>
          <p className="fw-bolder pb-2" style={{ marginTop: 30, fontSize: 30, color: "black" }}>Informations Personnelles</p>
          <div className="rounded-3" style={{}}>
            <Container className='py-5' style={{  width: "100%",  paddingLeft: 150, paddingRight: 150 }}>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <p className='fw-bolder ms-1 pb-0 mb-0'>Prénom(s)</p>
                        <div className='rounded-3 p-3 mb-3' style={{ border: "1px solid #ccc", fontSize: 18, backgroundColor: "white", color: 'gray', width: "100%" }}>{professeur.prenom}</div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <p className='fw-bolder ms-1 pb-0 mb-0'>Nom</p>
                        <div className='rounded-3 p-3 mb-3' style={{ border: "1px solid #ccc", fontSize: 18, backgroundColor: "white", color: 'gray', width: "100%" }}>{professeur.nom}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                    <p className='fw-bolder ms-1 pb-0 mb-0'>Date de Naissance</p>
                        <div className='rounded-3 p-3 mb-3' style={{ border: "1px solid #ccc", fontSize: 18, backgroundColor: "white", color: 'gray', width: "100%" }}>{moment(professeur.dteNaissance).format("DD MMMM YYYY")}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <p className='fw-bolder ms-1 pb-0 mb-0'>Adresse e-mail</p>
                        <div className='rounded-3 p-3 mb-3' style={{ border: "1px solid #ccc", fontSize: 18, backgroundColor: "white", color: 'gray', width: "100%" }}>{professeur.email}</div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <p className='fw-bolder ms-1 pb-0 mb-0'>Téléphone</p>
                        <div className='rounded-3 p-3 mb-3' style={{ border: "1px solid #ccc", fontSize: 18, backgroundColor: "white", color: 'gray', width: "100%" }}>{professeur.telephone}</div>
                    </Col>
                </Row>
              </Container>
          </div>
      </>
  )
}

export default Profil
