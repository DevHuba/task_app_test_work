import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>Task App</h1>
      <HomeIcon style={{ color: "#ff731d" }} onClick={() => navigate("/")} />
      <InfoIcon style={{ color: "#ff731d" }} onClick={() => navigate("about")} />
    </header>
  );
};
