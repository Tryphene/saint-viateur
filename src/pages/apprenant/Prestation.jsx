import React from 'react'
import img from "../../img/imgFond9.png"
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { BiTime } from 'react-icons/bi'

const Prestation = () => {
    const { prestation } = useParams();
    return (
        <>
            <div className="containerr" >
                <img className="image" style={{ height: 250 }} src={img} alt="" />
                {/* <div className="text-overlay" style={{ fontWeight: 700, fontSize: 35, background: "rgba(182, 5, 31, 0.889)" }}> */}
                <div className="text-overlay" style={{ fontWeight: 700, fontSize: 35}}>
                    {prestation === "musiques" ?
                        "Musiques"
                        : prestation === "danses"
                            ? "Danses"
                            : prestation === "arts-plastiques"
                                ? "Arts Plastiques"
                                : prestation === "arts-martiaux"
                                    ? "Arts Martiaux"
                                    : prestation === "sports"
                                        ? "Sports"
                                        : prestation === "arts-dramatiques"
                                            ? "Arts Dramatiques"
                                            : ""
                    }
                </div>
            </div>
            <div className="mt-5 prest">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={8}>
                    {prestation === "musiques" ?
                            <>
                                <div className="">
                                    <div className="mt-5">
                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Interprétations en direct</p>
                                        <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                            Les étudiants du conservatoire jouent souvent en public pour gagner de l'expérience. Les
                                            concerts de fin d'année sont des occasions pour les apprenants de montrer leurs compétences et
                                            leur maîtrise musicale.
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Collaboration </p>
                                        <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                            Les conservatoires encouragent souvent la collaboration entre les étudiants.
                                            Vous pourriez assister à des performances de groupes musicaux, de chœurs, d'orchestres ou de formations de chambre,
                                            où les élèves jouent ensemble.
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Niveaux de compétence variés </p>
                                        <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                            Les performances au conservatoire incluent souvent des étudiants de tous niveaux, des débutants aux étudiants avancés.
                                            Cela permet aux plus jeunes musiciens de gagner de l'expérience tout en offrant au public une diversité de talents.
                                        </p>
                                    </div>
                                </div>
                            </>
                        : prestation === "danses"
                                ? 
                                <>
                                <div className="">
                                    <div className="mt-5">
                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Formation technique</p>
                                        <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                            Les étudiants sont formés en danse technique, ce qui inclut des mouvements
                                            précis, une posture correcte, et une expression corporelle appropriée. Les performances reflètent
                                            ces compétences techniques.
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Encadrement par des professeurs qualifiés</p>
                                        <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                Les étudiants sont encadrés par des professeurs expérimentés en danse, qui les guident dans leur
                                                formation technique et artistique.
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Présentation professionnelle</p>
                                            <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                Les étudiants sont également formés à présenter leurs chorégraphies de manière professionnelle,
                                                avec des décors appropriés, garantissant une prestation soignée.
                                            </p>
                                    </div>
                                </div>
                            </>
                            : prestation === "arts-plastiques"
                                    ? 
                                    <>
                                        <div className="">
                                            <div className="mt-5">
                                                <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Thèmes et styles variés</p>
                                                <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                    Les artistes en formation développent souvent leur propre style artistique, et les expositions
                                                    peuvent présenter une grande diversité de thèmes, d'approches artistiques,
                                                    de techniques et de styles.
                                                </p>
                                            </div>
                                            <div className="mt-3">
                                                <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Expression artistique personnelle </p>
                                                <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                    Les expositions d'arts plastiques au sein du conservatoire mettent en avant la capacité des
                                                    étudiants à s'exprimer artistiquement et à développer leur propre voix artistique.
                                                </p>
                                            </div>
                                            <div className="mt-3">
                                                <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Accompagnement par des instructeurs qualifiés </p>
                                                <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                    Les étudiants reçoivent une formation artistique approfondie et sont encadrés par des
                                                    instructeurs qualifiés, ce qui leur permet de développer leurs compétences artistiques
                                                    et leur créativité.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                : prestation === "arts-martiaux"
                                        ? 
                                        <>
                                            <div className="">
                                                <div className="mt-5">
                                                    <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Combats ou sparring</p>
                                                    <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                        Nous simulons des combats , où les apprenants mettent en pratique leurs compétences en
                                                        combat. Ces démonstrations peuvent être chorégraphiées ou réelles, en fonction du type
                                                        d'art martial.
                                                    </p>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Démonstrations techniques </p>
                                                    <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                        Les élèves peuvent effectuer des démonstrations techniques pour mettre en avant leur
                                                        maîtrise des mouvements, des formes et des techniques spécifiques de leur art martial.
                                                    </p>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Discipline et respect </p>
                                                    <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                        Nous mettons en avant des valeurs
                                                        de discipline, de respect et de maîtrise de soi.
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                        : prestation === "sports"
                                            ? 
                                            <>
                                                <div className="">
                                                    <div className="mt-5">
                                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Apprentissage des valeurs sportives</p>
                                                        <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                            Nous mettons l'accent sur l'importance des valeurs telles
                                                            que la discipline, l'esprit d'équipe, le fair-play, la persévérance et le respect,
                                                            qui sont des aspects essentiels de la pratique sportive.
                                                        </p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Démonstrations de technique</p>
                                                        <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                            Les instructeurs ou les athlètes peuvent effectuer
                                                            des démonstrations de techniques d'exercice, montrant aux participants comment
                                                            effectuer correctement les mouvements pour éviter les blessures.
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                            : prestation === "arts-dramatiques"
                                                ? 
                                                <>
                                                    <div className="">
                                                        <div className="mt-3">
                                                            <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Improvisation</p>
                                                            <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                                Les prestations peuvent inclure des séances d'improvisation, où les acteurs
                                                                développent spontanément des scènes sans script préalable.
                                                            </p>
                                                        </div>
                                                        <div className="mt-3">
                                                            <p className="" style={{ color: "#B60520", fontSize: 20, fontWeight: 500 }}>Monologues et scènes courtes</p>
                                                            <p className="" style={{ fontSize: 15, fontWeight: 300 }}>
                                                                Les acteurs peuvent également présenter des monologues, des duologues ou des
                                                                scènes courtes pour mettre en avant leurs compétences en jeu d'acteur.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                                : ""
                    }
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4}>
                        <div className="p-4" style={{ border: "1px solid #EEEEEE" }}>
                            <p className="mb-2" style={{fontSize: 19, fontWeight: 500}}>Nos pretations</p>
                            <div className="p-0" style={{ borderBottom: "1px solid #B60520", width: 100 }}></div>
                            <div className="pt-3 pb-2" style={{ borderBottom: "1px dashed #ccc" }}>
                                <Link className={prestation === "musiques" ? "pre" : "pres" } to={`/musiques`} style={{textDecoration: "none", fontSize: 15, }}>Musiques</Link>
                            </div>
                            <div className="py-2" style={{ borderBottom: "1px dashed #ccc" }}>
                                <Link className={prestation === "danses" ? "pre" : "pres" } to={`/danses`} style={{textDecoration: "none", fontSize: 15, }}>Danses</Link>
                            </div>
                            <div className="py-2" style={{ borderBottom: "1px dashed #ccc" }}>
                                <Link className={prestation === "arts-plastiques" ? "pre" : "pres" } to={`/arts-plastiques`} style={{textDecoration: "none", fontSize: 15, }}>Arts Plastiques</Link>
                            </div>
                            <div className="py-2" style={{ borderBottom: "1px dashed #ccc" }}>
                                <Link className={prestation === "arts-martiaux" ? "pre" : "pres" } to={`/arts-martiaux`} style={{textDecoration: "none", fontSize: 15, }}>Arts Matiaux</Link>
                            </div>
                            <div className="py-2" style={{ borderBottom: "1px dashed #ccc" }}>
                                <Link className={prestation === "sports" ? "pre" : "pres" } to={`/sports`} style={{textDecoration: "none", fontSize: 15, }}>Sports</Link>
                            </div>
                            <div className="py-2" style={{ borderBottom: "1px dashed #ccc" }}>
                                <Link className={prestation === "arts-dramatiques" ? "pre" : "pres" } to={`/arts-dramatiques`} style={{textDecoration: "none", fontSize: 15, }}>Arts Dramatiques</Link>
                            </div>
                        </div>
                        <div className="p-4 mt-4" style={{ border: "1px solid #EEEEEE" }}>
                            <div className="d-flex">
                                <BiTime color='#B60520' size={20} className="me-3" />
                                <p style={{ fontWeight: 500 }}>Heures de cours</p>
                            </div>
                            <div className="">
                            {prestation === "musiques" ?
                                    <div className="py-2" style={{ }}>
                                        <p>Du Lundi au Samedi </p>
                                        <p className='mb-1 pb-1 my-4' style={{ fontSize: 15, fontWeight: 300, color: "#606A6B" }}>
                                            Les heures de cours d'instruments sont définies en fonction de
                                            la disponibilité de l'apprenant et des salles de cours.
                                        </p>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                Piano
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                               Guitare 
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                              Batterie  
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                              Violon  
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                               Djembé 
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                              Clarinette
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                               Flute 
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                               Trompette 
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                Saxophone
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                Chant
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                Solfège
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                Trombone
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                Balafon
                                            </p>
                                        </div>
                                    </div>
                                    : prestation === "danses"
                                        ? 
                                        <>
                                            <p>Samedi </p>
                                            <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    Danse Moderne
                                                </p>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    10h - 11h
                                                </p>
                                            </div>
                                            <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    Danse Classique
                                                </p>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                   09h - 10h
                                                </p>
                                            </div>
                                            <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    Danse Urbaine
                                                </p>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    10h - 11h
                                                </p>
                                            </div>
                                            <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    Danse Africaine
                                                </p>
                                                {/* <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    10h - 11h
                                                </p> */}
                                            </div>
                                            {/* <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    Danse Zumba
                                                </p>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    10h - 11h
                                                </p>
                                            </div> */}
                                            <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    Danse de Salon
                                                </p>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    16h30 - 17h30
                                                </p>
                                            </div>
                                            <p  className="mb-0 mt-3">Mercredi</p>
                                            <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    Danse Sportive(Zumba)
                                                </p>
                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                    18h30 - 20h
                                                </p>
                                            </div>
                                        </>
                                        : prestation === "arts-plastiques"
                                            ? 
                                            <>
                                            <p> Samedi </p>
                                                <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                    <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                        Dessein
                                                    </p>
                                                    <p className='mb-1 pb-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                        10h - 11h
                                                    </p>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                            <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                               Peinture
                                                    </p>
                                                    <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                        10h - 11h
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                    <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                        Vitrail
                                                    </p>
                                                    <p className='my-1 py-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                        11h - 12h
                                                    </p>
                                                </div>
                                            </>
                                            : prestation === "arts-martiaux"
                                                ? 
                                                <>
                                                    <div className="d-flex justify-content-between mb-0" style={{  }}>
                                                        <p className='my-1 py-1' style={{ }}>
                                                            Mercredi
                                                        </p>
                                                        <p className='my-1 py-1' style={{ }}>
                                                            14h - 15h
                                                        </p>
                                                    </div>
                                                    <div className="d-flex justify-content-between mt-0" style={{  }}>
                                                        <p className='my-1 py-1' style={{ }}>
                                                            Samedi
                                                        </p>
                                                        <p className='my-1 py-1' style={{ }}>
                                                            15h - 16h
                                                        </p>
                                                    </div>
                                                    {/* <p>
                                                        Mercredi <br />
                                                        Samedi 
                                                    </p> */}
                                                    <p></p>
                                                    <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                        <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                            Yoseikan Karate Do
                                                        </p>
                                                    </div>
                                                    <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                        <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                            Goshindo Jiujutsu
                                                        </p>
                                                    </div>
                                                    <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                        <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                            Systema
                                                        </p>
                                                    </div>
                                                </>
                                                : prestation === "sports"
                                                    ? 
                                                    <>
                                                        {/* <p>Samedi </p> */}
                                                        <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                            <p className='mb-1 pb-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                                Fitness(Danse Sportive)
                                                            </p>
                                                            <p className='mb-1 pb-1' style={{ fontSize: 15, color: "#606A6B" }}>
                                                                18h30 - 20h
                                                            </p>
                                                        </div>
                                                    </>
                                                    : prestation === "arts-dramatiques"
                                                        ? 
                                                        <>
                                                            <div className="d-flex justify-content-between mb-0" style={{  }}>
                                                                <p className='my-1 py-1' style={{ }}>
                                                                    Mercredi
                                                                </p>
                                                                <p className='my-1 py-1' style={{ }}>
                                                                    10h - 11h
                                                                </p>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-0" style={{  }}>
                                                                <p className='my-1 py-1' style={{ }}>
                                                                    Samedi
                                                                </p>
                                                                <p className='my-1 py-1' style={{ }}>
                                                                    14h - 15h
                                                                </p>
                                                            </div>
                                                            {/* <p>Samedi </p> */}
                                                            {/* <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                                    Art Théâtrales
                                                                </p>
                                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                                    14h - 15h
                                                                </p>
                                                            </div> */}
                                                            <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                                    Théâtres
                                                                </p>
                                                            </div>
                                                            <div className="pt-2 d-flex justify-content-between" style={{ fontWeight: 300, borderBottom: "1px dashed #ccc" }}>
                                                                <p className='mb-1 pb-1' style={{fontSize: 15, color: "#606A6B"}}>
                                                                    Contes
                                                                </p>
                                                            </div>
                                                        </>
                                                        : ""
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
      </>
  )
}

export default Prestation
