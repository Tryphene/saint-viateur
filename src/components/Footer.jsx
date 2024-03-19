import React from 'react'
import "../styles/Footer.css"
import logo from "../img/logo.png"
import { Col, Row } from 'react-bootstrap'
import { AiOutlineCaretRight } from 'react-icons/ai'
import { FaHeart, FaLocationPin, FaPhone } from 'react-icons/fa6'
import { GrMail } from 'react-icons/gr'
import { BiHeart } from 'react-icons/bi'

const Footer = () => {
    return (
        <>
            <div className="conteneur-footer">
                <Row>
                    <Col xs={12} sm={12} md={4} lg={4} className="pb-4">
                        <img src={logo} width={130} alt="" />
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className="pb-4">
                        <h5>Prestations</h5>
                        <div className="d-flex">
                            <div><AiOutlineCaretRight color='#B60520' size={17} /></div>
                            <div className='ps-2 pt-1 text-footer'>Musique</div>
                        </div>
                        <div className="d-flex">
                            <div><AiOutlineCaretRight color='#B60520' size={17} /></div>
                            <div className='ps-2 pt-1 text-footer'>Dance</div>
                        </div>
                        <div className="d-flex">
                            <div><AiOutlineCaretRight color='#B60520' size={17} /></div>
                            <div className='ps-2 pt-1 text-footer'>Autres(dessin, peintre, <br /> karaté, ...)</div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className="pb-4">
                        <h5>Nous contacter</h5>
                        <div className='text-footer'>
                            Nos équipes sont à votre écoute pour répondre  rapidement à tous vos besoins.
                        </div>
                        <div className="d-flex mt-3">
                            <div><FaLocationPin color='#B60520' size={17} /></div>
                            <div className='ps-2 pt-1 text-footer' style={{fontSize: 13.5}}>
                                Rivera palmeraie, à 100m du
                                rond point saint viateur en allant sur la voie de la PSV
                            </div>
                        </div>
                        <div className="d-flex mt-2">
                            <div><GrMail color='#B60520' size={17} /></div>
                            <div className='ps-2 pt-1 text-footer' style={{fontSize: 13.5}}>info@saint-viateur.com</div>
                        </div>
                        <div className="d-flex mt-2">
                            <div><FaPhone color='#B60520' size={17} /></div>
                            <div className='ps-2 pt-1 text-footer' style={{fontSize: 13.5}}>+225 22 27 49 99 22</div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="text-bas" style={{ height: "auto", width: "100%", backgroundColor: "white",}}>
                {/* Copyright © 2023 CodeArt | Fait par CodeArt avec le   */}
                <p>
                    Copyright © 2023 Conservatoire Saint Viateur d'Abidjan | Fait par Tryphène Kone avec le <FaHeart className='ms-2' color='#D21D3A' size={20} />
                </p>
            </div>
        </>
  )
}

export default Footer
