import React, { useState } from "react";
import List from "../components/List";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";

const Home = ({ showSidebar }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  return (
    <div className="flex w-full">
      <Sidebar showSidebar={showSidebar} />
      <div className="flex-1">
        <Search setSelectedSubject={setSelectedSubject} />
        <List selectedSubject={selectedSubject} />
      </div>
    </div>
  );
};

export default Home;
