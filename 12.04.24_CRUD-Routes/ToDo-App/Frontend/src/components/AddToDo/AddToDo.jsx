import { useState } from "react";

const AddToDo = ({ setToDoes }) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");

  const addToDo = (event) => {
    event.preventDefault();
    const newToDo = {
      description,
      status,
    };
    fetch("http://localhost:3003/api/v1/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToDo),
    })
      .then((res) => res.json())
      .then((data) => setToDoes(data))
      .catch((err) => console.log(err));

    setDescription("");
  };

  return (
    <>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="To-Do"
      />
      <button onClick={addToDo}>Add</button>
    </>
  );
};

export default AddToDo;
