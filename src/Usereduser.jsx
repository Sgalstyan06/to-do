import { useEffect, useReducer, useRef, useState } from "react";

export function Usereduser() {
  const [inpValue, setInpValue] = useState("");
  const [store, setStore] = useState([]);
  const [hide, setHide] = useState(true);

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

      case "check":
        localStorage.setItem(
          "store",
          JSON.stringify(
            state.map((item, index) => {
              if (index === action.paylaod[0]) {
                return action.paylaod[1];
              } else {
                return item;
              }
            })
          )
        );
        setStore(JSON.parse(localStorage.getItem("store")));
        return JSON.parse(localStorage.getItem("store"));

      case "hide completed":
        
          localStorage.setItem(
            "hideCheck",
            JSON.stringify(state.filter((item) => item.iscompleted === false))
          );
          if( hide ){
            setHide(prev => !prev);
            return JSON.parse(localStorage.getItem("hideCheck"));
            
          }else{
            setHide(prev => !prev)
            return store;
          } 
          
        
        

      // setStore(JSON.parse(localStorage.getItem("store")));

      default:
        return [];
    }
  }

  useEffect(() => {
    console.log("s", store);
    if (localStorage.getItem("store") === null) {
      localStorage.setItem("store", JSON.stringify([]));
    } else {
      setStore(JSON.parse(localStorage.getItem("store")));
      dispatch({ type: "refresh", payload: store });
    }
  }, []);

  console.log("store", store);

  return (
    <div>
      <h3>helow</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: "add",
            payload: { iscompleted: false, val: inpValue },
          });

          localStorage.setItem(
            "store",
            JSON.stringify([...store, { iscompleted: false, val: inpValue }])
          );
          setStore(JSON.parse(localStorage.getItem("store")));

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
              <input
                type="checkBox"
                onChange={() => {
                  dispatch({
                    type: "check",
                    paylaod: [i, { ...item, iscompleted: !item.iscompleted }],
                  });
                }}
                checked={item.iscompleted}
              />
              {item.val}
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
          dispatch({ type: "hide completed" });
        }}
      >
        hide complited
      </button>
    </div>
  );
}
