import React, { useState } from "react";
import List from "../components/List";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";

const Home = ({ showSidebar }) => {
  const [filters, setFilters] = useState({ subject: "all" });
  return (
    <div className="flex w-full">
      <Sidebar showSidebar={showSidebar} />
      <div className="flex-1">
        <Search setFilters={setFilters} />
        <List filters={filters} />
      </div>
    </div>
  );
};

export default Home;
