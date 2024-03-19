import React, { useEffect, useRef, useState } from 'react'
import Affiche from "../../img/affiche.png"
import { Button, Carousel, CloseButton, Col, Container, Figure, Image, Modal, Row } from 'react-bootstrap' 
// import illustration1 from "../../img/illustration1.png"
// import illustration2 from "../../img/illustration2.jpg"
// import imgP from "../../img/imgP.png"
import imgP2 from "../../img/imgP2.png"
import imgP3 from "../../img/imgP3.png"
import user from "../../img/imgProfil.png";
import userr from "../../img/userr.png";
import savoir from "../../img/savoir.png";
import paiement from "../../img/paiement.png";
import frais from "../../img/frais.png";
import means from "../../img/means.png";
import img from "../../img/like3.png"
// import illustration3 from "../../img/illustration3.jpg"
// import karate from "../../img/karate.png"
// import karateImg from "../../img/karateImg.png"
// import karateIcon from "../../img/karateIcon.png"
// import theatreIcon from "../../img/theatreIcon.png"
// import danceIcon from "../../img/danceIcon.png"
// import peintureIcon from "../../img/peintureIcon.png"
// import musiqueIcon from "../../img/musiqueIcon.png"
// import ingenierieIcon from "../../img/ingenierieIcon.png"
// import vitrailIcon from "../../img/vitrailIcon.png"
import banniere from "../../img/banniere1.png"
import banniere4 from "../../img/banniere2.png"
import banniere2 from "../../img/affiche8.png"
import banniere3 from "../../img/affiche9.png"
import why from "../../img/why1.png"
import bg from "../../img/bg.png"
import imgFond from "../../img/imgFond10.png"
import imgFond11 from "../../img/imgFond11.png"
import imgFond8 from "../../img/imgFond8.png"
import sv4 from "../../img/sv4.jpg"
import sv6 from "../../img/sv6.jpg"
import sv7 from "../../img/sv7.png"
import imgGal2p from "../../img/imgGal2p.png"
// import theatre from "../../img/theatre.png"
// import soin from "../../img/soin.png"
// import vitrail from "../../img/vitrail.png"
// import peinture from "../../img/peinture.png"
// import imge from "../../img/img2.png"
// import fleche from "../../img/fleche.png"
import flechee from "../../img/fleche.png"
import qualite from "../../img/qualite.png"
import ambiance from "../../img/ambiance.png"
import augmenter from "../../img/augmenter.png"
import asavoir from "../../img/asavoir.png"
// import Cards from '../../components/Cards'
import { Link } from 'react-router-dom'
import ButtonBaseDemo from '../../components/ButtonBaseDemo'
import PhotoSlider from '../../components/Carrou'
import { AiTwotoneStar } from 'react-icons/ai'
import { instance } from '../../axios'
import { BiCheck} from 'react-icons/bi'
// import { BsStarFill } from 'react-icons/bs'
import { LiaMoneyBillAltSolid } from 'react-icons/lia'
import { Box, Rating } from '@mui/material'

const FicheRenseignement = () => {
  if (localStorage.getItem("selecte") !== 0) {
    localStorage.setItem("selecte", 0) 
  }

  const elementRef = useRef(null);

  const style = {
    fontFamily: "Poppins, sans-serif",
    // Ajoutez d'autres styles CSS au besoin
  };

  useEffect(() => {
    const element = elementRef.current;
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < windowHeight) {
        element.classList.add('animate-from-top');
      } else {
        element.classList.remove('animate-from-top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifiez l'état initial lors du chargement de la page

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function arrondirNombre(nombre) {
    if (Number.isInteger(nombre)) {
        // Le nombre est entier, pas de décimales
        return nombre;
    } else {
      let chiffreApresLaVirgule = (nombre % 1).toFixed(2).substring(2);
        if (chiffreApresLaVirgule > 50) {
            // La partie décimale est supérieure à 5
            return Math.ceil(nombre); // Arrondir vers le haut
        } else {
            // La partie décimale est inférieure ou égale à 5
            return Math.floor(nombre); // Arrondir vers le bas
        }
    }
}

// let nombre1 = 3.6;
// let nombre2 = 2.3;

// console.log(arrondirNombre(nombre1)); // Affiche 4 (arrondi vers le haut)
// console.log(arrondirNombre(nombre2)); // Affiche 2 (arrondi vers le bas)



  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        className='popup'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={style}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
        {/* backgroundImage: `url(${bg})` */}
        <Modal.Body className="position-relative" style={{backgroundColor: "#B60520", backgroundImage: `url(${bg})`,  backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' }}>
          <div className="float-end position-absolute close-button" style={{}}>
            <CloseButton size={15} onClick={() => {setModalShow(false)}} />
          </div>
          <center>
            {/* <img src={bg} width={760} alt="" /> */}
          </center>
          <div className="modal-d" style={{color: "white"}}>
            <h4 className='text-center modal-titre' >Bienvenue sur le site officiel du Conservatoire Saint Viateur d'Abidjan</h4>
            <p className='modal-desc'>
              Sur ce site, vous trouverez une mine d'informations sur le Conservatoire, y compris son engagement envers
              l'éducation musicale, chorégraphique et théâtrale de la plus haute qualité. Vous découvrirez également les différents programmes
              d'enseignement proposés, allant des cours de musique classique aux formations en danse contemporaine, en passant par le théâtre
              et bien plus encore.
            </p>
          </div>
          <div className="mt-4 mb-3 d-flex justify-content-center">
            <Button className="me-3" style={{ backgroundColor: "#FEE896", border: "1px solid #FEE896", borderRadius: 0}}>
              <Link style={{color: 'black', fontSize: 17}} to={`/formulaire-inscription`}>
                Inscription
              </Link>
            </Button>
            <Button style={{ backgroundColor: "#FEE896", border: "1px solid #FEE896", borderRadius: 0}}>
              <Link style={{color: 'black', fontSize: 17}} target="_blank" to={`https://api.whatsapp.com/send/?phone=2250700156309&text=Bonjour%2C+je+suis+par+vos+services%2C+Merci&type=phone_number&app_absent=0`}>
                Whatsapp
              </Link>
            </Button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  const [modalShow, setModalShow] = useState(true);

  
  const [avis, setAvis] = useState([])
  const [avisApprouver, setAvisApprouver] = useState([])
  const [noteMoyenne, setNoteMoyenne] = useState("")
  const [moyenne, setMoyenne] = useState("")

  let mo = 0

  const fetchAvis = () => {
      instance.get(`avis/trois-derniers`, {
        params: {
          status: true
        }
      })
        .then(response => {
          setAvis(response.data);
          // console.log(response.data)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
        });
      };

  const fetchAvisApprouver = () => {
      instance.get(`avis/read`, {
        params: {
          status: true
        }
      })
        .then(response => {
          setAvisApprouver(response.data);
          // console.log(response.data)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
        });
      };
      
      const fetchMoyenne = () => {
        instance.get(`avis/somme-note-status?status=${true}`)
        .then(response => {
          setNoteMoyenne(response.data);
          // console.log(response.data)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
        });
  };

  useEffect(() => {
    fetchAvis()
    fetchAvisApprouver()
    fetchMoyenne()
  }, [])

  useEffect(() => {
    setMoyenne(noteMoyenne / avisApprouver.length)
    console.log(typeof 3.6666666666666665);
    
    mo =( noteMoyenne / avis.length)
    console.log(noteMoyenne);
    console.log(avis.length);
    console.log(avisApprouver.length);
    console.log(parseInt(noteMoyenne) / parseInt(avisApprouver.length));
  }, [noteMoyenne, avis])

  return (
    <>
       <div className="containerr">
        <Carousel className="image slide" data-bs-theme="" style={{ width: "100%",  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)" }}>
          <Carousel.Item>
            <img
              className="d-block w-100 img-slide"
              src={banniere}
              style={{ width: '100%' }}
              alt="Second slide"
            />
                  <Carousel.Caption>
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                  <img
                      className="d-block w-100 img-slide"
                      src={banniere2}
                      style={{ width: '100%' }}
                      alt="Second slide"
                  />
                  <Carousel.Caption>
                      {/* <h5>Second slide label</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                  <img
                      className="d-block w-100 img-slide"
                      src={banniere3}
                      style={{ width: '100%' }}
                      alt="Third slide"
                  />
                  <Carousel.Caption>
                  </Carousel.Caption>
              </Carousel.Item>
          </Carousel>
        <div className="text-overlay">
            <div className="text-content">
                <h1 className='h1'>Conservatoire de Musique et de Danse Saint-Viateur Abidjan</h1>
            <p className='pi'>Plongez dans l'univers envoûtant de la musique, de danse et bien d'autres.</p>
            <div className="animated-link">
                <Link className="btn-ins" to={`/formulaire-inscription`} style={{}}>S'inscrire Aujourd'hui</Link>
              </div>
            </div>
        </div>
    </div>
    {/*<div className="containerr">
        <img className="image" src={banniere} alt="" />
        <div className="text-overlay">
            <div className="text-content">
                <h1>Conservatoire de Musique et de Danse Saint-Viateur Abidjan</h1>
            <p>Plongez dans l'univers envoûtant de la musique, de danse et bien d'autres.</p>
            <div className="animated-link">
                <Link className="btn-ins" to={`/formulaire-inscription`} style={{}}>S'inscrire Aujourd'hui</Link>
              </div>
            </div>
        </div>
    </div> */}
      {/* <PhotoSlider /> */}
      <center>
        <img style={{ marginTop: 30 }} className='image-indicateur' src={flechee} width={100} alt='' />
        <h1 className='grand-titre'>S'inscrire Aujourd'hui</h1>
        <p className='text-muted explication-ins' style={{ fontWeight: 400, fontSize: 16 }}>
          Ne repoussez pas votre passion plus longtemps. Rejoignez notre école dès aujourd'hui et commencez votre voyage artistique exceptionnel.
          Que vous souhaitiez apprendre la musique, la danse, le karaté ou d'autres arts, nous sommes là pour vous guider à chaque étape.
        </p>
      </center>
      <Container className='qualite scroll-animation' ref={elementRef}>
        <Row className=''>
          <Col xs={12} sm={12} md={12} lg={4} className='element-a-animer'>
            <center>
              <img style={{ }}className='img-qualite' src={qualite} alt='' />
              <h3 className='h3'>Qualité Garantie</h3>
              <p className='text-muted explication' style={{ fontWeight: 400, fontSize: 16 }}>
                Notre école s'engage à offrir une qualité garantie dans l'enseignement artistique.
                {/* Nos enseignants sont soigneusement sélectionnés pour leur expertise et leur dévouement à l'excellence pédagogique */}
              </p>
            </center>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className='element-a-animer'>
            <center>
              <img style={{ }}className='img-qualite' src={augmenter} alt='' />
              <h3 className='h3'>Suivi de la Progression</h3>
              <p  className='text-muted explication' style={{ fontWeight: 400, fontSize: 16 }}>
                Nous nous engageons à assurer un suivi personnalisé de la progression de chaque élève.
                {/* Nos instructeurs travaillent étroitementavec les élèves pour identifier leurs points forts et leurs besoin. */}
              </p>
            </center>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className='element-a-animer'>
            <center>
              <img style={{ }}className='img-qualite' src={ambiance} alt='' />
              <h3 className='h3'>Ambiance Accueillante</h3>
              <p  className='text-muted explication' style={{ fontWeight: 400, fontSize: 16 }}>
                Nous garantissons une ambiance véritablement accueillante et bienveillante.
                {/* en vue d'un apprentissage en toute détente. */}
              </p>
            </center>
          </Col>
        </Row>
      </Container>
      <div className="contenus">
        <center>
          {/* <p className='sous-titre '>QUI SOMMES NOUS ?</p> */}
        </center>
        <Row className='anim'>
          <Col xs={12} sm={12} md={12} lg={6} className='ps-4'>
            <div className="" style={{ }}>
              <h5 className='h5 presentation' style={{fontSize: 29}}>Presentation</h5>
              {/* <div className="line"></div> */}
              <div className="desc">
                {/* <p className='text-muted' style={{color: 'rgb(54, 53, 53)', fontWeight: 500, fontSize: 16}}> */}
                <p className='presentation' style={{ color: 'rgb(54, 53, 53)', fontWeight: 400, fontSize: 17}}>
                  Le Conservatoire de musique et de danse Saint-Viateur Abidjan est
                  une institution d'enseignement artistique spécialisée qui se
                  consacre à la formation et à l'éducation dans le domaine des
                  arts, en particulier la musique, la danse, le théâtre et d'autres
                  formes d'expression artistique.

                  {/* Le Conservatoire de musique et de danse Saint-Viateur Abidjan
                  est un centre de formation artistique qui propose des cours de 
                  musique, danse, dessin, peinture, karaté et de vitrail aux 
                  enfants aux jeunes et aux adultes. */}
                </p>
              </div>
              <div className="opp mt-4">
                <p className='text-muted my-0 presentation'>
                  <BiCheck color="#B60520" className='me-3' style={{fontSize: 10}} size={30} />
                  Opportunité d'apprendre auprès de professionnels
                </p>
                <p className='text-muted my-0 presentation'>
                  <BiCheck color="#B60520" className='me-3' style={{fontSize: 10}} size={30} />
                  Opportunité de montrer vos compétences artistiques au public à travers des spectacles de fin d'année
                </p>
                <p className='text-muted my-0 presentation'>
                  <BiCheck color="#B60520" className='me-3' style={{fontSize: 10}} size={30} />
                  Ouvert à une variété de programmes éducatifs et artistiques
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} className='ct2'>
            <div className="sup">
            <div className="position-relative">
              <div className="position-absolute sup-img1" style={{}} >
                <img alt="" className="imag " src={imgP3} width={320} />
              </div>
              <div className="position-absolute sup-img2" style={{ }}>
                <img alt="" className="imag " src={imgP2} width={320} />
              </div>
            </div>

            </div>

            {/* <img className="imag" src={illustration1} width={300} alt="" /> */}
          </Col>
        </Row>
        <center>
          {/* <img src={imge} alt="" className='imge' /> */}
        </center>
        {/* <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={illustration3} width={171} rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src={illustration3} width={171} roundedCircle />
        </Col>
        <Col xs={6} md={4}>
          <Image src={illustration3} width={171} thumbnail />
        </Col>
      </Row>
    </Container> */}
      </div>
       <div className="bon" style={{backgroundImage: `url(${imgFond})`,  backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' }}>
        <Row className='p-x mx-1'>
          <div className="">
            <center className='mb-5'>
              <h5 className='text-center h5' style={{fontSize: 29}}>Nos prestations</h5>
              {/* <div className="line"></div> */}
            </center>
          </div>
          <ButtonBaseDemo />
          {/*<Col xs={12} sm={12} md={6} lg={6} className="pb-3">
            <div className="p-4 rounded-4 service" style={{ backgroundColor: 'white', width: 'auto', height: 'auto' }}>
              <div className="d-flex" style={{ fontSize: 15 }}>
                <div className="pe-3" style={{ width: "auto" }}>
                  <img src={musiqueIcon} width={55} alt="" />
                </div>
                <div className="">
                  <p className='' style={{ textAlign: 'left', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: 'black' }}>Musique</p>
                  <p style={{ textAlign: 'justify' }}>
                    Nos cours de musique vous guideront à travers un voyage harmonieux d'expression artistique et de compétence musicale.
                  </p>
                  <span className='fw-semibold' style={{ color: "#B60520" }}>Heures de cours :</span>
                  <p style={{ textAlign: 'justify' }}>
                    Les heures de cours d'instruments sont définies en fonction de
                    la disponibilité de l'apprenant et des sales de cours.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="pb-3">
            <div className="p-4 service rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 'auto' }}>
              <div className="d-flex" style={{ fontSize: 15 }}>
                <div className="pe-3" style={{ width: "auto" }}>
                  <img src={danceIcon} width={55} alt="" />
                </div>
                <div className="">
                  <p className='' style={{ textAlign: 'left', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: 'black' }}>Dance</p>
                  <p style={{ textAlign: 'justify' }}>
                    Explorez divers styles de danse, perfectionnez vos mouvements et ressentez la magie de l'expression corporelle.
                  </p>
                  <span className='fw-semibold' style={{ color: "#B60520" }}>Heures de cours :</span>
                  <p style={{ textAlign: 'justify' }}>
                    Samedi:
                    <ul>
                      <li>
                        09h - 10h : Danse Moderne
                      </li>
                      <li>
                        10h - 11h : Danse Classique
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="pb-3">
            <div className="p-4 service rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 'auto' }}>
              <div className="d-flex" style={{ fontSize: 15 }}>
                <div className="pe-3" style={{ width: "auto" }}>
                  <img src={theatreIcon} width={55} alt="" />
                </div>
                <div className="">
                  <p className='' style={{ textAlign: 'left', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: 'black' }}>Art Théâtrales</p>
                  <p style={{ textAlign: 'justify' }}>
                    Plongez dans le monde de la scène, explorez la créativité et développez vos compétences en jeu d'acteur avec nos cours passionnants.
                  </p>
                  <span className='fw-semibold' style={{color: "#B60520"}}>Heures de cours :</span>
                  <p style={{ textAlign: 'justify' }}>
                    Samedi:
                    <ul>
                      <li>
                        14h - 15h
                      </li>
                    </ul> 
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="pb-3">
            <div className="p-4 service rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 'auto' }}>
              <div className="d-flex" style={{ fontSize: 15 }}>
                <div className="pe-3" style={{ width: "auto" }}>
                  <img src={ingenierieIcon} width={55} alt="" />
                </div>
                <div className="">
                  <p className='' style={{ textAlign: 'left', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: 'black' }}>Ingénierie de Soin</p>
                  <p style={{ textAlign: 'justify' }}>
                    Apprenez les compétences essentielles pour offrir des soins de santé de qualité tout en comprenant la technologie qui les soutient.
                  </p>
                  <span className='fw-semibold' style={{color: "#B60520"}}>Heures de cours :</span>
                  <p style={{ textAlign: 'justify' }}>
                    Samedi:
                    <ul>
                      <li>
                        14h - 15h
                      </li>
                    </ul> 
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="pb-3">
            <div className="p-4 service rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 'auto' }}>
              <div className="d-flex" style={{ fontSize: 15 }}>
                <div className="pe-3" style={{ width: "auto" }}>
                  <img src={peintureIcon} width={55} alt="" />
                </div>
                <div className="">
                  <p className='' style={{ textAlign: 'left', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: 'black' }}>Dessin et Peinture</p>
                  <p style={{ textAlign: 'justify' }}>
                  Que vous soyez débutant ou artiste expérimenté, nos cours vous aideront à développer votre talent artistique. bshzahdvghvghvahzvhga
                  </p>
                  <span className='fw-semibold' style={{color: "#B60520"}}>Heures de cours :</span>
                  <p style={{ textAlign: 'justify' }}>
                    Samedi:
                    <ul>
                      <li>
                        11h
                      </li>
                    </ul> 
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="pb-3">
            <div className="p-4 service rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 'auto' }}>
              <div className="d-flex" style={{ fontSize: 15 }}>
                <div className="pe-3" style={{ width: "auto" }}>
                  <img src={karateIcon} width={55} alt="" />
                </div>
                <div className="">
                  <p className='' style={{ textAlign: 'left', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: 'black' }}>Yoseikan Do</p>
                  <p style={{ textAlign: 'justify' }}>
                    Découvrez l'art martial, améliorez votre condition physique et développez des compétences d'auto-défense tout en cultivant la discipline.
                  </p>
                  <span className='fw-semibold' style={{ color: "#B60520" }}>Heures de cours :</span>
                  <div className="d-flex justify-content-around">
                    <div>
                      <p style={{ textAlign: 'justify' }}>
                        Mercredi:
                        <ul>
                          <li>
                            15h30 - 17h
                          </li>
                        </ul>
                      </p>
                    </div>
                    <div>
                      <p style={{ textAlign: 'justify' }}>
                        Samedi:
                        <ul>
                          <li>
                            15h30 - 17h
                          </li>
                        </ul> 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="pb-3">
            <div className="p-4 service rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 'auto' }}>
              <div className="d-flex" style={{ fontSize: 15 }}>
                <div className="pe-3" style={{ width: "auto" }}>
                  <img src={vitrailIcon} width={55} alt="" />
                </div>
                <div className="">
                  <p className='' style={{ textAlign: 'left', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: 'black' }}>Vitrail</p>
                  <p style={{ textAlign: 'justify' }}>
                    Apprenez à créer des œuvres de verre époustouflantes qui ajoutent une touche d'élégance et de couleur à votre environnement.
                  </p>
                  <span className='fw-semibold' style={{color: "#B60520"}}>Heures de cours :</span>
                  <p style={{ textAlign: 'justify' }}>
                    Mercredi:
                    <ul>
                      <li>
                        15h - 16h
                      </li>
                    </ul> 
                  </p>
                </div>
              </div>
            </div>
          </Col>*/}
        </Row>
      </div> 
      {/* <Row style={{}} className='p-5 mx-1 bon'>
        <center>
          <p className='sous-titre'>NOS PRESTATIONS</p>
        </center>
        <Col xs={12} sm={12} md={12} lg={3}>
          <div className="p-5 rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 610 }}>
            <img className="w-100 rounded-4" style={{ height: 200 }} src={illustration3} alt="" />
            <p className=' pt-3' style={{ textAlign: 'center', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: '#111111' }}>Musique</p>
            <p style={{ textAlign: 'justify' }}>
              Nos cours de musique vous guideront à travers un voyage harmonieux d'expression artistique et de compétence musicale.
            </p>

            <span className='fw-semibold'>Heures de cours :</span>

            <p style={{ textAlign: 'justify' }}>
              Les heures de cours d'instruments sont définies en fonction de
              la disponibilité de l'apprenant et des sales de cours.
            </p>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3}>
          <div className="p-5 rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 610 }}>
            <img className="w-100 rounded-4" style={{ height: 200 }} src={illustration2} alt="" />
            <p className=' pt-3' style={{ textAlign: 'center', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: '#111111' }}>Dance</p>
            <p style={{ textAlign: 'justify' }}>
              Explorez divers styles de danse, perfectionnez vos mouvements et ressentez la magie de l'expression corporelle.
              Danse classique, danse moderne, danse africaines
            </p>
  
              <span className='fw-semibold'>Heures de cours :</span>
  
            <p style={{ textAlign: 'justify' }}>
              Samedi:
              <ul>
                <li>
                  09h - 10h : Danse Moderne
                </li>
                <li>
                  10h - 11h : Danse Classique
                </li>
              </ul>
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={3}>
          <div className="p-5 rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 610 }}>
            <img className="w-100 rounded-4" style={{ height: 200 }} src={theatre} alt="" />
            <p className=' pt-3' style={{ textAlign: 'center', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: '#111111' }}>Art Théâtrales</p>
            <p style={{ textAlign: 'justify' }}>
              Plongez dans le monde de la scène, explorez la créativité et développez vos compétences en jeu d'acteur avec nos cours passionnants.
            </p>

            <span className='fw-semibold'>Heures de cours :</span>

            <p style={{ textAlign: 'justify' }}>
              Samedi:
              <ul>
                <li>
                  14h - 15h
                </li>
              </ul> 
            </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={3}>
            <div className="p-5 rounded-4" style={{ backgroundColor: 'white',  width: 'auto', height: 610}}>
              <img className="w-100 rounded-4" style={{ height: 200 }} src={soin} alt="" />
              <p className=' pt-3' style={{ textAlign: 'center', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: '#111111' }}>Ingénierie de Soin</p>
            <p style={{ textAlign: 'justify' }}>
              Apprenez les compétences essentielles pour offrir des soins de santé de qualité tout en comprenant la technologie qui les soutient.
              </p>
  
            <span className='fw-semibold'>Heures de cours :</span>

            <p style={{ textAlign: 'justify' }}>
              Samedi:
              <ul>
                <li>
                  14h - 15h
                </li>
              </ul>
            </p>
          </div>
        </Col>
      </Row>
      <Row style={{}} className='px-5 pb-5 mx-1 bon'>
        <Col xs={12} sm={12} md={12} lg={3}>
          <div className="p-5 rounded-4" style={{ backgroundColor: 'white', width: 'auto', height: 610 }}>
            <img className="w-100 rounded-4" style={{ height: 200 }} src={peinture} alt="" />
            <p className=' pt-3' style={{ textAlign: 'center', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: '#111111' }}>Dessin et Peinture</p>
            <p style={{ textAlign: 'justify' }}>
            Que vous soyez débutant ou artiste expérimenté, nos cours vous aideront à développer votre talent artistique.
            </p>

            <span className='fw-semibold'>Heures de cours :</span>

            <p style={{ textAlign: 'justify' }}>
              Samedi:
              <ul>
                <li>
                  11h
                </li>
              </ul> 
            </p>
          </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={3}>
            <div className="p-5 rounded-4" style={{ backgroundColor: 'white',  width: 'auto', height: 610}}>
              <img className="w-100 rounded-4" style={{ height: 200 }} src={karate} alt="" />
              <p className=' pt-3' style={{ textAlign: 'center', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: '#111111' }}>Yoseikan Do</p>
            <p style={{ textAlign: 'justify' }}>
              Découvrez l'art martial, améliorez votre condition physique et développez des compétences d'auto-défense tout en cultivant la discipline.
              </p>
  
              <span className='fw-semibold'>Heures de cours :</span>
  
              <p style={{ textAlign: 'justify' }}>
                    Mercredi:
                    <ul>
                      <li>
                        15h30 - 17h
                      </li>
                    </ul> 
                    Samedi:
                    <ul>
                      <li>
                        15h30 - 17h
                      </li>
                    </ul> 
                  </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={3}>
            <div className="p-5 rounded-4" style={{ backgroundColor: 'white',  width: 'auto', height: 610}}>
              <img className="w-100 rounded-4" style={{ height: 200 }} src={vitrail} alt="" />
              <p className='pt-3' style={{ textAlign: 'center', fontWeight: 400, letterSpacing: 2, fontSize: 22, color: '#111111' }}>Vitrail</p>
              <p style={{ textAlign: 'justify' }}>
              Apprenez à créer des œuvres de verre époustouflantes qui ajoutent une touche d'élégance et de couleur à votre environnement.
              </p>
  
              <span className='fw-semibold'>Heures de cours :</span>
  
              <p style={{ textAlign: 'justify' }}>
              Mercredi:
              <ul>
                <li>
                  15h - 16h
                </li>
              </ul> 
              </p>
            </div>
          </Col>
        </Row> */}
      <div className="contenus esp">
        <center>
          <div className="">
            <Link className="btn-ins service" to={`/formulaire-inscription`} style={{}}>S'inscrire Aujourd'hui</Link>
          </div>
          {/* <img src={imge} alt="" className='imge' /> */}
        </center>
      </div>
      {/* <div className="avis" style={{backgroundImage: `url(${imgFond11})`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat'}}> */}
      <div className="avis">
        <div className="">
          <p className='my-0 txt' style={{ fontSize: 17, fontWeight: 600, color: "white" }}>TEMOIGNAGES</p>
          <p className='mt-0 mb-1 fw-bolder text-gradient txt-tem' style={{fontWeight: 800, color: "white"}}>Ce que Disent Nos Clients</p>
        </div>
        <div className="">
          {avis.length > 0 ? (
            <>
              <center>
                {/* <Rating
                  readOnly
                  size="large" name="half-rating-read" defaultValue={avis.length === 0 ? 0 : !Number.isInteger(moyenne) ? ((moyenne % 1).toFixed(2).substring(2) > 50 ? Math.ceil(moyenne) : Math.floor(moyenne))  : parseInt(moyenne)} precision={0.5}
                  emptyIcon={<AiTwotoneStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                /> */}
                <Rating
                  readOnly
                  size="large" name="half-rating-read" precision={0.2}
                  value={avis.length === 0 ? 0 : moyenne}
                  // value={avis.length === 0 ? 0 : !Number.isInteger(moyenne) ? ((moyenne % 1).toFixed(2).substring(2) > 50 ? Math.ceil(moyenne) : Math.floor(moyenne))  : parseInt(moyenne)}
                  emptyIcon={<AiTwotoneStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {/* {avis.length === 0 ? 0 : !Number.isInteger(moyenne) ? ((moyenne % 1).toFixed(2).substring(2) > 50 ? Math.ceil(moyenne) : Math.floor(moyenne))  : parseInt(moyenne)} */}
                <p style={{ color: "white" }}>{avisApprouver.length > 1 ? `${avisApprouver.length} personnes ont partagées leur avis` : `${avisApprouver.length} personne a partagée son avis` } </p>
              </center>
              <Row className='mt-5'>
                {/* <p style={{ color: "white", textAlign: "center", marginBottom: 20 }}>Ici s'afficherons les 3 derniers avis</p> */}
                {avis.map((avi, i) => {
                  return (
                    <Col xs={12} sm={12} md={12} lg={4}>
                      <div className="containerr mx-2" style={{boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",}} >
                        <img className="image" style={{ height: 350}} src={img} alt="" />
                        <div className="text-overlayy" style={{ fontWeight: 700, fontSize: 15 }}>
                          <Rating
                            precision={0.2}
                            readOnly
                            name="note"
                            value={avi.note}
                            emptyIcon={<AiTwotoneStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <img src={userr} width={60} alt="" className="my-2" />
                          <p>{avi.prenom} {avi.nom}</p>
                          <div className="px-2 text-center">
                            <p>{avi.commentaire}</p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="p-3 carre-avis" style={{ border: "1px solid #ccc", color: "white" }}>
                        <div className="">
                          <Row className="">
                            <Col xs={12} sm={12} md={12} lg={8} className="">
                              <div>
                                <Row className="">
                                    <Col xs={12} sm={12} md={12} lg={3} className="profil">
                                      <img src={userr} width={60} alt="" />
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={9} className="pt-3 nom" >
                                      <p>{avi.prenom} {avi.nom}</p>
                                    </Col>
                              </Row>
                            </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} >
                              <div className="star">
                                <Rating
                                  readOnly
                                  name="note"
                                  value={avi.note}
                                  emptyIcon={<AiTwotoneStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Row className='commentaire'>
                          <Col xs={12} sm={12} md={12} lg={12}>
                            <p>{avi.commentaire}</p>
                          </Col>
                        </Row>
                      </div> */}
                    </Col>
                  )
                })}
              </Row>
            </>
          )
            :
            (
              <>
                <p style={{fontSize: 16, fontWeight: 300, color: "white", textAlign: "center", marginTop: 50}}>Aucun avis enregistré pour le moment.</p>
              </>
            )
          }
        </div>
      </div>
        {/* <div className="avis position-relative" style={{}}>
          <Row className='' style={{marginBottom: 140}}>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className='my-0 txt' style={{ fontSize: 17, fontWeight: 600, color: "white" }}>TEMOIGNAGES</p>
              <p className='mt-0 mb-1 fw-bolder text-gradient txt-tem' style={{fontWeight: 800, color: "white"}}>Ce que Disent Nos Clients</p>
          </Col>
          {avis.length > 0 &&
            (
              <Col xs={12} sm={12} md={12} lg={6} className='bor' style={{ }}>
                <center>
                  <div className="position-relative note">
                    <center>
                      <p className="nombre" style={{  }}>{avis.length === 0 ? 0 : !Number.isInteger(moyenne) ? ((moyenne % 1).toFixed(2).substring(2) > 50 ? Math.ceil(moyenne) : Math.floor(moyenne))  : parseInt(moyenne)}</p>
                    </center>
                    <div className="position-absolute star d-flex justify-content-center" style={{}}>
                      <Rating
                        readOnly
                        size="large" name="half-rating-read" defaultValue={avis.length === 0 ? 0 : !Number.isInteger(moyenne) ? ((moyenne % 1).toFixed(2).substring(2) > 50 ? Math.ceil(moyenne) : Math.floor(moyenne))  : parseInt(moyenne)} precision={0.5}
                        emptyIcon={<AiTwotoneStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                    </div>
                    <p className="my-0" style={{fontSize: 20, fontWeight: 700, color: "white"}}>
                      Note Moyenne des Clients
                    </p>
                  </div>
                </center>
              </Col>
            )}
        </Row>
        <Row >
          {avis.length > 0 ?
            (
              avis.map((avi, index) => {
                return (
                  <>
                    <Col xs={0} sm={0} md={12} lg={4} className='aviss'>
                      <center>
                        <div className="position-absolute py-3 px-4" style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.5)", width: 300,  borderRadius: 10, background: "white" }}>
                          <p style={{ textAlign: 'justify' }}>
                            {avi.commentaire}
                          </p>
                          <div className="my-3">
                            <Rating
                              readOnly
                              name="note"
                              value={avi.note}
                              emptyIcon={<AiTwotoneStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                          </div>
                          <div style={{ height: "auto", }} className="">
                            <Row>
                              <Col xs={12} sm={12} md={12} lg={4} className="d-flex justify-content-center align-items-center">
                                <img src={user} style={{ borderBottomLeftRadius: 10, borderTopLeftRadius: 40, borderTopRightRadius: 10, borderBottomRightRadius: 40 }} width={100} height={100} alt="" />
                              </Col>
                              <Col xs={12} sm={12} md={12} lg={8} className="d-flex justify-content-center align-items-center">
                                <p className='' style={{ fontWeight: 600, fontSize: 16 }}>{avi.prenom}</p>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </center>
                    </Col>
                  </>
                )
              })
            )
            :
            (
              <p style={{fontSize: 17, fontWeight: 400, color: "white"}}>Aucun avis enregistré pour le moment.</p>
            )
          }
        </Row>
        
      </div> */}
      <div className="contenus">
        <div className="">
        <center className='mb-5'>
          <h5 className='text-center h5' style={{fontSize: 29}}>Galerie</h5>
          {/* <div className="line"></div> */}
        </center>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4} className='mb-3'>
                {/* <center> */}
                <div className='d-flex justify-content-center align-items-center'>
                  <div className="image-container" style={{boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",}}>
                    <img width={270} src={sv4} alt="" />
                    <Link to={`/galerie`} className="text" >Tout voir</Link>
                  </div>
                </div>
                {/* </center> */}
            </Col>
              <Col xs={12} sm={12} md={4} lg={4} className='mb-3'>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className="image-container" style={{boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",}}>
                    <img width={270} src={sv6} alt="" />
                    <Link to={`/galerie`} className="text" >Tout voir</Link>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} className='mb-3'>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className="image-container" style={{boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",}}>
                    <img width={270} src={sv7} alt="" />
                    <Link to={`/galerie`} className="text" >Tout voir</Link>
                  </div>
                </div>
            </Col>
          </Row>
        </Container>

        </div>
        <center>
          {/* <img src={imge} alt="" className='imge' /> */}
        </center>
        {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
        {/* <center className='mb-4'>
          <h5 className='text-center h5' style={{fontSize: 29}}>Nos tarifs</h5>
          <div className="line"></div>
        </center> */}
      </div>
      <div className="contenus-asavoir">
        <div className="desc">
          <h5 className='text-center h5 mb-5' style={{fontSize: 29}}>Nos tarifs</h5>
          {/*<div className="table-responsive" >
            <table className="table table-bordered ">
              <thead className='table-danger'>
                <tr>
                  <th></th>
                  <th>1 mois</th>
                  <th>3 mois</th>
                  <th>10 mois</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Musiques</td>
                  <td>35.000F</td>
                  <td>100.000F</td>
                  <td>300.000F</td>
                </tr>
                <tr>
                  <td>
                    Danses <br />
                    Arts Plastiques <br />
                    Arts Matiaux <br />
                    Sports <br />
                    Arts Dramatiques
                  </td>
                  <td className='align-middle'>25.000F</td>
                  <td className='align-middle'>60.000F</td>
                  <td className='align-middle'>200.000F</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          
        </div>
        <Row>
          {/* <Col xs={12} sm={12} md={12} lg={4} className="mb-3">
            <div className="w-100" style={{ borderRadius: 35, boxShadow: "1px 15px 5px rgba(246, 185, 195, 0)", height: 350, border: "3px solid #F44560" }}>
              <div className="d-flex justify-content-center align-items-center w-100" style={{ color: "white", borderTopLeftRadius: 32, borderTopRightRadius: 32, height: 60, backgroundColor: "#DD0828" }}>
                <p>Musiques</p>
              </div>
              <div className="d-flex justify-content-center align-items-center w-100" style={{height: 250}}>
                <div className="w-100 pt-4">
                  <div className="d-flex justify-content-around w-100" style={{borderBottom: "3px solid #F44560"}}>
                    <p className="my-3" style={{ color: "#DD0828", fontWeight: 600, fontSize: 20}}>
                       Durée
                    </p>
                    <p className="my-3" style={{color: "#DD0828", fontWeight: 600, fontSize: 20}}>
                      Coût
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100" style={{borderBottom: "3px solid #F44560"}}>
                    <p className="my-4" style={{}}>
                      1 mois  
                    </p>
                    <p className="my-4" style={{}}>
                      35.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100" style={{borderBottom: "3px solid #F44560"}}>
                    <p className="my-4" style={{}}>
                      3 mois  
                    </p>
                    <p className="my-4" style={{}}>
                      100.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100">
                    <p className="my-4" style={{}}>
                      9 mois  
                    </p>
                    <p className="my-4" style={{}}>
                      300.000F
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} className='d-flex justify-content-end align-items-center mb-3'>
            <div className="w-100" style={{ borderRadius: 35, boxShadow: "1px 15px 5px rgba(246, 185, 195, 0)", height: 350, border: "3px solid #F44560" }}>
              <div className="d-flex justify-content-center align-items-center w-100" style={{ color: "white", borderTopLeftRadius: 32, borderTopRightRadius: 32, height: 60, backgroundColor: "#F44560" }}>
                <p style={{ marginRight: 5 }}>Danses </p>
                <div className="me-2" style={{ borderRight: "1px dashed white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Arts Plastiques</p>
                <div className="me-2" style={{ borderRight: "1px dashed white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Arts Matiaux</p>
                <div className="me-2" style={{ borderRight: "1px dashed white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Sports</p>
                <div className="me-2" style={{ borderRight: "1px dashed white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Arts Dramatiques</p>
              </div>
              <div className="d-flex justify-content-center align-items-center w-100" style={{height: 250}}>
                <div className="w-100 pt-4">
                  <div className="d-flex justify-content-around w-100" style={{borderBottom: "3px solid #F44560"}}>
                    <p className="my-3" style={{ color: "#F44560", fontWeight: 600, fontSize: 20}}>
                       Durée
                    </p>
                    <p className="my-3" style={{color: "#F44560", fontWeight: 600, fontSize: 20}}>
                      Coût
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100" style={{borderBottom: "3px solid #F44560"}}>
                    <p className="my-4" style={{}}>
                      1 mois  
                    </p>
                    <p className="my-4" style={{}}>
                      25.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100" style={{borderBottom: "3px solid #F44560"}}>
                    <p className="my-4" style={{}}>
                      3 mois  
                    </p>
                    <p className="my-4" style={{}}>
                      60.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100">
                    <p className="my-4" style={{}}>
                      9 mois  
                    </p>
                    <p className="my-4" style={{}}>
                      200.000F
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col> */}
          <Col xs={12} sm={12} md={12} lg={4} className="mb-3">
            <div className="w-100" style={{ borderRadius: 35, boxShadow: "1px 15px 5px rgba(246, 185, 195, 10)", height: "auto", border: "3px solid #DD0828" }}>
              <div className="d-flex justify-content-center align-items-center w-100" style={{ color: "white", borderTopLeftRadius: 32, borderTopRightRadius: 32, height: 60, backgroundColor: "#DD0828" }}>
                <p>Musiques</p>
              </div>
              <div className="d-flex justify-content-center align-items-center w-100" style={{}}>
                <div className="w-100 pt-4">
                  <div className="d-flex justify-content-around w-100" style={{}}>
                    <p className="d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#DD0828", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      1 mois  
                    </p>
                    <p className="d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#DD0828", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      35.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100" style={{}}>
                    <p className="d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#DD0828", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      3 mois  
                    </p>
                    <p className="d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#DD0828", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      100.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100">
                    <p className="d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#DD0828", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      9 mois  
                    </p>
                    <p className="d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#DD0828", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      300.000F
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} className='d-flex justify-content-end align-items-center mb-3'>
            <div className="w-100" style={{ borderRadius: 35, boxShadow: "1px 15px 5px rgba(246, 185, 195, 10)", height: "auto", border: "3px solid #F44560" }}>
              <div className="d-flex justify-content-center align-items-center w-100" style={{ color: "white", borderTopLeftRadius: 32, borderTopRightRadius: 32, height: 60, backgroundColor: "#F44560" }}>
                <p style={{ marginRight: 5 }}>Danses </p>
                <div className="me-2" style={{ borderRight: "2px solid white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Arts Plastiques</p>
                <div className="me-2" style={{ borderRight: "2px solid white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Arts Matiaux</p>
                <div className="me-2" style={{ borderRight: "2px solid white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Sports</p>
                <div className="me-2" style={{ borderRight: "2px solid white", height: 20, marginTop: -15}}></div>
                <p style={{ marginRight: 5 }}>Arts Dramatiques</p>
              </div>
              <div className="d-flex justify-content-center align-items-center w-100" style={{}}>
                <div className="w-100 pt-4">
                  <div className="d-flex justify-content-around w-100" style={{}}>
                    <p className=" d-flex justify-content-center align-items-center service" style={{  width: 100, height: 100, backgroundColor: "#F44560", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      1 mois  
                    </p>
                    <p className=" d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#F44560", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      25.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100" style={{}}>
                    <p className=" d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#F44560", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      3 mois  
                    </p>
                    <p className=" d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#F44560", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      60.000F
                    </p>
                  </div>
                  <div className="d-flex justify-content-around w-100">
                    <p className=" d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#F44560", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      9 mois  
                    </p>
                    <p className=" d-flex justify-content-center align-items-center service" style={{ width: 100, height: 100, backgroundColor: "#F44560", borderRadius: 50, color: "white", border: "2px dashed white"}}>
                      200.000F
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <center className='my-5 '>
          <h5 className='text-center h5 ' style={{fontSize: 29}}>A SAVOIR</h5>
          <div className="line"></div>
        </center> */}
      </div>
      <div className='contenus-asavoir'>
        {/* <Row className="mb-4"> */}
                <h5 className='h5 text-center' style={{fontSize: 29}}>A savoir</h5>
              {/* </Row> */}
        <Row className=''>
          <Col className="container-img-savoir" xs={12} sm={12} md={12} lg={6}>
            <img src={asavoir} className='img-savoir' alt="" />
          </Col>
          <Col className='container-img-savoir' xs={12} sm={12} md={12} lg={6}>
            <div className="">
              
              <Row className="">
                  <Col xs={12} sm={12} md={12} lg={2} className='icone-s'>
                    <img src={paiement} width={45} alt="" />
                  </Col>
                <Col xs={12} sm={12} md={12} lg={10}>
                  <div className="icone-s">
                    <p style={{ fontSize: 22, fontWeight: 450 }}>Frais d'Inscription</p>
                  </div>
                  <div className="icone-s">
                    <p className='text-muted'>
                      Les frais d'inscription sont à <span><b>15.000 Fcfa</b></span> l'année par apprenant.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="">
                <Col xs={12} sm={12} md={12} lg={2} className='icone-s'>
                  <img src={frais} width={45} alt="" />
                </Col>
                <Col xs={12} sm={12} md={12} lg={10}>
                  <div className="icone-s">
                    <p style={{ fontSize: 22, fontWeight: 450 }}>Paiement des cours</p>
                  </div>
                  <div className="icone-s">
                    <p className='text-muted'>
                      Le paiement des séances de cours sont payés au début du mois.
                      Pour une <b>formation de 10 mois le paiement peut s'effectuer en trois tranches</b>
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="my-3">
                  <Col xs={12} sm={12} md={12} lg={2} className='icone-s'>
                    <img src={means} width={60} alt="" />
                  </Col>
                <Col xs={12} sm={12} md={12} lg={10}>
                  <div className="icone-s">
                    <p style={{ fontSize: 22, fontWeight: 450 }}>Moyen de paiement</p>
                  </div>
                  <div className="icone-s">
                    <p className='text-muted'>
                      En espèce <br />
                      Par chèques <br />
                      Par mobile money
                    </p>
                  </div>
                  {/* <p className='text-muted'>
                    Les frais d'inscription sont à <span><b>15.000 Fcfa</b></span> l'année par apprenant.
                  </p> */}
                  </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default FicheRenseignement
