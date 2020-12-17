import React from "react";
import "./TodoListItem.css";

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed, onIncompletePressed }) => (
  <div className="todo-item-container">
    <h3>{todo.text}</h3>
    <div className="buttons-container">
        {todo.isCompleted ? 
            <button                
            onClick={()=> onIncompletePressed(todo.text)}
            >Completed</button>
        : 
            <button 
            className="completed-button"
            onClick={()=> onCompletedPressed(todo.text)}>
                Mark As Completed
            </button>
        }
      <button 
        onClick={()=> onRemovePressed(todo.text)}
        className="remove-button"
        >Remove</button>
    </div>
  </div>
);

export default TodoListItem;
