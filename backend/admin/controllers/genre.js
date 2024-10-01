import Genre from "../../models/genre.js";


 const addGenre = async (req, res) => {
  try {
    const { nom } = req.body;

   
    if (!nom) {
      return res.status(400).json({
        status: "error",
        message: "Le nom du genre est requis",
      });
    }

   
    const nouveauGenre = new Genre({
      nom: nom,
    });

   
    const genreEnregistre = await nouveauGenre.save();

   
    return res.status(200).json({
      status: "success",
      data: genreEnregistre,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erreur lors de l'ajout du genre",
      error: error.message,
    });
  }
};

const getAllGenres=async(req,res)=>{
  try{
    const genres=await Genre.find();
    return res.status(200).json({
      status: "success",
      data: genres,
    });

  }catch(error){
return res.status(500).json({
  status: "error",
  message: "Erreur lors de l'ajout du genre",
  error: error.message,
});
  }
}
export default {addGenre,getAllGenres};