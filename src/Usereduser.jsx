import { useEffect, useReducer, useRef, useState } from "react";

export function Usereduser() {
  const [inpValue, setInpValue] = useState("");
  const [store, setStore] = useState([]);
  
  const [state, dispatch] = useReducer(reducer, store);

  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "delete":
        localStorage.setItem(
          "store",
          JSON.stringify(
            store.filter((item, index) => index !== action.payload)
          )
        );
        setStore(JSON.parse(localStorage.getItem("store")));
        return state.filter((item, index) => index !== action.payload);
      case "refresh":
        return store;
      default:
        return [];
      
    }
  }

  // useEffect(() => { 

    
  // }, [state]);

  useEffect(() => {
    setStore(JSON.parse(localStorage.getItem("store")));
    dispatch({ type: "refresh", payload: store });
  }, []);

  return (
    <div>
      <h3>helow</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          localStorage.setItem("store", JSON.stringify([...store, inpValue]));
          setStore(JSON.parse(localStorage.getItem("store")));          
          dispatch({ type: "add", payload: inpValue });
          
          setInpValue("");
        }}
      >
        <input
          type="text"
          value={inpValue}
          onChange={(e) => setInpValue(e.target.value)}
        />
        <button>add</button>
      </form>

      {state &&
        state.length > 0 &&
        state.map((item, i) => {
          return (
            <div key={i}>
              <input type="checkBox" name="" id="" />
              {item}
              <button
                onClick={() => {
                  dispatch({ type: "delete", payload: i });
                }}
              >
                x
              </button>
            </div>
          );
        })}
      <button
        onClick={() => {
          localStorage.setItem("mainStore", JSON.stringify(["a", "b"]));
        }}
      >
        st
      </button>
    </div>
  );
}
