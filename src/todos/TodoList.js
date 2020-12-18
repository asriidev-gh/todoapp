import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";

const TodoList = ({ todos = [], 
                    onRemovePressed, 
                    onCompletedPressed, 
                    onIncompletePressed, 
                    onDisplayAlertClicked,
                    isLoading,
                    startLoadingTodos
                 }) => {
                    
  useEffect(() => {
    startLoadingTodos()
  },[]);

  const loadingMessage = "Loading todos..";
  const content = (
  <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo) => (<TodoListItem todo={todo} 
                                onCompletedPressed={onCompletedPressed}                                
                                onRemovePressed={onRemovePressed}
                                onIncompletePressed={onIncompletePressed}
                                />))}
  </div>
  );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,//current state of isLoading reducer
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    // onRemovePressed: (text) => dispatch(removeTodo(text)),//without thunk
    onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
    // onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
    onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
    onIncompletePressed: (text) => dispatch(markTodoAsIncomplete(text)),
    onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
    startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
