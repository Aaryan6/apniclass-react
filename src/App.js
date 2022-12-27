import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./comonents/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";

function App() {
  return (
    <div className="App bg-slate-100 min-h-screen w-full font-poppins">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
