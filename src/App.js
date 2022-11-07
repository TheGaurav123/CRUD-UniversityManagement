import "./App.css";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Add from "./components/Add/Add";
import Update from "./components/Update/Update";
import Data from "./components/Data/Data";
import Error from "./components/404/Error";
import Private from "./components/Private/Private";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Private />}>
            <Route path="/update/:id" element={<Update />} />
            <Route path="/data" element={<Data />} />
            <Route path="/" element={<Add />} />
          </Route>

          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
