import { useEffect, useState } from "react";
import AddForm from "../../components/AddForm/AddForm";
import EntryCard from "../../components/EntryCards/EntryCard";
import "./Home.css";

const Home = () => {
  const [entrys, setEntrys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/api/v1/guestbook")
      .then((res) => res.json())
      .then((data) => setEntrys(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="home">
      <header>
        <h1>Gästebuch</h1>
      </header>
      <main>
        <AddForm setEntrys={setEntrys} />
        <EntryCard entrys={entrys} />
      </main>
    </section>
  );
};

export default Home;
