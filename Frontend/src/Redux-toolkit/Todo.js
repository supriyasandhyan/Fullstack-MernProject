import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "./Slice/TodoSlice";

const Todo = () => {
  const dispatch = useDispatch();

  const todoState = useSelector((state) => state.todo);
  console.log("API: ", todoState);

  if(todoState.isLoading){
    return <h3>Loading...</h3>
  }

  return (
    <div>
      <h1>Todo list</h1>
      <hr />
      <button
        type="submit"
        onClick={()=>dispatch(fetchTodo())}
        style={{ padding: "10px", borderRadius: "10px" }}
      >
        fetch Me
      </button>
      <ul>
      {
        todoState.data.map((e, index)=>
            <li key={index}>{e.title}</li>
        )
      }
      </ul>
      <hr />
    </div>
  );
};

export default Todo;
