import { Link, useParams } from "react-router-dom";
import "./Header.css";
import StarIcon from "@mui/icons-material/Star";
import { backendUrl } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { allMoviesContext } from "../../context/Context";

const Header = () => {
  const [search, setSearch] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);

  const { allMovies, setAllMovies } = useContext(allMoviesContext);

  const searchMovie = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm !== "") {
      setSearch(searchTerm);
      const searchMatch = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
      setFoundMovies(searchMatch.slice(0, 5));
    } else {
      setSearch("");
      setFoundMovies([]);
    }
  };

  return (
    <header>
      <nav>
        <div className="nav-headline">
          <Link to={"/"}>
            <h1>MMDb</h1>
          </Link>
          <Link to={"/favorites"}>
            <StarIcon style={{ color: "#E9C46A" }} />
          </Link>
        </div>
        <form>
          <input
            value={search}
            onChange={searchMovie}
            placeholder="e.g. The Godfather"
            type="text"
            name="search"
            autoComplete="off"
          />
        </form>
        <Link to={"/addmovie"}>
          <h2>Add your own</h2>
        </Link>
      </nav>
      <div className={foundMovies.length <= 0 ? "notfound" : "found-movies"}>
        {foundMovies?.map((movie) => (
          <Link to={`/details/${movie._id}`}>
            <p>{movie?.title ? movie?.title : search}</p>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
