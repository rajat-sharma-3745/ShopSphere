import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function FilterSidebar() {
 
  const [searchParams, setSearchParams] = useSearchParams(); // to get query params
  // to store the filters ,user choosed
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  // we can update the search params ,but to update the url in the search bar , we need to navigate to the new url with query params for that we will use useNavigate hook
  const navigate = useNavigate(); //it returns a function that lets us navigate programatically in the browser in response to user interactions

  const [priceRange, setPriceRange] = useState([0, 100]); //priceRange will be an array of two values : min and max price

  //Filters
  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Olive",
    "SkyBlue",
    "Black",
    "#FFFDD0",
    "Gray",
    "White",
    "Brown",
    "Pink",
    "Beige",
    "Maroon",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const genders = ["Men", "Women"];

  //to update the filters state object , when user clicks and also the url
  function handleFilterChange(e) {
    // when user clicks on any filter,we get it from event target, the name and value we have specified in the input box
    const { name, value, checked, type } = e.target;
    // when user clicks on multiple chechbox , we have to add them all
    // 1. creating a copy of state, bcuz we cannot mutate original
    const newFilters = { ...filters };
    //for checkboxes
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } //for other inputs
    else {
      if (name === "color") {
        if (value === "#FFFDD0") {
          newFilters[name] = "Cream";
        } else {
          newFilters[name] = value;
        }
      } else newFilters[name] = value;
    }
    setFilters(newFilters);
    updateUrlParams(newFilters);
  }
  //to update the query params based on new filters, we have to create url search params object
  function updateUrlParams(newFilters) {
    // we will create a URLSearchParams object to manipulate the url query params(to update the url with filters)
    const params = new URLSearchParams();
    // for arrays, we have to join the elements into comma separated strings  , to check if the key in new filter is array or not we have to iterate
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`); //update the url
  }

  //function to handle price change
  function handlePriceChange(e) {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateUrlParams(newFilters);
  }

  // to update the filters, whenever search params changes
  useEffect(() => {
    // convert the search params into plain object.
    const params = Object.fromEntries([...searchParams]);
    // What this will do: searchParams is URLSearchParams obj i.e({'a'=>'1','b'=>'2'}) , [...searchParams] spread operator  converts the  searchParams into an array of [key,value] pairs, i.e array of arrays [[],[],[]] ,Object.fromEntries: Converts the array into a plain JavaScript object. =>  {a:1,b:2} params.a like we can access instead of using get()

    // setting filters values
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-b-gray-300">
        <h3 className="text-xl font-medium text-gray-800 ">Filter</h3>
      </div>
      {/* Category filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input id={category}
              type="radio"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              name="category"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={category}>
            <span className="text-gray-700 cursor-pointer">{category}</span></label>
          </div>
        ))}
      </div>
      {/* Gender filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Gender
        </label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input id={gender}
              type="radio"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              name="gender"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={gender}>
            <span className="text-gray-700 cursor-pointer">{gender}</span></label>
          </div>
        ))}
      </div>
      {/* Color filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              value={color}
              onClick={handleFilterChange}
              name="color"
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLocaleLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input id={size}
              type="checkbox"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              name="size"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={size}>
            <span className="text-gray-700 cursor-pointer">{size}</span></label>
          </div>
        ))}
      </div>
      {/* Materials filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Materials
        </label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input id={material}
              type="checkbox"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              name="material"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={material}>
            <span className="text-gray-700 cursor-pointer">{material}</span></label>
          </div>
        ))}
      </div>
      {/* Brand filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Brands
        </label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input id={brand}
              type="checkbox"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              name="brand"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={brand}>
            <span className="text-gray-700 cursor-pointer">{brand}</span></label>
          </div>
        ))}
      </div>
      {/* Price range filter */}
      <div className="mb-8">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          onChange={handlePriceChange}
          value={priceRange[1]}
          name="priceRange"
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
