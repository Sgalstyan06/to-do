import React from 'react'

export default function TodoItem({todos, 
    closeTask
}) {
    console.log("todoItem", todos);
  return (
   todos && todos.length > 0 && todos.map((item, index)=>{
        return <div key = {index}>{index} {item.val}
        <button onClick={()=>
            closeTask(index)
            }>x</button>
        </div>
    })
  )
}
