import CardBalade from "./CardBalade";


function ContentBarBalade({balades}) {
  return (
    <div className="mr-3 mt-8 ml-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4">
      {balades?.map((balade) => (
        <CardBalade key={balade._id} balade={balade}  />
      ))}
    </div>
  );
}

export default ContentBarBalade
