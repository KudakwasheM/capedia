import React, { useState } from "react";

const SearchBar = ({ placeholder }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="mb-3">
      <form>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-2 text-lg border rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
