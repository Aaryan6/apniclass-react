import { useEffect, useState } from "react";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { data } from "../dummyData";

const Search = ({ setSelectedSubject }) => {
  const [showYear, setShowYear] = useState({
    show: false,
    all: "All",
    first: "First Year",
    second: "Second Year",
  });
  const [showSubjects, setShowSubjects] = useState({ show: false, all: "All" });
  const [showBranch, setShowBranch] = useState({
    show: false,
    IT: "IT",
    CS: "CS",
    EC: "EC",
    mechanical: "Mechanical",
    civil: "Civil",
  });
  const [showStuff, setShowStuff] = useState({
    show: false,
    notes: "Notes",
    assignment: "Assignment",
    practical: "Practical",
    other: "Other",
  });
  const [year, setYear] = useState(Object.keys(showYear).slice(1)[0]);
  const [branch, setBranch] = useState(Object.keys(showBranch).slice(1)[0]);
  const [subject, setSubject] = useState(Object.keys(showSubjects).slice(1)[0]);
  const [stuff, setStuff] = useState(Object.keys(showStuff).slice(1)[0]);
  const [changeSubject, setChangeSubject] = useState(false);

  const handleDisplayOptions = (type) => {
    setShowYear((prev) => ({ ...prev, show: false }));
    setShowBranch((prev) => ({ ...prev, show: false }));
    setShowSubjects((prev) => ({ ...prev, show: false }));
    setShowStuff((prev) => ({ ...prev, show: false }));
    if (type === "year") {
      setShowYear((prev) => ({ ...prev, show: !showYear.show }));
    } else if (type === "branch") {
      setShowBranch((prev) => ({ ...prev, show: !showBranch.show }));
    } else if (type === "subjects") {
      setShowSubjects((prev) => ({ ...prev, show: !showSubjects.show }));
    } else {
      setShowStuff((prev) => ({ ...prev, show: !showStuff.show }));
    }
  };

  const handleSelectOption = (option, type) => {
    if (type === "year") setYear(option);
    if (type === "branch") setBranch(option);
    if (type === "subject") {
      setSelectedSubject(option);
      setSubject(option);
    }
    if (type === "stuff") setStuff(option);
    // close option box
    setShowYear((prev) => ({ ...prev, show: false }));
    setShowBranch((prev) => ({ ...prev, show: false }));
    setShowSubjects((prev) => ({ ...prev, show: false }));
    setShowStuff((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    setChangeSubject(!changeSubject);
  }, [year, branch]);

  useEffect(() => {
    setSubject(Object.keys(showSubjects).slice(1)[0]);
    setSelectedSubject(Object.keys(showSubjects).slice(1)[0]);
  }, [changeSubject]);

  useEffect(() => {
    if (year !== "all") {
      setShowSubjects(
        data.filter(
          (grp) => grp.ofYear === year && grp.branches.includes(branch)
        )[0].subjects
      );
    } else {
      setShowSubjects({ show: false, all: "All" });
    }
    console.log(subject);
  }, [year, branch]);

  return (
    <div className="mx-5 mt-5 font-poppins">
      <div className="flex relative border-x border-y border-solid border-slate-200 lg:max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Search here..."
          className=" pr-5 py-4 pl-10 outline-none w-full text-sm"
        />
        <AiOutlineSearch className="absolute left-3 top-4 text-indigo-500 text-xl" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 sm:grid-cols-4 sm:max-w-2xl mx-auto">
        {/* selection div */}
        <div className="flex flex-col items-center relative">
          <div
            onClick={() => handleDisplayOptions("year")}
            className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white py-2 px-3 w-full"
          >
            <span className="text-sm text-gray-700 mr-1">Year</span>
            <AiFillCaretDown className="text-sm text-gray-700" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">{showYear[year]}</span>
          </div>
          {/* options box */}
          <div
            className={`${
              showYear.show ? "flex" : "hidden"
            } absolute z-20 flex-col bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
          >
            {Object.keys(showYear)
              .slice(1)
              .map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(item, "year")}
                    className="p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                  >
                    {showYear[item]}
                  </button>
                );
              })}
          </div>
          {/* end */}
        </div>
        {/* selection div */}

        <div className="relative flex flex-col items-center">
          <div
            onClick={() => handleDisplayOptions("branch")}
            className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white py-2 px-3 w-full"
          >
            <span className="text-sm text-gray-700 mr-1">Branch</span>
            <AiFillCaretDown className="text-sm text-gray-700" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">
              {showBranch[branch]}
            </span>
          </div>
          {/* options box */}
          <div
            className={`${
              showBranch.show ? "flex" : "hidden"
            } absolute z-20 flex-col bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
          >
            {Object.keys(showBranch)
              .slice(1)
              .map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(item, "branch")}
                    className="p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                  >
                    {showBranch[item]}
                  </button>
                );
              })}
          </div>
          {/* end */}
        </div>

        <div className="relative flex flex-col items-center">
          <div
            onClick={() => handleDisplayOptions("subjects")}
            className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white  py-2 px-3 w-full"
          >
            <span className="text-sm text-gray-700 mr-1">Subject</span>
            <AiFillCaretDown className="text-sm text-gray-700" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm text-left whitespace-pre">
              {showSubjects[subject]?.length > 13
                ? showSubjects[subject].substring(0, 13) + "..."
                : showSubjects[subject]}
            </span>
          </div>
          {/* options box */}
          <div
            className={`${
              showSubjects.show ? "flex" : "hidden"
            } absolute z-20 flex-col max-h-72 overflow-scroll bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
          >
            {Object.keys(showSubjects).map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(item, "subject")}
                  className="p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                >
                  {showSubjects[item]}
                </button>
              );
            })}
          </div>
          {/* end */}
        </div>
        <div className="relative flex flex-col items-center">
          <div
            onClick={() => handleDisplayOptions("stuff")}
            className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white  py-2 px-3 w-full"
          >
            <span className="text-sm text-gray-700 mr-1">Stuff</span>
            <AiFillCaretDown className="text-sm text-gray-700" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">{showStuff[stuff]}</span>
          </div>
          {/* options box */}
          <div
            className={`${
              showStuff.show ? "flex" : "hidden"
            } absolute z-20 flex-col bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
          >
            {Object.keys(showStuff)
              .slice(1)
              .map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(item, "stuff")}
                    className="p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                  >
                    {showStuff[item]}
                  </button>
                );
              })}
          </div>
          {/* end */}
        </div>
      </div>
    </div>
  );
};

export default Search;

// how to change subjects in selection box by changing year and branch
// and by default it has to be All (for year, subject)
// how to arrange subjects through the years and branches
//
