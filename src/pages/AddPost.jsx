import React, { useEffect, useState } from "react";
import { AiFillCaretDown, AiOutlineCloudUpload } from "react-icons/ai";
import app from "../firebase-config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../actions/post";
import { data } from "../dummyData";

const AddPost = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer?.user);
  const allSubjects = useSelector((state) => state.subjectReducer);
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

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
    IT: "IT",
    CS: "CS",
    EC: "EC",
    civil: "Civil",
  });
  const [showStuff] = useState({
    notes: "Notes",
    assignment: "Assignment",
    practical: "Practical",
    shivani: "Shivani",
    other: "Other",
  });
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
    if (type === "year") setYear(option);
    if (type === "branch") setBranch(option);
    if (type === "subject") {
      setSubject(option);
    }
    if (type === "stuff") setStuff(option);
    // close option box
    setShowOption({
      optionYear: false,
      optionBranch: false,
      optionSubject: false,
      optionStuff: false,
    });
  };

  useEffect(() => {
    setChangeSubject(!changeSubject);
  }, [year, branch]);

  useEffect(() => {
    setSubject(Object.keys(showSubjects)[0]);
  }, [changeSubject]);

  useEffect(() => {
    if (year !== "all") {
      setShowSubjects(
        allSubjects.data.filter(
          (grp) => grp.ofYear === year && grp.branches.includes(branch)
        )[0].subjects
      );
    } else {
      setShowSubjects({ all: "All" });
    }
  }, [year, branch, allSubjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileUrl === "") {
      alert("Upload file");
    } else {
      dispatch(
        addPost(
          {
            fileName,
            ofYear: year,
            ofBranch: branch,
            subject,
            category: stuff,
            fileUrl,
            userId: User._id,
          },
          navigate
        )
      );
      setFileData();
      setProgress(0);
    }
  };

  // firebase storage
  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + Math.round(progress) + "% done");
        setProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
          setFileData();
        });
      }
    );
  };

  useEffect(() => {
    fileData && uploadFile(fileData);
  }, [fileData]);

  return (
    <div className="grid place-items-center pt-10 px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 grid w-full max-w-lg"
      >
        <h1 className="text-center text-lg font-medium">Share Post</h1>
        <label htmlFor="title" className="mb-2 mt-2 text-sm">
          File Name:
        </label>
        <input
          type="text"
          placeholder="ex. Maths - unit 02"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
          className="border-2 outline-none px-2 py-2.5 text-sm"
        />

        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3 py-4 sm:grid-cols-4 sm:max-w-2xl mx-auto">
          {/* selection div */}
          <div className="flex flex-col items-center relative">
            <div
              onClick={() => handleDisplayOptions("year")}
              className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white md:py-2 py-1.5 px-3 w-full"
            >
              <span className="text-sm text-gray-700 mr-1">Year</span>
              <AiFillCaretDown className="text-sm text-gray-700" />
            </div>
            {/* option */}
            <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 md:h-9 h-8 flex items-center justify-center rounded-sm w-full">
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
                  <span
                    key={index}
                    onClick={() => handleSelectOption(item, "year")}
                    className="cursor-pointer p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                  >
                    {showYear[item]}
                  </span>
                );
              })}
            </div>
            {/* end */}
          </div>
          {/* selection div */}

          <div className="relative flex flex-col items-center">
            <div
              onClick={() => handleDisplayOptions("branch")}
              className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white md:py-2 py-1.5 px-3 w-full"
            >
              <span className="text-sm text-gray-700 mr-1">Branch</span>
              <AiFillCaretDown className="text-sm text-gray-700" />
            </div>
            {/* option */}
            <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 md:h-9 h-8 flex items-center justify-center rounded-sm w-full">
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
                  <span
                    key={index}
                    onClick={() => handleSelectOption(item, "branch")}
                    className="cursor-pointer p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                  >
                    {showBranch[item]}
                  </span>
                );
              })}
            </div>
            {/* end */}
          </div>
          {/* subject */}
          <div className="relative flex flex-col items-center">
            <div
              onClick={() => handleDisplayOptions("subjects")}
              className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white md:py-2 py-1.5 px-3 w-full"
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
                  <span
                    key={index}
                    onClick={() => handleSelectOption(item, "subject")}
                    className="cursor-pointer p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                  >
                    {showSubjects[item]}
                  </span>
                );
              })}
            </div>
            {/* end */}
          </div>
          <div className="relative flex flex-col items-center">
            <div
              onClick={() => handleDisplayOptions("stuff")}
              className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white md:py-2 py-1.5 px-3 w-full"
            >
              <span className="text-sm text-gray-700 mr-1">Stuff</span>
              <AiFillCaretDown className="text-sm text-gray-700" />
            </div>
            {/* option */}
            <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 md:h-9 h-8 flex items-center justify-center rounded-sm w-full">
              <span className="text-indigo-600 text-sm">
                {showStuff[stuff]}
              </span>
            </div>
            {/* options box */}
            <div
              className={`${
                showOption.optionStuff ? "flex" : "hidden"
              } absolute z-20 flex-col bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-full top-10`}
            >
              {Object.keys(showStuff).map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => handleSelectOption(item, "stuff")}
                    className="cursor-pointer p-3 text-sm border-b hover:bg-slate-100 text-left w-full"
                  >
                    {showStuff[item]}
                  </span>
                );
              })}
            </div>
            {/* end */}
          </div>
        </div>

        <div className="mb-5 mt-2 flex">
          <label
            htmlFor="file"
            className="cursor-pointer bg-slate-200 py-3 w-full text-center font-medium text-gray-500 text-sm flex justify-center items-center"
          >
            {progress === 0 ? "Upload File" : `Uploading File ${progress}%`}
            <AiOutlineCloudUpload className="ml-2 text-xl" />
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.xls,.ppt"
            id="file"
            className="hidden"
            onChange={(e) => setFileData(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-3 cursor-pointer text-sm"
        >
          Share
        </button>
      </form>
    </div>
  );
};

export default AddPost;
