import "./AddMovie.css";
import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { allMoviesContext } from "../../context/Context";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const AddMovie = () => {
  const { allMovies, setAllMovies } = useContext(allMoviesContext);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState([]);
  const [rate, setRate] = useState("");
  const [poster, setPoster] = useState("");
  const [plot, setPlot] = useState("");

  const addNewMovie = (e) => {
    e.preventDefault();

    fetch(`${backendUrl}/api/v1/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        year,
        director,
        genres: [genre],
        rate,
        poster,
        plot,
      }),
    })
      .then((res) => res.json())
      .then((data) => setAllMovies(data))
      .catch((err) => console.log(err));

    setTitle("");
    setYear("");
    setDirector("");
    setGenre([]);
    setRate("");
    setPoster("");
    setPlot("");
  };
  console.log(allMovies);

  return (
    <section className="add-movie-headline">
      <Header />
      <section className="hero">
        <h1>
          MovieMagicDatabase has it all. But you can still <span>add </span>to
          it.
        </h1>
      </section>
      <section className="add-movie">
        <h1>Add your own movie</h1>
        <form>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
          <input
            min={0}
            type="number"
            placeholder="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          <input
            type="text"
            placeholder="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            min={0}
            type="number"
            placeholder="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <input
            type="text"
            placeholder="URL for movieposter"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
          <button onClick={addNewMovie}>Add</button>
        </form>
      </section>
      <Footer />
    </section>
  );
};

export default AddMovie;
