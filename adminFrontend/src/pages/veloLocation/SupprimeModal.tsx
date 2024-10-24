import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import axios from 'axios';

const SupprimeModal = ({ open, handleClose, veloId }) => {
 
  const handleDelete = async () => {
    try {
      
      await axios.delete(`http://localhost:4000/admin/veloLocations/${veloId}`);
     
      handleClose();
   
      alert('Velo supprimée avec succès');
    } catch (error) {
     
      console.error('Erreur lors de la suppression', error);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Êtes-vous sûr de vouloir supprimer cette vélo ?
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Cette action est irréversible.
        </Typography>

        {/* Boutons de confirmation et d'annulation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Confirmer
          </Button>
          <Button variant="outlined" color="success" onClick={handleClose}>
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SupprimeModal;
