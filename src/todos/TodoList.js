import React from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { removeTodo, markTodoAsCompleted, markTodoAsIncomplete } from "../redux/todos/todo.actions";
import "./TodoList.css";

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, onIncompletePressed }) => (
  <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo) => (<TodoListItem todo={todo} 
                                onCompletedPressed={onCompletedPressed}
                                onRemovePressed={onRemovePressed} 
                                onIncompletePressed={onIncompletePressed}
                                />))}
  </div>
);

const mapStateToProps = (state) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    onRemovePressed: (text) => dispatch(removeTodo(text)),
    onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
    onIncompletePressed: (text) => dispatch(markTodoAsIncomplete(text)),
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
