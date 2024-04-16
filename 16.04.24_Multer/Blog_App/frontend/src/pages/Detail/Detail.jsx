import { useEffect, useState } from "react";
import "./Detail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
const Detail = () => {
  const { id } = useParams();
  const [idBlog, setIdBlog] = useState({});

  useEffect(() => {
    fetch("http://localhost:3003/api/v1/blog/" + id)
      .then((res) => res.json())
      .then((data) => setIdBlog(data))
      .catch((err) => console.log(err));
  });

  return (
    <section className="detail">
      <h1>{idBlog.title}</h1>
      <div>
        <img src={"http://localhost:3003/" + idBlog.filename} alt={id.title} />
        <h4>{idBlog.subtitle}</h4>
        <p>{idBlog.text}</p>
        <Link to={"/"}>
          <button>Back Home</button>
        </Link>
      </div>
    </section>
  );
};

export default Detail;
