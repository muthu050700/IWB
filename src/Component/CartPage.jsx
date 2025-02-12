import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
const CartPage = ({
  path,
  createFormData,
  handleDelete,
  handleEdit,
  filter,
  favorites,
  setFavorites,
  showFilteredData,
}) => {
  useEffect(() => {
    // Initialize the localStorage with an empty array if not already set
    const storedFavorites = localStorage.getItem("favorites");
    if (!storedFavorites) {
      localStorage.setItem("favorites", JSON.stringify([]));
    } else {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  if (createFormData.length === 0) {
    return (
      <div className=" bg-[#FFFFFF] border-b-2 border-l-2 border-r-2 shadow-sm rounded-md mx-3 py-4">
        <p className=" text-xl font-bold  text-center text-gray-500">
          OOPS!!!, Something went worng.
        </p>
      </div>
    );
  }

  let filteredData;
  if (showFilteredData === "Favorite") {
    filteredData = favorites.filter((data) => {
      return (
        (data.ApplicationName.toLowerCase() === filter.toLowerCase() ||
          filter.toLowerCase() === "all") &&
        data.Environment === path
      );
    });
  } else {
    filteredData = createFormData.filter(
      (data) =>
        (data.ApplicationName.toLowerCase() === filter.toLowerCase() ||
          filter.toLowerCase() === "all") &&
        data.Environment === path
    );
  }

  const AddToFavorite = (id) => {
    const data = createFormData.filter((val) => val.id === id);
    const storedFavorites = localStorage.getItem("favorites");
    const favoritesArray = JSON.parse(storedFavorites);
    favoritesArray.push(data[0]);
    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
    setFavorites(favoritesArray);
  };

  const removeToFavorite = (id) => {
    const storedFavorites = localStorage.getItem("favorites");
    const favoritesArray = JSON.parse(storedFavorites);
    const data = favoritesArray.filter((val) => val.id !== id);
    localStorage.setItem("favorites", JSON.stringify(data));
    setFavorites(data);
  };

  return filteredData.length === 0 ? (
    path !== "" && (
      <div className=" bg-[#FFFFFF] border-b-2 border-l-2 border-r-2 shadow-sm rounded-md mx-3 py-4">
        <p className=" text-xl font-bold  text-center text-gray-500">
          No Data Found
        </p>
      </div>
    )
  ) : (
    <div className=" flex flex-wrap gap-5 py-2 px-3">
      {filteredData
        .filter(
          (data) =>
            (data.ApplicationName.toLowerCase() === filter.toLowerCase() ||
              filter.toLowerCase() === "all") &&
            data.Environment === path
        )
        .map((val, index) => {
          return (
            <div
              key={index}
              className=" bg-white  border-b-2  shadow-sm hover:shadow-lg  w-[360px] h-[280px] px-2 py-2 rounded-lg"
            >
              <div className="flex justify-between ">
                <div className="flex flex-col gap-2 pb-2">
                  <p className="text-[15px] text-[#F57632] font-bold">
                    Application Name : {val.ApplicationName}
                  </p>
                  <p className="text-[12px] text-[#227DD7] font-bold ">
                    OS : <span>{val.OS}</span>
                  </p>
                </div>
                <div className="flex gap-2 text-gray-500 items-center">
                  <FaEdit
                    size={20}
                    className="cursor-pointer"
                    onClick={() => handleEdit(val.id)}
                  />
                  <MdDelete
                    size={20}
                    onClick={() => handleDelete(val.id)}
                    className=" cursor-pointer"
                  />

                  {favorites.findIndex((fav) => fav.id === val.id) != -1 ? (
                    <IoIosStar
                      size={25}
                      className=" text-yellow-400 cursor-pointer"
                      onClick={() => removeToFavorite(val.id)}
                    />
                  ) : (
                    <CiStar
                      size={25}
                      className=" text-blue-600 cursor-pointer"
                      onClick={() => AddToFavorite(val.id)}
                    />
                  )}
                </div>
              </div>
              <hr className=" text-orange-500" />
              <p className="  px-4 py-2 text-[14px] my-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700  hover:shadow-lg transition duration-300">
                Swagger URL :{" "}
                <a href={`${val.SwaggerURL}`} className="hover:text-white">
                  {val.SwaggerURL}
                </a>
              </p>
              <div class="p-2 bg-gray-100 rounded-lg shadow-md">
                <div class="space-y-3">
                  <div className=" relative w-[250px] group ">
                    <p class="text-sm text-gray-600 truncate">
                      <span class="font-medium text-gray-700">FTP Path:</span>{" "}
                      {val.FTPPath}
                    </p>
                    <div className="absolute left-0 bottom-full font-medium  hidden rounded-md bg-[#F6FAFD] p-2 text-xs text-black shadow-md group-hover:block">
                      {" "}
                      {val.FTPPath}
                    </div>
                  </div>
                  <div className=" relative w-[250px] group ">
                    <p class="text-sm text-gray-600 truncate">
                      <span class="font-medium text-gray-700">
                        FTP Log Path:
                      </span>{" "}
                      {val.FTPLogPath}
                    </p>
                    <div className="absolute left-0 bottom-full font-medium hidden rounded-md bg-[#F6FAFD] p-2 text-xs text-black shadow-md group-hover:block">
                      {val.FTPLogPath}
                    </div>
                  </div>

                  <div className="relative group w-[250px]">
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium text-gray-700">
                        FTP Monitor Path:
                      </span>{" "}
                      {val.FTPMonitorPath}
                    </p>
                    {/* Tooltip */}
                    <div className="absolute left-0 bottom-full  hidden rounded-md bg-[#F6FAFD] p-2 text-xs text-black font-medium shadow-md group-hover:block">
                      {val.FTPMonitorPath}
                    </div>
                  </div>
                  <div className="relative group w-[250px]">
                    <p class="text-sm text-gray-600">
                      <span class="font-medium text-gray-700">DB Name:</span>{" "}
                      {val.DBName}
                    </p>
                    {/* Tooltip */}
                    <div className="absolute left-0 bottom-full  hidden rounded-md bg-[#F6FAFD] p-2 text-xs text-black font-medium shadow-md group-hover:block">
                      {val.DBName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CartPage;

// grid grid-cols-3 place-items-center gap-5
