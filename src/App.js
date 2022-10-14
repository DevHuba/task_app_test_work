// Tools
import { Route, Routes } from "react-router-dom";

//Components
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Details } from "./pages/Details";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </>
  );
}
