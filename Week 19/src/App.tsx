//UseEffect: body, dependency array, cleanup function inside bodyg
import { APITester } from "./APITester";
import axios from "axios";
import { useState, useEffect } from "react";

export function App() {
  let [currentid, setcurrentid] = useState([]);
  return (
    <div className="app">
      <button
        onClick={function () {
          setcurrentid(1);
        }}
      >
        1
      </button>
      <button
        onClick={function () {
          setcurrentid(2);
        }}
      >
        2
      </button>
      <button
        onClick={function () {
          setcurrentid(3);
        }}
      >
        3
      </button>
      <Todo id={currentid} />
    </div>
  );
}

function Todo(props: any) {
  let [data, setdata] = useState("");
  const id = props.id;

  //if the dependency array (2nd argument) is empty
  //then this function runs only on the first render (mount)
  //if we want to re-render useEffect everytime id changes
  //then we have to add id in the dependency array
  useEffect(
    function () {
      axios
        .get("https://jsonplaceholder.typicode.com/todos/" + id)
        .then((res) => {
          setdata(res.data.title);
        });

      //example to show usecase of cleanup function
      let clockid = setInterval(() => {
        console.log("hi there " + id);
      }, id * 1000);

      //ts cleanup function is triggered everytime before rerendering whenever a dependency changes (id in this case)
      return function () {
        clearInterval(clockid);
      };
    },
    [id],
  );

  return <div style={{ margin: 10, border: "2px solid black" }}>{data};</div>;
}

export default App;