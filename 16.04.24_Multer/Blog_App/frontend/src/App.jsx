import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBlog from "./pages/AddBlog/AddBlog";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import { AllBlogs } from "./context/Context";

function App() {
  const [blogs, setBlogs] = useState([]);
  return (
    <>
      <AllBlogs.Provider value={{ blogs, setBlogs }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/addblog" element={<AddBlog />} />
          </Routes>
        </BrowserRouter>
      </AllBlogs.Provider>
    </>
  );
}

export default App;
