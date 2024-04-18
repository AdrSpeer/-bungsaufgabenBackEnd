import "./EntryCards.css";

const EntryCard = ({ entrys }) => {
  console.log(entrys);
  return (
    <section className="entry-card">
      <h1>Unsere Einträge</h1>

      {entrys.map((item) => (
        <div className="single-card" key={item.id}>
          <p className="timestamp">
            {new Date(item.timestamp).toLocaleString()}
          </p>
          <h3>
            {item.firstName}, {item.lastName}
          </h3>
          <h6>{item.email}</h6>
          <p>{item.message}</p>
        </div>
      ))}
    </section>
  );
};

export default EntryCard;
