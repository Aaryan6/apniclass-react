import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { AiFillCaretDown } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { GiClick } from "react-icons/gi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase-config";
import { updateUser } from "../actions/user";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import Avatar from "../assets/noavatar.png";

const Profile = ({ showSidebar }) => {
  const userId = window.location.pathname.split("/")[2];
  const users = useSelector((state) => state.userReducer?.data);
  const [profileUser, setProfileUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("uploads");
  const Posts = useSelector((state) => state.postReducer.data?.posts);

  useEffect(() => {
    setProfileUser(users.filter((user) => user._id === userId));
  }, [userId, users]);

  return (
    <div className="flex w-full">
      <Sidebar showSidebar={showSidebar} />
      <div className="pt-2 flex-1 pb-20">
        <ModalBox
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          currentUser={profileUser[0]}
        />
        <div className="p-4 bg-white max-w-lg mx-auto relative">
          <button
            onClick={() => setIsOpen(true)}
            className="absolute right-2 text-xs bg-slate-100 py-2 px-3 rounded-sm cursor-pointer"
          >
            Edit Profile
          </button>
          <div className=" flex flex-col items-center">
            <img
              src={profileUser[0]?.profileImage || Avatar}
              alt=""
              className="w-40 h-40 object-cover rounded-full"
            />
            <span className="text-lg mt-2 font-medium">
              {profileUser[0]?.name}
            </span>
          </div>
          <div className="grid grid-cols-2 justify-between text-sm px-4 pt-4">
            <div className="py-1 grid">
              <span className="text-slate-600">Year: </span>
              <span className="font-medium">{profileUser[0]?.presentYear}</span>
            </div>
            <div className="text-right py-1 grid">
              <span className="text-slate-600">Email: </span>
              <span className="font-medium">{profileUser[0]?.email}</span>
            </div>
            <div className="py-1 grid">
              <span className="text-slate-600">Branch: </span>
              <span className="font-medium">
                {profileUser[0]?.presentBranch.toUpperCase()}
              </span>
            </div>
            <div className="text-right py-1 grid">
              <span className="text-slate-600">Posts: </span>
              <span className="font-medium">
                {
                  Posts?.filter((pst) => pst.userId === profileUser[0]?._id)
                    .length
                }
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white m-1 py-2 rounded-md mx-auto max-w-lg">
          <button
            onClick={() => setTab("uploads")}
            className={`text-sm ml-2 px-4 py-2 ${
              tab === "uploads" &&
              "bg-slate-100 px-4 py-2 rounded-3xl cursor-pointer font-medium"
            }`}
          >
            My uploads
          </button>
          <button
            onClick={() => setTab("liked")}
            className={`text-sm px-4 py-2 ${
              tab === "liked" &&
              "bg-slate-100 rounded-3xl cursor-pointer font-medium"
            }`}
          >
            Liked
          </button>
        </div>
        <div className="p-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-6xl">
          {tab === "uploads"
            ? Posts?.filter((pst) => pst.userId === profileUser[0]?._id).map(
                (item) => {
                  return <Post item={item} key={item._id} />;
                }
              )
            : Posts?.filter((pst) =>
                pst.likes.includes(profileUser[0]?._id)
              ).map((item) => {
                return <Post item={item} key={item._id} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ModalBox = ({ modalIsOpen, setIsOpen, currentUser }) => {
  function closeModal() {
    setIsOpen(false);
  }

  const [showYear, setShowYear] = useState({
    show: false,
    first: "First Year",
    second: "Second Year",
    third: "Third Year",
    final: "Final Year",
  });
  const [showBranch, setShowBranch] = useState({
    show: false,
    it: "IT",
    cs: "CS",
    ec: "EC",
    mechanical: "Mechanical",
    civil: "Civil",
  });
  const [year, setYear] = useState(currentUser?.presentYear);
  const [branch, setBranch] = useState(Object.keys(showBranch).slice(1)[0]);
  const [name, setName] = useState(currentUser?.name);
  const [profile, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(currentUser?.profileImage);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const handleDisplayOptions = (type) => {
    if (type === "year") {
      setShowYear((prev) => ({ ...prev, show: !showYear.show }));
      setShowBranch((prev) => ({ ...prev, show: false }));
    } else if (type === "branch") {
      setShowYear((prev) => ({ ...prev, show: false }));
      setShowBranch((prev) => ({ ...prev, show: !showBranch.show }));
    }
  };
  const handleSelectOption = (option, type) => {
    if (type === "year") setYear(option);
    if (type === "branch") setBranch(option);
    // close option box
    setShowYear((prev) => ({ ...prev, show: false }));
    setShowBranch((prev) => ({ ...prev, show: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateUser(currentUser?._id, {
        name,
        profileImage: fileUrl,
        presentYear: year,
        presentBranch: branch,
      })
    );
    setIsOpen(false);
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
          handleSubmit();
        });
      }
    );
  };

  useEffect(() => {
    setName(currentUser?.name);
    setYear(currentUser?.presentYear);
    setBranch(currentUser?.presentBranch);
  }, [currentUser]);

  useEffect(() => {
    profile && uploadFile(profile);
  }, [profile]);

  return (
    <div className="font-poppins relative">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className="text-center text-lg font-bold font-poppins mb-4">
          Update Profile
        </h1>
        <GrClose
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <form className="grid w-72 font-poppins" onSubmit={handleSubmit}>
          <label
            htmlFor="file"
            className="bg-slate-200 flex items-center justify-center cursor-pointer py-2 mb-2 rounded-sm text-sm"
          >
            {progress < 1
              ? "Choose Profile"
              : "Uploading Profile " + progress + "%"}
            <GiClick className="ml-1" />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            id="file"
            className="hidden"
          />
          <label htmlFor="name" className="text-sm mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder={name}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-slate-300 px-2 py-2 outline-none text-sm"
          />
          <div className="w-full grid grid-cols-1 gap-x-4 gap-y-3 py-4">
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
                <span className="text-indigo-600 text-sm">
                  {showYear[year]}
                </span>
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
            </div>
          </div>
          <button
            type="submit"
            className="text-sm bg-indigo-500 text-white py-3
           rounded-sm"
          >
            Update Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};
