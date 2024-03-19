// import React, { useState } from 'react';
// import moment from 'moment';

// const Echeancier = ({ numberOfMonths, setEcheance }) => {
//   const [startDate, setStartDate] = useState(moment());
//   const [echeances, setEcheances] = useState([]);
//   const [montant, setMontant] = useState('');
//   const [formDataError, setFormDataError] = useState({});
  

  // const handleChangeStartDate = (e) => {
  //   setStartDate(moment(e.target.value));
  // };
  
//   const handleChangeMontant = (e) => {
//     setMontant(e.target.value);
//   };

//   const handleChangeNumberOfMonths = (e) => {
//     const months = parseInt(e.target.value, 10);
//     if (months && months > 0) {
//       calculateEcheances(months);
//     }
//   };

//   const calculateEcheances = (months) => {
//     const calculatedEcheances = [];
//     let currentDate = startDate.clone();

//     for (let i = 0; i < months; i++) {
//       calculatedEcheances.push({
//         datePaiement: currentDate.format('YYYY-MM-DD'),
//         montant: montant,
//         status: "Non payé"
//       });
//       currentDate = currentDate.clone().add(1, 'month');
//     }

//     setEcheances(calculatedEcheances);
//     setEcheance(calculatedEcheances);
//   };

//   return (
//     <div className="echeancier">
//       <div className="inputs">
//         <label>
//           Date de début :
//           <input className='form-control' type="date" value={startDate.format('YYYY-MM-DD')} onChange={handleChangeStartDate} />
//         </label>
//         <label>
//           Nombre de mois :
//           <input className='form-control' type="number" value={numberOfMonths} onChange={handleChangeNumberOfMonths} />
//         </label>
//       </div>
//       <div className="echeances">
//         {echeances.map((echeance, index) => (
//           <div key={index} className="d-flex echeance">
//             {echeance.datePaiement} - <input className='form-control' style={{width: 100}} type="text" value={montant + index} onChange={handleChangeMontant} /> - Montant: {echeance.montant} €
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Echeancier;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../styles//Echeancier.css'

const Echeancier = ({ setEcheance, setSommeMontants, cours, echeancierUsed }) => {
  const [startDate, setStartDate] = useState(moment());
  const [echeances, setEcheances] = useState([]);
  
  const [montants, setMontants] = useState([]); // Tableau pour stocker les montants
  const [status, setStatus] = useState([]); 
  const [formDataError, setFormDataError] = useState({});

  const handleChangeStartDate = (e) => {
    setStartDate(moment(e.target.value));
  };
  
  // const handleChangeMontant = (e, index) => {
  //   const newMontants = [...montants];
  //   newMontants[index] = e.target.value;
  //   setMontants(newMontants);
  //   buildEcheances(newMontants); // Mettre à jour les échéances lorsque le montant change
  // };

  const handleChangeNumberOfMonths = (e) => {
    const months = parseInt(e.target.value, 10);
    if (months && months > 0) {
      calculateEcheances(months);
    }
  };

  useEffect(() => {
    const months = parseInt(3, 10);
    if (months && months > 0) {
      calculateEcheances(months);
    }
  }, [])

  const buildEcheances = (newMontants, newStatus) => {
    let sumMontant = 0;
    const calculatedEcheances = [];
    let currentDate = startDate.clone();
  
    for (let i = 0; i < newMontants.length; i++) {
      const montantValue = parseInt(newMontants[i], 10); // Convertir en nombre
      calculatedEcheances.push({
        datePaiement: '',
        dateEcheance: currentDate.format('YYYY-MM-DD'),
        montant: newMontants[i] || '',
        // status: newStatus[i] || ''
        status: 'Non payé' || ''
      });
  
      if (!isNaN(montantValue)) { // Vérifier si le montant est un nombre valide
        sumMontant += montantValue;
      }
  
      currentDate = currentDate.clone().add(3, 'month');
    }
  
    setSommeMontants(sumMontant);
    setEcheances(calculatedEcheances);
    setEcheance(calculatedEcheances);
  };
  
  const style = {
    fontFamily: "Poppins, sans-serif",
    // Ajoutez d'autres styles CSS au besoin
  };

  useEffect(() => {
    // console.log(sommeMontants);
  }, [echeancierUsed])

  const calculateEcheances = (months) => {
    const newMontants = Array.from({ length: months }, (_, index) => montants[index] || '');
    // const newStatus = Array.from({ length: months }, (_, index) => status[index] || '');
    // newStatus[0] = 'Non Payé'
    // newStatus[1] = 'Non Payé'
    // newStatus[2] = 'Non Payé'
    setMontants(newMontants);
    // setStatus(newStatus);
    // buildEcheances(newMontants, newStatus);
    buildEcheances(newMontants);
  };

  useEffect(() => {
    const MontantEcheance = () => {
      if (parseInt(cours) === 1) {
        const newMontants = [...montants];
        const newStatus = [...status];
        newMontants[0] = 150000
        newMontants[1] = 75000
        newMontants[2] = 75000
        newStatus[0] = 'Non Payé'
        newStatus[1] = 'Non Payé'
        newStatus[2] = 'Non Payé'
        setMontants(newMontants);
        setStatus(newStatus);
        buildEcheances(newMontants, newStatus);
      }
      else {
        const newMontants = [...montants];
        const newStatus = [...status];
        newMontants[0] = 100000
        newMontants[1] = 50000
        newMontants[2] = 50000
        newStatus[0] = 'Non Payé'
        newStatus[1] = 'Non Payé'
        newStatus[2] = 'Non Payé'
        setMontants(newMontants);
        setStatus(newStatus);
        buildEcheances(newMontants);
      };
    }
    MontantEcheance()
}, [cours, montants, status])

  

  return (
    <div className="echeancier" style={style}>
      <div className="inputs">
        <label>
          Date de début :
          <input className='form-control' type="date" value={startDate.format('YYYY-MM-DD')} onChange={handleChangeStartDate} />
        </label>
        <label className=' ms-3'>
          Nombre de mois 
          <input className='form-control' type="number" readOnly style={{width: 60}} width={30} value={3} onChange={handleChangeNumberOfMonths}/>
        </label>
      </div>
      <div className="echeances">
        {echeances.length > 0 && echeances.map((echeance, index) => (
          <div key={index} className="echeance rounded-2 my-2">
            <div className="echeance-details">
              <div>Date de paiement: {moment(echeance.dateEcheance).format("DD MMMM YYYY")}</div>
              <div>Montant: {echeance.montant} FCFA</div>
              {/* <div>Statut: {echeance.status}</div> */}
            </div>
            <div className="echeance-input">
              <input
                className='form-control'
                type="text"
                placeholder="Montant"
                readOnly
                value={montants[index] || ''}
                // onChange={(e) => handleChangeMontant(e, index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Echeancier;
