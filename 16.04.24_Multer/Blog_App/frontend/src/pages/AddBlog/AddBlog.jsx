import { useContext, useState } from "react";
import "./AddBlog.css";
import { AllBlogs } from "../../context/Context";
const AddBlog = () => {
  const { blogs, setBlogs } = useContext(AllBlogs);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("attachment", attachment, attachment.name);

    fetch("http://localhost:3003/api/blog/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const newBlog = {
          title,
          subtitle: subTitle,
          filename: data.filename,
          text,
        };
        console.log(newBlog);
        return newBlog;
      })
      .then((newBlog) =>
        fetch("http://localhost:3003/api/blog/newupload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBlog),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setTitle("");
        setSubTitle("");
        setText("");
        setAttachment();
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="add-blog">
      <h1>New Post</h1>
      <form>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="TITLE"
        />
        <input
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          type="text"
          placeholder="SUBTITLE"
        />
        <input
          type="file"
          placeholder="IMAGE"
          onChange={(e) => setAttachment(e.target.files[0])}
        />
        <textarea
          name="addText"
          cols="30"
          placeholder="ADD TEXT"
          rows="10"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={addBlog}>Publish</button>
      </form>
    </section>
  );
};

export default AddBlog;
