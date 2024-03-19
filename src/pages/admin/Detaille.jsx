import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import ButtonConfirm from '../../components/ButtonConfirm';
import { useState } from 'react';
import { BsPersonCheck } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import axios from 'axios';

const Detaille = (props) => {
  // const { id } = useParams();

  const apprenantInfoString= localStorage.getItem('apprenantInfo');
  const apprenantInfos = JSON.parse(apprenantInfoString);

    const [formData, setFormData] = useState({
        to: apprenantInfos.mail,
        text: ''
    });
    
  const mailAcceptation = {
        to: apprenantInfos.mail,
        text: 'Vous êtes accepté !'
    };
    
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
  };

  // console.log(document.referrer);

  const [error, setError] = useState('')

  const isFormEmpty = formData.to === '' || formData.text === '';
      
      const handleSubmit = (event, id) => {
        event.preventDefault();
        if (isFormEmpty) {
          setError('Veuillez remplir tous les champs SVP !');
        } else {
          console.log(formData)
          axios.post('http://localhost:8081/envoie-email', formData)
            .then(response => {
              console.log('Message envoyé :', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de l\'enregistrement :', error);
            });
        }
    };
      
  const sendMail = (event) => {
        event.preventDefault();
          console.log(mailAcceptation)
          axios.post('http://localhost:8081/envoie-email', mailAcceptation)
            .then(response => {
              console.log('Message envoyé :', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de l\'enregistrement :', error);
            });
  };

  const navigate = useNavigate();

  
  const createApprenant = (event) => {
    event.preventDefault();
    console.log("creer");
    console.log(apprenantInfos);
    axios.post('http://localhost:8081/apprenant/create', apprenantInfos)
    .then(response => {
      console.log('Enregistrement réussi :', response.data);
      navigate("/");
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement :', error);
    });
      
  };
  
  const setStatus = (event) => {
    event.preventDefault();
    const dataToUpdate = {
      status: "Validé"
    };

    axios.put(`http://localhost:8081/demande-inscription/update/status/${apprenantInfos.id}`, dataToUpdate)
      .then(response => {
        console.log('Champ mis à jour avec succès:', response.data);
        console.log(apprenantInfos.id);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du champ:', error);
      });
    console.log(apprenantInfos.id);
    };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={"/"} style={{textDecoration: "none"}}>Tableau de bord</Link></li>
          <li className="breadcrumb-item " aria-current="page">Detail</li>
        </ol>
      </nav>

      <div className="mt-2" style={{display: "flex", justifyContent: "center", alignItems: "center", width: "auto", fontSize: 30}}>
        <div className="badge bg-primary px-2 py-2">CONFIRMATION D'INSCRIPTION</div>
      </div>
      <div className="contains mt-5">
        <p className="lead text-center pt-2 pb-2" style={{borderBottom: "1px solid #ccc"}}>
          Informations de l'apprenant
        </p>
        
        <center>
          <Container className='w-75 p-3'>
            <Row style={{ padding: 10, borderBottom: "1px solid #ccc"}} >
              <Col>
                Nom: 
              </Col>
              <Col>
                {apprenantInfos.nom}
              </Col>
            </Row> 
            <Row style={{ padding: 10, borderBottom: "1px solid #ccc"}}>
              <Col>
                Prenom: 
              </Col>
              <Col>
                {apprenantInfos.prenom}
              </Col>
            </Row> 
            <Row style={{ padding: 10, borderBottom: "1px solid #ccc"}}>
              <Col>
                Date de  naissance: 
              </Col>
              <Col>
                {apprenantInfos.dteNaissance}
              </Col>
            </Row> 
            <Row style={{ padding: 10, borderBottom: "1px solid #ccc"}}>
              <Col>
                Profession: 
              </Col>
              <Col>
                {apprenantInfos.profession ? apprenantInfos.profession : <TiDelete size={30} color='red' />}
              </Col>
            </Row>
            <Row style={{ padding: 10, borderBottom: "1px solid #ccc"}}>
              <Col>
                Niveau scolaire: 
              </Col>
              <Col>
                {apprenantInfos.nvScolaire ? apprenantInfos.nvScolaire : <TiDelete size={30} color='red' />}
              </Col>
            </Row>  
            <Row style={{ padding: 10, borderBottom: "1px solid #ccc"}}>
              <Col>
                Adresse e-mail: 
              </Col>
              <Col>
                {apprenantInfos.mail}
              </Col>
            </Row> 
            <Row style={{ padding: 10, borderBottom: "1px solid #ccc"}}>
              <Col>
                Telephone: 
              </Col>
              <Col>
                {apprenantInfos.telephone}
              </Col>
            </Row> 
            <Row style={{ padding: 10}}>
              <Col>
                Domaine: 
              </Col>
              <Col>
                {apprenantInfos.domaine}
              </Col>
            </Row> 
          </Container>
        </center>
        <div style={{ borderBottom: "1px solid #ccc" }}></div>
        <div className="action p-2">
          <ButtonConfirm
            message={`Êtes-vous sur de vouloir confirmer l'inscription de ${apprenantInfos.prenom} ${apprenantInfos.nom} ?`}
            icon={<BsPersonCheck size={20} />}
            error={error}
            submit={handleSubmit}
            formData={formData}
            sendMail={(event) => sendMail(event)}
            setStatus={(event) => setStatus(event)}
            createApprenant={(event) => createApprenant(event)}
            handleChange={handleChange}
            mailValue={formData.to}
            messageValue={formData.text} />
        </div>
      </div>
    </div>
  );
};

export default Detaille;
