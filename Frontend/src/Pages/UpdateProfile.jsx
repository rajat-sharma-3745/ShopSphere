import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { updateUserProfile } from "../redux/slice/authSlice";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

const UpdateProfile = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    navigate("/login");
  }
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const [preview, setPreview] = useState(null);
  const [uploading, setIsUploading] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    avatar: null,
  });
  useEffect(() => {
    if (user) {
      setUpdateData(user);
    }
    if (user?.avatar) {
      setPreview(user.avatar);
    }
  }, [user]);

  {
    uploading && toast.info("Uploading Image...");
  }
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUpdateData((prev) => ({ ...prev, avatar: data.imageUrl }));
      setPreview(data.imageUrl);
      toast.success("Image Uploaded!");
      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  }

  function handleChange(e) {
    setUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const hasChanges =
  updateData.name !== user?.name ||
  updateData.email !== user?.email ||
  updateData.avatar !== user?.avatar;

  function handleSubmit(e) {
    if(!updateData.name || !updateData.email){
        toast.info("Name and email must be provided");
        return;
    }
    e.preventDefault();
    dispatch(updateUserProfile(updateData)).then(() => {
      toast.success("User updated!", { duration: 2000 });
    });
    navigate("/profile");
  }

  return (
    <div className="sm:p-15 p-3">
    <div className="container mx-auto md:w-2/3 lg:w-2/4 bg-gradient-to-b from-sky-100 to-white shadow-lg rounded-lg  sm:p-5 p-3">
      <h1 className="sm:text-3xl text-xl font-bold text-center">
        Update Profile
      </h1>
      <div className="flex sm:flex-row flex-col gap-2 p-6">
        {/* Profile */}
        <div className="sm:flex-1 w-full flex justify-center items-center ">
          <div
            onClick={handleAvatarClick}
            className="relative rounded-full lg:w-45 lg:h-45 md:w-40 md:h-40 sm:w-36 sm:h-36 w-32 h-32  bg-gradient-to-r from-orange-200 to-yellow-500  flex items-center justify-center text-5xl font-bold cursor-pointer duration-300"
          >
            {preview ? (
              <img
                src={preview}
                alt="Avatar"
                className="lg:w-43 lg:h-43 md:w-38 md:h-38 sm:w-35 sm:h-35 w-30 h-30 rounded-full object-cover object-top  border-4 border-white shadow-lg"
              />
            ) : (
              user?.name.charAt(0).toUpperCase()
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="absolute sm:right-2 sm:bottom-4 right-1 bottom-3
             sm:p-2 p-1 bg-red-400 rounded-full sm:h-8 sm:w-8 w-6 h-6">
              <FaCamera size={16} />
            </div>
          </div>
        </div>
        <div className="sm:w-2/3 w-full">
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor=""
              className="block font-semibold mb-2 text-[#555] text-xl"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 "
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor=""
              className="block font-semibold mb-2 text-[#555] text-xl"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={updateData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 "
              required
              id=""
            ></input>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Link to='/profile'
          className={`px-3 font-semibold  text-white py-2 rounded-md bg-blue-600 hover:bg-blue-700  `}
        >
          Back
        </Link>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={!hasChanges}
          className={`px-3 font-semibold  text-white py-2 rounded-md ${hasChanges? ' bg-[#28a745] hover:bg-green-700 transition-colors duration-300 hover:scale-105':'bg-green-400 cursor-not-allowed'} `}
        >
          Update
        </button>
      </div>
    </div>
    </div>
  );
};

export default UpdateProfile;
