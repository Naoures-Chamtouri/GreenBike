import Guide from "../../models/guide.js";
import httpStatus from "../../utils/httpStatus.js";
import generateToken from "../../utils/generateToken.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    console.log("Email reçu :", email);

   
    const guides = await Guide.find({ "utilisateur.email": email }).limit(1);
    console.log("guide trouvés :", guides);

   
    if (guides.length === 0) {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "Guide non trouvé",
      });
    }

    // Prendre le premier client du tableau
    const guide = guides[0];
    console.log("guide trouvé :", guide);

    // Vérifiez si le client a été trouvé
    if (guide && guide.utilisateur) {
      const isPasswordValid = bcrypt.compareSync(
        motDePasse,
        guide.utilisateur.motDePasse
      );

      if (isPasswordValid) {
        generateToken(res, guide._id);
        res.status(200).json({
          status: httpStatus.SUCCESS,
          data: guide,
        });
      } else {
        return res.status(404).json({
          status: httpStatus.ERROR,
          message: "Email ou mot de passe invalide",
        });
      }
    } else {
      return res.status(404).json({
        status: httpStatus.ERROR,
        message: "guide non trouvé",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const sendRequest = async (req, res) => {
  try {
    const { nomUtilisateur, email,  numTelephone, adresse,cv } =
      req.body;
     const image = req.file ? req.file.path : undefined;
    /* const cv=req.file ?req.file.path :undefined ; */ 

    const guideExistant = await Guide.find({ "utilisateur.email": email });

    if (guideExistant.length>0) {
        if(guideExistant.etat=="refusé"){
      return res.status(400).json({
        status: httpStatus.ERROR,
        message: "Demande de guide déjà existante. En attente de validation.",
      });}
      else{
        return res.status(400).json({
          status: httpStatus.ERROR,
          message: "Guide déjà accepté. Veuillez vous connecter.",
      })
      }
    }

   

    const guide = new Guide({
      utilisateur: {
        nomUtilisateur,
        email,
        motDePasse:"",
        numTelephone,
        image,
        adresse,
      },
      cv,
      etat:"refusé"
    });

    await guide.save();


    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: guide,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
const register=async(req,res)=>{
    try{
    const {email,motDePasse}=req.body;
    const guide=await Guide.findOne({email});
    if(guide.etat=="accepté"){
        const hashedPassword=await bcrypt.hash(motDePasse,10);
        guide.motDePasse=hashedPassword;
        guide.utilisateur.role="guide"
        await guide.save();
        generateToken(res, guide._id);
        res.status(200).json({
            status:httpStatus.SUCCESS,
            message:"creation compte avec succès",
            });
            }
            else{
                res.status(400).json({
                    status:httpStatus.ERROR,
                    message:"Guide non accepté",
                    });
    }

    }catch(error){
         console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
    }

}
const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
    });

    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export default {
  sendRequest,
  register,
  login,
  logout,
};
