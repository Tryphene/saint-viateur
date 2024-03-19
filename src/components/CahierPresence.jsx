import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Accordion, Col, Row } from 'react-bootstrap';
import { ImCross, ImTab } from 'react-icons/im';
import { instance } from '../axios';
import CustomizedSnackbars from './CustomizedSnackbars';
import { PiCheckFatFill } from 'react-icons/pi';
import Tooltipp from './Tooltipp';

const CahierPresence = ({id, nomCours, entite, heureProf, app, profInterface}) => {
  const [cours, setCours] = useState([]);
  const [marquePresence, setMarquePresence] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [seanceEnCours, setSeanceEnCours] = useState();
  const [allSeance, setAllSeance] = useState();

  // const [formData, setFormData] = useState({
  //   heure: '',
  //   mois: '',
  //     id: ''
  // });

//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
// };

  const fetchApprenant = () => {
    instance.get(`cours/cours-is-actif-${entite}/${id}`, {
      params: {
        status: 'En cours',
        isActif: true
      }
    })
    .then(response => {
      setCours(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
  }

  useEffect(() => {
    if ((heureProf || profInterface) && id !== undefined) {
      instance.get(`marque-de-presence-professeur/find-domaine-id-heure-seance/${id}`)
        .then(response => {
        setAllSeance(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      }); }
  }, [id, heureProf, allSeance, profInterface])

  useEffect(() => {
    if ((heureProf || profInterface) && allSeance !== undefined && allSeance.length > 0) {
      const objetsAvecHeureFinNonNull = allSeance.filter((objet) =>
        objet.seanceList.some((seance) =>
          seance.seances.some((s) => s.heureFin == null)
        )
      );
      setSeanceEnCours(objetsAvecHeureFinNonNull);
      // console.log(objetsAvecHeureFinNonNull);
    }

  }, [id, heureProf, profInterface, allSeance])


  
  const [nombreApprenantSeance, setNombreApprenantSeance] = useState({});

  const fetchData = (url, item, date) => {
    instance.get(url, {
      params: {
        date: date,
        heure: item.heure
      }
    })
        .then(response => {
            // set(response.data);
          // console.log(response.data);
          // return (response.data);
            if (item) {
                setNombreApprenantSeance((prevResults) => ({
                    ...prevResults,
                    [item.id]: response.data,
                }));
            }
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          // setLoading(false)
      });
};

  useEffect(() => {
    if ((heureProf || profInterface) && allSeance !== undefined && allSeance.length > 0) {
      allSeance.forEach((ss, i) => {
        ss.seanceList.forEach((pp) => {
          pp.seances.forEach((item, ii) => {
            fetchData(`marque-de-presence/find-by-date/${id}/${ss.domaineId}`, item, item.dateMarqueDePresence)
          })
        })
     })
    }
  }, [allSeance, id, heureProf, profInterface])
  
  useEffect(() => { 
    // console.log(nombreApprenantSeance);
  }, [nombreApprenantSeance])
  

  useEffect(() => {
    const fetchApprenant = () => {
      instance.get(`cours/cours-is-actif-${entite}/${id}`, {
        params: {
          status: 'En cours',
          isActif: true
        }
      })
      .then(response => {
        setCours(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
    }

    if (id !== undefined && entite) {
      fetchApprenant();
    }
      
  }, [cours, entite, id]);
  
  useEffect(() => {
    // axios.get(`http://localhost:8081/marque-de-presence/find-by-apprenant-cours/${id}/${idCours}`)
    const dates = [];
    if (cours.length > 0) {
      for (let i = 0; i < cours.length; i++){
        // console.log("cour " + i, cours[i].marqueDePresenceList);
        dates.push(cours[i].marqueDePresenceList)
      setMarquePresence(dates)
    } 
    }
  }, [cours]);

  function calculateHourDifference(startHour, startMinute, endHour, endMinute) {
    const startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);
  
    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);
  
    const timeDifference = endTime - startTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
  
    return hoursDifference;
  }
  // console.log('xdrrrr', extractHoursMinutes('11:30'));

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

//   const arrayAvecDoublons = [1, 2, 2, 3, 4, 4, 5];

// const arraySansDoublons = [];

// for (const element of arrayAvecDoublons) {
//   if (!arraySansDoublons.includes(element)) {
//     arraySansDoublons.push(element);
//   }
// }

// console.log(arraySansDoublons); // Affiche [1, 2, 3, 4, 5]


  // useEffect(() => {
  //   async function fetchProfesseurName() {
  //     const professeurNames = {};
  //     for (const fils of marquePresence) {
  //       try {
  //         const response = await fetch(`professeur/professeur-for-marque-presence/${fils.id}`);
  //         const data = await response.json();
  //         professeurNames[fils.id] = data; // Assurez-vous d'ajuster le chemin pour accéder au nom du père dans la réponse de votre API
  //       } catch (error) {
  //         console.error("Erreur lors de la récupération du nom du père :", error);
  //         professeurNames[fils.id] = { nom: "Professeur Inconnu" };
  //       }
  //     }
  //     setNomProfesseur(professeurNames);
  //   }
  // }, [])

  const l = {}
  const list = (item) => {
    // const id = ''; 
    l.id = item.id
    l.heure = item.heure
    l.dateMarqueDePresence = item.dateMarqueDePresence
    console.log(l);
    console.log(new Date(l.dateMarqueDePresence));
    console.log(new Date());

    if (new Date(l.dateMarqueDePresence) > new Date()) {
      console.log('Impossibl  marqur l\hur pour  jours');
    }
  }

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
  };

  const courss = {}

  const handleMarkAttendance = (date, heure, presence, url, item, prof, itm, id) => {
    l.dateMarqueDePresence = item.dateMarqueDePresence
    console.log(l);
    console.log(new Date(l.dateMarqueDePresence));
    console.log(new Date());
    
    courss.idCours = itm.id

        if (new Date(l.dateMarqueDePresence) > new Date()) {
          handleClick()
        } else {
          // axios.post(`http://localhost:8081/marque-de-presence/create/${id}/${coursId}`, {
            instance.put(url, null, {
              params: {
                date: date,  
                heure: heure,
                presence: presence,
              }
          })
          .then(response => {
            console.log("yes");
            setOpen2(true)
    
            if (itm) {
              if (heureProf || profInterface) {
                instance.put(`marque-de-presence-professeur/update/heure-debut-fin-effectue`, null, {
                  params: {
                    date: date,  
                    heure: heure,
                    heureDebut: '0:0',
                    heureFin: '0:0',
                    heureEffectue: 0,
                    id: id
                  }
                })
                  .then(response => {
                    console.log('Heure effectuée mis à jour', response.data);
                  })
                  .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                  });
              }
              
              courss.dateFinCours = itm.dteDteFinCours
              if (courss.dateFinCours === l.dateMarqueDePresence) {
                console.log('Cours terminé');

                instance.put(`cours/update/status-cours/${courss.idCours}`, null, {
                  params: {
                    status: 'Terminé'
                  }
                })
                  .then(response => {
                    console.log('Status mis à jour', response.data);
                    window.location.reload()
                  })
                  .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                  });
              }
            }
          })
              .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
          });
        }
  };

  
  const setHeureDebut = (dat, heure, id, item) => {
    const date = new Date();
    const heureMinute = `${date.getHours()}:${date.getMinutes()}`

    l.dateMarqueDePresence = item.dateMarqueDePresence
    
        if (new Date(l.dateMarqueDePresence) > new Date()) {
          setOpen6(true)
        } else {
          localStorage.setItem("mois", monthNames[new Date(dat).getMonth()] + ' ' + new Date(dat).getFullYear())
          instance.put('marque-de-presence-professeur/update/heure-debut', null, {
            params: {
              date: dat,  
              heure: heure,
              heureDebut: heureMinute,
              id: id,
            }
        })
        .then(response => {
          console.log("yes", response.data);
          setOpen4(true);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          fetchApprenant()
        });
         }
  }

  const inputRefs = useRef([]);
  const recupererValeurInputParIndex = (id) => {
      const input = inputRefs.current[id];
      if (input) {
        const valeurInput = input.value;
        console.log(`La valeur de l'input avec l'ID ${id} est : ${valeurInput}`);
        return valeurInput
      }
    // });
  };

  const setHeureFin = (dat, heure, id, idPresence, item) => {
    const date = new Date();
    const heureMinute = `${date.getHours()}:${date.getMinutes()}`
    
    l.heureDebut = item.heureDebut
    l.dateMarqueDePresence = item.dateMarqueDePresence

              if (new Date(l.dateMarqueDePresence) > new Date()) {
                setOpen6(true)
              } else {
                if (l.heureDebut === null || l.heureDebut === '') {
                  setOpen3(true);
                } else {
                  instance.put('marque-de-presence-professeur/update/heure-fin', null, {
                    params: {
                      date: dat,
                      heure: heure,
                      heureFin: heureMinute,
                      id: id,
                    }
                  })
                    .then(response => {
                      console.log("yes", response.data);
                      setOpen5(true)

                      setTimeout(() => {
                        instance.put(`marque-de-presence-professeur/update/heure-effectue`, null, {
                          params: {
                            date: dat,
                            heure: heure,
                            heureEffectue: parseInt(recupererValeurInputParIndex(idPresence)),
                            // heureEffectue: Math.round(parseInt(recupererValeurInputParIndex(idPresence)) * 100.0) / 100.0,  
                            id: id, 
                          }
                        })
                          .then(response => {
                            console.log('Heure effectuée mis à jour', response.data);
                          })
                          .catch(error => {
                            console.error('Erreur lors de la récupération des données :', error);
                          });
                        
                      }, 4000);

                    })
                    .catch(error => {
                      console.error('Erreur lors de la récupération des données :', error);
                      fetchApprenant()
                    });
                }
          }
  }

  // useEffect(() => {
  //   console.log(nombreHeureValues[0].length);
  //   if (nombreHeureValues[0].length > 0) {
  //     console.log(nombreHeureValues);
  //   }
  // }, [nombreHeureValues])


  // useEffect(() => {
  //   // Fonction pour récupérer la valeur d'un input en fonction de l'index
    
  //   recupererValeurInputParIndex(1); // Par exemple, pour l'index 1
  //   recupererValeurInputParIndex(2); 
  //   recupererValeurInputParIndex(3); 
  //   recupererValeurInputParIndex(4); 
  //   recupererValeurInputParIndex(5); 
  //   console.log('Oui');
    
  // }, [cours]);
  
  return (
      <>
      {/* <h2>Système de Marquage de Présence</h2> */}
      {/* <h4>Calendrier de Présence :</h4> */}
      {app && cours.length > 0 && cours.map((cours) => (
        <div key={cours.id} data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabIndex="0" style={{ position: "static" }}>
          <Accordion key={cours.id} id={`cours${cours.id}`} style={{ position: "static", marginTop: 10 }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{nomCours[cours.libelle]}</Accordion.Header>
              <Accordion.Body>
                <div className="rounded-3 mb-3 mt-2" style={{border: "1px solid #ccc", padding: 15}}>
                  <label className="me-4">
                    Date de début :
                    <input style={{ width: 170, border: "none", fontWeight: 700  }} className="form-control" type="date" value={moment(cours.dteDteDebutCours).format('YYYY-MM-DD')} readOnly />
                  </label>
                  <label className="me-5">
                    Durée (en mois) :
                    <input style={{ width: 100, border: "none", fontWeight: 700 }}
                      className="form-control"
                      type="number"
                      readOnly
                      value={parseInt(cours.forfait.split(" ")[0])}
                    />
                  </label> 
                  <label className="ms-4">
                    Heure :
                    <input style={{ width: 100, border: "none", fontWeight: 700 }}
                      className="form-control"
                      type="text"
                      readOnly
                      value={cours.heureCours}
                      // onChange={(e) => handleDurationChange(cours.id, parseInt(e.target.value))}
                    />
                    {/* {parseInt(cours.heureCours.split("-")[1])} */}
                  </label> 
                </div>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className='table-responsive rounded-2'>
                      <table className="table table-bordered ">
                        <thead className='table-success'>
                          <tr>
                            <th className='align-middle'>Date</th>
                            <th className='align-middle'>Présence Apprenant</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cours.marqueDePresenceList.map((presence, i) => (
                            <tr key={presence.id}>
                              <td>
                                {moment(presence.dateMarqueDePresence).format('DD MMMM YYYY')}
                              </td>
                              <td>
                                {presence.presence !== null ?
                                  (
                                    // <span className="mx-3" style={{ fontSize: 17, fontWeight: 600, color: 'black' }} >{presence.presence}</span>
                                    <input readOnly
                                      type="text"
                                      className="form-control"
                                      style={{ border: 'none' }}
                                      value={presence.presence}
                                    />
                                  )
                                  :
                                  (
                                    <>
                                      {/* <button value="Présent" name="presence" className="rounded-1 p-2 mx-3" onClick={() => { handleMarkAttendance(presence.dateMarqueDePresence, presence.heure, "Présent", 'marque-de-presence/update/presence-apprenant'); list(presence) }}>Présent</button> */}
                                      <button value="Présent" name="presence" className="bg-success rounded-1 p-2 mx-3" onClick={() => { handleMarkAttendance(presence.dateMarqueDePresence, presence.heure, "Présent", `marque-de-presence/update/presence-apprenant/${id}`, presence, false, cours, id); }}>
                                        <Tooltipp titre=' Marquer comme présent'>
                                          <div className="">
                                            <PiCheckFatFill color='white' size={21} />
                                          </div>
                                        </Tooltipp>
                                      </button>
                                      <button value="Absent" name="presence" className="rounded-1 bg-danger p-2" onClick={() => { handleMarkAttendance(presence.dateMarqueDePresence, presence.heure, "Absent", `marque-de-presence/update/presence-apprenant/${id}`, presence, false, cours, id); }}>
                                        <Tooltipp titre=' Marquer comme absent'>
                                          <div className="">
                                            <ImCross color='white' size={19} />
                                          </div>
                                        </Tooltipp>
                                      </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
      {heureProf && seanceEnCours !== undefined && seanceEnCours.length > 0 && seanceEnCours.map((cours, i) => (
            <div key={i} data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabIndex="0" style={{ position: "static" }}>
              <Accordion key={i} id={`cours${i}`} style={{ position: "static", marginTop: 10 }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{cours.domaineNom}</Accordion.Header>
                  <Accordion.Body>
                    <div className="rounded-3 mb-3 mt-2" style={{border: "1px solid #ccc", padding: 15}}>
                      {/* <label className="me-4">
                        Date de début :
                        <input style={{ width: 170, border: "none", fontWeight: 700  }} className="form-control" type="date" value={moment(cours.dteDteDebutCours).format('YYYY-MM-DD')} readOnly />
                      </label>
                      // <label className="me-5">
                      //   Durée (en mois) :
                      //   <input style={{ width: 100, border: "none", fontWeight: 700 }}
                      //     className="form-control"
                      //     type="number"
                      //     readOnly
                      //     value={parseInt(cours.forfait.split(" ")[0])}
                      //   />
                      // </label>  */}
                      <label className="ms-4">
                        Heure :
                        <input style={{ width: 100, border: "none", fontWeight: 700 }}
                          className="form-control"
                          type="text"
                          readOnly
                          value={cours.heure}
                          // onChange={(e) => handleDurationChange(cours.id, parseInt(e.target.value))}
                        />
                        {/* {parseInt(cours.heureCours.split("-")[1])} */}
                      </label> 
                    </div>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <div className='table-responsive rounded-2'>
                          <table className="table table-bordered ">
                            <thead className='table-success'>
                              <tr>
                                <th className='align-middle'>Date</th>
                                <th className='align-middle'>Nombre Apprenant</th>
                                <th className='align-middle'>Présence Professeur</th>
                                <th className='align-middle'>Heure Début</th>
                                <th className='align-middle'>Heure Fin</th>
                                <th className='align-middle'>Heure Effectué</th>
                                <th className='align-middle'>Heure en minute</th>
                              </tr>
                            </thead>
                            <tbody>
                           {cours.seanceList.map((presences, i) => ( 
                                presences.seances.map((presence, index) => (
                            <tr key={presence.id}>
                              <td>
                                {moment(presence.dateMarqueDePresence).format('DD MMMM YYYY')}
                              </td>
                                    <td>
                                      <input style={{ width: 100, border: "none" }}
                                        className="form-control align-middle"
                                        type="number"
                                        readOnly
                                        value={nombreApprenantSeance[presence.id]}
                                      />
                                    </td>
                              <td>
                                {presence.presenceProfesseur !== null ?
                                  (<input readOnly
                                      type="text"
                                      className="form-control"
                                      style={{ border: 'none' }}
                                      value={presence.presenceProfesseur}
                                    />
                                  )
                                  :
                                  (
                                    <>
                                      <button value="Présent" name="presence" className="bg-success p-2 rounded-1 mx-3" onClick={() => { handleMarkAttendance(presence.dateMarqueDePresence, presence.heure, "Présent", `marque-de-presence-professeur/update/presence-professeur/${id}`, presence, false, false, id); }}>
                                        <Tooltipp titre=' Marquer comme présent'>
                                          <div className="">
                                            <PiCheckFatFill color='white' size={21} />
                                          </div>
                                        </Tooltipp>
                                      </button>
                                      <button value="Absent" name="presence" className="bg-danger p-2 rounded-1" onClick={() => handleMarkAttendance(presence.dateMarqueDePresence, presence.heure, "Absent", `marque-de-presence-professeur/update/presence-professeur/${id}`, presence, true, cours, id)}>
                                        <Tooltipp titre=' Marquer comme absent'>
                                          <div className="">
                                            <ImCross color='white' size={19} />
                                          </div>
                                        </Tooltipp>
                                      </button>
                                  </>
                                )}
                              </td>
                              {heureProf && (
                                <>
                                  <td>
                                    {presence.heureDebut !== null ?
                                        (
                                          <input readOnly
                                          type="text"
                                          className="form-control"
                                          style={{ border: 'none' }}
                                          value={presence.heureDebut}
                                        />
                                      )
                                      :
                                      (
                                        <>
                                          <button value="debut" name="heureDebut" onClick={() => setHeureDebut(presence.dateMarqueDePresence, presence.heure, id, presence, cours)} className="rounded-1 p-2 mx-3">Début</button>
                                        </>
                                      )
                                    }
                                  </td>
                                  <td>
                                    {presence.heureFin !== null ?
                                        (
                                          <input readOnly
                                          type="text"
                                          className="form-control"
                                          style={{ border: 'none' }}
                                          value={presence.heureFin}
                                        />
                                      )
                                      :
                                      (
                                        <>
                                          <button value="fin" name="heureFin" onClick={() => { setHeureFin(presence.dateMarqueDePresence, presence.heure, id, presence.id, presence, cours); list(presence); }} className="rounded-1 py-2 px-3 mx-3">Fin</button>
                                        </>
                                      )
                                    }
                                  </td>
                                  <td>
                                    <input readOnly
                                      ref={(input) => (inputRefs.current[presence.id] = input)}
                                      // id={`input-${item.id}`}
                                      type="text"
                                      className="form-control"
                                      style={{ border: 'none' }}
                                      value={presence.heureDebut !== null && presence.heureFin !== null ? calculateHourDifference(presence.heureDebut.split(':')[0],
                                      presence.heureDebut.split(':')[1],
                                      presence.heureFin.split(':')[0],
                                      presence.heureFin.split(':')[1]) : ''}
                                      // value={presence.heureDebut !== null && presence.heureFin !== null ? Math.round(parseInt(calculateHourDifference(presence.heureDebut.split(':')[0],
                                      // presence.heureDebut.split(':')[1],
                                      // presence.heureFin.split(':')[0],
                                      // presence.heureFin.split(':')[1])) * 100.0) / 100.0 : ''}
                                      name='nombreHeure'
                                    />
                                  </td>
                                  <td>
                                    <input readOnly
                                      type="text"
                                      className="form-control"
                                      style={{ border: 'none' }}
                                      value={presence.heureDebut !== null && presence.heureFin !== null ? `soit ${calculateHourDifference(presence.heureDebut.split(':')[0],
                                        presence.heureDebut.split(':')[1],
                                        presence.heureFin.split(':')[0],
                                        presence.heureFin.split(':')[1]) * 60}` : ''}
                                    />
                                  </td>
                                </>
                              )
                              }
                            </tr>
                            ))))
                          } 
                            </tbody>
                          </table>
                        </div>
                      </Col>
                      
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
          </div>
      ))
      }
      {profInterface && seanceEnCours !== undefined && seanceEnCours.length > 0 && seanceEnCours.map((cours, i) => (
            <div key={i} data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabIndex="0" style={{ position: "static" }}>
              <Accordion key={i} id={`cours${i}`} style={{ position: "static", marginTop: 10 }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{cours.domaineNom}</Accordion.Header>
                  <Accordion.Body>
                    <div className="rounded-3 mb-3 mt-2" style={{border: "1px solid #ccc", padding: 15}}>
                      <label className="ms-4">
                        Heure :
                        <input style={{ width: 100, border: "none", fontWeight: 700 }}
                          className="form-control"
                          type="text"
                          readOnly
                          value={cours.heure}
                        />
                      </label> 
                    </div>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <div className='table-responsive rounded-2'>
                          <table className="table table-bordered ">
                            <thead className='table-success'>
                              <tr>
                                <th className='align-middle'>Date</th>
                                <th className='align-middle'>Nombre Apprenant</th>
                                <th className='align-middle'>Présence Professeur</th>
                                <th className='align-middle'>Heure Début</th>
                                <th className='align-middle'>Heure Fin</th>
                                <th className='align-middle'>Heure Effectué</th>
                                <th className='align-middle'>Heure en minute</th>
                              </tr>
                            </thead>
                            <tbody>
                           {cours.seanceList.map((presences, i) => ( 
                                presences.seances.map((presence, index) => (
                            <tr key={presence.id}>
                              <td>
                                {moment(presence.dateMarqueDePresence).format('DD MMMM YYYY')}
                              </td>
                                    <td>
                                      <input style={{ width: 100, border: "none" }}
                                        className="form-control align-middle"
                                        type="number"
                                        readOnly
                                        value={nombreApprenantSeance[presence.id]}
                                      />
                                    </td>
                              <td>
                                {presence.presenceProfesseur !== null ?
                                  (<input readOnly
                                      type="text"
                                      className="form-control"
                                      style={{ border: 'none' }}
                                      value={presence.presenceProfesseur}
                                    />
                                  )
                                  :
                                        ''
                                      }
                              </td>
                                    <td>
                                      {presence.heureDebut !== null ?
                                        (
                                          <input readOnly
                                          type="text"
                                          className="form-control"
                                          style={{ border: 'none' }}
                                          value={presence.heureDebut}
                                        />
                                      )
                                      :
                                      ''
                                    }
                                  </td>
                                  <td>
                                    {presence.heureFin !== null ?
                                        (
                                          <input readOnly
                                          type="text"
                                          className="form-control"
                                          style={{ border: 'none' }}
                                          value={presence.heureFin}
                                        />
                                      )
                                      :
                                        ''
                                      }
                                  </td>
                                  <td>
                                    <input readOnly
                                      ref={(input) => (inputRefs.current[presence.id] = input)}
                                      // id={`input-${item.id}`}
                                      type="text"
                                      className="form-control"
                                      style={{ border: 'none' }}
                                      value={presence.heureDebut !== null && presence.heureFin !== null ? calculateHourDifference(presence.heureDebut.split(':')[0],
                                      presence.heureDebut.split(':')[1],
                                      presence.heureFin.split(':')[0],
                                      presence.heureFin.split(':')[1]) : ''}
                                      name='nombreHeure'
                                    />
                                  </td>
                                  <td>
                                    <input readOnly
                                      type="text"
                                      className="form-control"
                                      style={{ border: 'none' }}
                                      value={presence.heureDebut !== null && presence.heureFin !== null ? `soit ${calculateHourDifference(presence.heureDebut.split(':')[0],
                                        presence.heureDebut.split(':')[1],
                                        presence.heureFin.split(':')[0],
                                        presence.heureFin.split(':')[1]) * 60}` : ''}
                                    />
                                  </td>
                            </tr>
                            ))))
                          }
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))
      }
      <CustomizedSnackbars status={`error`} open={open} handleClose={handleClose} text="Impossible de marquer une présence pour un cours dont la date n'est pas encore arrivé !"/>
      <CustomizedSnackbars status={`success`} open={open2} handleClose={handleClose} text="Présence marquée avec succès"/>
      <CustomizedSnackbars status={`error`} open={open3} handleClose={handleClose} text="Impossible de marquer l'heure de fin quand l'heure de début n'est pas encore marquée" />
      <CustomizedSnackbars status={`success`} open={open4} handleClose={handleClose} text="Heure de début marquée avec succès" />
      <CustomizedSnackbars status={`success`} open={open5} handleClose={handleClose} text="Heure de fin marquée avec succès" />
      <CustomizedSnackbars status={`error`} open={open6} handleClose={handleClose} text="Impossible de marquer l'heure de début ou de fin pour un cours dont la date n'est pas encore arrivé !"/>
  </>
  );
};

export default CahierPresence;
