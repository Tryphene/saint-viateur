import React, { useEffect, useState } from 'react';
import schedule from 'node-schedule';
import { instance } from '../axios';
import moment from 'moment';
import { planifierEnvoiEmail } from '../emailProgrammer';

const MailProgrammer = ({apprenantId}) => {
    const [datePaiement, setDatePaiement] = useState('');
    const [emailScheduled, setEmailScheduled] = useState(false);
    const [heureEnvoieMail, setHeureEnvoieMail] = useState('16:15');
    const [dateEnvoieMail, setDateEnvoieMail] = useState('');
    const [mailApprenant, setMailApprenant] = useState('');
    const [loading, setLoading] = useState(false);
    const [echeance, setEcheance] = useState([]);

    // const contenuImprimer = `
    //   <html>
    //   <head>
    //     <title>Informations du formulaire</title>
    //   </head>
    //   <body>
    //     <h1>Informations du formulaire :</h1>
    //     <p><strong>Nom :</strong> ${formData.nom}</p>
    //     <input type='text' value='hhjbhj' />
    //     <p><strong>Prénom :</strong> ${formData.prenom}</p>
    //   </body>
    //   </html>
    // `;

    const mailAcceptation = {
        to: mailApprenant,
        text: `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Rappel : Date de paiement dans deux semaines</title>
            </head>

        <body>
            <p>Cher(e) [Nom de l'élève],</p>
            <p>Nous espérons que cette période de l'année universitaire se passe bien pour vous jusqu'à présent.</p>
            <p>
                Nous souhaitons vous rappeler que la date de paiement de votre échéance pour le 2ème trimestre approche rapidement. Vous avez maintenant
                seulement deux semaines avant la date limite de paiement, qui est fixée au [Date limite de paiement]. Nous vous encourageons à prendre w
                les dispositions nécessaires pour effectuer votre paiement à temps.
            </p>
            <p>Voici quelques informations importantes :</p>
            <ul>
                <li><strong>Montant dû :</strong> [Montant dû]</li>
                <li><strong>Date limite de paiement :</strong> [Date limite de paiement]</li>
                <li><strong>Mode de paiement :</strong> [Mode de paiement accepté]</li>
            </ul>
            <p>
                Un paiement en temps voulu est essentiel pour maintenir votre statut d'élève en règle et éviter tout désagrément lié à votre inscription. 
                Nous comprenons que la gestion des finances étudiantes peut être un défi, mais nous sommes là pour vous soutenir.
            </p>
            <p>
                Si vous avez des questions concernant votre échéance, les modalités de paiement n'hésitez pas à contacter notre service financier 
                à l'adresse suivante : <a href="mailto:[Adresse e-mail du service financier]"> [Adresse e-mail du service financier]</a> ou par 
                téléphone au [Numéro de téléphone du service financier]. Notre équipe est là pour vous aider et répondre à toutes vos
                préoccupations.
            </p>
            <p>
                Nous vous remercions de votre attention à cette importante échéance. Votre engagement envers votre réussite académique et le respect des 
                délais de paiement sont grandement appréciés.
            </p>
            <p>
                Cordialement,<br>
                Conservatoire Saint Viaiteur d'Abidjan<br>
                [Coordonnées de contact]
            </p>
        </body>
        </html>
        `
    };

    useEffect(() => {
        const generateAttendanceDates = (startDate) => {
            if (!startDate) return [];
            const dates = [];
            const startMoment = moment(startDate, 'YYYY-MM-DD');
        
            for (let i = 1; i < 3; i++) {
                const currentDate = startMoment.clone().subtract(i * 7, 'days');
                dates.push({
                    dateMarqueDePresence: currentDate.format('YYYY-MM-DD')
                });
            }
    
            setDateEnvoieMail(dates)
            // console.log(dates);
        };

        generateAttendanceDates(datePaiement) 

    }, [dateEnvoieMail, datePaiement]);

    useEffect(() => {
        // console.log(dateEnvoieMail[1]);y
    }, [dateEnvoieMail]);

    
    useEffect(() => {
        const fetchData = () => {
            instance.get(`echeancier/read-dte-paiement-status-by-apprenant/${apprenantId}`)
                .then(response => {
                    setEcheance(response.data)
                    // setDatePaiement(new Date(response.data[0].datePaiement))
                    setDatePaiement(response.data[0].datePaiement)
                    setMailApprenant(response.data[0].apprenantMail)
                    console.log(response.data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données :', error);
                    setLoading(false)
                });
            };
      
        fetchData();
    }, [apprenantId]);
    
    useEffect(() => {
        console.log(echeance);
        console.log(datePaiement);
        if (echeance.length > 0) {
            console.log("Prochaine date de paiement :", new Date(echeance[0].datePaiement).toDateString());
          } else {
            console.log("Toutes les échéances sont payées.");
          }
    }, [echeance]);

    const envoieMaill = (mail) => {
        instance
          .post(`envoie-email`, mail)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          });
      };
    

    //   useEffect(() => {
    //     const dateEnvoi = new Date('2023-09-04T11:35:00');
    
    //       planifierEnvoiEmail(dateEnvoi, mailAcceptation);
    //   }, []);
      
    return (
        <>
            {/* {datePaiement} */}
        <div>
      <h1>Email Scheduler</h1>
      <label>Sélectionnez la date cible :</label>
      <input
        type="date"
        // value={datePaiement.toISOString().split('T')[0]}
        onChange={(e) => setDatePaiement(new Date(e.target.value))}
      />
                <button onClick={() => { envoieMaill(mailAcceptation); console.log(mailApprenant); }}>Planifier les e-mails</button>
      {emailScheduled && <p>Les e-mails ont été planifiés.</p>}
            </div>
        </>
    )
}

export default MailProgrammer