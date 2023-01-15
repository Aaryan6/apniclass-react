import { useEffect, useState } from "react";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";

const Search = ({ setFilters }) => {
  const allSubjects = useSelector((state) => state.subjectReducer);
  const [showOption, setShowOption] = useState({
    optionYear: false,
    optionBranch: false,
    optionSubject: false,
    optionStuff: false,
  });
  const [showYear] = useState({
    all: "All",
    first: "First Year",
    second: "Second Year",
  });
  const [showSubjects, setShowSubjects] = useState({ all: "All" });
  const [showBranch] = useState({
    all: "All",
    IT: "IT",
    CS: "CS",
    EC: "EC",
    civil: "Civil",
  });
  const [showStuff] = useState({
    all: "All",
    notes: "Notes",
    assignment: "Assignment",
    practical: "Practical",
    shivani: "Shivani",
    papers: "Previous Papers",
    other: "Other",
  });
  const [searchValue, setSearchValue] = useState("");
  const [year, setYear] = useState(Object.keys(showYear)[0]);
  const [branch, setBranch] = useState(Object.keys(showBranch)[0]);
  const [subject, setSubject] = useState(Object.keys(showSubjects)[0]);
  const [stuff, setStuff] = useState(Object.keys(showStuff)[0]);
  const [changeSubject, setChangeSubject] = useState(false);

  const handleDisplayOptions = (type) => {
    setShowOption({
      optionYear: false,
      optionBranch: false,
      optionSubject: false,
      optionStuff: false,
    });
    if (type === "year") {
      setShowOption((prev) => ({
        ...prev,
        optionYear: !showOption.optionYear,
      }));
    } else if (type === "branch") {
      setShowOption((prev) => ({
        ...prev,
        optionBranch: !showOption.optionBranch,
      }));
    } else if (type === "subjects") {
      setShowOption((prev) => ({
        ...prev,
        optionSubject: !showOption.optionSubject,
      }));
    } else {
      setShowOption((prev) => ({
        ...prev,
        optionStuff: !showOption.optionStuff,
      }));
    }
  };

  const handleSelectOption = (option, type) => {
    if (type === "year") {
      setYear(option);
      setFilters((prev) => ({ ...prev, year: option }));
    }
    if (type === "branch") {
      setBranch(option);
      setFilters((prev) => ({ ...prev, branch: option }));
    }
    if (type === "subject") {
      setSubject(option);
      setFilters((prev) => ({ ...prev, subject: option }));
    }
    if (type === "stuff") {
      setStuff(option);
      setFilters((prev) => ({ ...prev, stuff: option }));
    }
    // close option box
    setShowOption({
      optionYear: false,
      optionBranch: false,
      optionSubject: false,
      optionStuff: false,
    });
  };

  const handleSearchValue = (text) => {
    setSearchValue(text);
    setFilters((prev) => ({ ...prev, searchValue: text }));
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      year: Object.keys(showYear)[0],
      branch: Object.keys(showBranch)[0],
      stuff: Object.keys(showStuff)[0],
    }));
  }, []);

  useEffect(() => {
    setChangeSubject(!changeSubject);
  }, [year, branch]);

  useEffect(() => {
    setSubject(Object.keys(showSubjects)[0]);
    setFilters((prev) => ({ ...prev, subject: Object.keys(showSubjects)[0] }));
  }, [changeSubject]);

  useEffect(() => {
    if (year === "all" || branch === "all") {
      setShowSubjects({ all: "All" });
    } else {
      setShowSubjects(
        allSubjects.data.filter(
          (grp) => grp.ofYear === year && grp.branches.includes(branch)
        )[0].subjects
      );
    }
    setShowSubjects((prev) => ({ all: "All", ...prev }));
  }, [year, branch, allSubjects]);

  return (
    <div className="mx-5 mt-3 font-poppins">
      <div className="flex relative border-x border-y border-solid border-slate-200 lg:max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Search here..."
          className=" pr-5 py-4 pl-10 outline-none w-full text-sm"
          value={searchValue}
          onChange={(e) => handleSearchValue(e.target.value)}
        />
        <AiOutlineSearch className="absolute left-3 top-4 text-indigo-500 text-xl" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-2 sm:grid-cols-4 sm:max-w-2xl mx-auto">
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
              showOption.optionYear ? "flex" : "hidden"
            } absolute z-20 flex-col bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
          >
            {Object.keys(showYear).map((item, index) => {
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
              showOption.optionBranch ? "flex" : "hidden"
            } absolute z-20 flex-col bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
          >
            {Object.keys(showBranch).map((item, index) => {
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
              showOption.optionSubject ? "flex" : "hidden"
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
            <span className="text-sm text-gray-700 mr-1">Category</span>
            <AiFillCaretDown className="text-sm text-gray-700" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">{showStuff[stuff]}</span>
          </div>
          {/* options box */}
          <div
            className={`${
              showOption.optionStuff ? "flex" : "hidden"
            } absolute z-20 flex-col bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
          >
            {Object.keys(showStuff).map((item, index) => {
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
