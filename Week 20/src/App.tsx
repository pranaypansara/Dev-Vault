import { Dashboard } from "./screens/Dashboard";
import { Auth } from "./screens/Auth";
import { Board } from "./screens/Board";
import { BrowserRouter, Routes, Route } from "react-router";

export function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
