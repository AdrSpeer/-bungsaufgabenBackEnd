import { useEffect } from "react";
import { useState } from "react";
import ToDoList from "../components/ToDoList/ToDoList";
import AddToDo from "../components/AddToDo/AddToDo";

const Dashboard = () => {
  const [toDoes, setToDoes] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3003/api/v1/todos`)
      .then((res) => res.json())
      .then((data) => setToDoes(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(toDoes);
  return (
    <>
      <h1>Dashboard</h1>
      <AddToDo setToDoes={setToDoes} />
      <ToDoList toDoes={toDoes} setToDoes={setToDoes} />
    </>
  );
};

export default Dashboard;
