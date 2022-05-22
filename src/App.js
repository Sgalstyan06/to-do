import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { Usereduser } from "./Usereduser";

function App() {
  // localStorage.setItem("arr", JSON.stringify([]))
  // let store =  JSON.parse(localStorage.getItem("arr"));
  // console.log("store", store);
 
  
  return (
    <div className="App">
      <Usereduser/>
     {/* <TodoList/> */}
    </div>
  );
}

export default App;
