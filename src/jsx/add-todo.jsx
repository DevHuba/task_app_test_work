/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";

import { TodoContext } from "../context/todo.context";

//Styles
import TextField from "@mui/material/TextField";

//Add new todo
const ADD_TODO = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!) {
    createTodo(input: { title: $title, completed: $completed }) {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

export const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");

  const { _createTodo } = useContext(TodoContext);

  const [addTodo, { error }] = useMutation(ADD_TODO, {
    variables: { completed: false },
    onCompleted: (data) => {
      data.createTodo.user.name = userName;

      _createTodo(data.createTodo);

      setTitle("");
      setUserName("");
    },
  });

  if (error) return `Error in add todos! ${error.message}`;

  return (
    <div className="add_container">
      <TextField
        id="outlined-search"
        size="small"
        type="search"
        variant="outlined"
        label="new title"
        value={title}
        inputProps={{ style: { fontSize: 15, color: "white" } }}
        InputLabelProps={{ style: { fontSize: 15, color: "#bcbfb4" } }}
        onChange={(e) => {
          setTitle(e.target.value.toLowerCase());
        }}
      />
      <TextField
        id="outlined-search"
        size="small"
        type="search"
        variant="outlined"
        label="new author"
        value={userName}
        inputProps={{ style: { fontSize: 15, color: "white" } }}
        InputLabelProps={{ style: { fontSize: 15, color: "#bcbfb4" } }}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br />
      <Button
        sx={{ mt: "10px" }}
        size="large"
        variant="contained"
        color="first"
        onClick={() => addTodo({ variables: { title: title } })}
      >
        Add
      </Button>
    </div>
  );
};
