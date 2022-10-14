/* eslint-disable react/jsx-no-duplicate-props */
//Styles
import TextField from "@mui/material/TextField";

//Context
import { useContext } from "react";
import { FilterContext } from "../context/filter.context.jsx";

export const Search = ({ title }) => {
  const { searchName, searchTitle, setSearchTitle, setSearchName } = useContext(FilterContext);

  return (
    <div>
      <TextField
        id="outlined-search"
        size="small"
        label={title}
        type="search"
        variant="outlined"
        value={title === "title" ? searchTitle : searchName}
        inputProps={{ style: { fontSize: 15, color: "white" } }}
        InputLabelProps={{ style: { fontSize: 15, color: "#bcbfb4", borderColor: "white" } }}
        onChange={(e) => {
          const textLower = e.target.value.toLowerCase();
          title === "title" ? setSearchTitle(textLower) : setSearchName(textLower);
        }}
      />
    </div>
  );
};
