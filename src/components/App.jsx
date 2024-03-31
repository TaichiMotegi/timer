import Home from "../routes/homde";
import Main from "../routes/main";
import Result from "../routes/result";
import NoMatch from "../routes/noMatch";
import Chart from "../routes/chart";
import { Routes, Route } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timer" element={<Main />} />
            <Route path="/result" element={<Result />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </>
      )}
    </div>
  );
}
