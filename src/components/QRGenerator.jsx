// import React, { useState, useEffect } from 'react';
// import QRCode from 'qrcode.react';
// import axios from 'axios';
// import { instance } from '../axios';

// const QRGenerator = () => {
//   const [professeurs, setProfesseurs] = useState([]);
  
//   const downloadQRCode = () => {
//     const canvas = document.getElementById('qrcode-canvas');
//     const imageUrl = canvas.toDataURL('image/png');
    
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = 'qrcode.png';
//     link.click();
//   };

//   useEffect(() => {
//     const fetchProfesseur = () => {
//         instance.get('professeur/read')
//           .then(response => {
//             setProfesseurs(response.data);
//             // setTableau(response.data);
//           })
//           .catch(error => {
//             console.error('Erreur lors de la récupération des données :', error);
//           });
//       }
//       fetchProfesseur()
//   }, []);
//     return (
//         <>
//             <div>
//                 {professeurs.map(professor => (
//                   <>
//                         <h3>{professor.nom}</h3>
//                     <div key={professor.id} style={{ border: '2px solid #333', borderRadius: '10px', padding: '10px', backgroundColor: '#f5f5f5', width: 'auto'}}>
//                     <QRCode value={`https://your-frontend-url/login?token=${professor.authToken}`} size={200} id="qrcode-canvas" />
//                     </div>
//                     <button onClick={downloadQRCode}>Télécharger le code QR</button>
//                   </>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default QRGenerator;

import React from 'react';
import QRCode from 'qrcode.react';
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { AiOutlineCloudDownload } from 'react-icons/ai';

const QRGenerator = ({professeur}) => {
  // const standardSize = 200; // Taille standard du QR code sur l'interface
  // const enlargedSize = 400; // Taille agrandie du QR code pour le téléchargement
  // const [enlargedSize, setEnlargedSize] = useState(false);


  const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode-canvas');
    const imageUrl = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `qrcode_${professeur.prenom}_${professeur.nom}.png`;
    link.click();
  };

  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Télécharger le code QR
  //   </Tooltip>
  // );

    return (
      <>
        <div className="" style={{width: 300, justifyContent: 'center', alignItems: 'center'}}>
          {/* <h3>{professeur.nom}</h3> */}
          <div className='mb-3' style={{ border: '2px solid #333', borderRadius: '10px', padding: '10px', backgroundColor: '#f5f5f5', width: 125 }}>
            <QRCode value={`http://localhost:3000/detailProfesseur/${professeur.id}`} size={100} id="qrcode-canvas" />
          </div>
          {/* <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className='ms-4' onClick={downloadQRCode}><AiOutlineCloudDownload size={25} /></button>
        </OverlayTrigger> */}
          <button className='ms-2' onClick={downloadQRCode}>Télécharger le code QR</button>
        </div>
      </>
    )
}

export default QRGenerator;




