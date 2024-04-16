import { useContext } from "react";
import "./BlogCards.css";
import { Link } from "react-router-dom";
import { AllBlogs } from "../../context/Context";
const BlogCards = () => {
  const { blogs } = useContext(AllBlogs);
  return (
    <section className="blogcards">
      {blogs.map((item) => (
        <div key={item.id}>
          <Link to={`/detail/${item.id}`}>
            <h1>{item.title}</h1>
            <h4>{item.subtitle}</h4>
            <img
              src={"http://localhost:3003/" + item.filename}
              alt={item.title}
            />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default BlogCards;
