import React from "react";

//defining the context
export const setTodosContext = React.createContext({
  setTodos: () => {}
} as {
  setTodos: any;
});
