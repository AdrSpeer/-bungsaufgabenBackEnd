import { useState } from "react";

const EditToDo = ({ item, setToDoes }) => {
  const [description, setDescription] = useState(item.description);

  const editToDo = (event) => {
    event.preventDefault();
    const updatedToDo = { description };
    fetch(`http://localhost:3003/api/v1/todos/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedToDo),
    })
      .then((res) => res.json())
      .then((data) => setToDoes(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={editToDo}>Edit</button>
    </>
  );
};

export default EditToDo;
