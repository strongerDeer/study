"use client";

import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      searchBar
      <input type="search" value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
}
