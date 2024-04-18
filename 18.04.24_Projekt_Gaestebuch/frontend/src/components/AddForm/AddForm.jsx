import { useState } from "react";
import "./AddForm.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const AddForm = ({ setEntrys }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [fillAll, setFillAll] = useState("");

  const addEntry = (event) => {
    event.preventDefault();
    if (
      firstName.length <= 0 &&
      lastName.length <= 0 &&
      email.length <= 0 &&
      message.length <= 0
    ) {
      return setFillAll("Bitte alle Felder mit * Ausfüllen");
    }

    const newEntry = {
      firstName,
      lastName,
      email,
      message,
    };
    fetch("http://localhost:3003/api/v1/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data !== Array) {
          console.log("Not possible with an object");
          return;
        }
        setEntrys(data);
      })
      .catch((err) => console.log(err));

    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    setFillAll("");
  };

  return (
    <>
      <div className="headline">
        <h2>Füge deinen Gäsebucheintrag hinzu</h2>
        <KeyboardArrowUpIcon
          onClick={() => setShowForm(!true)}
          className={showForm ? "show-form" : "hide-form"}
        />
        <KeyboardArrowDownIcon
          onClick={() => setShowForm(!false)}
          className={showForm ? "hide-form" : "show-form"}
        />
      </div>

      <form required className={showForm ? "show-form" : "hide-form"}>
        <input
          name="firstname"
          type="text"
          value={firstName}
          placeholder="*First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          name="lastname"
          type="text"
          value={lastName}
          placeholder="*Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          name="email"
          type="email"
          value={email}
          placeholder="*Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          value={message}
          placeholder="*Your Message"
          onChange={(e) => setMessage(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
        <p className="err">{fillAll}</p>
        <button onClick={addEntry}>Add Entry</button>
      </form>
    </>
  );
};

export default AddForm;
