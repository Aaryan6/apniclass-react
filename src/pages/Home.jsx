import React, { useState } from "react";
import List from "../comonents/List";
import Search from "../comonents/Search";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  return (
    <div>
      <Search setSelectedSubject={setSelectedSubject} />
      <List selectedSubject={selectedSubject} />
    </div>
  );
};

export default Home;
