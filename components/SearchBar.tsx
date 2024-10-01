"use client";

import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnigying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  // state to handle currently chosen manufacturer
  const [manufacturer, setManufacturer] = useState("");

  const [model, setModel] = useState("");

  // useRouter is a hook that allows to programmatically navigate or update the URL.
  const router = useRouter();

  // this function calls updateSearchParams or show alert message if blank input is provided
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If both manufacturer and model are empty, an alert is shown
    if (manufacturer === "" && model === "") {
      return alert("Please fill in the search bar");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  // this function update the url based on the input provided by the user i.e. model and manufacturer
  const updateSearchParams = (model: string, manufacturer: string) => {
    // The URLSearchParams object is used to manage and manipulate the query parameters of the current URL.
    const searchParams = new URLSearchParams(window.location.search);

    // Updates the specified query parameter (e.g., "model") with the new value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    // After updating the query parameters, the function builds a new URL:
    // window.location.pathname gives the current path (without the query parameters).
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    // The new URL is passed to router.push() to navigate to the updated path without reloading the page.
    router.push(newPathName);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      {/* there are 2 items in searchbar: manufacturer and model.
        Manufacturer is not just searchbar but a combo box or and autocomplete search.
        i.e. provide pre defined array like dropdown menu */}
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </div>

      <SearchButton otherClasses="sm:hidden" />

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          alt="car model"
          className="absolute w-[20px] h-[20px] ml-4"
        />

        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
