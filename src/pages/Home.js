/* eslint-disable react-hooks/exhaustive-deps */
// Components
import { Header } from "../components/Header";
import { AddTodo } from "../jsx/add-todo";
import { Select } from "../components/Select";
import { Search } from "../components/Search";
import { FilteredTodos } from "../jsx/filtrate-todo";
import { Popup } from "../components/Popup";

import { Box } from "@mui/material";

export const Home = () => {
  return (
    <div>
      <Header />
      <Box
        className="search_box"
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "25ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Search</h3>
        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "250px",
            },
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Search title="title" />
          <Search title="author" />
        </Box>

        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "250px",
            },
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Select />
        </Box>

        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "250px",
            },
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>Add</h3>
          <AddTodo />
        </Box>
      </Box>

      <Popup />
      <Box
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "250px",
          },
          marginTop: "40px",
        }}
      >
        <FilteredTodos />
      </Box>
    </div>
  );
};
