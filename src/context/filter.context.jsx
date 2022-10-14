/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { TodoContext } from "../context/todo.context";

export const FilterContext = createContext({
  filteredTodos: [],
  setFilteredTodos: () => null,
  searchTitle: "",
  setSearchTitle: () => null,
  searchName: "",
  setSearchName: () => null,
  filterStatus: "",
  setFilterStatus: () => null,
});

export const FilteredTodoProvider = ({ children }) => {
  const { allTodos, item } = useContext(TodoContext);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    filterItems();
  }, [searchTitle, searchName, filterStatus, allTodos, item]);

  const filterItems = () => {
    if (!searchName && !searchTitle) {
      setFilteredTodos(
        allTodos.filter((item) => {
          switch (filterStatus) {
            case "done":
              return item.completed === true;
            case "undone":
              return item.completed === false;
            default:
              return allTodos;
          }
        })
      );
    } else if (!searchTitle) {
      setFilteredTodos(
        allTodos.filter((item) => {
          const reqName = item.user.name.toLowerCase();
          switch (filterStatus) {
            case "done":
              return reqName.includes(searchName) && item.completed === true;
            case "undone":
              return reqName.includes(searchName) && item.completed === false;
            default:
              return reqName.includes(searchName);
          }
        })
      );
    } else {
      setFilteredTodos(
        allTodos.filter((item) => {
          const reqName = item.title.toLowerCase();
          switch (filterStatus) {
            case "done":
              return reqName.includes(searchTitle) && item.completed === true;
            case "undone":
              return reqName.includes(searchTitle) && item.completed === false;
            default:
              return reqName.includes(searchTitle);
          }
        })
      );
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filteredTodos,
        setFilteredTodos,
        searchTitle,
        setSearchTitle,
        searchName,
        setSearchName,
        filterStatus,
        setFilterStatus,
        filterItems,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
