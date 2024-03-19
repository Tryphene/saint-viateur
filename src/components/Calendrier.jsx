import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr'; // Importez la locale française pour afficher les noms des mois en français
import '../styles/Calendrier.css';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
// import ReactTooltip from 'react-tooltip';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import temps from "../img/temps.png"
import { instance } from '../axios';
import * as React from 'react';

const Calendrier = (props) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // Initialiser à la date actuelle
  const [loading, setLoading] = useState(true);
  const [dateHeure, setDateHeure] = useState([]);
  const [allDateHeure, setAllDateHeure] = useState([]);
  const [cours, setCours] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // axios.get('http://localhost:8081/cours/read-dte-debut-cours')
      instance.get(`marque-de-presence/read-dte-heure-cours-apprenant-by-prof/${props.prof}`)
        .then(response => {
          setDateHeure(response.data);
          props.setDateHeure(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          setLoading(false);
        });
    };
    
    const fetchDataCours = () => {
      // axios.get('http://localhost:8081/cours/read-dte-debut-cours')
      instance.get(`cours/read`)
        .then(response => {
          setCours(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          setLoading(false);
        });
    };

    fetchDataCours();
    fetchData();
  }, [props.prof]);

  useEffect(() => {
    const fetchData = () => {
      // axios.get('http://localhost:8081/cours/read-dte-debut-cours')
      instance.get(`marque-de-presence/read-dte-heure-cours-apprenant-prof/`)
        .then(response => {
          setAllDateHeure(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          setLoading(false);
        });
    };
  }, []);


  // const isFirstDayOfWeek = (date) => date.day() === 0;
  // const isLastDayOfWeek = (date) => date.day() === 6;
  const isDisabledDate = (date) => props.disabledDates.includes(date.format('YYYY-MM-DD'));
  
  const [heureCour, SetHeureCour] = useState("")

  const handleDateClick = (date) => {
    if (!isDisabledDate(date)) {
      const formattedDate = date.format('YYYY-MM-DD');
      setSelectedDate(formattedDate);
      props.onSelectDate(formattedDate); // Appeler la fonction onSelectDate de l'App avec la date sélectionnée
      props.onSelectHour("");
      SetHeureCour("")
    } else {
      setCurrentDate(date); // Changer la date actuelle lorsque le jour ne fait pas partie du mois actuel
    }
  };

  // const isPastDate = (date) => date.isBefore(moment(), 'day');

  const isDateUnavailable = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    // Filtrer les heures déjà prises pour la date donnée
    const heuresPrises = dateHeure.filter((rdv) => moment(rdv.date).format('YYYY-MM-DD') === formattedDate).map((rdv) => rdv.heure);
    // Filtrer les heures disponibles (non prises) pour la date donnée
    const heuresDisponibles = ['09h-10h', '10h-11h', '11h-12h', '13h-14h', '15h-16h', '16h-17h', '17h-18h'];
  
    // Vérifier si toutes les heures disponibles sont prises pour la date donnée
    const toutesHeuresPrises = heuresDisponibles.every((heure) => heuresPrises.includes(heure));

    // console.log("toutesHeuresPrises", toutesHeuresPrises);
    return toutesHeuresPrises;
  };


  const [nombreApprenantsPourCetteDate, setNombreApprenantsPourCetteDate] = useState('');
  

  let getHeuresDisponibles = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const isSaturday = date.day() === 6;
    const isWednesday = date.day() === 3;
    
    // Filtrer les heures déjà prises pour la date donnée
    const heuresPrises = dateHeure.filter(rdv => moment(rdv.date).format('YYYY-MM-DD') === formattedDate).map(rdv => rdv.heure);

    if (parseInt(props.cours) === 1 && parseInt(props.domaine) !== 2) {
      return ['09h-10h', '10h-11h', '11h-12h', '13h-14h', '15h-16h', '16h-17h', '17h-18h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 1;
      });
    } else if (parseInt(props.cours) === 1 && parseInt(props.domaine) === 2) {
      return ['09h-10h', '10h-11h', '11h-12h', '13h-14h', '15h-16h', '16h-17h', '17h-18h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 3;
      });
    } /*else if (parseInt(props.cours) === 2) {
      return ['09h-10h', '10h-11h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 15;
      });
    }*/ else if (parseInt(props.cours) === 2 && parseInt(props.domaine) === 15) {
      return ['09h-10h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 15;
      });
    } else if (parseInt(props.cours) === 2 && (parseInt(props.domaine) === 14 || parseInt(props.domaine) === 16)) {
      return ['10h-11h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 15;
      });
    }  else if (parseInt(props.cours) === 2 && parseInt(props.domaine) === 28) {
      return ['16h30-17h30'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 15;
      });
    } else if (parseInt(props.cours) === 2 && parseInt(props.domaine) === 29) {
      return ['18h30-19h30'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 15;
      });
    } else if (parseInt(props.cours) === 6) {
      if (isWednesday) {
        return ['10h-11h'].filter(heure => {
          const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
          return nombreApprenantsPourHeure < 15;
        })
      } else if (isSaturday) {
        return ['14h-15h'].filter(heure => {
          const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
          return nombreApprenantsPourHeure < 15;
        })
      } else {
         return [].filter(heure => {
          return 'Les cours d\'armatiaux ont lieu les mercredi et samedi !'
        })
      }
    } /*else if (parseInt(props.domaine) === 7) {
      return ['14h-15h30'].filter(heure => !heuresPrises.includes(heure))
    }*/ else if (parseInt(props.cours) === 3  && (parseInt(props.domaine) === 19 || parseInt(props.domaine) === 20)) {
      return ['10h-11h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 5;
      });
    } else if (parseInt(props.cours) === 3 && parseInt(props.domaine) === 21) {
      return ['11h-12h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 5;
      });
    } else if (parseInt(props.cours) === 4) {
      if (isWednesday) {
        return ['14h-15h'].filter(heure => {
          const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
          return nombreApprenantsPourHeure < 15;
        })
      } else if (isSaturday) {
        return ['15h-16h'].filter(heure => {
          const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
          return nombreApprenantsPourHeure < 15;
        })
      } else {
         return [].filter(heure => {
          return 'Les cours d\'armatiaux ont lieu les mercredi et samedi !'
        })
      }
    } else if (parseInt(props.cours) === 5) {
      return ['18h30-20h'].filter(heure => {
        const nombreApprenantsPourHeure = heuresPrises.filter(heurePrise => heurePrise === heure).length;
        return nombreApprenantsPourHeure < 5;
      });
    } else {
      // const heuresPrises2 = dateFin.filter(rdv => rdv.date === formattedDate).map(rdv => rdv.heure);
      // Filtrer les heures disponibles (non prises) pour la date donnée
      // return ['09h-11h', '11h-13h', '13h-15h', '15h-17h', '17h-19h'].filter(heure => !heuresPrises.includes(heure)) ;
      return ['09h-10h', '10h-11h', '11h-12h', '11h-13h', '13h-14h', '15h-16h', '16h-17h', '17h-18h', '18h30-20h'].filter(heure => !heuresPrises.includes(heure)) ;
     }
  };
  
  useEffect(() => {
    const dateRecherchee = moment(selectedDate).format('YYYY-MM-DD');
    const heureRecherchee = heureCour;
    
    const apprenantsPourCetteDate = new Set(); // Utilisation d'un ensemble pour stocker les apprenants uniques
    
    for (const cours of dateHeure) {
      if (cours.date === dateRecherchee && cours.heure === heureRecherchee) {
        apprenantsPourCetteDate.add(cours.apprenantId);
      }
    }

    setNombreApprenantsPourCetteDate(apprenantsPourCetteDate.size);
    console.log(`Le nombre d'apprenants qui ont cours le ${dateRecherchee} à ${heureRecherchee} est ${apprenantsPourCetteDate.size}`);
    
  }, [dateHeure, selectedDate, heureCour]);
  
  props.setNombreApprenants(nombreApprenantsPourCetteDate);
  
// useEffect(() => {
//   console.log(dateHeure);
//   console.log(nombreApprenantsPourCetteDate);
//   }, [dateHeure, nombreApprenantsPourCetteDate]);

// const getProfesseursDisponibles = (date, heureCour, dateHeure) => {
//   const dateRecherchee = date;
//   const heuresPrises = dateHeure
//     .filter((rdv) => rdv.date === dateRecherchee && rdv.heure === heureCour)
//     .map((rdv) => rdv.apprenantId);

//   // Vous pouvez ajuster cette logique en fonction de votre besoin
//   const professeursDisponibles = dateHeure.filter((professeur) => {
//     // Vérifiez le nombre d'apprenants pour cette date et heure
//     const apprenantsPourCetteDate = dateHeure
//       .filter((rdv) => rdv.date === dateRecherchee && rdv.heure === heureCour && rdv.apprenantId === professeur.profId)
//       .length;

//     // Vous pouvez ajuster cette valeur en fonction du nombre d'apprenants que vous souhaitez gérer
//     const capaciteMax = 5;

//     // Vérifiez si le professeur a de la capacité pour plus d'apprenants
//     return (apprenantsPourCetteDate < capaciteMax);
//   });

//   return professeursDisponibles;
// };

// Utilisation de la fonction pour obtenir les professeurs disponibles
// const professeursDisponibles = getProfesseursDisponibles(selectedDate, heureCour, allDateHeure);


  const handlePrevMonth = (event) => {
    event.preventDefault();
    const prevMonth = currentDate.clone().subtract(1, 'month');
    if (currentDate.startOf('month').isAfter(moment().startOf('month'))) {
      setCurrentDate(prevMonth);
    }
  };  


  const handleChangeCour = (event) => {
    event.preventDefault();
    const selectedHour = event.target.value;
    SetHeureCour(selectedHour);
    const heuresDisponibles = getHeuresDisponibles(moment(selectedDate));
    if (heuresDisponibles.includes(selectedHour)) {
      props.onSelectHour(selectedHour);
    } else {
      props.onSelectHour("");
    }
  };

  const handleNextMonth = (event) => {
    event.preventDefault();
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  // const handleMonthChange = (event) => {
  //   const selectedMonth = parseInt(event.target.value);
  //   setCurrentDate(currentDate.clone().month(selectedMonth - 1));
  // };

  // const handleYearChange = (event) => {
  //   const selectedYear = parseInt(event.target.value);
  //   setCurrentDate(currentDate.clone().year(selectedYear));
  // };

  // Nouvelle fonction pour vérifier si une date appartient au mois actuel et est passée
const isPastDateCurrentMonth = (date) => {
  return date.isBefore(moment().startOf('day')) && date.isSame(currentDate, 'month');
};

// Nouvelle fonction pour vérifier si une date appartient au mois précédent et est passée
// const isPastDatePreviousMonth = (date) => {
//   const firstDayOfCurrentMonth = currentDate.clone().startOf('month');
//   return date.isBefore(moment().startOf('day')) && date.isSame(firstDayOfCurrentMonth, 'month');
// };

let isDayClickable = (date, isCurrentMonthDay, isPastCurrentMonth) => {
  const isUnavailable = isDateUnavailable(date);
  const isSaturday = date.day() === 6;
  const isWednesday = date.day() === 3;

  // if (parseInt(props.cours) === 2 || parseInt(props.domaine) === 6 || parseInt(props.domaine) === 7 || parseInt(props.domaine) === 8) { 
  if (parseInt(props.cours) === 2 || parseInt(props.cours) === 6 || parseInt(props.domaine) === 19 || parseInt(props.domaine) === 20 || parseInt(props.domaine) === 28) { 
    return isCurrentMonthDay && !isPastCurrentMonth && !isUnavailable && isSaturday;
  } else if(parseInt(props.cours) === 4) { // karate
    // Jours du mois précédent et jours du mois actuel passés seront non cliquables
    return isCurrentMonthDay && !isPastCurrentMonth && !isUnavailable && (isWednesday || isSaturday);
  } else if(parseInt(props.domaine) === 21 || parseInt(props.domaine) === 29) {
    // Jours du mois précédent et jours du mois actuel passés seront non cliquables
    return isCurrentMonthDay && !isPastCurrentMonth && !isUnavailable && isWednesday;
  } else {
    // Jours du mois précédent et jours du mois actuel passés seront non cliquables
    return isCurrentMonthDay && !isPastCurrentMonth && !isUnavailable;
  }
  
  };
  useEffect(() => {
    console.log(props.domaine);
  }, [props.domaine])

  const renderCalendar = () => {
    const firstDayOfMonth = moment(currentDate).startOf('month').startOf('isoWeek'); // Utiliser startOf('isoWeek') pour obtenir le premier jour de la semaine (lundi)
    const lastDayOfMonth = moment(currentDate).endOf('month').endOf('isoWeek');
  const days = [];
  let day = firstDayOfMonth;

  while (day.isSameOrBefore(lastDayOfMonth)) {
    // Vérifier si le jour fait partie du mois actuel
    const isCurrentMonthDay = day.isSame(currentDate, 'month');
    const isPastCurrentMonth = isPastDateCurrentMonth(day);

    days.push({ date: day, isCurrentMonthDay, isPastCurrentMonth });
    day = day.clone().add(1, 'day');
  }


  return days.map(({ date, isCurrentMonthDay, isPastCurrentMonth }) => {
    const isToday = date.isSame(moment(), 'day');
    const isUnavailable = isDateUnavailable(date) ;
    const isSunday = date.day() === 0; 
    const isSaturday = date.day() === 6; 
    const isWednesday = date.day() === 3;


    let tooltipText = 'Cliquez pour sélectionner';
    if (isUnavailable) {
      tooltipText = 'Indisponible';
    } else if (!isCurrentMonthDay && isPastCurrentMonth) {
      tooltipText = 'Jour du mois précédent passé';
    } else if (isCurrentMonthDay && isPastDateCurrentMonth(date)) {
      tooltipText = 'Jour du mois actuel passé';
    }

    const classNames = [
      'day',
      (parseInt(props.cours) === 2 || parseInt(props.cours) === 6 || parseInt(props.domaine) === 19 || parseInt(props.domaine) === 20) && !isSaturday ? 'disabled other-month-day' : '',
      (parseInt(props.domaine) === 21) && !isWednesday ? 'disabled other-month-day' : '',
      (parseInt(props.cours) === 4) && !isWednesday && !isSaturday ? 'disabled other-month-day'  : '',
      isCurrentMonthDay ? '' : 'other-month-day',
      isUnavailable || isSunday ? 'disabled' : '',
      isToday ? 'today disabled' : '', 
      selectedDate === date.format('YYYY-MM-DD') && !isUnavailable && !isSunday ? 'selected' : '',
      isPastCurrentMonth || isSunday ? 'disable' : '',
    ].join(' ');

    return (
      <div
        key={date.format('YYYY-MM-DD')}
        className={classNames}
        onClick={() => isDayClickable(date, isCurrentMonthDay, isPastCurrentMonth) && !isSunday && handleDateClick(date)}
        data-tip={tooltipText} // Ajoutez le texte du tooltip à l'attribut data-tip
      >
        {isCurrentMonthDay ? date.format('D') : ''}
      </div>
    );
  });
  };
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
    <Row>
      <Col xs={12} sm={12} md={12} lg={6}>
        <div className="header w-100">
          <span style={{ fontSize: 19, fontWeight: 400, color: "black" }}>{capitalize(currentDate.format('MMMM YYYY'))}</span>
        </div>
        <div className="k">
            {/* <select className="form-control w-100" style={{borderRadius: 0, height: 45}} value={currentDate.month() + 1} onChange={handleMonthChange}>
              {moment.months().map((month, index) => (
                <option key={index} value={index + 1}>{month}</option>
              ))}
            </select>
          <input className="form-control w-100" style={{ borderRadius: 0, height: 45 }} type="number" value={currentDate.year()} onChange={handleYearChange} /> */}
        </div>
        <div className="calendar w-100">
          <div className="weekdays" style={{backgroundColor: "#EEF3FF"}} >
            <div className="day" style={{ border: 'none', fontWeight: "100", color: '#3B82F6' }}>Lun</div>
            <div className="day" style={{border: 'none', fontWeight: "100", color: '#3B82F6'}}>Mar</div>
            <div className="day" style={{border: 'none', fontWeight: "100", color: '#3B82F6'}}>Mer</div>
            <div className="day" style={{border: 'none', fontWeight: "100", color: '#3B82F6'}}>Jeu</div>
            <div className="day" style={{border: 'none', fontWeight: "100", color: '#3B82F6'}}>Ven</div>
            <div className="day" style={{border: 'none', fontWeight: "100", color: '#3B82F6'}}>Sam</div>
            <div className="day" style={{border: 'none', fontWeight: "100", color: '#3B82F6'}}>Dim</div>
          </div>
          <div className="days">
            {renderCalendar()}
          </div>
        </div>
      </Col>
      <Col xs={12} sm={12} md={12} lg={6} className='mt-2'>
        {/* <div className="d-flex flex-row-reverse"> */}
        <div className="d-flex justify-content-between">
          <p className="" style={{fontSize: 20, fontWeight: 500}}>{moment(selectedDate).format('D MMMM YYYY')}</p>
          <div className="d-flex pt-0">
            <button className={`px-1 bg-body`} onClick={handlePrevMonth} disabled={currentDate.isSameOrBefore(moment(), 'month')}><AiFillLeftCircle color='#8E9AB0' size={30} /></button>
            <button className="px-1 bg-body" onClick={handleNextMonth}><AiFillRightCircle color='#8E9AB0' size={30} /></button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <img className='ig' src={temps} alt="" />
        </div>
        <div className="hours">
          {/* <p style={{ fontSize: 18 }}>Heures disponibles pour le <b> {moment(selectedDate).format('D MMMM YYYY')}</b></p> */}
          <p style={{ fontSize: 16 }}>Heures disponibles :</p>
          {getHeuresDisponibles(moment(selectedDate)).length > 0 ? (getHeuresDisponibles(moment(selectedDate)).map((heureCours, index) => (
            <button
              className={`m-1 px-1 py-0 rounded-2 boutton ${heureCour === heureCours ? "bouttonActive" : ""} `}
              style={{ backgroundColor: "#486cee88", fontSize: 15, color: "black" }}
              onClick={handleChangeCour}
              value={heureCours}
              name="heureCours"
              key={index}>
              {heureCours}
            </button>
            // color: '#DC3545'
          ))) : <p  className='ms-3' style={{fontSize: 14, fontWeight: 300}}>Aucune heure disponible ce jour pour le professeur choisi</p>}
        </div>
      </Col>
    </Row>
    </>
  );
};

export default Calendrier;
