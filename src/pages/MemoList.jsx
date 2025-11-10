import { useState, useEffect } from "react";
import { getMemos, updateMemo, deleteMemo } from '../utils/api';
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import OrderButtons from "../components/OrderButtons";
import List from "../components/List";

export default function MemoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt"); // 정렬 기준을 createdAt으로 변경
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await getMemos();
            setTodos(response.data);
        } catch (error) {
            console.error("Failed to fetch memos:", error);
        }
    }
    fetchData();
  }, []);

  async function handleState(id, currentState) {
    const currentTodo = todos.find(todo => todo.id === id);
    if (!currentTodo) return;

    const newState = currentState === "completed" ? "incomplete" : "completed";
    // 백엔드로 보낼 데이터에는 title, state, priority가 모두 필요할 수 있습니다.
    // 여기서는 state만 변경하지만, 전체 객체를 보내는 것이 안전할 수 있습니다.
    const updatedTodoData = { 
        title: currentTodo.title, 
        priority: currentTodo.priority, 
        state: newState 
    };
    
    try {
        const response = await updateMemo(id, updatedTodoData);
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? response.data : todo))
        );
    } catch (error) {
        console.error("Failed to update memo:", error);
    }
  }

  async function handleDelete(id) {
    try {
        await deleteMemo(id);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
        console.error("Failed to delete memo:", error);
    }
  }
  const priorityMaps = { low: 1, normal: 2, high: 3 };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.state === "completed";
      if (filter === "incomplete") return todo.state === "incomplete";
      return true;
    })
    .sort((a, b) => {
      let keyA = a[sortKey];
      let keyB = b[sortKey];

      if (sortKey === "createdAt") { // 정렬 기준을 createdAt으로 변경
        keyA = new Date(keyA);
        keyB = new Date(keyB);
      }

      if (sortKey === "priority") {
        keyA = priorityMaps[a.priority];
        keyB = priorityMaps[b.priority];
      }

      if (keyA < keyB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (keyA > keyB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    })
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 w-[60%] mx-auto">
      <div className="flex items-center justify-between mt-4 mb-4">
        <h1 className="text-2xl font-bold">My Memo</h1>
        <SearchBar search={search} setSearch={setSearch}></SearchBar>
      </div>
      <div className="flex items-center justify-between mb-4">
        <FilterButtons filter={filter} setFilter={setFilter} />
        <OrderButtons
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        ></OrderButtons>
      </div>
      <List
        todos={filteredTodos}
        handleState={handleState}
        handleDelete={handleDelete}
      />
    </div>
  );
}
