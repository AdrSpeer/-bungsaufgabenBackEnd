import "./EntryCards.css";
import DeleteIcon from "@mui/icons-material/Delete";
const EntryCard = ({ entrys, setEntrys }) => {
  console.log(entrys);

  const deleteEntry = (id) => {
    fetch(`http://localhost:3003/api/v1/guestbook/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setEntrys(data))
      .catch((err) => console.log(err));
  };

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
          <DeleteIcon className="delete" onClick={() => deleteEntry(item.id)} />
        </div>
      ))}
    </section>
  );
};

export default EntryCard;
