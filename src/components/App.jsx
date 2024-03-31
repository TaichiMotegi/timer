import Home from "../routes/homde";
import Main from "../routes/main";
import Result from "../routes/result";
import NoMatch from "../routes/noMatch";
import Chart from "../routes/chart";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Main />} />
        <Route path="/result" element={<Result />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
