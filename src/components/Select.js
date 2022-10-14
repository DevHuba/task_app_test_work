import { useContext } from "react";

//Context
import { FilterContext } from "../context/filter.context.jsx";

export const Select = () => {
  const { setFilterStatus } = useContext(FilterContext);

  return (
    <div className="select_container">
      <h3>Filter</h3>
      <div className="select">
        <select id="select-filter" onChange={(option) => setFilterStatus(option.target.value)}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
        <span className="focus"></span>
      </div>
    </div>
  );
};
