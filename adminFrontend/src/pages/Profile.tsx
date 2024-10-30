import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import DragComponent from '../components/DragandDrop/DragComponent';

function Profile() {
  const { user, updateUser, updatemdp } = useAuth();
  const [ownerLicense, setOwnerLicense] = useState([]);
  const [formData, setFormData] = useState({
    nomUtilisateur: '',
    image: '', // Ajout de l'image dans formData
  });
  const [passwordData, setPasswordData] = useState({
    motDePasseActuel: '',
    nouveauMotDePasse: '',
    confirmerMotDePasse: '',
  });

  // États pour la visibilité des mots de passe
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 
  useEffect(() => {
    if (user) {
      setFormData({
        nomUtilisateur: user.nomUtilisateur || '',
        image: ownerLicense[0] || user.image || '', // Utiliser l'image existante ou celle téléchargée
      });
    }
  }, [user, ownerLicense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInfo = async () => {
    await updateUser(formData);
  };

  const handleUpdatePassword = async () => {
    if (passwordData.nouveauMotDePasse !== passwordData.confirmerMotDePasse) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    await updatemdp(passwordData);
  };

  return (
    <div className="flex justify-between items-start p-4">
      {/* Formulaire à gauche */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        p={3}
        width="100%"
        maxWidth={800}
      >
        <Typography variant="h4" color="green" gutterBottom>
          Profile Admin
        </Typography>

        {/* Formulaire des informations personnelles */}
        <Card
          className="shadow-md mb-6 w-full"
          sx={{
            padding: 3,
            border: '1px solid',
            borderColor: 'green.600',
            mb: 4,
          }}
        >
          <Typography variant="h6" color="green.600" gutterBottom>
            Informations Personnelles
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              color="success"
              label="Nom d'utilisateur"
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleChange}
              fullWidth
            />
            <TextField label="Email" value={user.email} disabled fullWidth />
            <Button
              color="success"
              variant="contained"
              sx={{
                backgroundColor: 'green.600',
                color: 'white',
                mt: 2,
                ':hover': { backgroundColor: 'green.700' },
              }}
              onClick={handleUpdateInfo}
            >
              Mettre à jour les informations
            </Button>
          </Box>
        </Card>

        {/* Formulaire de changement de mot de passe */}
        <Card
          className="shadow-md w-full"
          sx={{
            padding: 3,
            border: '1px solid',
            borderColor: 'green.600',
            mb: 4,
          }}
        >
          <Typography variant="h6" color="green.600" gutterBottom>
            Changer de mot de passe
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              color="success"
              label="Mot de passe actuel"
              type={showCurrentPassword ? 'text' : 'password'}
              name="motDePasseActuel"
              value={passwordData.motDePasseActuel}
              onChange={handlePasswordChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              color="success"
              label="Nouveau mot de passe"
              type={showNewPassword ? 'text' : 'password'}
              name="nouveauMotDePasse"
              value={passwordData.nouveauMotDePasse}
              onChange={handlePasswordChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              color="success"
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmerMotDePasse"
              value={passwordData.confirmerMotDePasse}
              onChange={handlePasswordChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              color="success"
              variant="contained"
              sx={{
                backgroundColor: 'green.600',
                color: 'white',
                mt: 2,
                ':hover': { backgroundColor: 'green.700' },
              }}
              onClick={handleUpdatePassword}
            >
              Mettre à jour le mot de passe
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Composant de Drag and Drop au centre-droit */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="40%"
      >
        <div className="w-full mt-40">
          <DragComponent
            ownerLicense={ownerLicense}
            setOwnerLicense={setOwnerLicense}
          />
        </div>
      </Box>
    </div>
  );
}

export default Profile;
