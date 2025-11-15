import React from "react";
export default function SearchBar({ search, setSearch }) {
  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="제목 검색"
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 w-full sm:w-60 focus:outline-none focus:border-2 focus:border-blue-400 transition"
      />
    </div>
  );
}
