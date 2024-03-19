import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Conteneur = (props) => {
  return (
      <>
          <div className="containeur" style={{ borderLeft: `3px solid ${props.color}` }}>
              <Row>
                  <Col xs={8} sm={8} md={8} lg={8}>
                      <small className="text-muted fw-normal text-start" style={{fontSize: 15}}>{props.titre}</small>
                          <p className="text-start" style={{ color: props.color, fontWeight: "bold", fontSize: 19, marginTop: 15}}>{props.nombre}</p>
                      {/* <p className="text-muted">{props.pourcentage}</p> */}
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4}>
                      <div className="icon" style={{ backgroundImage: props.bg , marginTop: 13}}>
                          {props.icon}
                      </div>
                  </Col>
              </Row>
              {/*  */}
              
          </div>
      </>
  )
}

export default Conteneur
