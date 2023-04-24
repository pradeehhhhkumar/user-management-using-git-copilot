import "./App.css";
// routes for user management application in react
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Edit from "./views/Edit/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
