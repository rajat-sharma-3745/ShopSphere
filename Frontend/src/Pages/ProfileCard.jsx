import React from "react";
import { Link } from "react-router-dom";

function ProfileCard({ user, handleLogout }) {
  return (
    <div className=" w-full md:w-2/3 lg:w-2/4 text-white">
      <div className="flex flex-col">
        <div className="bg-gradient-to-r from-orange-500 to-indigo-600 sm:px-5 py-7 px-3 flex sm:space-x-4 space-x-1.5 rounded-t-lg ">
          <div className="rounded-full bg-orange-300 text-white sm:w-20 sm:h-20 w-13 h-13 flex items-center justify-center sm:text-6xl text-2xl font-semibold">
            {user.avatar ? <img src={ user?.avatar} className="rounded-full object-cover object-top sm:w-20 sm:h-20 w-14 h-14" alt="User profile" /> : user?.name.charAt(0).toUpperCase() }
          </div>
          <div className="flex flex-col sm:space-y-1">
            <h1 className="sm:text-xl text-lg font-semibold">
              {user?.name.toUpperCase()}
            </h1>
            <p className="sm:text-sm text-xs">{user?.email}</p>
            <p className="sm:text-sm text-xs">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="shadow-lg flex justify-center gap-4 py-4 px-6 rounded-b-lg bg-gray-50">
        <Link to={`/update-profile`} className='bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 text-white rounded mr-2 cursor-pointer'>Edit</Link>
          <button
            onClick={handleLogout}
            className=" bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
