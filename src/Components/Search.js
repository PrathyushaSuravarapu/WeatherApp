import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoOptions, geoUrl } from "../Api";
import '../Style.css'

const Search = ({ onSearchChange, onChange }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${geoUrl}/cities?&namePrefix=${inputValue}`,
        geoOptions
      );
      const response_1 = await response.json();
      if (response_1.data.length === 0){
        console.log(response_1.data + " no data")
        onChange()
      }
     else{
      return {
        options: response_1.data.map((city) => {
          console.log( `${city.latitude} ${city.longitude}`)
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    }}
    catch(err) {
      onChange()
    }
    return[]
  };
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch("")
  }
  return (
    <div className="div">
       <AsyncPaginate className="search"
      placeholder="Search Location here..."
      value={search}
      debounceTimeout={600}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    /> 
    </div>
   
  );
};
export default Search;