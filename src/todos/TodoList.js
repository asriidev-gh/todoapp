import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "../redux/todos/todo.thunks";

import { getCompletedTodos, getIncompleteTodos, getTodos, getTodosLoading } from "../redux/todos/todo.selectors";

const TodoList = ({ todos = [], 
                    onRemovePressed, 
                    onCompletedPressed, 
                    onIncompletePressed,                     
                    isLoading,
                    startLoadingTodos,
                    completedTodos,
                    incompleteTodos
                 }) => {
                    
  useEffect(() => {
    startLoadingTodos()
  },[]);

  const loadingMessage = "Loading todos..";
  const content = (
  <div className="list-wrapper">
        <NewTodoForm />
        <h3>Incomplete:</h3>
        {incompleteTodos.map((todo) => (<TodoListItem
                                key={todo.id}
                                todo={todo}                                
                                onCompletedPressed={onCompletedPressed}                                
                                onRemovePressed={onRemovePressed}
                                onIncompletePressed={onIncompletePressed}
                                />))}
        
        <h3>Complete:</h3>
        {completedTodos.map((todo) => (<TodoListItem
                                key={todo.id}
                                todo={todo}                                
                                onCompletedPressed={onCompletedPressed}                                
                                onRemovePressed={onRemovePressed}
                                onIncompletePressed={onIncompletePressed}
                                />))}
  </div>
  );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
    isLoading: getTodosLoading(state),//current state of isLoading reducer, by using selector we may manage state
    todos: getTodos(state),
    completedTodos: getCompletedTodos(state),//to make separate list 
    incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
    // onRemovePressed: (text) => dispatch(removeTodo(text)),//without thunk
    onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
    // onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
    onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
    onIncompletePressed: (text) => dispatch(markTodoAsIncomplete(text)),    
    startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
