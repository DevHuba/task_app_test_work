//Tools
import { useState, useEffect, useContext } from "react";
import { TodoContext } from "../context/todo.context";

//Components
import { UpdateTodo } from "../jsx/update-todo";

export const Details = () => {
  const [status, setStatus] = useState("");

  const { itemForProps } = useContext(TodoContext);

  useEffect(() => {
    if (itemForProps.completed === true) {
      setStatus("done");
    } else {
      setStatus("undone");
    }
  }, [itemForProps.completed]);

  return (
    <div>
      <div>
        <h1>Task : {itemForProps.title}</h1>
        <h3>Author : {itemForProps.user.name}</h3>
        <h3>Task status : {status}</h3>
      </div>
      <br />
      <UpdateTodo />
    </div>
  );
};
