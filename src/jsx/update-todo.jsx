/* eslint-disable react-hooks/exhaustive-deps */
//Tools
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import { TodoContext } from "../context/todo.context";
import Button from "@mui/material/Button";

//Add new todo
const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, input: { title: $title, completed: $completed }) {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

export const UpdateTodo = () => {
  const navigate = useNavigate();

  const { itemForProps, _updateTodo } = useContext(TodoContext);

  const [title, setTitle] = useState(itemForProps.title);
  const [userName, setUserName] = useState(itemForProps.user.name);
  const [status, setStatus] = useState(itemForProps.completed);

  const [updateTodo, { error }] = useMutation(UPDATE_TODO, {
    onCompleted: () => {
      _updateTodo({
        ...itemForProps,
        title: title,
        completed: status,
        user: {
          name: userName,
        },
      });

      navigate("/");
    },
  });

  if (error) return `Error in add todos! ${error.message}`;

  return (
    <div>
      <div>
        <fieldset>
          <legend>Update data</legend>
          <div>
            <label>Title </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value.toLowerCase());
              }}
            />
          </div>
          <div>
            <label>Name </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
        </fieldset>
      </div>
      <br />
      <div>
        <fieldset>
          <legend>Update status</legend>
          <div>
            <input
              type="radio"
              id="undone"
              name="check_status"
              value="undone"
              onChange={() => setStatus(false)}
            />
            <label>Undone</label>
          </div>
          <div>
            <input
              type="radio"
              id="done"
              name="check_status"
              value="done"
              onChange={() => setStatus(true)}
            />
            <label>Done</label>
          </div>
        </fieldset>
      </div>
      <br />
      <Button
        variant="contained"
        size="large"
        onClick={() =>
          updateTodo({ variables: { id: itemForProps.id, title: title, completed: status } })
        }
      >
        update
      </Button>
    </div>
  );
};
