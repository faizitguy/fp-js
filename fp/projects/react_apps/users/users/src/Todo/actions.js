export const CHANGE_NAME =
  ({ name, value }) =>
  (state, props) => ({
    [name]: value,
  });

export const ADD_TODO = (task) => (state, props) => ({
  todos: [
    ...state.todos,
    { id: new Date().toLocaleString(), task: task, completed: false },
  ],
  todo: "",
});

export const DELETE_TODOS = () => (state, props) => ({
  todos: [],
});

export const DELETE_TODO = (id) => (state, props) => ({
  todos: [...state.todos.filter((item) => item.id !== id)],
});

export const DEFAULT = () => (state, props) => state;
