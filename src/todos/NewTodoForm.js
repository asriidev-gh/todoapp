import React, { useState } from "react";
import { connect } from "react-redux";
// import { createTodo } from "../redux/todos/todo.actions";
import { addTodoRequest } from "../redux/todos/todo.thunks";
import styled from "styled-components";

import { getTodos } from "../redux/todos/todo.selectors";

const NewTodoFormDiv = styled.div`
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
`;

const NewTodoButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #22ee22;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <NewTodoFormDiv>
            <NewTodoInput                                
                type="text"
                placeholder="Type your new to do here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <NewTodoButton 
                onClick={()=>{
                    const isDuplicateText = todos.some(todo => todo.text === inputValue);
                    if(!isDuplicateText && inputValue !=""){
                        onCreatePressed(inputValue);
                        setInputValue("");
                    }                    
                }}
                className="new-todo-button">
                Create Todo
            </NewTodoButton>
        </NewTodoFormDiv>
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
    todos: getTodos(state)
});

// dispatch allows us to trigger any event from our actions
const mapDispatchToProps = (dispatch) => ({
    // onCreatePressed: (text) => dispatch(createTodo(text))
    onCreatePressed: (text) => dispatch(addTodoRequest(text))
});

export default connect(mapStateToProps,mapDispatchToProps)(NewTodoForm);