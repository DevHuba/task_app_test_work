/* eslint-disable react-hooks/exhaustive-deps */
//Tools
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

//Images
import EditIcon from "../assets/img/icons/edit_icon.png";

//Context
import { TodoContext } from "../context/todo.context";
import { FilterContext } from "../context/filter.context";

//Components
import { DeleteTodo } from "../jsx/delete-todo";

export const FilteredTodos = () => {
  const { setItemForProps, allTodos } = useContext(TodoContext);
  const { filteredTodos, setFilteredTodos, setSearchName, setSearchTitle } =
    useContext(FilterContext);

  const navigate = useNavigate();

  return (
    <div>
      {filteredTodos.length === 0 && (
        <div>
          <h1>You dont have that task or author...</h1>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setFilteredTodos(allTodos);
              setSearchName("");
              setSearchTitle("");
            }}
            className="btn"
          >
            go back
          </Button>
        </div>
      )}
      {filteredTodos.map((item) => {
        return (
          <div key={item.id}>
            <h5>{item.user.name}</h5>
            <h3>{item.title}</h3>
            <h5>completed - {item.completed === true ? "yes" : "no"}</h5>
            <div className="img_container">
              <img
                className="img_delete"
                alt="img_edit"
                src={EditIcon}
                onClick={() => navigate("details", setItemForProps(item))}
              />
              <DeleteTodo deleteId={item.id} />
            </div>
            <br />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};
