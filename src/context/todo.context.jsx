/* eslint-disable array-callback-return */
import { gql, useQuery } from "@apollo/client";
import { createContext, useState } from "react";

export const TodoContext = createContext({
  itemForProps: null,
  setItemForProps: () => null,
  allTodos: [],
  setAllTodos: () => null,
  title: "",
  setTitle: () => null,
  name: "",
  setName: () => null,
  item: null,
  setItem: () => null,
  popupAnswer: Boolean,
  setPopupAnswer: () => null,
});

export const AllTodoProvider = ({ children }) => {
  const [itemForProps, setItemForProps] = useState({});
  const [allTodos, setAllTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [item, setItem] = useState(null);

  const { loading } = useQuery(
    gql`
      query GetAllData {
        todos {
          data {
            id
            title
            user {
              name
            }
            completed
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        const localTodos = JSON.parse(localStorage.getItem("allTodos"));
        if (!localTodos) {
          setAllTodos(data.todos.data);
          localStorage.setItem("allTodos", JSON.stringify(data.todos.data));
        }
        if (allTodos.length === 0 && localTodos.length === 0) {
          setAllTodos(data.todos.data);
        } else {
          setAllTodos(JSON.parse(localStorage.getItem("allTodos")));
        }
      },
    }
  );

  const _createTodo = (newItem) => {
    //Assign unique id for new task
    newItem.id = String(parseInt(allTodos[allTodos.length - 1].id) + 1);
    findRepeatedItem(newItem) ? setItem(newItem) : setAllTodos([...allTodos, newItem]);
    if (findRepeatedItem(newItem)) {
      setItem(newItem);
    } else {
      const array = [...allTodos, newItem];
      setAllTodos(array);
      localStorage.setItem("allTodos", JSON.stringify(array));
    }
  };

  //In popup
  const _popupConfirm = () => {
    const existsInTodos = allTodos.find((i) => i.id === item.id);
    if (existsInTodos) {
      //Save if same item in update
      const items = allTodos.map((x) => {
        return x.id === item.id ? item : x;
      });
      setAllTodos(items);
      localStorage.setItem("allTodos", JSON.stringify(items));
    } else {
      //Save if add new same item
      const array = [...allTodos, item];
      setAllTodos(array);
      localStorage.setItem("allTodos", JSON.stringify(array));
    }
    setItem(null);
  };

  const _updateTodo = (_item) => {
    if (findRepeatedItem(_item)) {
      setItem(_item);
    } else {
      const items = allTodos.map((x) => {
        return x.id === _item.id ? _item : x;
      });
      setAllTodos(items);
      localStorage.setItem("allTodos", JSON.stringify(items));
    }
  };

  const _deleteTodo = (itemId) => {
    const itemsAfterDelete = allTodos.filter((x) => {
      return x.id !== itemId.toString();
    });
    setAllTodos(itemsAfterDelete);
    localStorage.setItem("allTodos", JSON.stringify(itemsAfterDelete));
  };

  const findRepeatedItem = (item) => {
    return Boolean(
      allTodos.find((element) => {
        return element.title === item.title && element.user.name === item.user.name;
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{
        allTodos,
        setAllTodos,
        itemForProps,
        setItemForProps,
        title,
        setTitle,
        name,
        setName,
        item,
        _createTodo,
        _updateTodo,
        _deleteTodo,
        _popupConfirm,
        setItem,
      }}
    >
      {!loading && children}
    </TodoContext.Provider>
  );
};
