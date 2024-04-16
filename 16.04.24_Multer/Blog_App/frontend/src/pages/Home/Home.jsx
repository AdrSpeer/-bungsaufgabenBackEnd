import { useContext, useEffect, useState } from "react";
import "./Home.css";
import BlogCards from "../../components/BlogCards/BlogCards";
import { AllBlogs } from "../../context/Context";
const Home = () => {
  const { setBlogs } = useContext(AllBlogs);

  useEffect(() => {
    fetch("http://localhost:3003/api/v1/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="home">
      <header>
        <h1>Willkommen auf meinem Blog</h1>
      </header>
      <main>
        <BlogCards />
      </main>
    </section>
  );
};

export default Home;
