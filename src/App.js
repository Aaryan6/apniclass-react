import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./comonents/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddPost from "./pages/AddPost";
import BottmNavigation from "./comonents/BottmNavigation";
import Open from "./pages/Open";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./actions/user";
import { getAllPosts } from "./actions/post";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="App bg-zinc-100 min-h-screen w-full font-poppins">
      <Router>
        <Navbar />
        <BottmNavigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/share" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/open-file" element={<Open />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
