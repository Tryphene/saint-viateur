import React, { useEffect, useState} from 'react'
import Conteneur from '../../components/Conteneur'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { GiTeacher } from 'react-icons/gi';
import Table from '../../components/Table';
import { PiStudentBold } from 'react-icons/pi';
// import Diagramme from '../../components/Diagramme';
// import { items, optionsVue, optionsProduit} from '../../data';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { MdAppRegistration } from 'react-icons/md';
// import axios from 'axios';
import { instance } from '../../axios';
import { PieChart } from '@mui/x-charts/PieChart';
import {  LineChart } from '@mui/x-charts/LineChart';
// import bcrypt from 'bcryptjs';

const Dashboard = () => {
  // const { admin } = useContext(AdminContext)
  const label = [
    "Cours",
    "Apprenant",
    "Numéro Apprenant",
    "Professeur",
    "Numéro Professeur",
    "Heure",
    "Action",
  ];

  const [tableau, setTableau] = useState([]);
  const [nombreCoursJour, setNombreCoursJour] = useState(0);
  const [nombreApprenant, setNombreApprenant] = useState(0);
  const [nombreProfesseur, setNombreProfesseur] = useState(0);
  const [coursEnCours, setCoursEnCours] = useState(0);
  const [loading, setLoading] = useState();
  const [coursTermine, setcoursTermine] = useState(0);

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

    const items2 = [
        {
          name: "Terminé",
            color: "#00ced1",
          nombre: coursTermine
          
        },
        {
          name: "En cours",
            color: "rgb(255, 205, 86)",
          nombre: coursEnCours
        },
      ];
      
    const produit = {
        labels: ["Terminé", "En cours"],
        datasets: [
          {
            label: "My First Dataset",
            data: [coursTermine, coursEnCours],
            backgroundColor: ["#00ced1", "rgb(255, 205, 86)"],
            hoverOffset: 4,
          },
        ],
  };
  
  const vue = {
    labels: [
      "Jan",
      "Fev",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Inscription",
        data: [mois.Jan, mois.Fev, mois.Mars,mois.Avril, mois.Mai, mois.Juin, mois.Juil, mois.Août, mois.Sep, mois.Oct, mois.Nov, mois.Dec],
        backgroundColor: ["#0082c8"],
        hoverOffset: 4,
        borderRadius: 7,
        barPercentage: 0.2,
      },
    ],
  };
  

  const fetchData = (champs, month) => {
    instance.get(`apprenant/count-by-month?month=${month}`)
      .then(response => {
        setMois((prevMois) => ({
          ...prevMois,
          [champs]: response.data // Use computed property name to update the specific month
        }));
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData('Jan', 1);
    fetchData('Fev', 2);
    fetchData('Mars', 3);
    fetchData('Avril', 4);
    fetchData('Mai', 5);
    fetchData('Juin', 6);
    fetchData('Juil', 7);
    fetchData('Août', 8);
    fetchData('Sep', 9);
    fetchData('Oct', 10);
    fetchData('Nov', 11);
    fetchData('Dec', 12);
  }, []);

  const xLabels = [
  "Jan",
    "Fev",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const [currentCours, setCurrentCours] = useState([]);
    
        useEffect(() => {
            setTableau([...currentCours]);
        }, [currentCours]);

        useEffect(() => {
          setNombreCoursJour(tableau.length)
        }, [tableau])

  const fetchDataCount = (url, set) => {
    instance.get(url)
              .then(({ data }) => {
                set(data.totalElements);
                setLoading(false);
              })
              .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false);
              });
            
          };

        useEffect(() => {
              fetchDataCount('apprenant/count', setNombreApprenant);
              fetchDataCount('professeur/count', setNombreProfesseur);
              fetchDataCount('cours/count-encours', setCoursEnCours);
              fetchDataCount('cours/count-termine', setcoursTermine);
            }, []);
    

    const apprenant = {
        id: "",
        nom: "",
        prenom: "",
    };

    const list = (item) => {
        apprenant.id = item.id
        apprenant.nom = item.nom
        apprenant.prenom = item.prenom
        apprenant.dteNaissance = item.dteNaissance
        apprenant.profession = item.profession
        apprenant.nvScolaire = item.nvScolaire
        apprenant.mail = item.mail
        apprenant.mdp = item.mdp
        apprenant.telephone = item.telephone
        apprenant.domaine = item.domaine
        apprenant.status = item.status
        apprenant.dteDebutCours = item.dteDebutCours
        apprenant.dteFinCours = item.dteFinCours

        localStorage.setItem('apprenantInfo', JSON.stringify(apprenant))
        
        console.log(apprenant);
  }
  
      localStorage.setItem('select', 0)
  
      const [chiffre, setChiffre] = useState(10);
      const handleChangeChiffre = (event) => {
        const newChiffre = parseInt(event.target.value, 10);
        setChiffre(newChiffre);
      };
    
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = chiffre;
    
      const [totalPage, setTotalPage] = useState(Math.ceil(tableau.length / itemsPerPage));
    
      useEffect(() => {
        const newTotalPage = Math.ceil(tableau.length / itemsPerPage);
        setCurrentPage(1);
        setTotalPage(newTotalPage);
      }, [tableau, itemsPerPage]);
    
      const calculateDisplayedPages = () => {
        const MIN_PAGES = 10; // Nombre minimum de pages affichées
    
        if (totalPage <= MIN_PAGES) {
          // Si le nombre total de pages est inférieur ou égal au nombre minimum, toutes les pages sont affichées
          return Array.from({ length: totalPage }, (_, i) => i + 1);
        }
    
        const isStartEllipsisVisible = currentPage > 2;
        const isEndEllipsisVisible = currentPage < totalPage - 1;
    
        let startPage = currentPage - Math.floor(MIN_PAGES / 2);
        let endPage = currentPage + Math.floor(MIN_PAGES / 2);
    
        if (startPage < 1) {
          startPage = 1;
          endPage = MIN_PAGES;
        }
    
        if (endPage > totalPage) {
          startPage = totalPage - MIN_PAGES + 1;
          endPage = totalPage;
        }
    
        const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    
        if (isStartEllipsisVisible) {
          pages.unshift('...');
        }
    
        if (isEndEllipsisVisible) {
          pages.push('...');
        }
    
        return pages;
      };
    
      const pages = calculateDisplayedPages();
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = tableau.slice(startIndex, endIndex);
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
  };
  
  const [marquePresence, setMarquePresence] = useState([]);

  useEffect(() => {
    const fetchData= () => {
      instance.get('marque-de-presence/read-cours-du-jour')
        .then(response => {
          setMarquePresence(response.data)
          // console.log(response.data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          setLoading(false)
        });
    };

    fetchData()
  }, [])
  
  // const [nomCours, setNomCours] = useState("")
  // const [idCours, setIdCours] = useState([])
  // const [nomProfesseur, setNomProfesseur] = useState("")
  // const [nomApprenant, setNomApprenant] = useState("")

  // useEffect(() => {
  //   async function fetchProfesseurName() {
  //         const professeurNames = {};
  //         for (const fils of marquePresence) {
  //           try {
  //             const response = await fetch(`http://localhost:8081/professeur/professeur-for-marque-presence/${fils.id}`);
  //             const data = await response.json();
  //             professeurNames[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
  //           } catch (error) {
  //             console.error("Erreur lors de la récupération du nom du père :", error);
  //             professeurNames[fils.id] = {nom: "Professeur Inconnu"};
  //           }
  //         }
  //         setNomProfesseur(professeurNames);
  //       }
        
  //       async function fetchApprenantName() {
  //         const apprenantNames = {};
  //         for (const fils of marquePresence) {
  //           try {
  //             const response = await fetch(`http://localhost:8081/apprenant/apprenant-for-marque-presence/${fils.id}`);
  //             const data = await response.json();
  //             apprenantNames[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
  //           } catch (error) {
  //             console.error("Erreur lors de la récupération du nom du père :", error);
  //             apprenantNames[fils.id] = {nom: "Id Inconnu"};
  //           }
  //         }
  //         setNomApprenant(apprenantNames);
  //       }
        
  //       async function fetchIdCours() {
  //         const idCour = {};
  //         for (const fils of marquePresence) {
  //           try {
  //             const response = await fetch(`http://localhost:8081/cours/cours-for-marque-presence/${fils.id}`);
  //             const data = await response.json();
  //             idCour[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
  //           } catch (error) {
  //             console.error("Erreur lors de la récupération du nom du père :", error);
  //             idCour[fils.id] = {nom: "Id Inconnu"};
  //           }
  //         }
  //         setIdCours(idCour);
  //       }
        
  //     fetchProfesseurName()
  //     fetchApprenantName()
  //     fetchIdCours()
  //   }, [marquePresence]);
    
  // useEffect(() => {
  //   async function fetchPereNames() {
  //     er
  //       try {
  //         const response = await fetch(`http://localhost:8081/domaine-categorie/domaine-categorie-for-cours/${fils.id}`);
  //         const data = await response.json();
  //         pereNames[fils.id] = data.libelle; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
  //       } catch (error) {
  //         console.error("Erreur lors de la récupération du nom du père :", error);
  //         pereNames[fils.id] = "Nom Inconnu";
  //       }
  //     }
  //     setNomCours(pereNames);
  //   }
    
  //   fetchPereNames();
  // }, [idCours]);

  useEffect(() => {
    const today = new Date();
    const filteredCours = marquePresence.filter(course => {
      const courseDate = new Date(course.dateMarqueDePresence);
      return courseDate.getDate() === today.getDate() &&
             courseDate.getMonth() === today.getMonth() &&
             courseDate.getFullYear() === today.getFullYear();
    });
    setCurrentCours(filteredCours);
  }, [marquePresence]);
  
    return (
      <>
        <Container style={{ marginTop: 50 }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={4}>
              {loading ? <Spinner animation="border" variant="dark" /> :
                <Conteneur bg="linear-gradient(to right, #2ACEDE, #4C98E6)" color="#0DCAF0" icon={<PiStudentBold size={25} />} titre="Total Apprenant" nombre={nombreApprenant} />
              }
            </Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              {loading ? <Spinner animation="border" variant="dark" /> : 
                      <Conteneur bg="linear-gradient(to right, #FFC846, #FF9953)" color="#FFC107" icon={<GiTeacher size={25} /> } titre="Total Enseignant" nombre={nombreProfesseur} />
                    }
                  </Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              {loading ? <Spinner animation="border" variant="dark" /> : 
                <Conteneur bg="linear-gradient(to right, #F85996, #FD6E80)" color="#FD3550" icon={<MdAppRegistration size={25} />} titre="Total Cours du Jour" nombre={nombreCoursJour} />
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="containeur" style={{ marginTop: 40 }}>
                <Table
                  data={tableau}
                  nomFichier='ListeX.xlsx'
                  onChangeChiffre={handleChangeChiffre}
                  chiffre={chiffre}
                  item={currentCours}
                  items={label}
                  titre="Cours du jour"
                  sousTitre="Liste des cours programmé le jour en cours"
                  nom="Aucun cours programmé aujourd'hui"
                  elements={currentCours}
                  setAdmins={setTableau}
                  admins={currentCours}
                >
                  {loading ? <center><Spinner animation="border" variant="dark" /></center> : 
                    currentItems.map((cour, index) => {
                      return (
                        <>
                          <tr key={cour.id} id="navbar-example3">
                            <th scope="row">{cour.nomCours}</th>
                            <td>{cour.apprenantPrenom} {cour.apprenantNom}</td>
                            <td>{cour.apprenantTelephone}</td>
                            <td>{cour.profPrenom} {cour.profNom}</td>
                            <td>{cour.profTelephone}</td>
                          <td>{cour.heure}</td>
                          <td>
                            <Link to={`http://localhost:3000/detailApprenant/${cour.apprenantId}/#cours${cour.id}`}>
                              <button type="button" className="icon-button" onClick={() => { list(cour) }}>
                                <FiEye size={18} />
                              </button>
                            </Link>
                          </td>
                        </tr>
                        </>
                      )
                    })
                  }
                </Table>
                {currentItems.length > 0 && <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: "flex-end" }}>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => { setCurrentPage(currentPage - 1) }}>Précédent</Link></li>
                      {pages.map((page, index) => (
                        <li className={`page-item ${page === currentPage && 'active'} ${page === "..." && 'disabled'} `} key={index} onClick={() => handlePageChange(page)}>
                          <Link className={`page-link`}>{page}</Link>
                        </li>
                      ))}
                      <li className={currentPage === totalPage ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => { setCurrentPage(currentPage + 1) }}>Suivant</Link></li>
                    </ul>
                  </nav>
                </div>}
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: 40 }}>
            <Col xs={12} sm={12} md={12} lg={8}>
              <div className="containeur" style={{ marginTop: 40 }}>
                {nombreApprenant > 0 ?
                  (
                    <>
                      
                  {/* <Diagramme key={0} items={items} titre="Vue d’ensemble des inscriptions" type='bar' color="#fc256f" data={vue} options={optionsVue} /> */}
                  <div className="contain" style={{ paddingBottom: 0, paddingTop: 0, marginTop: 0 }}>
                    <p style={{ marginLeft: 10, paddingBottom: -40, marginBottom: -40  }}>Vue d’ensemble des Inscriptions sur l'Année</p>
                    <LineChart
                      className='line-chart'
                      xAxis={[{ scaleType: 'point', data: xLabels }]}
                      series={[
                        {
                          color: '#0082C8',
                          label: 'Inscription',
                          data: [mois.Jan, mois.Fev, mois.Mars, mois.Avril, mois.Mai, mois.Juin, mois.Juil, mois.Août, mois.Sep, mois.Oct, mois.Nov, mois.Dec],
                          area: true,
                        },
                      ]}
                      // width={770}
                      height={500}
                    />
                  </div>
                    </>
                  )
                  :
                  (
                    <>
                      <p style={{ marginLeft: 10, }}>Vue d’ensemble des Inscriptions sur l'Année</p>
                      <p className="ms-4" style={{ fontWeight: 300, fontSize: 14 }}>Aucun apprenant inscrit pour le moment</p>
                    </>
                  )
                }
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              <div className="containeur" style={{ marginTop: 40 }}>
                {coursEnCours === 0 && coursTermine === 0 ? (
                  <>
                    <p className="ms-2">Récapitulatif des cours</p>
                    <p className="ms-4" style={{fontWeight: 300, fontSize: 14}}>Pas de cours enregistré pour le moment</p>
                  </>)
                  :
                  <>
                    {/* <Diagramme key={1} size={255} items={items2} titre="Récapitulatif des cours" type="doughnut" color="#fc256f" data={produit} options={optionsProduit} /> */}
                    <p style={{ marginLeft: 10, paddingBottom: 8, marginBottom: 8 }}>Récapitulatif des cours</p>
                    <PieChart
                      className='pie-chart'
                      series={[
                        {
                          data: [
                            { id: 0, value: coursTermine, label: 'Terminé', color: '#02D5D1' },
                            { id: 1, value: coursEnCours, label: 'En cours', color: 'rgb(255, 205, 86)' },
                          ],
                          innerRadius: 30,
                          outerRadius: 100,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -180,
                          endAngle: 180,
                          cx: 150,
                          cy: 150,
                        },
                      ]}
                      // width={400}
                      height={300}
                    />
                    <Container style={{ marginTop: 0, marginBottom: 40 }}>
                      <Row>
                        <Col>
                          <ol className="list-group mt-4">
                            {items2.map((item, index) => {
                              return (
                                <>
                                  <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                      {item.name}
                                    </div>
                                    <span style={{ backgroundColor: item.color }} className="badge rounded-pill">{item.nombre}</span>
                                  </li>
                                </>
                              )
                            })}
                          </ol>
                        </Col>
                      </Row>
                    </Container>
                  </>
                }
                {/* <Diagramme key={1} size={255} items={items2} titre="Récapitulatif des cours" type="doughnut" color="#fc256f" data={produit} options={optionsProduit} /> */}
              </div>
            </Col>
          </Row>
        </Container>
        
    </>
  )
}

export default Dashboard
