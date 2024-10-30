import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Button,
  Card,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import des icônes
import DragComponent from "@/components/used/DragAndDrop/DragComponent";

function Profile() {
  const { user, updateUser, updatemdp } = useAuth();
  const [ownerLicense, setOwnerLicense] = useState([]);
  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    numTelephone: "",
    image: "", // Ajout de l'image dans formData
  });
  const [passwordData, setPasswordData] = useState({
    motDePasseActuel: "",
    nouveauMotDePasse: "",
    confirmerMotDePasse: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    motDePasseActuel: false,
    nouveauMotDePasse: false,
    confirmerMotDePasse: false,
  });

  console.log(user);
  useEffect(() => {
    if (user) {
      setFormData({
        nomUtilisateur: user.utilisateur.nomUtilisateur || "",
        numTelephone: user.utilisateur.numTelephone || "",
        image: ownerLicense[0] || user.utilisateur.image || "", // Utiliser l'image existante ou celle téléchargée
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

  const handleTogglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdateInfo = async () => {
    await updateUser(formData);
  };

  const handleUpdatePassword = async () => {
    if (passwordData.nouveauMotDePasse !== passwordData.confirmerMotDePasse) {
      alert("Les mots de passe ne correspondent pas.");
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
          Profile Client
        </Typography>

        {/* Formulaire des informations personnelles */}
        <Card
          className="shadow-md mb-6 w-full"
          sx={{
            padding: 3,
            border: "1px solid",
            borderColor: "green.600",
            mb: 4,
          }}
        >
          <Typography variant="h6" color="green.600" gutterBottom>
            Informations Personnelles
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nom d'utilisateur"
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Numéro de téléphone"
              name="numTelephone"
              value={formData.numTelephone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              value={user.utilisateur.email}
              disabled
              fullWidth
            />
            <Button
              color="success"
              variant="contained"
              sx={{
                backgroundColor: "green.600",
                color: "white",
                mt: 2,
                ":hover": { backgroundColor: "green.700" },
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
            border: "1px solid",
            borderColor: "green.600",
            mb: 4,
          }}
        >
          <Typography variant="h6" color="green.600" gutterBottom>
            Changer de mot de passe
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Mot de passe actuel"
              type={showPasswords.motDePasseActuel ? "text" : "password"} // Toggle between text and password
              name="motDePasseActuel"
              value={passwordData.motDePasseActuel}
              onChange={handlePasswordChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      handleTogglePasswordVisibility("motDePasseActuel")
                    }
                  >
                    {showPasswords.motDePasseActuel ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Nouveau mot de passe"
              type={showPasswords.nouveauMotDePasse ? "text" : "password"} // Toggle between text and password
              name="nouveauMotDePasse"
              value={passwordData.nouveauMotDePasse}
              onChange={handlePasswordChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      handleTogglePasswordVisibility("nouveauMotDePasse")
                    }
                  >
                    {showPasswords.nouveauMotDePasse ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Confirmer le mot de passe"
              type={showPasswords.confirmerMotDePasse ? "text" : "password"} // Toggle between text and password
              name="confirmerMotDePasse"
              value={passwordData.confirmerMotDePasse}
              onChange={handlePasswordChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      handleTogglePasswordVisibility("confirmerMotDePasse")
                    }
                  >
                    {showPasswords.confirmerMotDePasse ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                ),
              }}
            />
            <Button
              color="success"
              variant="contained"
              sx={{
                backgroundColor: "green.600",
                color: "white",
                mt: 2,
                ":hover": { backgroundColor: "green.700" },
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
