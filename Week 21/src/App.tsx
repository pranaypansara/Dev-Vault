import { useState } from "react";

export function App() {
  const [seconds, setSeconds] = useState(0);

  function startClock() {
    setInterval(() => {
      setSeconds(function (s) {
        return s + 1;
      });
    }, 1000);
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
          <button>Stop clock</button>
        </div>
        <div>{seconds}s</div>
      </div>
    </div>
  );
}

export default App;
