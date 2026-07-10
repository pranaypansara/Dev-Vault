//using global variable for setInterval is ugly, using useState hook for it causes extra re-renders, useRef is the solution. its lets us create reference to a value without causing re-renders

//useRef creates reference for variables that does not trigger re-render when changed. these variables holds the current value and does not re-initialise

//see the scroll bottom example in slides to understand ref in divs
import { useState } from "react";
import { useRef } from "react";

export function App() {
  const [seconds, setSeconds] = useState(0);
  let interval = useRef(0);

  function startClock() {
    interval.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function stopClock() {
    clearInterval(interval.current);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ fontSize: 100 }}>
        <div>
          <button onClick={startClock}>Start clock</button>
          <button onClick={stopClock}>Stop clock</button>
        </div>
        <div>{seconds}s</div>
      </div>
    </div>
  );
}

export default App;
