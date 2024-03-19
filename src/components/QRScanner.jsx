import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';
import QRCode from 'qrcode.react';
import axios from 'axios';
import PieChartComponent from './PieChartComponent';

function QRScanner() {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleScan = data => {
    if (data) {
      setToken(data);
      // Send the token to the backend for validation
      axios.post('/api/validate-token', { token: data })
        .then(response => {
          if (response.data.valid) {
            setAuthenticated(true);
          }
        })
        .catch(error => {
          // Handle the error
        });
    }
  };

  const handleError = error => {
    // Handle scan error
  };

    return (
        <>
            <PieChartComponent />
    <div>
      <h2>QR Code Scanner</h2>
      <QRCode
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '10%' }}
        />
      {authenticated && <p>Authenticated successfully!</p>}
    </div>
        </>
  );
}

export default QRScanner;
