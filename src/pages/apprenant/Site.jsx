import React, { useEffect, useRef, useState } from 'react'
import Affiche from "../../img/affiche.png"
import { Button, CloseButton, Col, Container, Figure, Image, Modal, Row } from 'react-bootstrap' 
import illustration1 from "../../img/illustration1.png"
// import illustration2 from "../../img/illustration2.jpg"
// import illustration3 from "../../img/illustration3.jpg"
// import karate from "../../img/karate.png"
// import karateImg from "../../img/karateImg.png"
import karateIcon from "../../img/karateIcon.png"
import theatreIcon from "../../img/theatreIcon.png"
import danceIcon from "../../img/danceIcon.png"
import peintureIcon from "../../img/peintureIcon.png"
import musiqueIcon from "../../img/musiqueIcon.png"
import ingenierieIcon from "../../img/ingenierieIcon.png"
import vitrailIcon from "../../img/vitrailIcon.png"
import why from "../../img/why1.png"
import bg from "../../img/bg.png"
import sv4 from "../../img/sv4.jpg"
import sv6 from "../../img/sv6.jpg"
import sv7 from "../../img/sv7.png"
// import theatre from "../../img/theatre.png"
// import soin from "../../img/soin.png"
// import vitrail from "../../img/vitrail.png"
// import peinture from "../../img/peinture.png"
import imge from "../../img/img2.png"
import fleche from "../../img/fleche.png"
import qualite from "../../img/qualite.png"
import ambiance from "../../img/ambiance.png"
import augmenter from "../../img/augmenter.png"
// import Cards from '../../components/Cards'
import { Link } from 'react-router-dom'

const Site = () => {
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

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
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
        <Modal.Body style={{backgroundColor: "#B60520", backgroundImage: `url(${bg})`,  backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' }}>
          <div className="float-end" style={{top: -30}}>
            <CloseButton onClick={() => {setModalShow(false)}} />
          </div>
          <center>
            {/* <img src={bg} width={760} alt="" /> */}
          </center>
          <div className="" style={{paddingTop: 400, color: "white"}}>
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
              <Link style={{color: 'black', fontSize: 17}} to={`/conservatoire-saint-viateur/formulaire-inscription`}>
                Inscription
              </Link>
            </Button>
            <Button style={{ backgroundColor: "#FEE896", border: "1px solid #FEE896", borderRadius: 0}}>
              <Link style={{color: 'black', fontSize: 17}} to={`/conservatoire-saint-viateur/formulaire-inscription`}>
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
  
  // const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="banniere">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={7} >
              <div className="titre">
                <p className="fw-semibold animated-paragraph">
                  <span className="spann">C</span>onservatoire de <span className="spann">M</span>usique et de <span className="spann">D</span>anse <span className="spann">S</span>aint-<span className="spann">V</span>iateur <span className="spann">A</span>bidjan
                </p>
              </div>
              <p className="text-muted text-mute animated-paragraph2">
                Plongez dans l'univers envoûtant de la musique, de danse et bien d'autres.
              </p>
              <div className="animated-link">
                <Link className="btn-ins" to={`/conservatoire-saint-viateur/formulaire-inscription`} style={{}}>S'inscrire Aujourd'hui</Link>
              </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={5}>
            <div className="ct2">
              <img src={Affiche} alt="" className="animated-img pt-4 img" />
            </div>
          </Col>
        </Row>
        </Container>
      </div>
      <center>
        <img style={{ marginTop: 40 }} className='image-indicateur' src={fleche} width={100} alt='' />
        <h1 className='grand-titre'>S'inscrire Aujourd'hui</h1>
        <p className='text-muted explication-ins' style={{ fontWeight: 400, fontSize: 17 }}>
          Ne repoussez pas votre passion plus longtemps. Rejoignez notre école dès aujourd'hui et commencez votre voyage artistique exceptionnel.
          Que vous souhaitiez apprendre la musique, la danse, le karaté ou d'autres arts, nous sommes là pour vous guider à chaque étape.
        </p>
      </center>
      <Container className='qualite scroll-animation' ref={elementRef}>
        <Row className=''>
          <Col xs={12} sm={12} md={12} lg={4} className='element-a-animer'>
            <center>
              <img style={{ marginTop: 40 }} src={qualite} width={65} alt='' />
              <h3 className='h3'>Qualité Garantie</h3>
              <p className='text-muted explication' style={{ fontWeight: 400, fontSize: 17 }}>
                Notre école s'engage à offrir une qualité garantie dans l'enseignement artistique.
                {/* Nos enseignants sont soigneusement sélectionnés pour leur expertise et leur dévouement à l'excellence pédagogique */}
              </p>
            </center>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className='element-a-animer'>
            <center>
              <img style={{ marginTop: 40 }} src={augmenter} width={65} alt='' />
              <h3 className='h3'>Suivi de la Progression</h3>
              <p  className='text-muted explication' style={{ fontWeight: 400, fontSize: 17 }}>
                Nous nous engageons à assurer un suivi personnalisé de la progression de chaque élève.
                {/* Nos instructeurs travaillent étroitementavec les élèves pour identifier leurs points forts et leurs besoin. */}
              </p>
            </center>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className='element-a-animer'>
            <center>
              <img style={{ marginTop: 40 }} src={ambiance} width={65} alt='' />
              <h3 className='h3'>Ambiance Accueillante</h3>
              <p  className='text-muted explication' style={{ fontWeight: 400, fontSize: 17 }}>
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
          <Col xs={12} sm={12} md={6} lg={6} className='ps-4'>
            <h5 className='h5' >PRESENTATION</h5>
            <div className="line"></div>
            <div className="desc d-flex justify-content-end">
              <p className='text-muted' style={{color: 'rgb(54, 53, 53)', fontWeight: 500}}>
                Le Conservatoire de musique et de danse Saint-Viateur Abidjan
                est un centre de formation artistique qui propose des cours de 
                musique, danse, dessin, peinture, karaté et de vitrail aux 
                enfants aux jeunes et aux adultes.
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className='ct2'>
            <Image className="imag" src={illustration1} width={300} thumbnail />
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
      <div className="bon" style={{ }}>
        <Row className='p-x mx-1'>
          <div className="">
            <center className='mb-5'>
              <h5 className='text-center h5 '>NOS PRESTATIONS</h5>
              <div className="line"></div>
            </center>
          </div>
          <Col xs={12} sm={12} md={6} lg={6} className="pb-3">
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
          </Col>
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
      <div className="contenus">
        <center>
        <div className="">
            <Link className="btn-ins service" to={`/conservatoire-saint-viateur/formulaire-inscription`} style={{}}>S'inscrire Aujourd'hui</Link>
          </div>
          {/* <img src={imge} alt="" className='imge' /> */}
        </center>
        <Row className='mt-4'>
          <Col xs={12} sm={12} md={12} lg={6}>
            {/* <img src={why} width={500} alt="" className='' /> */}
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}></Col>
        </Row>
        <center className='mb-5'>
          <h5 className='text-center h5 '>GALERIE</h5>
          <div className="line"></div>
        </center>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <div class="image-container">
                <Image src={sv4} alt="" thumbnail />
                <Link to={`/conservatoire-saint-viateur/galerie`} class="text" >Voir tout</Link>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div class="image-container">
                <Image src={sv6} alt="" thumbnail />
                <Link to={`/conservatoire-saint-viateur/galerie`} class="text" >Voir tout</Link>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div class="image-container">
                <Image src={sv7} alt="" thumbnail />
                <Link to={`/conservatoire-saint-viateur/galerie`} class="text" >Voir tout</Link>
              </div>
            </Col>
          </Row>
        </Container>
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
        <center className='mb-5'>
              <h5 className='text-center h5 '>NOS TARIFS</h5>
              <div className="line"></div>
            </center>
        <div className="desc">
         
          <div className="table-responsive">
            <table className="table table-bordered ">
              <thead className='table-light'>
                <tr>
                  <th></th>
                  <th>1 mois</th>
                  <th>3 mois</th>
                  <th>10 mois</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Musique</td>
                  <td>35.000F</td>
                  <td>100.000F</td>
                  <td>300.000F</td>
                </tr>
                <tr>
                  <td>
                    Danse <br />
                    Art Théâtrales <br />
                    Ingénierie de Soin <br />
                    Dessin et Peinture <br />
                    Vitrail <br />
                    Karaté
                  </td>
                  <td className='align-middle'>25.000F</td>
                  <td className='align-middle'>60.000F</td>
                  <td className='align-middle'>200.000F</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <b>
              NB: Les frais d'inscription sont à <span><b>15.000 Fcfa</b></span> l'année par apprenant.
            </b> 
          </p>
        </div>
      </div>
    </>
  )
}

export default Site
