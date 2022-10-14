/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

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
  const [anchorEl, setAnchorEl] = useState(null);

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

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        aria-describedby={id}
        sx={{ mt: "10px" }}
        size="large"
        variant="contained"
        color="first"
        onClick={(e) => {
          if (title === "" || userName === "") {
            setAnchorEl(e.currentTarget);
          } else {
            addTodo({ variables: { title: title } });
          }
        }}
      >
        Add
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        Title or author is empty...
      </Popover>
    </div>
  );
};
