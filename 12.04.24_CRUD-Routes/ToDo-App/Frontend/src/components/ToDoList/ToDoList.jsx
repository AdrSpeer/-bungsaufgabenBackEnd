import ToDoListItem from "../ToDoListItem/ToDoListItem";
import "./ToDoList.css";

const ToDoList = ({ toDoes, setToDoes }) => {
  return (
    <section className="list-wrapper">
      {toDoes.map((item) => (
        <ToDoListItem item={item} setToDoes={setToDoes} key={item.id} />
      ))}
    </section>
  );
};

export default ToDoList;
