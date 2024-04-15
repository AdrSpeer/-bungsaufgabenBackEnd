import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import "./ToDoListItem.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditToDo from "../EditToDo/EditToDo";

const ToDoListItem = ({ item, setToDoes }) => {
  const [doneClear, setDoneClear] = useState(item.status);
  const [showEdit, setShowEdit] = useState(false);

  const deleteToDo = () => {
    fetch(`http://localhost:3003/api/v1/todos/${item.id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setToDoes(data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={doneClear == "open" ? "do-item-red" : "do-item-green"}>
        <h3>{item.description}</h3>
        <DoneIcon onClick={() => setDoneClear("done")} />
        <ClearIcon onClick={() => setDoneClear("open")} />
      </div>
      <div>
        <EditIcon onClick={() => setShowEdit(!showEdit)} />
        <DeleteIcon onClick={() => deleteToDo()} />
        <div className={showEdit ? "show-edit" : "hide-edit"}>
          <EditToDo item={item} setToDoes={setToDoes} />
        </div>
      </div>
    </>
  );
};

export default ToDoListItem;
