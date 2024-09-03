import Card from "./Card";

function ContentBarData({ velos, titre, selectedCategory }) {
  const velosToDispaly = selectedCategory
    ? velos.filter((velo) => {
        console.log(velo.velo.type.categorie.nom);
        console.log(selectedCategory);
        return velo.velo.type.categorie.nom == selectedCategory.name;
      })
    : velos;

  return (
    <div className="mr-3 mt-8 ml-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4">
      {velosToDispaly?.map((velo) => (
        <Card key={velo._id} velo={velo} button={titre} />
      ))}
    </div>
  );
}

export default ContentBarData;
