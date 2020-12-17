import React, { useState } from "react";
import { connect } from "react-redux";
import { createTodo } from "../redux/todos/todo.actions";
import "./NewTodoForm.css";

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="new-todo-form">
            <input                
                className="new-todo-input"
                type="text"
                placeholder="Type your new to do here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
                onClick={()=>{
                    const isDuplicateText = todos.some(todo => todo.text === inputValue);
                    if(!isDuplicateText && inputValue !=""){
                        onCreatePressed(inputValue);
                        setInputValue("");
                    }                    
                }}
                className="new-todo-button">
                Create Todo
            </button>
        </div>
    );
};

// the state arguments that pass to mapStateToProps
// is an object that represents the entire redux state
// such as users, videos, etc..
// the job of mapStateToProps is to take "state" object
// and return another object containing the pieces of that state
// that our component needs access to
// then since we connect mapStateToProps in our NewTodoForm
// we will have access to todos object that we can pass on the NewTodoForm({todo})
const mapStateToProps = (state) => ({
    todos: state.todos
});

// dispatch allows us to trigger any event from our actions
const mapDispatchToProps = (dispatch) => ({
    onCreatePressed: (text) => dispatch(createTodo(text))
});

export default connect(mapStateToProps,mapDispatchToProps)(NewTodoForm);