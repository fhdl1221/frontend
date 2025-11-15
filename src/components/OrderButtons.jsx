import React from "react";
export default function OrderButtons({
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="date">날짜</option>
        <option value="priority">우선순위</option>
      </select>

      <button
        onClick={() => setSortOrder("asc")}
        className="p-1 rounded focus:border-blue-400 focus:border-2"
      >
        ⬆️
      </button>
      <button
        onClick={() => setSortOrder("desc")}
        className="p-1 rounded focus:border-blue-400 focus:border-2"
      >
        ⬇️
      </button>
    </div>
  );
}
