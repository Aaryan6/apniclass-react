import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notification from "./pages/Notification";
import AddPost from "./pages/AddPost";
import BottmNavigation from "./components/BottmNavigation";
import Open from "./pages/Open";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./actions/user";
import { getAllPosts } from "./actions/post";
import { getSubjects } from "./actions/subject";

function App() {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
    dispatch(getSubjects());
  }, [dispatch]);

  return (
    <div className="App bg-bg-light dark:bg-slate-900 min-h-screen w-full font-poppins">
      <Router>
        <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        <BottmNavigation />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Profile
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            }
          />
          <Route path="/share" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/open/:id" element={<Open />} />
          <Route
            path="/notification"
            element={
              <Notification
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
