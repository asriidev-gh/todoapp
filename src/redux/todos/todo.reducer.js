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

const initialState = {
  isLoading: false, data: []
}

export const todos = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      // return state.concat(todo);
      return {
        ...state,
        data: state.data.concat(todo)
      }
    }

    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return {
        ...state,
        data: state.data.filter(todo => todo.id !== todoToRemove.id)
      }
    }

    case MARK_TODO_AS_COMPLETED: {
      const { todo: updatedTodo } = payload;

      return {
        ...state,
        data: state.data.map(todo => {          
          if(todo.id === updatedTodo.id){
            return updatedTodo;
          }
          return todo;
        })      
      }
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
      return {
        ...state,
        isLoading: false,
        data: todos
      }
    }
    case LOAD_TODOS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,        
      }      
    case LOAD_TODOS_FAILURE: 
      return {
        ...state,
        isLoading: false,        
      }
    default:
      return {
        ...state,
        isLoading: false,        
      }
  }
};
