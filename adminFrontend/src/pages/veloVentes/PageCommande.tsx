import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Divider,
  Avatar,
  Grid,
  Chip,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';

function PageCommande() {
  const location = useLocation();
  const { idCommande } = location.state || {};
  const [commande, setCommande] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/admin/commandes/${idCommande}`,
        );
        setCommande(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement de la commande:', error);
        setLoading(false);
      }
    };
    fetchCommande();
  }, [idCommande]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!commande) {
    return (
      <Typography variant="h6" textAlign="center" mt={8} color="error">
        Aucune commande trouvée.
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" color="green" fontWeight="bold" mb={4}>
        Détails de la Commande
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom color="green">
          Informations du client
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: green[600] }}>
            {commande.client.utilisateur.nomUtilisateur[0].toUpperCase()}
          </Avatar>
          <Box ml={2}>
            <Typography variant="body1">
              <strong>Nom:</strong> {commande.client.utilisateur.nomUtilisateur}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {commande.client.utilisateur.email}
            </Typography>
            <Typography variant="body1">
              <strong>Téléphone:</strong> {commande.numTelephone}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom color="green">
          Articles commandés
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          {commande.articles.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              p={2}
              mb={2}
              borderRadius={2}
              border="1px solid"
              borderColor={green[600]}
            >
              <Avatar
                variant="rounded"
                src={item.article.velo.images[0]?.path}
                alt={item.article.velo.modele}
                sx={{ width: 80, height: 80, mr: 2 }}
              >
                <ImageIcon />
              </Avatar>
              <Box flex="1">
                <Typography variant="h6" color="green">
                  {item.article.velo.marque.nom}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {item.article.velo.modele}
                </Typography>
                {item.article.velo.categorie.nom != 'Vélos Electriques ' && (
                  <Typography variant="body2" color="textSecondary">
                    Type: {item.article.velo.type?.nom}
                  </Typography>
                )}

                <Typography variant="body1" color="green">
                  <strong>Quantité:</strong> {item.quantité}
                </Typography>
              </Box>
              <Chip
                label={`Total: ${item.total} TND`}
                sx={{ bgcolor: green[600], color: 'white', fontWeight: 'bold' }}
              />
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom color="green">
          Adresse de livraison
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          <strong>Adresse:</strong> {commande.adresseLivraison.adresse}
        </Typography>
        <Typography variant="body1">
          <strong>Ville:</strong> {commande.adresseLivraison.ville.nom}
        </Typography>
        <Typography variant="body1">
          <strong>Délégation:</strong>{' '}
          {commande.adresseLivraison.delegation.nom}
        </Typography>
        <Typography variant="body1">
          <strong>District:</strong> {commande.adresseLivraison.district.nom}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom color="green">
          Détails de la commande
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          <strong>Statut:</strong>{' '}
          <span style={{ color: green[600] }}>{commande.statutCommande}</span>
        </Typography>
        <Typography variant="body1">
          <strong>Date de commande:</strong>{' '}
          {new Date(commande.dateCommande).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Date de livraison estimée:</strong>{' '}
          {new Date(commande.dateLivraison).toLocaleDateString()}
        </Typography>
        <Typography variant="h5" mt={2} color="green">
          <strong>Total:</strong> {commande.total} TND
        </Typography>
      </Paper>
    </Box>
  );
}

export default PageCommande;
