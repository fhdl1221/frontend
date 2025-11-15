import React from "react";
import MemoItem from "./MemoItem";

export default function List({ todos, handleState, handleDelete }) {
  if (todos.length === 0)
    return <p className="text-center text-gray-500">표시할 메모가 없습니다.</p>;

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <MemoItem
          key={todo.id}
          todo={todo}
          handleState={handleState}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
