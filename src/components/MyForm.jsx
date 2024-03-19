import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios"

const MyForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    email: '',
    description: '',
    prix: '',
    categorie: '',
    contenu: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérification de la validité des champs de formulaire avec des conditions personnalisées
    const errors = {};
    if (!formData.titre) {
      errors.titre = 'Le titre est requis.';
    }

    if (!formData.auteur) {
      errors.auteur = 'L\'auteur est requis.';
    }
    
    if (!formData.description) {
      errors.description = 'La description est requis.';
    }
    
    if (!formData.prix) {
      errors.prix = 'La prix est requis.';
    }
    
    if (!formData.categorie) {
      errors.categorie = 'La categorie est requis.';
    }
    
    if (!formData.contenu) {
      errors.contenu = 'La contenu est requis.';
    }

    // if (!isEmailValid(formData.email)) {
    //   errors.email = "L'email n'est pas valide.";
    // }

    if (Object.keys(errors).length > 0) {
      // Afficher les messages d'erreur sous les champs de formulaire
      setFormErrors(errors);
    } else {
      // Réinitialiser les erreurs en cas de validation réussie
      setFormErrors({});
      axios.post("http://localhost:5002/livre/enregistrer", formData)
        .then(response => {
            console.log('Message envoyé :', response.data);
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement :', error);
        });
      
      // Envoyer les données ou effectuer d'autres actions
      console.log('Données valides :', formData);
    }
  };

  const isEmailValid = (email) => {
    // Mettez votre condition de validation d'email ici
    // Par exemple, utilisez une expression régulière pour vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formtitre">
        <Form.Label>Prénom :</Form.Label>
        <Form.Control
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
        //   isInvalid={!!formErrors.titre} // Utiliser !! pour convertir en booléen
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.titre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formauteur">
        <Form.Label>Nom :</Form.Label>
        <Form.Control
          type="text"
          name="auteur"
          value={formData.auteur}
          onChange={handleChange}
          isInvalid={!!formErrors.auteur}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.auteur}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description :</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!formErrors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.categorie}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formCategorie">
        <Form.Label>Categorie :</Form.Label>
        <Form.Control
          type="text"
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          isInvalid={!!formErrors.categorie}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.categorie}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPrix">
        <Form.Label>Prix :</Form.Label>
        <Form.Control
          type="text"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
          isInvalid={!!formErrors.prix}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.prix}
        </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group controlId="formContenu">
        <Form.Label>Contenu :</Form.Label>
        <Form.Control
          type="file"
          name="contenu"
          value={formData.contenu}
          onChange={handleChange}
          isInvalid={!!formErrors.contenu}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.contenu}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Soumettre
      </Button>
    </Form>
  );
};

export default MyForm;
