import { 
  CREATE_TODO, 
  MARK_TODO_AS_COMPLETED, 
  REMOVE_TODO, 
  MARK_TODO_AS_INCOMPLETE,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE, 
} from "./todo.actions";

// This will handle state of reducers
export const isLoading = (state = false, action) => {
  const { type } = action;

  switch(type){
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;
    default:
      return state;
  }
}

export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      // const newTodo = {
      //   text,
      //   isCompleted: false,
      // };
      return state.concat(todo);
    }

    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return state.filter(todo => todo.id !== todoToRemove.id);
    }

    case MARK_TODO_AS_COMPLETED: {
      const { todo } = payload;

      return state.map(todo => {
        const { todo: updatedTodo } = payload;
        if(todo.id === updatedTodo.id){
          return updatedTodo;
        }
        return todo;
      });      
    }

    case MARK_TODO_AS_INCOMPLETE: {
      const { todo } = payload;

      return state.map(todo => {
        if(todo.todo === todo){
          return updatedTodo;
        }
        return todo;
      });      
    }

    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return todos;
    }

    case LOAD_TODOS_IN_PROGRESS:
    case LOAD_TODOS_FAILURE: 
    default:
      return state;
  }
};
