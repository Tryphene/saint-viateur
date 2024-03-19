import { useContext, useEffect, useState } from 'react'
import * as React from 'react';
import { ApprenantContext } from '../../context/ApprenantContext';
import { Col, Row } from 'react-bootstrap';
// import absence2 from "../../img/absence2.png"
import cours7 from "../../img/cours7.png"
import cours8 from "../../img/cours8.png"
import cours9 from "../../img/cours9.png"
import moment from 'moment';
import { instance } from '../../axios';
import Status from '../../components/Status';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { MdOutlineExpandMore } from 'react-icons/md';
import { LineChart } from '@mui/x-charts';
// import { FaCheck } from 'react-icons/fa';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const MesCours = () => {
    // const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
    
    const { apprenant } = useContext(ApprenantContext);
    // const [loading, setLoading] = useState(true);
    const [allCours, setAllCours] = useState([])
    const [coursAActive, setCoursAActive] = useState([])
    const [coursTermine, setCoursTermine] = useState(0)
    const [enCours, setEnCours] = useState(0)

    const [nomCours, setNomCours] = useState("")
    const [nomProfesseur, setNomProfesseur] = useState("")
    const [professeur, setProfesseur] = useState([])
    const [repertoireProf, setRepertoireProf] = useState([])

  useEffect(() => {
    async function fetchProfesseurName() {
        const professeurNames = {};
        const professeur = [];
          for (const fils of allCours) {
            try {
              const response = await fetch(`http://localhost:8081/professeur/professeur-for-cours/${fils.id}`);
                const data = await response.json();
                console.log(data);
                professeur.push(data);
              professeurNames[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
            } catch (error) {
              console.error("Erreur lors de la récupération du nom du père :", error);
              professeurNames[fils.id] = {nom: "Professeur Inconnu"};
            }
        }
        setProfesseur(professeur);
          setNomProfesseur(professeurNames);
      }
      
      async function fetchCoursNames() {
        const coursNames = {};
        for (const fils of  allCours) {
          try {
            const response = await fetch(`http://localhost:8081/domaine-categorie/domaine-categorie-for-cours/${fils.id}`);
            const data = await response.json();
              coursNames[fils.id] = data;
              console.log(data);
          } catch (error) {
            console.error("Erreur lors de la récupération du nom du père :", error);
            coursNames[fils.id] = "Nom Inconnu";
          }
        }
        setNomCours(coursNames);
      }

      const fetchDataNonActif = () => {
        instance.get(`cours/read-cours-apprenant-actif-sans-prof/${apprenant.id}`, {
            params: {
                isActif: false, 
          }
      })
          .then(response => {
              setCoursAActive(response.data);
            //   console.log(response.data);
            //   setLoading(false)
            //   console.log("yes");
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            // setLoading(false)
        });
    };
      
    fetchDataNonActif()
      fetchCoursNames();
      fetchProfesseurName()
  }, [allCours, apprenant.id]);
    
    useEffect(() => {
        console.log(professeur);
    }, [professeur])
    
    useEffect(() => {
        const fetchData = (url, status, set, isActif) => {
            instance.get(url, {
                params: {
                    status: status ,
                    id: apprenant.id,
                    isActif: isActif,
                }
            })
                .then(response => {
                    console.log(response.data)
                    set(response.data.totalElements)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };
        
        const termine = () => {
            instance.get(`cours/all-cours-actif/${apprenant.id}`, {
                params: {
                    isActif: true,
                }
            })
                .then(response => {
                    console.log(response.data)
                    setAllCours(response.data)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                });
        };
        
        termine()
        fetchData('cours/count-by-apprenant', 'Terminé', setCoursTermine, true);
        fetchData('cours/count-by-apprenant', 'En cours', setEnCours, true);
    }, [apprenant.id])

    useEffect(() => {
        const tableauSansDoublons = [];
        for (const objet of professeur) {
      const existeDeja = tableauSansDoublons.some(item => item.nom === objet.nom && item.prenom === objet.prenom);
      if (!existeDeja) {
        tableauSansDoublons.push(objet);
      }
    }
    
        // console.log(tableauSansDoublons);
        setRepertoireProf(tableauSansDoublons)
          
      }, [professeur]);
    
      useEffect(() => {
        console.log(repertoireProf);
      }, [repertoireProf])
    
      const [mois, setMois] = useState({
        Jan: 0,
        Fev: 0,
        Mars: 0,
        Avril: 0,
        Mai: 0,
        Juin: 0,
        Juil: 0,
        Août: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      })
    
      const [moisAbsence, setMoisAbsence] = useState({
        Jan: 0,
        Fev: 0,
        Mars: 0,
        Avril: 0,
        Mai: 0,
        Juin: 0,
        Juil: 0,
        Août: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      })
    
      
    
    useEffect(() => {
        const fetchData = (champs, month, presence, set) => {
            instance.get(`marque-de-presence/count-presence-by-month/${apprenant.id}?month=${month}&presence=${presence}`)
                .then(response => {
                  console.log(response.data);
                set((prevMois) => ({
                  ...prevMois,
                  [champs]: response.data // Use computed property name to update the specific month
                }));
                // setLoading(false);
              })
              .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                // setLoading(false);
              });
        };

        if (apprenant.id !== undefined) {
            fetchData('Jan', 1, "Présent", setMois);
            fetchData('Jan', 1, "Absent", setMoisAbsence);
          
            fetchData('Fev', 2, "Présent", setMois);
            fetchData('Fev', 2, "Absent", setMoisAbsence);
          
            fetchData('Mars', 3, "Présent", setMois);
            fetchData('Mars', 3, "Absent", setMoisAbsence);

            fetchData('Avril', 4, "Présent", setMois);
            fetchData('Avril', 4, "Absent", setMoisAbsence);

            fetchData('Mai', 5, "Présent", setMois);
            fetchData('Mai', 5, "Absent", setMoisAbsence);

            fetchData('Juin', 6, "Présent", setMois);
            fetchData('Juin', 6, "Absent", setMoisAbsence);

            fetchData('Juil', 7, "Présent", setMois);
            fetchData('Juil', 7, "Absent", setMoisAbsence);

            fetchData('Août', 8, "Présent", setMois);
            fetchData('Août', 8, "Absent", setMoisAbsence);

            fetchData('Sep', 9, "Présent", setMois);
            fetchData('Sep', 9, "Absent", setMoisAbsence);

            fetchData('Oct', 10, "Présent", setMois);
            fetchData('Oct', 10, "Absent", setMoisAbsence);

            fetchData('Nov', 11, "Présent", setMois);
            fetchData('Nov', 11, "Absent", setMoisAbsence);

            fetchData('Dec', 12, "Présent", setMois);
            fetchData('Dec', 12, "Absent", setMoisAbsence);
        }
      }, [apprenant.id]);

    const pData = [mois.Jan, mois.Fev, mois.Mars, mois.Avril, mois.Mai, mois.Juin, mois.Juil, mois.Août, mois.Sep, mois.Oct, mois.Nov, mois.Dec];
    const uData = [moisAbsence.Jan, moisAbsence.Fev, moisAbsence.Mars, moisAbsence.Avril, moisAbsence.Mai, moisAbsence.Juin, moisAbsence.Juil, moisAbsence.Août, moisAbsence.Sep, moisAbsence.Oct, moisAbsence.Nov, moisAbsence.Dec];
const xLabels = [
  'Jan',
  'Fev',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

    return (
        <>
            {/* <p style={{ fontSize: 30, fontWeight: 300 }}>Mes cours</p> */}
            {/* <Row className="mt-2">
                <Col xs={12} sm={12} md={12} lg={4}>
                    <div className="d-flex justify-content-evenly p-2 rounded-3" style={{ color: "black", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", with: "auto", backgroundImage: "linear-gradient(to right, #F47497, #FE9077)" }}>
                        <div className="">
                            <p className="fw-bolder" style={{ fontSize: 37, marginBottom: 0 }}>430</p>
                            <p className="" style={{ fontSize: 15, marginTop: 0 }}>Nombre de client</p>
                        </div>
                        <div className="icon mt-3" style={{ backgroundColor: 'white' }}>
                            <Fa0 size={20} color='#F47497' />
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                    <div className="d-flex justify-content-evenly p-2 rounded-3" style={{ color: "black", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", with: "auto", backgroundImage: "linear-gradient(to right, #4F62FF, #9BA8FE)" }}>
                        <div className="">
                            <p className="fw-bolder" style={{ fontSize: 37, marginBottom: 0 }}>430</p>
                            <p className="" style={{ fontSize: 15, marginTop: 0 }}>Nombre de client</p>
                        </div>
                        <div className="icon mt-3" style={{ backgroundColor: 'white' }}>
                            <Fa0 size={20} color='#4F62FF' />
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                    <div className="d-flex justify-content-evenly p-2 rounded-3" style={{ color: "black", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", with: "auto", backgroundImage: "linear-gradient(to right, #2974A9, #84B6DF)" }}>
                        <div className="">
                            <p className="fw-bolder" style={{ fontSize: 37, marginBottom: 0 }}>430</p>
                            <p className="" style={{ fontSize: 15, marginTop: 0 }}>Nombre de client</p>
                        </div>
                        <div className="icon mt-3" style={{ backgroundColor: 'white' }}>
                            <Fa0 size={20} color='#2974A9' />
                        </div>
                    </div>
                </Col>
            </Row> */}
            <Row className="mt-2">
                <Col xs={12} sm={12} md={12} lg={8} className="mb-3">
                    {/* <div className="py-3 px-4 rounded-3" style={{ color: "black", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", with: "auto", backgroundColor: 'white'}}> */}
                    <div className="py-3 px-4 rounded-3" style={{ color: "black", border: "1px solid #E5E5E5", with: "auto", backgroundColor: 'white'}}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Vue sur mes cours</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Vue global de mes cours</p>
                            </div>
                        </div>
                        <Row className="pt-4">
                            <Col xs={12} sm={12} md={12} lg={4} className='mb-2'>
                                <div className="d-flex justify-content-evenly pt-3 rounded-3 m-0" style={{ color: "black", with: "auto", backgroundColor: "#FFE2E6", paddingBottom: 35 }}>
                                    <div className="iconnn mt-2" style={{ backgroundColor: '#FA5A7E' }} >
                                        <img src={cours7} width={25} alt="" />
                                    </div>
                                    <div className="m-0">
                                        <p className="fw-bolder my-0" style={{ fontSize: 30 }}>{allCours.length}</p>
                                        <p className="text-muted my-0" style={{ fontSize: 16, fontWeight: 400, letterSpacing: 0 }}>Total de mes cours</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} className='mb-2'>
                                <div className="d-flex justify-content-evenly pt-3 rounded-3 m-0" style={{ color: "black", with: "auto", backgroundColor: "#FFF4DE", paddingBottom: 35 }}>
                                    <div className="iconnn mt-2" style={{ backgroundColor: '#FF947A' }} >
                                        <img src={cours8} width={25} alt="" />
                                    </div>
                                    <div className="m-0">
                                        <p className="fw-bolder my-0" style={{ fontSize: 30 }}>{enCours}</p>
                                        <p className="text-muted my-0" style={{ fontSize: 16, fontWeight: 400, letterSpacing: 0 }}>Cours non terminés</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} className='mb-2'>
                                <div className="d-flex justify-content-evenly pt-3 rounded-3 m-0" style={{ color: "black", with: "auto", backgroundColor: "#DCFCE7", paddingBottom: 35 }}>
                                    <div className="iconnn mt-2" style={{ backgroundColor: '#3CD856' }} >
                                        <img src={cours9} width={25} alt="" />
                                    </div>
                                    <div className="m-0">
                                        <p className="fw-bolder my-0" style={{ fontSize: 30 }}>{coursTermine}</p>
                                        <p className="text-muted my-0" style={{ fontSize: 16, fontWeight: 400, letterSpacing: 0 }}>Cours terminés</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col xs={12} sm={12} md={12} lg={4}>
                                <div className="py-3 px-4 rounded-3" style={{ color: "black", with: "auto", backgroundColor: '#FFE2E6' }}>
                                    <div className="iconn" style={{ backgroundColor: '#FA5A7E' }}>
                                        <img src={cours7} width={30} alt="" />
                                    </div>
                                    <p className="fw-bolder pt-2" style={{ fontSize: 37, marginBottom: 0 }}>{allCours.length}</p>
                                    <p className="" style={{ fontSize: 15, marginTop: 0, marginBottom: 0 }}>Total de mes cours</p>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4}>
                                <div className="py-3 px-4 rounded-3" style={{ color: "black", width: "auto", backgroundColor: '#FFF4DE' }}>
                                    <div className="iconn" style={{ backgroundColor: '#FF947A' }}>
                                        <img src={cours8} width={30} alt="" />
                                    </div>
                                    <p className="fw-bolder pt-2" style={{ fontSize: 37, marginBottom: 0 }}>{enCours}</p>
                                    <p className="" style={{ fontSize: 15, marginTop: 0, marginBottom: 0 }}>Cours non terminés</p>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4}>
                                <div className="py-3 px-4 rounded-3" style={{ color: "black", width: "auto", backgroundColor: '#DCFCE7' }}>
                                    <div className="iconn" style={{ backgroundColor: '#3CD856' }}>
                                        <img src={cours9} width={30} alt="" />
                                    </div>
                                    <p className="fw-bolder pt-2" style={{ fontSize: 37, marginBottom: 0 }}>{coursTermine}</p>
                                    <p className="" style={{ fontSize: 15, marginTop: 0, marginBottom: 0 }}>Cours terminés</p>
                                </div>
                            </Col>
                        </Row> */}
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4}>
                    {/* <div className="py-3 px-4 rounded-3" style={{ color: "white", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", with: "auto", backgroundColor: 'white', backgroundImage: "linear-gradient(to right,  #2974A9, #84B6DF)" }}> */}
                    <div className="py-3 px-4 rounded-3" style={{ color: "black", border: "1px solid #E5E5E5", with: "auto", backgroundColor: 'white' }}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Vue sur mes présences</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13, color: 'white' }}>Vue de mes présences sur l'ensemble de l'année </p>
                            </div>
                        </div>
                        <div className="contain-line-chart" style={{}}>
                            <LineChart
                                className='line-chart'
                                height={220}
                                series={[
                                    { data: pData, label: 'Présent' },
                                    { data: uData, label: 'Absent' },
                                ]}
                                xAxis={[{ scaleType: 'point', data: xLabels }]}
                                sx={{
                                    '.MuiLineElement-root': {
                                    //   stroke: '#8884d8',
                                      strokeWidth: 2,
                                    },
                                    '.MuiMarkElement-root': {
                                    //   stroke: '#8884d8',
                                      scale: '0.6',
                                      fill: '#fff',
                                      strokeWidth: 2,
                                    },
                                  }}
                                  disableAxisListener
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            {/* <Row className='mt-5'>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="py-3 px-4 rounded-3" style={{ color: "white", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", with: "auto", backgroundColor: 'white', backgroundImage: "linear-gradient(to right,  #2974A9, #84B6DF)" }}>
                    <div className="py-3 px-4 rounded-3" style={{ color: "black", with: "auto", backgroundColor: 'white' }}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Répertoire de mes profs</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13, color: 'white' }}>Liste de tous mes enseignants</p>
                            </div>
                        </div>
                        <div className="">
                            {repertoireProf.length > 0 ?
                                (
                                    <div className='ms-3'>
                                        <p className='text-muted' style={{fontWeight: 300}}>Vous pouvez consulter cette liste pour retouver le contact de l'un de vos enseignants.</p>
                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <MdOutlineExpandMore size={25} color="#2196F3" />
                                        </ExpandMore>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            {repertoireProf.map((prof) => {
                                                    return (
                                                        <>
                                                            <div className="d-flex mt-3">
                                                                <FaCheck size={17} color='blue' className='mt-1' />
                                                                <div className='mx-2 ps-2' style={{}}>{prof.nom} {prof.prenom}  :  {prof.telephone}</div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                        </Collapse>
                                    </div>
                                )
                                :
                                (
                                    <p style={{ fontSize: 17, fontWeight: 300 }}>Votre repertoire est vide.</p>
                                )
                            }
                            </div>
                        </div>
                </Col>
            </Row> */}

            <Row className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12}>
                    {/* <div className="table-responsive p-3 rounded-2" style={{ backgroundColor: 'white', boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",}}> */}
                    <div className="table-responsive p-3 rounded-2" style={{ backgroundColor: 'white', border: "1px solid #E5E5E5",}}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Cours en attente d'activation</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Activez vos cours en effectuant le paiement au conservatoire</p>
                            </div>
                        </div>
                        {coursAActive.length > 0 ? 
                            (
                                <>
                                    <table className="table rounded-2">
                            <thead className='table-primary'>
                            {/* <thead className='table-light'> */}
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">Cours</th>
                                    {/* <th scope="col">Professeur</th> */}
                                    <th scope="col">Date Début</th>
                                    <th scope="col">Date Fin</th>
                                    <th scope="col">Heure</th>
                                    <th scope="col">Forfait</th>
                                    {/* <th scope="col">Statut</th> */}
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {coursAActive.length > 0 && coursAActive.map((cour, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td className='align-middle'>{cour.nomCours}</td>
                                                    {/* <td className='align-middle'>{cour.nomProfesseur} {cour.prenomProfesseur}</td> */}
                                                    <td className='align-middle'>{moment(cour.dateDebutCours).format('DD MMMM YYYY')}</td>
                                                    <td className='align-middle'>{moment(cour.dateFinCours).format('DD MMMM YYYY')}</td>
                                                    <td className='align-middle'>{cour.heureCours}</td>
                                                    <td className='align-middle'>{cour.forfait}</td>
                                                    {/* <td className='align-middle'>{cour.status === 'En cours' ? <Status titre={cour.status} bgColor="linear-gradient(to right, #FFCC45, #FF9554)" /> : <Status titre={cour.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> }</td> */}
                                                    {/* <td className='align-middle'>{cour.echeancierUsed && <BsEye size={25} />}</td> */}
                                                </tr>
                                            </>
                                        )
                                    })}
                            </tbody>
                        </table>
                                </>
                            )
                            :
                            (
                                <>
                                    <p className='ms-3' style={{fontWeight: 300}}>Auncun cours à activer</p>
                                </>
                            )
                        }
                    </div>
              </Col>
            </Row>
            
            <Row className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12}>
                    {/* <div className="table-responsive p-3 rounded-3" style={{ backgroundColor: 'white', boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", }}> */}
                    <div className="table-responsive p-3 rounded-3" style={{ backgroundColor: 'white', border: "1px solid #E5E5E5", }}>
                        <div className="d-flex justify-content-between mb-4" style={{ alignItems: "center", justifyItems: "center" }}>
                            <div className="">
                                <p className="my-0 py-0 fw-semibold" style={{ fontSize: 20, letterSpacing: 0, fontWeight: 400, color: 'black' }}>Mes cours</p>
                                <p className='my-0 text-muted' style={{ marginTop: 12, fontSize: 13 }}>Liste de tous mes cours</p>
                            </div>
                        </div>
                        {allCours.length > 0 ? 
                            (
                                <>
                                    <table className="table rounded-2 table-striped">
                            {/* <thead className='table-primary'> */}
                            <thead className=''>
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">Cours</th>
                                    <th scope="col">Professeur</th>
                                    <th scope="col">Date Début</th>
                                    <th scope="col">Date Fin</th>
                                    <th scope="col">Heure</th>
                                    <th scope="col">Forfait</th>
                                    <th scope="col">Statut</th>
                                    {/* <th scope="col"></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                    {allCours.length > 0 && allCours.map((cour, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td className='align-middle'>{nomCours[cour.id]?.libelle}</td>
                                                    <td className='align-middle'>{nomProfesseur[cour.id]?.prenom} {nomProfesseur[cour.id]?.nom}</td>
                                                    <td className='align-middle'>{moment(cour.dteDteDebutCours).format('DD MMMM YYYY')}</td>
                                                    <td className='align-middle'>{moment(cour.dteDteFinCours).format('DD MMMM YYYY')}</td>
                                                    <td className='align-middle'>{cour.heureCours}</td>
                                                    <td className='align-middle'>{cour.forfait}</td>
                                                    <td className='align-middle'>{cour.status === 'En cours' ? <Status titre={cour.status} bgColor="linear-gradient(to right, #FFCC45, #FF9554)" /> : <Status titre={cour.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> }</td>
                                                    {/* <td className='align-middle'>{cour.echeancierUsed && <BsEye size={25} />}</td> */}
                                                </tr>
                                            </>
                                        )
                                    })}
                                        </tbody>
                                    </table>
                                </>
                            )
                            :
                            (
                                <>
                                    <p className='ms-3' style={{fontWeight: 300}}>Aucun cours pour le moment</p>
                                </>
                            )
                        }
                        
                    </div>
              </Col>
            </Row>
        </>
    )
}

export default MesCours
