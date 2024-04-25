import Header from "../../components/Header/Header";
import { useContext, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { allMoviesContext } from "../../context/Context";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  const { allMovies, setAllMovies } = useContext(allMoviesContext);

  return (
    <section className="home">
      <Header />
      <main>
        <section className="hero">
          <h1>
            MovieMagicDatabase has it all. But you can still <span>add </span>to
            it.
          </h1>
        </section>
        <MovieCard allMovies={allMovies} />
      </main>
      <Footer />
    </section>
  );
};

export default Home;
