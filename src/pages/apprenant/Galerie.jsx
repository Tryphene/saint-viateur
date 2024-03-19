import React, { useState } from 'react'
import { Carousel, Container, Image, Row, Col, Spinner } from 'react-bootstrap'
import img from "../../img/imgFond9.png"
import illustration3 from "../../img/illustration3.jpg"
import gal1 from "../../img/gal1.png"
// import gal1p from "../../img/gal1p.png"
import gal2 from "../../img/gal2.png"
import gal3 from "../../img/gal3.png"
import gal4 from "../../img/gal4.png"
import gal5 from "../../img/gal5.png"
import gal6 from "../../img/gal6.png"
// import gal6p from "../../img/gal6p.png"
import gal7 from "../../img/gal7.png"
// import gal7p from "../../img/gal7p.png"
import gal8 from "../../img/gal8.png"
import gal8p from "../../img/gal8p.png"
import imgGal1p from "../../img/imgGal1p.png"
import imgGal2p from "../../img/imgGal2p.png"
import imgGal3 from "../../img/imgGal3.png"
import imgGal4 from "../../img/imgGal4.png"
import imgGal5 from "../../img/imgGal5.png"
import imgGal6 from "../../img/imgGal6.png"
import imgGal7 from "../../img/imgGal7.png"
import imgGal8 from "../../img/imgGal8.png"
import imgGal9 from "../../img/imgGal9.png"
import imgGal10 from "../../img/imgGal10.png"
import imgGal11 from "../../img/imgGal11.png"
import imgGal12 from "../../img/imgGal12.png"
import imgGal13 from "../../img/imgGal13.png"
import imgGal14 from "../../img/imgGal14.png"
import imgGal15 from "../../img/imgGal15.png"
// import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material'
// import { CgShare } from 'react-icons/cg'
// import { BiLogoFacebook, BiLogoWhatsapp } from 'react-icons/bi'
// import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage'

const Galerie = () => {
    let galerie = [
        {
          image: gal1,
          imagep: gal1
        },
        {
          image: gal2,
          imagep: gal2,
        },
        {
          image: gal3,
          imagep: gal3
        },
        {
          image: gal4,
          imagep: gal4
        },
        {
          image: gal5,
          imagep: gal5,
        },
        {
          image: gal6,
        //   imagep: gal6p
        },
        {
          image: gal7,
        //   imagep: gal7p
        },
        {
          image: gal8,
          imagep: gal8p
        },
    ]

    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    return (
        <>
            <div className="py-5" style={{}}>
                <div style={{}}>
                    <div className='titre-conteneur pt-3 px-5'>
                        <center>
                            <p className='fw-bolder text-gradient' style={{ fontSize: 35, color: "black" }}>GALERIE</p>
                            <div className="line"></div>
                        </center>
                    </div>
                </div>
                <center>
                {/* boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)" */}
                    {/* <Carousel  className='mb-5 mt-3' data-bs-theme="" style={{ width: 800, height: 500,  }}><Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal1}
                                style={{ width: 800, height: 500 }}
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal2}
                                style={{ width: 800, height: 500 }}
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal3}
                                style={{ width: 800, height: 500 }}
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal4}
                                style={{ width: 800, height: 500 }}
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal5}
                                style={{ width: 800, height: 500 }}
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal7}
                                style={{ width: 800, height: 500 }}
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal8}
                                style={{ width: 800, height: 500 }}
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={gal6}
                                style={{ width: 800, height: 500 }}
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel> */}
                </center>
                <Container className='my-5'>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal1p} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    {/* {loading ?
                                        <center>
                                            <Spinner animation="grow" size="sm" />
                                            <Spinner animation="grow" size="sm" />
                                            <Spinner animation="grow" size="sm" />
                                        </center>
                                        :
                                        <>
                                            {imgGal3 && setLoading(false)}
                                            {loading === false && <img src={imgGal3} alt="" thumbnail width={`100%`} />}
                                        </> 
                                        } */}
                                    <img src={imgGal3} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal4} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal5} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal6} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal7} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal8} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal9} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal10} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal11} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal12} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal13} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal14} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={3}>
                            <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", }}>
                                <div class="image-container">
                                    <img src={imgGal15} alt="" thumbnail width={`100%`} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* <div className="my-4" style={{ boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", width: 350, }}>
                    <div class="image-container">
                        <img src={imgGal2p} alt="" thumbnail width={`100%`} />
                    </div>
                    <div className="d-flex p-3 justify-content-end" style={{border: "1px solid #ccc", borderTop: "0 solid white",}}>
                        <button className="d-flex justify-content-center align-items-center p-2 me-2" style={{borderRadius: 50, width: 120, background: "#0866FF", color: "white", fontSize: 13, fontWeight: 300}}>
                            <BiLogoFacebook className="me-2" size={17}/> Partager
                        </button>
                        <button onClick={partagerSurWhatsApp} className="d-flex justify-content-center align-items-center p-2" style={{ borderRadius: 50, width: 120, background: "#25D366", color: "white", fontSize: 13, fontWeight: 300 }}>
                            <BiLogoWhatsapp className="me-2" size={18} /> Partager
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Galerie
