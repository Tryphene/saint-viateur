import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { instance } from '../../axios'
import { Box, Rating } from '@mui/material'
import { AiTwotoneStar } from 'react-icons/ai'
import CustomizedSnackbars from '../../components/CustomizedSnackbars'


const Avis = () => {
    const [hover, setHover] = useState(-1);
    const [loading, setLoading] = useState(false);

    
    const labels = {
        1: 'Mauvais',
        2: 'Passable',
        3: 'Bon',
        4: 'Excellent',
        5: 'Très Excellent',
    };
    
    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
        const [formAvis, setFormAvis] = useState({
            nom: "",
            prenom: "",
            commentaire: "",
            note: "",
            status: false
        })
    
        const reset = () => {
            const intialiseForm = {
                nom: "",
                prenom: "",
                commentaire: "",
                note: "",
                status: false
            };
        
            setFormAvis(intialiseForm)
        }
    
        const [formDataError, setFormDataError] = useState({})
    
    const handleChange = (event) => {
        setFormAvis({
            ...formAvis,
            [event.target.name]: event.target.value,
        });
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    
    const post = (url, form) => {
        instance.post(url, form,)
        .then(response => {
            console.log('Message envoyé :', response.data);
            // setSuccess(true)
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement :', error);
            if (error.message === "Network Error") {
                setLoading(false)
                setOpen(true)
            }
            setLoading(false)
        });
      }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const errors = {}
        
        if (!formAvis.nom) {
            errors.nom = 'Veuillez saisir votre nom SVP!';
        }
        
        if (!formAvis.prenom) {
            errors.prenom = 'Veuillez saisir votre prenom SVP!';
        }
        
        if (!formAvis.commentaire) {
            errors.commentaire = 'Veuillez saisir votre commentaire SVP!';
        }
        
        if (!formAvis.note) {
            errors.note = 'Veuillez saisir une note SVP!';
        }

        if (Object.keys(errors).length > 0) {
            console.log(formAvis)
            setFormDataError(errors);
        } else {
            setFormDataError({});
            console.log('Données valides :', formAvis);
            post('avis/create', formAvis)
            reset()
        }
    }
    
  return (
      <>
          <div className="container-page-avis">
              <div className="" style={{ marginBottom: 60 }}>
                  <center className=''>
                      {/* <p className='my-0' style={{ fontSize: 45, fontWeight: 700, color: "white", background: "#B60520", width: 550, padding:  10, borderRadius: 10}}>Formulaire d'Avis</p> */}
                      <p className='my-0 fw-bolder text-gradient' style={{ fontSize: 47, fontWeight: 700 }}>Formulaire d'Avis</p>
                      <p className="text-muted mt-0 mb-5" style={{ fontSize: 15, fontWeight: 500 }}>Veuillez noter votre expérience avec le Conservatoire Saint Viateur</p>
                  </center>
              </div>
              <Form className='mt-5'>
                  <Row className="my-3">
                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                          <Form.Label>Prénom(s)</Form.Label>
                          <Form.Control
                              type="text"
                              name="prenom"
                              onChange={handleChange}
                              value={formAvis.prenom}
                              isInvalid={!!formDataError.prenom}
                          />
                          <Form.Control.Feedback type="invalid"> 
                              {formDataError.prenom}
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={6} controlId="validationCustom01">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                              type="text"
                              name="nom"
                              onChange={handleChange}
                              value={formAvis.nom}
                              isInvalid={!!formDataError.nom}
                          />
                          <Form.Control.Feedback type="invalid">
                              {formDataError.nom}
                          </Form.Control.Feedback>
                      </Form.Group>
                  </Row>
                  <Row className="mb-3">
                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                          <Form.Label>Commentaire</Form.Label>
                          <Form.Control
                              as="textarea"
                              // placeholder="Leave a comment here"
                              style={{ height: '250px' }}
                              name="commentaire"
                              onChange={handleChange}
                              value={formAvis.commentaire}
                              isInvalid={formDataError.commentaire}
                          />
                          <Form.Control.Feedback type="invalid">
                              {formDataError.commentaire}
                          </Form.Control.Feedback>
                      </Form.Group>
                  </Row>
                  <Row className="mb-3">
                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} controlId="validationCustom01">
                          <Form.Label>Note</Form.Label>
                          <Box
                              sx={{
                                  '& > legend': { mt: 2 },
                              }}
                          >
                              <Rating
                                  name="note"
                                  value={formAvis.note}
                                  onChange={handleChange}
                                  getLabelText={getLabelText}
                                  onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                  }}
                                  emptyIcon={<AiTwotoneStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {formAvis.note !== null && (
                                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : formAvis.note]}</Box>
                                )}
                              <p style={{ fontSize: 14, color: "#DC3551" }}>{formDataError.note}</p>
                          </Box>
                          {/* <Form.Control
                              type="number"
                              min={1}
                              max={5}
                              name="note"
                              onChange={handleChange}
                              value={formAvis.note}
                              isInvalid={formDataError.note}
                          /> */}
                          <Form.Control.Feedback type="invalid">
                              {formDataError.note}
                          </Form.Control.Feedback>
                      </Form.Group>
                  </Row>
                  <Row className='mt-3'>
                      <Form.Group as={Col} xs={12} sm={12} md={12} lg={4} controlId="validationCustom01">
                          <button onClick={handleSubmit} style={{ backgroundColor: "#B60520" }}>Noter</button>
                      </Form.Group>
                  </Row>
              </Form>
          </div>
          <CustomizedSnackbars status={`error`} open={open} handleClose={handleClose} text='Erreur réseau' />
      </>
  )
}

export default Avis
