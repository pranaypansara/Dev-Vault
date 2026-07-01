import { Dashboard } from "./screens/Dashboard";
import { Auth } from "./screens/Auth";
import { Board } from "./screens/Board";
import { BrowserRouter, Routes, Route } from "react-router";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export function App() {
  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </div>
  );
}

export default App;
