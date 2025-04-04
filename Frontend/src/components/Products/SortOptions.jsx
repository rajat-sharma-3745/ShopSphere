import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiChevronDown } from 'react-icons/fi';

function SortOptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  // when user selects one of the option, we will set it in the url query string , the value of the select will be retrieved from search params so that when user refreshes , the selected option remains same
  function handleSortChange(e) {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  }
  return (
    <div className="mb-3 flex justify-end items-center">
     
        <select
          name=""
          id="sort"
          value={searchParams.get("sortBy") || ""}
          onChange={handleSortChange}
          className="border p-2 rounded-md focus:outline-none "
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
     
    </div>
  );
}

let options = [
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Popularity", value: "popularity" },
];

export const CustomSort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const selectRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };
  function handleSortChange(e) {
    const sortBy = e.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex justify-end">
      <div
        onClick={toggleDropdown}
        ref={selectRef}
        className="bg-white relative border border-gray-300 rounded-xl px-4 py-3 cursor-pointer  transition sm:w-52 w-[12rem]"
      >
        <div className="flex items-center justify-between">
        { searchParams.get("sortBy") ?
            options.map((option) =>
              searchParams.get("sortBy") === option.value ? option.label : ""
            ):"Select a option"}
               <FiChevronDown/>
            </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-10">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={(e) => {
                  handleOptionClick(option);
                  handleSortChange(option);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortOptions;
