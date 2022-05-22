import React, {useState, useEffect, useRef} from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [inp, setinp] = useState("");
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(todos && [...todos, { isChake: false, val: value }]);

    console.log("todos", todos);
  }, [value]);

  function closeTask(i) {
    localStorage.removeItem(todos[i].val);
    setTodos(todos.filter((item, index) => index !== i));
  }
  
  useEffect(()=>{
      const handle = setTimeout(()=>{
        console.log("inp", inp);
      }, 1500);
      return ()=>clearTimeout(handle);
  }, [inp])
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setValue(inp);
          setinp("");
        }}
      >
        <input
          type="text"
          value={inp}
          onChange={(e) => {
            setinp(e.target.value)
          }}
        />
        <button>add</button>
      </form>

      <TodoItem todos={todos} closeTask={closeTask} />
    </div>
  );
}
